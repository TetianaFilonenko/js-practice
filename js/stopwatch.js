var time = 0;
var delta_ms = 10;
var timerId;
document.addEventListener('DOMContentLoaded', function () {
  initialButtonsSetup();
}, false );

function initialButtonsSetup() {
  startStopButton();
  resetButton();
  recordButton();
};

function startStopButton(){
  document.querySelector('.js-start-stop').addEventListener('click', function(){
    startPause();
  })
};

function resetButton(){
  document.querySelector('.js-reset').addEventListener('click', function(){
    time = 0;
    document.querySelector('.game-area__timer').innerHTML = time;
  })
};

function recordButton(){
  document.querySelector('.js-record').addEventListener('click', function(){
    document.querySelector('.game-area__result_value').innerHTML += (roundedTime()+'<br/>');
  })
};

function startPause() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  } else {
    timerId = setInterval(function(){
      time += delta_ms / 1000.0;
      document.querySelector('.game-area__timer').innerHTML = roundedTime();
    }, delta_ms)
  }
};

function roundedTime() {
  return Math.round((time + 0.00001) * 100) / 100;
}