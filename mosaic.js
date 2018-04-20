const peopleUrl = 'https://su-auras.herokuapp.com/person/photos/';

const mainContainer = document.getElementById('main-mosaic');

let people = [];

let toDisplay = [];
let toContainer = [];

let mostRecent = '0';
let index = 0;
let loopCounter = 0;
let displayCount = 0;
let displayPhotoTimeout;

function clearMosaic() {
  displayCount = 0;
  mainContainer.style.opacity = '0';
  setTimeout(resetMosaic, 1000);
}

function resetMosaic() {
  if (loopCounter++ > 2) {
    window.location.href = './display.html';
  }

  while (mainContainer.firstChild) {
    mainContainer.removeChild(mainContainer.firstChild);
  }
  mainContainer.classList.remove('mosaic-photo');
  mainContainer.classList.remove('mosaic-container-quarter');
  toDisplay = [];
  toContainer = [];
  toDisplay.push(mainContainer);
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
      setTimeout(fadePhotoIn(photo), 200);
    } else {
      setTimeout(fadePhotoIn(photo), 500 + 2000 * Math.random());
    }

    toContainer.push(photo);
  }
  setTimeout(fadePhotoOutAndMakeContainers, 6e3);
}

function fadePhotoIn(element) {
  return function() {
    element.style.opacity = '1';
  };
}

function fadePhotoOutAndMakeContainers() {
  while (toContainer.length > 0) {
    let photo = toContainer.shift();
    photo.style.opacity = '0';
    setTimeout(switchClassesAndAddChildrenPhotos(photo), 1000);
  }
  clearTimeout(displayPhotoTimeout);
  displayPhotoTimeout = setTimeout(displayPhotos, 1100);
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
