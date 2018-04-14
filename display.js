const peopleUrl = "https://su-auras.herokuapp.com/person/photos/";

const photo = document.getElementById('photo');

const profileStripe = document.getElementById('profile-stripe');
const profileText = document.getElementById('profile-text');

const logoStripe = document.getElementById('logo-stripe');
const logoText = document.getElementById('logo-text');

let people = [];
let mostRecent = "0";

function fadeIn() {
  photo.style.opacity = '1';
  setTimeout(fadeInProfile, 2000);
}

function fadeInProfile() {
  profileStripe.classList.add("stripe-animation");
  profileText.classList.add("text-animation");
  setTimeout(fadeInLogo, 1000);
}

function fadeInLogo() {
  logoStripe.classList.add("stripe-animation");
  logoText.classList.add("text-animation");
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
  profileStripe.classList.remove("stripe-animation");
  profileText.classList.remove("text-animation");
  
  logoStripe.classList.remove("stripe-animation");
  logoText.classList.remove("text-animation");

  profileStripe.style.opacity = '1';
  profileText.style.opacity = '1';
  logoStripe.style.opacity = '1';
  logoText.style.opacity = '1';
  photo.style.opacity = '0';
  setTimeout(updateImage, 1000);
}

let index = 0;

function updateImage() {
  if(people.length > 0) {
    var url = people[index]['flickr_url'];
    photo.style.backgroundImage = "url(" + url + ")";

    profileText.innerHTML = people[index]['_id'];

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
  setTimeout(() => { fetchPeople(mostRecent); }, 60e3);
}

fetchPeople(mostRecent);
updateImage();
