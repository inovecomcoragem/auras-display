const qr = document.getElementById('qr');

const phraseStripe = document.getElementById('phrase-stripe');
const phraseText = document.getElementById('phrase-text');

function fadeIn() {
  qr.style.opacity = '1';
  qr.classList.add('display-burn-in-animation');
  setTimeout(fadeInPhrase, 7000);
}

function fadeInPhrase() {
  phraseStripe.classList.add('left-to-right-animation');
  phraseText.classList.add('right-to-left-animation');
  setTimeout(fadeOut, 30000);
}

function fadeOut() {
  phraseStripe.style.opacity = '0';
  phraseText.style.opacity = '0';
  setTimeout(reset, 1000);
}

function reset() {
  qr.classList.remove('display-burn-in-animation');

  phraseStripe.classList.remove('left-to-right-animation');
  phraseText.classList.remove('right-to-left-animation');

  phraseStripe.style.opacity = '1';
  phraseText.style.opacity = '1';
  qr.style.opacity = '0';
  setTimeout(leave, 1000);
}

function leave() {
  window.location.href = './display.html';
}

window.onload = function() {
  fadeIn();
}
