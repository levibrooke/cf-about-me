'use strict';

/*
Questions for guessing game
- Is my name Levi?
- Did I live in Hawaii before Washington?
- Am I the Javascript God?
- Do I like to play soccer?
- Is my favorite team the Sounders?
*/

let questions = ['Is my name Levi?', 'Did I live in Hawaii?', 'Am I the Javascript God?', 'Do I like to play soccer?', 'Is my favorite team the Sounders?', 'What is my age?', 'Can you guess a state that I have lived in beside Washington?'];

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

let reaskQuestion = (arr, index, type) => {
  let answer = prompt(arr[index]);

  if (type === 'age') {
    handleAgeQuestion(arr, index, answer);
  } else if (type === 'state') {
    answer.toLowerCase();
    handleStateQuestion(arr, index, answer);
  }
};

let validateYesNoAnswers = (question, answer) => {
  if (answer === 'no' || answer === 'n') {
    responses.push(answer);
  } else if (answer === 'yes' || answer === 'y') {
    responses.push(answer);
  } else {
    alert('You didn\'t answer yes or no.');
    let nullQuestion = [question];
    askQuestion(nullQuestion);
  }
};

let ageQuestionAttempts = 1;

let handleAgeQuestion = (questions, index, answer) => {
  let correctAnswer = 32;
  let maxAttempts = 4;
  let correctAge = false;
  let inputAnswer = parseInt(answer);

  if (ageQuestionAttempts === 4) {
    responses.push('Ran out of attempts');
  }

  while (ageQuestionAttempts < maxAttempts && !correctAge) {
    ageQuestionAttempts++;
    console.log(ageQuestionAttempts);

    if (inputAnswer === correctAnswer) {
      responses.push(inputAnswer);
      console.log(responses);
      correctAge = true;
      break;
    } else if (inputAnswer > correctAnswer) {
      alert('You\'re guess is too high.');
      reaskQuestion(questions, index, 'age');
    } else if (inputAnswer < correctAnswer) {
      alert('You\'re guess is too low.');
      reaskQuestion(questions, index, 'age');
    }
  }
};

let stateQuestionAttempts = 1;
let correctAnswer = null;

let handleStateQuestion = (question, index, answer) => {
  let validStates = ['missouri', 'florida', 'hawaii'];
  let maxAttempts = 6;

  while (stateQuestionAttempts < maxAttempts && correctAnswer !== true) {
    stateQuestionAttempts++;
    console.log(stateQuestionAttempts);

    // check if correct answer given
    for (let i = 0; i < validStates.length; i++) {
      if (answer.toLowerCase() === validStates[i]) {
        correctAnswer = true;
        alert('That\'s correct! I\'ve lived in Missouri, Florida, & Hawaii.');
        responses.push('correct');
        break;
      }
    }
    console.log(correctAnswer);
    // if not correct & under the attempt limit
    if (correctAnswer !== true && stateQuestionAttempts < 6) {
      alert('That\'s incorrect! Please try again.');
      reaskQuestion(question, index, 'state');
    } else if (stateQuestionAttempts === 6) {
      responses.push('Ran out of attempts');
      alert('I\'ve lived in Missouri, Florida, & Hawaii.');
    }
  }
};

let questionList = document.getElementsByClassName('question-response');

let checkAnswers = (arr) => {
  if (arr.length < 1) {
    return;
  } else {
    console.log('arr', arr);
    for (let i = 0; i < arr.length; i++) {
      if (i < 5) {
        if (arr[i] === 'yes' || arr[i] === 'y') {
          questionList[i].innerHTML = '<i class="fas fa-check-circle"></i>';
        } else {
          questionList[i].innerHTML = '<i class="fas fa-times-circle"></i>';
        }
      }
      else if (i === 5) {
        if (arr[i] === 32) {
          questionList[i].innerHTML = '<i class="fas fa-check-circle"></i>';
        } else {
          questionList[i].innerHTML = '<i class="fas fa-times-circle"></i>';
        }
      }
      else if (i === 6) {
        if (arr[i] === 'correct') {
          questionList[i].innerHTML = '<i class="fas fa-check-circle"></i>';
        } else {
          questionList[i].innerHTML = '<i class="fas fa-times-circle"></i>';
        }
      }
    }
  }
};

let postQuestions = () => {
  var promptEl = document.getElementById('prompt');
  promptEl.style.display = 'none';

  var mainEl = document.querySelector('main');
  mainEl.style.display = 'flex';
};

document.body.addEventListener('keypress', (e) => {
  e.key === 'Enter' && askQuestion(questions, 0);

  postQuestions();
  checkAnswers(responses);
});

