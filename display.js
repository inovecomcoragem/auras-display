const profileStripe = document.getElementById('profile-stripe');
const profileText = document.getElementById('profile-text');

const logoStripe = document.getElementById('logo-stripe');
const logoText = document.getElementById('logo-text');

function fadeIn() {
  fadeInProfile();
  setTimeout(fadeInLogo, 1000);
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
}
