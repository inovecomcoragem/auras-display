const peopleUrl = 'https://auras-app.herokuapp.com/person/photos/';

const photoL = document.getElementById('photoL');
const photoR = document.getElementById('photoR');

const phraseStripe = document.getElementById('phrase-stripe');
const phraseText = document.getElementById('phrase-text');

let people = [];
let mostRecent = '0';
let index = 0;
let inoveCom = ['coragem',
                'confiança',
                'emoção',
                'rebeldia',
                'energia',
                'propósito',
                'sabedoria'];

function fadeIn() {
  photoL.style.opacity = '1';
  photoL.classList.add('display-burn-in-animation');
  photoR.style.opacity = '1';
  photoR.classList.add('display-burn-in-animation');
  setTimeout(fadeInPhrase, 7000);
}

function fadeInPhrase() {
  phraseStripe.classList.add('left-to-right-animation');
  phraseText.classList.add('right-to-left-animation');
  setTimeout(fadeOut, 3000);
}

function fadeOut() {
  phraseStripe.style.opacity = '0';
  phraseText.style.opacity = '0';
  setTimeout(reset, 1000);
}

function reset() {
  photoL.classList.remove('display-burn-in-animation');
  photoR.classList.remove('display-burn-in-animation');

  phraseStripe.classList.remove('left-to-right-animation');
  phraseText.classList.remove('right-to-left-animation');

  phraseStripe.style.opacity = '1';
  phraseText.style.opacity = '1';
  photoL.style.opacity = '0';
  photoR.style.opacity = '0';
  setTimeout(updateImage, 1000);
}

function updateImage() {
  if (index > 20) {
    window.location.href = './recruit.html';
  }

  if(people.length > 0) {
    let phrase = 'inove com ' + inoveCom[(index / 2) % inoveCom.length];
    let phrase_b = phrase.replace(/([^\s]*)$/, '<b>$1</b>');
    phraseText.innerHTML = phrase_b;

    let url = people[index++ % people.length]['image_url'];
    photoL.style.backgroundImage = `url(${url})`;

    url = people[index++ % people.length]['image_url'];
    photoR.style.backgroundImage = `url(${url})`;
  }
  fadeIn();
}

function fetchPeople(since) {
  fetch(peopleUrl + since).then(function(response) {
    return response.json();
  }).then(function(data) {
    if(data.length > 0) {
      people = data.concat(people);
      index = 0;
      mostRecent = people[0]['datetime'];
    }
  }).catch(function(err) {
    console.log(err);
  });
}

window.onload = function() {
  fetchPeople(mostRecent);
  updateImage();
}
