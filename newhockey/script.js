function flip(partOfClock, timeUnit) {
  var lower_back = document.getElementById(partOfClock + '-lower-back-image');
  var lower_front = document.getElementById(partOfClock + '-lower-front-image');
  var upper_back = document.getElementById(partOfClock + '-upper-back-image');
  var upper_front = document.getElementById(partOfClock + '-upper-front-image');
  var player = timeUnit;
  upper_front.src = upper_back.src;
  upper_back.src = 'images/upper/' + player + '.png';
  animateUpper(partOfClock + '-upper-front');
  setTimeout(function () {
    lower_back.src = lower_front.src;
    lower_front.src = 'images/lower/' + player + '.png';
    animateLower(partOfClock + '-lower-front')
  }, 150);
}

function animateUpper(image) {
  var imageContainer = document.getElementById(image);
  var duration = 200; // Animation duration in milliseconds
  var interval = 10; // Interval for each step in milliseconds
  var steps = duration / interval;
  var currentStep = 0;
  var containerHeight = 100;
  imageContainer.style.height = '100%';
  var intervalId = setInterval(function () {
    if (currentStep >= steps) {
      clearInterval(intervalId);
    } else {
      currentStep++;
      containerHeight = containerHeight - 100 / steps;
      imageContainer.style.height = containerHeight + '%';
    }
  }, interval);
}

function animateLower(image) {
  var imageContainer = document.getElementById(image);
  var duration = 200; // Animation duration in milliseconds
  var interval = 10; // Interval for each step in milliseconds
  var steps = duration / interval;
  var currentStep = 0;
  var containerHeight = 0;
  imageContainer.style.height = '0%';
  var intervalId = setInterval(function () {
    if (currentStep >= steps) {
      clearInterval(intervalId);
    } else {
      currentStep++;
      containerHeight = containerHeight + 100 / steps;
      imageContainer.style.height = containerHeight + '%';
    }
  }, interval);
}

var s_current = -1;
var m_current = -1;
var h_current = -1;

function hockeyClock() {
  now = new Date();
  h = now.getHours();
  m = now.getMinutes();
  s = now.getSeconds();

  if (s != s_current) {
    flip('seconds', s);
    s_current = s;
  }

  if (m != m_current) {
    flip('minutes', m);
    m_current = m;
  }

  if (h != h_current) {
    flip('hours', h);
    h_current = h;
    console.log('h_current: '+h_current);
  }
}

setInterval('hockeyClock()', 1000);