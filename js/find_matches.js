var timerId;
var counter = 0;
var uniqueRandoms = [];
var randomArray = [];
var clickedItems = [];

document.addEventListener('DOMContentLoaded', function () {
  initialFieldsSetup();
  initialButtonsSetup();
}, false );

function initialFieldsSetup() {
  var elements = document.querySelectorAll('.game-area__element');
  createRandomArray(elements.length);
  for(var i = 0; i < elements.length; i++){
    defineClickHandler(elements[i]);
    defineInitialValue(elements[i]); 
  }
};

function initialButtonsSetup() {
  document.querySelector('.js-restart-game').addEventListener('click', function(){
    resetEverything();
  })
};

function resetEverything() {
  clearInterval(timerId);
  document.querySelector('.timer__value').innerHTML = 0;
  timerId = null;
  counter = 0;
  uniqueRandoms = [];
  randomArray = [];
  clickedItems = [];
  var elements = document.querySelectorAll('.game-area__element');
  for(var i = 0; i < elements.length; i++){
    elements[i].classList.add('initial');
    elements[i].classList.remove('clicked');
    elements[i].classList.remove('filled');
  }
};

function defineClickHandler(element){
  element.addEventListener('click', function(){
    clickGameItem(element);
  });
};

function defineInitialValue(element, count){
  element.classList.add('initial');
  element.innerHTML = randomArrayItem();
};

function clickGameItem(element){
  timerInit();
  processNewAction(element);  
  checkResult();
};

function processNewAction(element){
  if ((element.classList.contains('initial')) && (clickedItems.length < 2)) {
    element.classList.add('clicked');
    element.classList.remove('initial');
    clickedItems.push(element);
  };
};

function timerInit(){
  if (!timerId) {
    timerId = setInterval(function(){
      counter++;
      document.querySelector('.timer__value').innerHTML = counter;
    }, 1000);
  }
};

function checkResult(){
  if (clickedItems.length == 2) {
    checkClickedItems(); 
  };
  checkFullResult();
};

function checkClickedItems(){
  if (clickedItems[0].innerHTML == clickedItems[1].innerHTML) {
    clickedItems[0].classList.add('filled');
    clickedItems[1].classList.add('filled');
    clickedItems = [];
  } else {
    setTimeout(function(){
      clickedItems[0].classList.remove('clicked');
      clickedItems[1].classList.remove('clicked');
      clickedItems[0].classList.add('initial');
      clickedItems[1].classList.add('initial');
      clickedItems = [];
    }, 1000)
  }
};

function createRandomArray(length) {
  for(var i = 0; i < length; i++){
    randomArray[i] = makeUniqueRandom(length/2)
  }
};

function randomArrayItem() {
  var index = Math.floor(Math.random() * randomArray.length);
  var val = randomArray[index];
  randomArray.splice(index, 1);
  return val;
};

function makeUniqueRandom(uniq_count) {
  if (!uniqueRandoms.length) {
    for (var i = 1; i <= uniq_count; i++) {
      uniqueRandoms.push(i);
    }
  }
  var index = Math.floor(Math.random() * uniqueRandoms.length);
  var val = uniqueRandoms[index];
  uniqueRandoms.splice(index, 1);
  return val;
};

function checkFullResult() {
  var elements = document.querySelectorAll('.game-area__element');
  var filled_elements = document.querySelectorAll('.game-area__element.filled');
  if (elements.length == filled_elements.length) {
    clearInterval(timerId);
    alert('win');
  }
};
