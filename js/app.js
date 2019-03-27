'use strict';

/*
Questions for guessing game
- Is my name Levi?
- Did I live in Hawaii before Washington?
- Am I the Javascript God?
- Do I like to play soccer?
- Is my favorite team the Sounders?
*/

let questions = ["Is my name Levi?", "Did I live in Hawaii?", "Am I the Javascript God?", "Do I like to play soccer?", "Is my favorite team the Sounders?"];

let responses = [];

let askQuestion = (arr) => {
  for (var i = 0; i < arr.length; i++) {
    let answer = prompt(arr[i]);

    if (answer.toLowerCase() === 'no') {
      responses.push(answer.toLowerCase());
    } else if (answer.toLowerCase() === 'yes') {
      responses.push(answer.toLowerCase());
    } else {
      alert('You didn\'t answer yes or no');
      console.log(arr[i]);
      let nullQuestion = [arr[i]];
      askQuestion(nullQuestion);
    }
    console.log(arr[i], answer);
  }
};

let questionList = document.querySelectorAll('.card ul li > span');

let checkAnswers = (arr) => {
  if (arr.length < 1) {
    return;
  } else {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === 'yes') {
        questionList[i].innerHTML = '<i class="fas fa-check-circle"></i>';
      } else {
        questionList[i].innerHTML = '<i class="fas fa-times-circle"></i>';
      }
    }
  }
};

var play = document.getElementById('play-button');

play.addEventListener('click', () => {
  askQuestion(questions);
});

var check = document.getElementById('show-responses');

check.addEventListener('click', (e) => {
  e.preventDefault();
  checkAnswers(responses);
});
