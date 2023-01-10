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
  const destinationPicture = document.getElementById('planet-image');
  const sourceTag = [...destinationPicture.children][0];
  const imgTag = [...destinationPicture.children][1];

  [destinationName, destinationDescription, destinationDistance, destinationTime].forEach(item => item.innerText = '');

  const targetTab = e.target;
  const tabName = targetTab.innerText.toLowerCase();

  tabs.forEach((tab) => {
    if (tab.getAttribute('aria-selected')) {
      tab.setAttribute('aria-selected', false);
    }
  });

  targetTab.setAttribute('aria-selected', true);

  data.destinations.map(item => {
    if (item.name.toLowerCase() === tabName) {
      destinationName.innerText = item.name;
      destinationDescription.innerText = item.description;
      destinationDistance.innerText = item.distance;
      destinationTime.innerText = item.travel;
      imgTag.src = item.images.png;
      sourceTag.srcset = item.images.webp;
    };
  });
}