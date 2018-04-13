const photo = document.getElementById('photo');

const profileStripe = document.getElementById('profile-stripe');
const profileText = document.getElementById('profile-text');

const logoStripe = document.getElementById('logo-stripe');
const logoText = document.getElementById('logo-text');

function fadeIn() {
  photo.style.opacity = '1';
  setTimeout(fadeInProfile, 2000);
  setTimeout(fadeInLogo, 3000);
}

function fadeInProfile() {
  profileStripe.classList.add("stripe-animation");
  profileText.classList.add("text-animation");
}

function fadeInLogo() {
  logoStripe.classList.add("stripe-animation");
  logoText.classList.add("text-animation");
}

function fadeOut() {
  profileStripe.style.opacity = '0';
  profileText.style.opacity = '0';
  logoStripe.style.opacity = '0';
  logoText.style.opacity = '0';
  setTimeout(reset, 1000);
}

function reset() {
  profileStripe.classList.remove("stripe-animation");
  profileText.classList.remove("text-animation");
  
  logoStripe.classList.remove("stripe-animation");
  logoText.classList.remove("text-animation");

  profileStripe.style.opacity = '1';
  profileText.style.opacity = '1';
  logoStripe.style.opacity = '1';
  logoText.style.opacity = '1';
  photo.style.opacity = '0';
}

let index = 0;

function updateImage() {
  var url = people[index]['flickr_url'];
  photo.style.backgroundImage = "url(" + url + ")";

  profileText.innerHTML = people[index]['_id'];

  fadeIn();
  index = (index + 1) % people.length;
  setTimeout(fadeOut, 8000);
  setTimeout(updateImage, 10000);
}

const peopleUrl = "https://su-auras.herokuapp.com/person";
let people;

function fetchPeople() {
  fetch(peopleUrl).then(function(response) {
    return response.json();
  }).then(function(data) {
    people = data;
    updateImage();
  }).catch(function(err) {
    console.log(err);
  });

  setTimeout(fetchPeople, 120e3);
}

fetchPeople();
