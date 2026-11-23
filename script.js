
const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlink Text Management Language",
            "Home Tool Markup Language"
        ],
        correct: 0
    },
    {
        question: "What does CSS stand for?",
        answers: [
            "Computer Style Sheets",
            "Cascading Style Sheets",
            "Creative Style System",
            "Colorful Style Sheets"
        ],
        correct: 1
    },
    {
        question: "What is JavaScript used for?",
        answers: [
            "Styling web pages",
            "Creating databases",
            "Making web pages interactive",
            "Creating hardware"
        ],
        correct: 2
    },
    {
        question: "Which keyword is used to declare a variable?",
        answers: [
            "variable",
            "let",
            "define",
            "int"
        ],
        correct: 1
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        answers: [
            "<!-- -->",
            "**",
            "//",
            "##"
        ],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const question = document.getElementById("question");
const answers = document.getElementById("answers");
const scoreDisplay = document.getElementById("score");
const nextButton = document.getElementById("next");
const questionNumber = document.querySelector(".question-number");

function showQuestion() {
    answered = false;

    question.textContent = questions[currentQuestion].question;

    questionNumber.textContent = `Question ${currentQuestion + 1}`;

    answers.innerHTML = "";

    questions[currentQuestion].answers.forEach((answer, index) => {
        const button = document.createElement("button");

        button.textContent = answer;
        button.classList.add("answer");

        button.addEventListener("click", function () {
            checkAnswer(index, button);
        });

        answers.appendChild(button);
    });

    nextButton.disabled = true;
}

function checkAnswer(selected, button) {
    if (answered) return;

    answered = true;

    if (selected === questions[currentQuestion].correct) {
        button.style.backgroundColor = "green";
        button.style.color = "white";

        score++;
        scoreDisplay.textContent = `Score: ${score}`;
    } else {
        button.style.backgroundColor = "red";
        button.style.color = "white";

        const correctIndex = questions[currentQuestion].correct;

        answers.children[correctIndex].style.backgroundColor = "green";
        answers.children[correctIndex].style.color = "white";
    }

    nextButton.disabled = false;
}

nextButton.addEventListener("click", function () {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        question.textContent = "Quiz Completed!";

        answers.innerHTML = `<h2>Your Score: ${score}/${questions.length}</h2>`;

        questionNumber.textContent = "Completed";

        nextButton.textContent = "Restart";

        nextButton.onclick = restartQuiz;
    }
});

function restartQuiz() {
    currentQuestion = 0;
    score = 0;

    scoreDisplay.textContent = "Score: 0";

    nextButton.textContent = "Next";
    nextButton.onclick = null;

    showQuestion();
}

showQuestion();
