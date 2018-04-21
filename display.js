const peopleUrl = 'https://su-auras.herokuapp.com/person/photos/';

const photo = document.getElementById('photo');

const profileStripe = document.getElementById('profile-stripe');
const profileText = document.getElementById('profile-text');

const logoStripe = document.getElementById('logo-stripe');
const logoText = document.getElementById('logo-text');

let people = [];
let mostRecent = '0';
let index = 0;
let updateCount = 0;

function fadeIn() {
  photo.style.opacity = '1';
  photo.classList.add('display-burn-in-animation');
  setTimeout(fadeInProfile, 7000);
}

function fadeInProfile() {
  profileStripe.classList.add('left-to-right-animation');
  profileText.classList.add('right-to-left-animation');
  setTimeout(fadeInLogo, 1000);
}

function fadeInLogo() {
  logoStripe.classList.add('right-to-left-animation');
  logoText.classList.add('left-to-right-animation');
  setTimeout(fadeOut, 3000);
}

function fadeOut() {
  profileStripe.style.opacity = '0';
  profileText.style.opacity = '0';
  logoStripe.style.opacity = '0';
  logoText.style.opacity = '0';
  setTimeout(reset, 1000);
}

function reset() {
  photo.classList.remove('display-burn-in-animation');

  profileStripe.classList.remove('left-to-right-animation');
  profileText.classList.remove('right-to-left-animation');
  
  logoStripe.classList.remove('right-to-left-animation');
  logoText.classList.remove('left-to-right-animation');

  profileStripe.style.opacity = '1';
  profileText.style.opacity = '1';
  logoStripe.style.opacity = '1';
  logoText.style.opacity = '1';
  photo.style.opacity = '0';
  setTimeout(updateImage, 1000);
}

function updateImage() {
  if (updateCount++ > 10) {
    window.location.href = './mosaic.html';
  }

  if(people.length > 0) {
    let url = people[index]['image_url'];
    photo.style.backgroundImage = `url(${url})`;

    let profile_b = people[index]['profile'].replace(/([^\s]*)$/, '<br><b>$1</b>');
    profileText.innerHTML = profile_b;

    index = (index + 1) % people.length;
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

fetchPeople(mostRecent);
updateImage();
