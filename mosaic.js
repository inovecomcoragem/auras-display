const peopleUrl = "https://su-auras.herokuapp.com/person/photos/";

const mainContainer = document.getElementById('main');

let people = [];

let mostRecent = "0";
let index = 0;

let toDisplay = [];
let toContainer = [];
let makeContainerTimeout;

function clearMosaic() {
  mainContainer.style.opacity = '0';
  clearTimeout(makeContainerTimeout);
  setTimeout(resetMosaic, 1000);
}

function resetMosaic() {
  while (mainContainer.firstChild) {
    mainContainer.removeChild(mainContainer.firstChild);
  }
  mainContainer.classList.remove('mosaic-photo');
  mainContainer.classList.remove('mosaic-container');
  toDisplay.push(mainContainer);
  makeMosaic();
}

function makeMosaic() {
  while (toDisplay.length > 0) {
    let container = toDisplay.shift();

    container.style.backgroundImage = `url(${ people[index]['image_url'] })`;
    container.classList.add('mosaic-photo');

    if (container.classList.contains('main-mosaic-container')) {
      container.style.width = '75vh';
      container.style.height = '100vh';
    }

    setTimeout(fadeIn(container), 1000 + 1000 * Math.random());
    toContainer.push(container);
    index = (index + 1) % people.length;
  }
  clearTimeout(makeContainerTimeout);
  makeContainerTimeout = setTimeout(makeContainer, 15e3);
}

function makeContainer() {
  while (toContainer.length > 0) {
    let container = toContainer.shift();
    container.style.opacity = '0';
    setTimeout(fadeOut(container), 1000);
  }
  clearTimeout(makeContainerTimeout);
  makeContainerTimeout = setTimeout(makeContainer, 10e3);
}

function fadeIn(element) {
  return function() {
    element.style.opacity = '1';
  };
}

function fadeOut(element) {
  return function() {
    element.classList.remove('mosaic-photo');
    element.classList.add('mosaic-container');
    element.style.backgroundImage = 'none';
    element.style.opacity = '1';
    splitContainer(element);
  };
}

function splitContainer(container) {
  for(let i = 0; i < 4; i++) {
    let p = document.createElement('div');
    container.appendChild(p);
    toDisplay.push(p);
  }
  setTimeout(makeMosaic, 1000);
}

function fetchPeople(since, cb) {
  fetch(peopleUrl + since).then(function(response) {
    return response.json();
  }).then(function(data) {
    if(data.length > 0) {
      people = data.concat(people);
      index = 0;
      mostRecent = people[0]['datetime'];
    }
    if(cb) { cb(); };
  }).catch(function(err) {
    console.log(err);
  });

  setTimeout(() => { fetchPeople(mostRecent, clearMosaic); }, 58e3);
}

fetchPeople(mostRecent, clearMosaic);
setTimeout(() => { window.location.href = './display.html' }, 180e3);
