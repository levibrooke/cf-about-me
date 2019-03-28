'use strict';

/*
Questions for guessing game
- Is my name Levi?
- Did I live in Hawaii before Washington?
- Am I the Javascript God?
- Do I like to play soccer?
- Is my favorite team the Sounders?
*/

let questions = ["Is my name Levi?", "Did I live in Hawaii?", "Am I the Javascript God?", "Do I like to play soccer?", "Is my favorite team the Sounders?", "What is my age?", "Can you guess a state that I have lived in beside Washington?"];

let responses = [];

let askQuestion = (arr, startIndex) => {
  for (var i = startIndex; i < arr.length; i++) {
    let answer = prompt(arr[i]);
    answer.toLowerCase();

    if (i <= 4) {
      // handle yes/no questions
      validateYesNoAnswers(arr[i], answer);
    } else if (i === 5) {
      // handle age question
      answer = parseInt(answer);
      handleAgeQuestion(arr, i, answer);
    } else if (i === 6) {
      // handle state question
      handleStateQuestion(arr, i, answer);
    }

    console.log(arr[i], answer);
  }
  console.log(responses);
};

let validateYesNoAnswers = (question, answer) => {
  if (answer === 'no') {
    responses.push(answer);
  } else if (answer === 'yes') {
    responses.push(answer);
  } else if (answer !== 'no' || answer !== 'yes') {
    alert('You didn\'t answer yes or no.');
    let nullQuestion = [question];
    askQuestion(nullQuestion);
  }
};

let ageQuestionAttempts = 1;

let handleAgeQuestion = (question, index, answer) => {
  let correctAnswer = 32;
  let maxAttempts = 4;
  let correctAge = false;

  if (ageQuestionAttempts === 4) {
    responses.push('Ran out of attempts');
  }

  while (ageQuestionAttempts < maxAttempts && !correctAge) {
    ageQuestionAttempts++;

    if (answer === correctAnswer) {
      responses.push(answer);
      correctAge = true;
      break;
    } else if (answer > correctAnswer) {
      alert('You\'re guess is too high.');
      askQuestion(question, index);
    } else if (answer < correctAnswer) {
      alert('You\'re guess is too low.');
      askQuestion(question, index);
    }
  }
};

let stateQuestionAttempts = 1;

let handleStateQuestion = (question, index, answer) => {
  let validStates = ['missouri', 'florida', 'hawaii'];
  let maxAttempts = 6;
  let correctAnswer = false;

  if (stateQuestionAttempts === 6) {
    responses.push('Ran out of attempts');
    alert('I\'ve lived in Missouri, Florida, & Hawaii.');
  }

  while (stateQuestionAttempts < maxAttempts && !correctAnswer) {
    stateQuestionAttempts++;

    for (let i = 0; i < validStates.length; i++) {
      if (answer === validStates[i]) {
        correctAnswer = true;
        alert('That\'s correct! I\'ve lived in Missouri, Florida, & Hawaii.');
        responses.push(answer);
        break;
      }
    }
    if (!correctAnswer) {
      alert('That\'s incorrect! Please try again.');
      askQuestion(question, index);
    }
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

document.body.addEventListener('keypress', (e) => {
  e.key === 'Enter' && askQuestion(questions, 0);
});

// var check = document.getElementById('show-responses');

// check.addEventListener('click', (e) => {
//   e.preventDefault();
//   checkAnswers(responses);
// });
