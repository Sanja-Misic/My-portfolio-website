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

//projects data
const projectData = [
  // {
  // name: 'name',
  // technologiesName: ['Html5', 'Css3', 'Scss', 'JavaScript'],
  // img: 'Project-1-img.png',
  // description:,
  // git:,
  // exploreLink:,
  // },
  {
    name: 'Modern homes website',
    technologiesName: ['Html5', 'Css3', 'Scss', 'JavaScript', 'Figma'],
    img: 'Project-0-img.png',
    description:
      'This project was built using HTML with the SASS extension of CSS, and a little bit of JavaScript, based on the <a href=https://www.figma.com/file/zjHt1CwKAbCWWif5eyeDAv/Challenge-%231?node-id=6-22&t=aca77VaNxsRAFNOZ-0 class="white-text">Figma file</a>. The Figma file was provided as a challenge by a programming school "Project Classroom". In this project, I showcased my skills in creating a simple webpage based on a Figma design.',
    git: 'https://github.com/Sanja-Misic/Modern-homes-website',
    exploreLink: 'https://sanja-misic.github.io/Modern-homes-website/',
  },
  {
    name: 'Dice game',
    technologiesName: ['Html5', 'Css3', 'Scss', 'JavaScript'],
    img: 'Project-1-img.png',
    description:
      'Dice game is a simple game where two players roll the dice one after another trying to accumulate their current score  and save it before rolling a one. If a player roles a one they lose their current score. The winner is first player who reach 100 points. I designed and developed the user interface using HTML and CSS/SASS, and implemented the game logic using vanilla JavaScript without any external libraries or frameworks. Creating this project, I practiced my skills to implement JavaScript logic. Also, I practiced using timer in JavaScript and some DOM manipulation like input player names, display random rolling number on dice, display current score and saved score on screen, display winner etc. ',
    git: 'https://github.com/Sanja-Misic/Dice-game',
    exploreLink: 'https://sanja-misic.github.io/Dice-game/',
  },

  {
    name: 'Bookstore',
    technologiesName: ['Html5', 'Css3', 'Scss', 'JavaScript'],
    img: 'Project-2-img.png',
    description:
      'The Bookstore application is designed to read data from a JSON file that serves as a database for all the books. The home page displays the best-rated books and most reviewed books by random genres. On another page, users can view all the available genres and click on a genre to see all the books in that category. Clicking on a book will open up its details. The application also features a search option, and includes a checkbox that enables users to view books for adults if they are over 18 years old. This project helped me enhance my skills in front-end development, JavaScript, and JSON data manipulation.',
    git: 'https://github.com/Sanja-Misic/Bookstore-practice',
    exploreLink: 'https://sanja-misic.github.io/Bookstore-practice/',
  },

  {
    name: 'Food App',
    technologiesName: ['Html5', 'Css3', 'Scss', 'JavaScript'],
    img: 'Project-3-img.png',
    description:
      'Food App is project in witch I practiced using API to display recipes based on user input. Users can search for recipes by ingredient Clicking on a recipe card opens up a detailed view of the recipe, including  information of recepie and a video tutorial link to a YouTube recipe video. I also designed the interface to provide a user-friendly experience.',
    git: 'https://github.com/Sanja-Misic/Food-app-practice',
    exploreLink: 'https://sanja-misic.github.io/Food-app-practice/',
  },

  {
    name: 'Nice site',
    technologiesName: ['Html5', 'Css3', 'Scss', 'JavaScript'],
    img: 'Project-4-img.png',
    description:
      'For my Nice site project, I challenged myself to recreate a website <a href=https://nicepage.com/html-templates/preview/web-design-and-development-company-2184402?device=desktop class="white-text">template</a> from scratch using HTML, CSS, SASS, and JavaScript. I utilized SASS to make my CSS more organized and efficient, and I practiced using JavaScript to create interactive animations. Specifically, I focused on using Intersection Observer, which allowed me to trigger certain animations when an element entered the viewport.',
    git: 'https://github.com/Sanja-Misic/nice-page-website-practise',
    exploreLink: 'https://sanja-misic.github.io/nice-page-website-practise/',
  },
];

const generateProjectPopupHtml = i => {
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
                <div class="projects__popup-description">${projectData[i].description}</div>
                
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
projectSeeMorebutton.forEach((button, i) => {
  button.addEventListener('click', function () {
    projectsPopup.style.display = 'grid';
    body.classList.add('owerflow-hidden-background');
    html.classList.add('owerflow-hidden-background');
    projectsPopupWrapper.innerHTML = generateProjectPopupHtml(i);
  });
});
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
