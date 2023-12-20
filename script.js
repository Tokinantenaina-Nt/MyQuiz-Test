class Question {
  constructor(text, choices, answer) {
    this.t = text;
    this.c = choices;
    this.a = answer;
  }
  isCorrectAnswer(choice) {
    return this.a === choice;
  }
}

let questions = [
  new Question("Quel nombre suit le 6 ?", ["77", "7", "88", "8"], "7"),
  new Question(
    "Combien de syllabe y-a-t-il dans 'DIX' ?",
    ["1", "10", "100", "2"],
    "1"
  ),
  new Question(
    " choisir la bonne réponse : 1+1+1+1 = ",
    ["1", "1111", "2", "2+2"],
    "2+2"
  ),
  new Question("1a est égal à", ["100m2", "1000m2", "10m2", "1m2"], "100m2"),
];

console.log(questions);

class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.currentQuestionIndex = 0;
    this.score = 0;
  }
  getCurrentQst() {
    return this.questions[this.currentQuestionIndex];
  }
  guess(answer) {
    if (this.getCurrentQst().isCorrectAnswer(answer)) {
      this.score++;
      console.log("score++");
    }
    this.currentQuestionIndex++;
  }
  hasEnded() {
    return this.currentQuestionIndex == this.questions.length;
  }
}

let quiz = new Quiz(questions);
console.log(quiz);

const display = {
  elementShown: function (id, text) {
    let element = document.getElementById(id);
    element.innerHTML = text;
  },
  endQuiz: function () {
    let endQuizHTML = `
    <h1>Quiz terminé !</h1>
    <h3>Votre score est de : ${quiz.score} / ${quiz.questions.length}</h3>
    `;
    this.elementShown("question", endQuizHTML);
  },
  question: function () {
    this.elementShown("question", quiz.getCurrentQst().t);
  },
  choices: function () {
    let choices = quiz.getCurrentQst().c;
    guessHandler = (id, guess) => {
      document.getElementById(id).onclick = function () {
        quiz.guess(guess);
        quizApp();
      };
    };
    for (let i = 0; i < choices.length; i++) {
      console.log(choices.length);

      this.elementShown("choice" + i, choices[i]);
      guessHandler("guess" + i, choices[i]);
    }
  },
  progress: function () {
    let currentQstNmbr = quiz.currentQuestionIndex + 1;
    this.elementShown(
      "progress",
      "Qst " + currentQstNmbr + " sur " + quiz.questions.length
    );
  },
};

quizApp = () => {
  if (quiz.hasEnded()) {
    display.endQuiz();
  } else {
    display.question();
    display.choices();
    display.progress();
  }
};
quizApp();
