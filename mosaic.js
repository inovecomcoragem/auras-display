const peopleUrl = 'https://auras-app.herokuapp.com/person/photos/';

const mainContainerL = document.getElementById('main-mosaicL');
const mainContainerR = document.getElementById('main-mosaicR');
const phraseStripe = document.getElementById('phrase-stripe');
const phraseText = document.getElementById('phrase-text');

let people = [];
let toDisplay = [];
let toContainer = [];

let mostRecent = '0';
let index = 0;
let loopCounter = 0;
let displayCount = 0;
let phraseIndex = 0;
let displayPhotoTimeout;

let inoveCom = ['coragem',
                'confiança',
                'emoção',
                'rebeldia',
                'energia',
                'propósito',
                'sabedoria'];

function clearMosaic() {
  displayCount = 0;
  mainContainerL.style.opacity = '0';
  mainContainerR.style.opacity = '0';
  setTimeout(resetMosaic, 1000);
}

function resetMosaic() {
  if (loopCounter++ > 2) {
    window.location.href = './display.html';
  }

  while (mainContainerL.firstChild) {
    mainContainerL.removeChild(mainContainerL.firstChild);
  }
  while (mainContainerR.firstChild) {
    mainContainerR.removeChild(mainContainerR.firstChild);
  }
  mainContainerL.classList.remove('mosaic-photo');
  mainContainerR.classList.remove('mosaic-photo');
  mainContainerL.classList.remove('mosaic-container-quarter');
  mainContainerR.classList.remove('mosaic-container-quarter');

  toDisplay = [];
  toContainer = [];
  toDisplay.push(mainContainerL);
  toDisplay.push(mainContainerR);
  clearTimeout(displayPhotoTimeout);
  displayPhotoTimeout = setTimeout(displayPhotos, 1);
}

function displayPhotos() {
  if (displayCount++ > 3) {
    clearMosaic();
  }

  while (toDisplay.length > 0) {
    let photo = toDisplay.shift();

    photo.style.backgroundImage = `url(${ people[index]['image_url'] })`;
    index = (index + 1) % people.length;

    photo.classList.add('mosaic-photo');

    if (photo.classList.contains('mosaic-container-full')) {
      photo.style.width = '75vh';
      photo.style.height = '100vh';
      setTimeout(fadeInPhoto(photo), 200);
    } else {
      setTimeout(fadeInPhoto(photo), 500 + 2000 * Math.random());
    }

    toContainer.push(photo);
  }
  setTimeout(fadeInPhrase, 4000);
  setTimeout(fadePhotoOutAndMakeContainers, 6e3);
}

function fadeInPhoto(element) {
  return function() {
    element.style.opacity = '1';
  };
}

function fadeInPhrase() {
  phraseStripe.classList.add('left-to-right-animation');
  phraseText.classList.add('right-to-left-animation');
}

function fadePhotoOutAndMakeContainers() {
  while (toContainer.length > 0) {
    let photo = toContainer.shift();
    photo.style.opacity = '0';
    setTimeout(switchClassesAndAddChildrenPhotos(photo), 1000);
  }
  phraseStripe.style.opacity = '0';
  phraseText.style.opacity = '0';
  setTimeout(switchPhrase, 1000);
  clearTimeout(displayPhotoTimeout);
  displayPhotoTimeout = setTimeout(displayPhotos, 1100);
}

function switchPhrase() {
  let phrase = 'inove com ' + inoveCom[phraseIndex++ % inoveCom.length];
  let phrase_b = phrase.replace(/([^\s]*)$/, '<b>$1</b>');
  phraseText.innerHTML = phrase_b;

  phraseStripe.classList.remove('left-to-right-animation');
  phraseText.classList.remove('right-to-left-animation');

  phraseStripe.style.opacity = '1';
  phraseText.style.opacity = '1';
}

function switchClassesAndAddChildrenPhotos(element) {
  return function() {
    element.classList.remove('mosaic-photo');
    if (!element.classList.contains('mosaic-container-full')) {
      element.classList.add('mosaic-container-quarter');
    }
    element.style.backgroundImage = 'none';
    element.style.opacity = '1';

    for(let i = 0; i < 4; i++) {
      let p = document.createElement('div');
      p.classList.add('mosaic-photo');
      element.appendChild(p);
      toDisplay.push(p);
    }
  };
}

function fetchPeople(since, cb) {
  fetch(peopleUrl + since).then(function(response) {
    return response.json();
  }).then(function(data) {
    if(data.length > 0) {
      people = data.concat(people);
      index = 0;
      mostRecent = people[0]['datetime'];
      cb();
    }
  }).catch(function(err) {
    console.log(err);
  });
}

fetchPeople(mostRecent, clearMosaic);
