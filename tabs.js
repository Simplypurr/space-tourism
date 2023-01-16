import data from "./data.json" assert { type: "json" };

const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');


tabList.addEventListener('keydown', changeTabFocus);

tabs.forEach((tab) => {
  tab.addEventListener('click', changeTabPanel);
});


let tabFocus = 0;

function changeTabFocus(e) {
  const keydownLeft = 37;
  const keydownRight = 39;

  if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
    tabs[tabFocus].setAttribute("tabindex", -1);
  }

  if (e.keyCode === keydownRight) {
    tabFocus++;
    if (tabFocus >= tabs.length) {
      tabFocus = 0;
    }
  }

  if (e.keyCode === keydownLeft) {
    tabFocus--;
    if (tabFocus < 0) {
      tabFocus = tabs.length - 1;
    }
  }

  tabs[tabFocus].setAttribute("tabindex", 0);
  tabs[tabFocus].focus();
}

function changeTabPanel(e) {
  const destinationName = document.getElementById('destination-name');
  const destinationDescription = document.getElementById('destination-description');
  const destinationDistance = document.getElementById('destination-distance');
  const destinationTime = document.getElementById('destination-time');
  const picture = document.getElementById('image');
  const crewTitle = document.getElementById('crew-title');
  const crewName = document.getElementById('crew-name');
  const crewDescription = document.getElementById('crew-description');
  const sourceTag = [...picture.children][0];
  const imgTag = [...picture.children][1];

  const targetTab = e.target;
  const tabName = targetTab.innerText.toLowerCase();

  tabs.forEach((tab) => {
    if (tab.getAttribute('aria-selected')) {
      tab.setAttribute('aria-selected', false);
    }
  });

  targetTab.setAttribute('aria-selected', true);

  switch (window.location.pathname) {
    case '/destination.html':
      [destinationName, destinationDescription, destinationDistance, destinationTime].forEach(item => item.innerText = '');
      data.destinations.map(item => {
        if (item.name.toLowerCase() === tabName) {
          destinationName.innerText = item.name;
          destinationDescription.innerText = item.description;
          destinationDistance.innerText = item.distance;
          destinationTime.innerText = item.travel;
          imgTag.src = item.images.png;
          sourceTag.srcset = item.images.webp;
        }
      });
      break;
    case '/crew.html':
      [crewTitle, crewDescription, crewName].forEach(item => item.innerText = '');
      data.crew.map(item => {
        if (item.role.toLowerCase() === tabName) {
          crewTitle.innerText = item.role;
          crewName.innerText = item.name;
          crewDescription.innerText = item.bio;
          imgTag.src = item.images.png;
          sourceTag.srcset = item.images.webp;
        }
      });
      break;
    case '/technology.html':

  }
}

