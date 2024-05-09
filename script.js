function preloadImages() {
  for (let i = 0; i < 60; i++) {
    const upperImg = new Image();
    upperImg.src = `images/upper/${i}.png`;
    const lowerImg = new Image();
    lowerImg.src = `images/lower/${i}.png`;
  }
}

function flip(partOfClock, timeUnit, duration, step) {
  return new Promise(resolve => {
    var lower_back = document.getElementById(partOfClock + '-lower-back-image');
    var lower_front = document.getElementById(partOfClock + '-lower-front-image');
    var upper_back = document.getElementById(partOfClock + '-upper-back-image');
    var upper_front = document.getElementById(partOfClock + '-upper-front-image');
    var player = timeUnit;
    var animationDuration = duration;
    var animationStep = step;
    upper_front.src = upper_back.src;
    upper_back.src = 'images/upper/' + player + '.png';
    animate(partOfClock + '-upper-front', 100, 'contract', animationDuration, animationStep).then(() => {
      lower_back.src = lower_front.src;
      lower_front.src = 'images/lower/' + player + '.png';
      return animate(partOfClock + '-lower-front', 0, 'expand', animationDuration, animationStep);
    }).then(() => {
      resolve();
    });
  });
}

function animate(image, startHeight, direction, animationDuration, animationInterval) {
  return new Promise(resolve => {
    var imageContainer = document.getElementById(image);
    var duration = animationDuration; // Animation duration in milliseconds
    var interval = animationInterval; // Interval for each step in milliseconds
    var steps = duration / interval;
    var currentStep = 0;
    var containerHeight = startHeight;
    imageContainer.style.height = startHeight + '%';
    var intervalId = setInterval(function () {
      if (currentStep >= steps) {
        clearInterval(intervalId);
        resolve();
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
  });
}

function getNow() {
  var now = new Date();
  var h = now.getHours();
  var m = now.getMinutes();
  var s = now.getSeconds();
  return { now, h, m, s };
}

var s_current = -1;
var m_current = -1;
var h_current = -1;

function setFlipper(current, t, unit, animationDuration, animationStep) {
  return new Promise(resolve => {
    var tPromise = Promise.resolve();
    for (let i = 0; i <= 60; i++) {
      tPromise = tPromise.then(() => flip(unit, i, animationDuration, animationStep)); // Run through all numbers once first to ensure a long enough animation
    }
    for (let i = current + 1; i <= t; i++) {
      tPromise = tPromise.then(() => flip(unit, i, animationDuration, animationStep));
    }
    tPromise.then(() => {
      resolve();
    });
  });
}

function setClock() {
  return new Promise(resolve => {
    var now = getNow();
    var h = now.h;
    var m = now.m;
    var s = now.s;
    var animationDuration = 1;
    var animationStep = 1;

    setFlipper(h_current, h, 'hours', animationDuration, animationStep).then(() => {
      h_current = h;
      return setFlipper(m_current, m, 'minutes', animationDuration, animationStep);
    }).then(() => {
      m_current = m;
      return setFlipper(s_current, s, 'seconds', animationDuration, animationStep);
    }).then(() => {
      s_current = s;
    }).then(() => {
      resolve();
    });
  });
}

function runClock() {
  var now = getNow();
  var h = now.h;
  var m = now.m;
  var s = now.s;
  var animationDuration = 200;
  var animationStep = 10;

  if (s != s_current) {
    flip('seconds', s, animationDuration, animationStep);
    s_current = s;
  }

  if (m != m_current) {
    flip('minutes', m, animationDuration, animationStep);
    m_current = m;
  }

  if (h != h_current) {
    flip('hours', h, animationDuration, animationStep);
    h_current = h;
  }
}

preloadImages();
setClock().then(() => {
  setInterval(runClock, 1000);
});