function preloadImages() {
  for (let i = 0; i < 60; i++) {
    const upperImg = new Image();
    upperImg.src = `images/upper/${i}.png`;
    const lowerImg = new Image();
    lowerImg.src = `images/lower/${i}.png`;
  }
}

function flip(partOfClock, timeUnit) {
  var lower_back = document.getElementById(partOfClock + '-lower-back-image');
  var lower_front = document.getElementById(partOfClock + '-lower-front-image');
  var upper_back = document.getElementById(partOfClock + '-upper-back-image');
  var upper_front = document.getElementById(partOfClock + '-upper-front-image');
  var player = timeUnit;
  upper_front.src = upper_back.src;
  upper_back.src = 'images/upper/' + player + '.png';
  animate(partOfClock + '-upper-front', 100, 'contract');
  setTimeout(function () {
    lower_back.src = lower_front.src;
    lower_front.src = 'images/lower/' + player + '.png';
    animate(partOfClock + '-lower-front', 0, 'expand');
  }, 150);
}

function animate(image, startHeight, direction) {
  var imageContainer = document.getElementById(image);
  var duration = 200; // Animation duration in milliseconds
  var interval = 10; // Interval for each step in milliseconds
  var steps = duration / interval;
  var currentStep = 0;
  var containerHeight = startHeight;
  imageContainer.style.height = startHeight + '%';
  var intervalId = setInterval(function () {
    if (currentStep >= steps) {
      clearInterval(intervalId);
    } else {
      currentStep++;
      switch (direction) { // Determine whether to contract (for the upper) or expand (for the lower) front image
        case 'contract':
          containerHeight = containerHeight - 100 / steps;
          imageContainer.style.height = containerHeight + '%';
          break;
        case 'expand':
          containerHeight = containerHeight + 100 / steps;
          imageContainer.style.height = containerHeight + '%';
          break;
      }
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
  }
}

preloadImages();
setInterval('hockeyClock()', 1000);