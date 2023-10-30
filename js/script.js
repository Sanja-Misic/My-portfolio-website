'use strict';

const html = document.querySelector('html');
const body = document.querySelector('body');

const burgerMenuButton = document.querySelector('.header__burger-menu-icon');
const menuMobContainer = document.querySelector('.header__navigation-mob');
const menuMobItems = document.querySelectorAll('.header__navigation-mob-item');
const closeMenuMobContainer = document.querySelector(
  '.header__navigation-mob-close'
);

const openAboutMePopup = document.querySelector('.about-me__read-more');
const closeAboutMePopup = document.querySelector('.about-me__popup-close');
const aboutMePopup = document.querySelector('.about-me__popup');

const projectSeeMorebutton = document.querySelectorAll('.projects__button');
const closeProjectsPopup = document.querySelector('.projects__popup-close');
const projectsPopup = document.querySelector('.projects__popup');
const projectsPopupWrapper = document.querySelector('.projects__popup-wrapper');

const projectCards = document.querySelectorAll('.projects__card');
const arrLeft = document.querySelector('.projects__arr-left');
const arrRight = document.querySelector('.projects__arr-right');

let currentCardIndex = 0;
let cardsCount;

async function displayProjectData() {
  try {
    const response = await fetch('./data/project-data.json');
    const data = await response.json();

    //project popup
    projectSeeMorebutton.forEach((button, i) => {
      button.addEventListener('click', function () {
        projectsPopup.style.display = 'grid';
        body.classList.add('owerflow-hidden-background');
        html.classList.add('owerflow-hidden-background');
        projectsPopupWrapper.innerHTML = generateProjectPopupHtml(i, data);
      });
    });
  } catch (error) {
    console.error('Došlo je do greške:', error);
  }
}

displayProjectData();

const generateProjectPopupHtml = (i, projectData) => {
  let currentLocation = window.location.pathname;

  let description = projectData[i].description;

  if (currentLocation.includes('index.html')) {
    description = projectData[i].description;
  } else if (currentLocation.includes('index-srb.html')) {
    description = projectData[i].descriptionSrb;
  }

  const projectPopupHtml = `
    <img src="./img/projects-imgs/${projectData[i].img}" alt="" class="projects__popup-img">
              <div class="projects__popup-text-wrapper">
                <h3 class="heading-tertiary projects__popup-heading">${projectData[i].name}</h3>
                <div class="projects__popup-tehnologies"><div class="projects__tehnologies">
                  <div class="projects__tehnologies-item">
                    <ion-icon name="logo-html5" class="projects__tehnologies-icon"></ion-icon>
                    <p class="projects__tehnologies-name">${projectData[i].technologiesName[0]}</p>
                  </div>
                  <div class="projects__tehnologies-item">
                    <ion-icon name="logo-css3" class="projects__tehnologies-icon"></ion-icon>
                    <p class="projects__tehnologies-name">${projectData[i].technologiesName[1]}</p>
                  </div>
                  <div class="projects__tehnologies-item">
                    <ion-icon name="logo-sass" class="projects__tehnologies-icon"></ion-icon>
                    <p class="projects__tehnologies-name">${projectData[i].technologiesName[2]}</p>
                  </div>
                  <div class="projects__tehnologies-item">
                    <ion-icon name="logo-javascript" class="projects__tehnologies-icon"></ion-icon>
                    <p class="projects__tehnologies-name">${projectData[i].technologiesName[3]}</p>
                  </div>
                  </div>
                  </div>
                <div class="projects__popup-description">${description}</div>
                
                <div class="projects__popup-buttons-wrapper">
                <a href="${projectData[i].exploreLink}" class="projects__popup-link" target="_blank">Explore Project</a>
                <a href="${projectData[i].git}" class="projects__popup-link" target="_blank">View Code</a>
                </div>
                </div>
            </div>
`;
  return projectPopupHtml;
};

//Open and close
const openPopup = (openButton, page) => {
  openButton.addEventListener('click', function () {
    page.style.display = 'grid';
    body.classList.add('owerflow-hidden-background');
    html.classList.add('owerflow-hidden-background');
  });
};

const closeBtnHendler = (closeButton, page) => {
  closeButton.addEventListener('click', function () {
    page.style.display = 'none';
    body.classList.remove('owerflow-hidden-background');
    html.classList.remove('owerflow-hidden-background');
  });
};

const closePopupOnBackground = page => {
  page.addEventListener('click', function (e) {
    if (e.target.classList.contains('popup')) {
      page.style.display = 'none';
      body.classList.remove('owerflow-hidden-background');
      html.classList.remove('owerflow-hidden-background');
    }
  });
};

//burger menu
burgerMenuButton.addEventListener('click', function () {
  menuMobContainer.style.display = 'flex';
  body.classList.add('owerflow-hidden-background');
  html.classList.add('owerflow-hidden-background');
});

menuMobItems.forEach(el => {
  el.addEventListener('click', function () {
    menuMobContainer.style.display = 'none';
    body.classList.remove('owerflow-hidden-background');
    html.classList.remove('owerflow-hidden-background');
  });
});

closeBtnHendler(closeMenuMobContainer, menuMobContainer);

// About me popup
openPopup(openAboutMePopup, aboutMePopup);
closeBtnHendler(closeAboutMePopup, aboutMePopup);
closePopupOnBackground(aboutMePopup);

// Projects popup
// projectSeeMorebutton.forEach((button, i) => {
//   button.addEventListener('click', function () {
//     projectsPopup.style.display = 'grid';
//     body.classList.add('owerflow-hidden-background');
//     html.classList.add('owerflow-hidden-background');
//     projectsPopupWrapper.innerHTML = generateProjectPopupHtml(i);
//   });
// });
closeBtnHendler(closeProjectsPopup, projectsPopup);
closePopupOnBackground(projectsPopup);

//Projects section carousel
if (window.innerWidth > 1024) {
  cardsCount = 3;
} else if (window.innerWidth > 768) {
  cardsCount = 2;
} else {
  cardsCount = 1;
}

arrRight.addEventListener('click', function () {
  projectCards[currentCardIndex].style.display = 'none';
  currentCardIndex++;
  arrLeft.style.display = 'block';
  if (currentCardIndex === projectCards.length - cardsCount) {
    arrRight.style.display = 'none';
  }
});

arrLeft.addEventListener('click', function () {
  projectCards[currentCardIndex - 1].style.display = 'flex';
  currentCardIndex--;
  arrRight.style.display = 'block';
  if (currentCardIndex === 0) {
    arrLeft.style.display = 'none';
  }
});

//// BACK TO TOP BTN
const orangeColorDarker = '#c03b0b';
const whiteColor = '#fff9f6';

const calcScrollValue = () => {
  const scrollProgress = document.querySelector('.progress');
  const position = document.documentElement.scrollTop;

  const calcHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const scrollValue = Math.round((position * 100) / calcHeight);

  if (position > 100) {
    scrollProgress.classList.add('progress-show');
  } else {
    scrollProgress.classList.remove('progress-show');
  }

  scrollProgress.style.background = `conic-gradient(${orangeColorDarker} ${scrollValue}%, ${whiteColor} ${scrollValue}%)`;
};

window.onscroll = calcScrollValue;
window.onload = calcScrollValue;

//// LANGUAGES
const selectLanguages = document.querySelectorAll('.header__language-select');

selectLanguages.forEach(el => {
  el.onchange = function () {
    location = this.value;
  };
});
