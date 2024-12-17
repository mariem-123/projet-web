//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount = 0; // Initialize question count
let scoreCount = 0;
let count = 10;
let countdown;

//Questions and Options array
const quizArray = [
    {
        id: "0",
        question: "Quelle balise HTML est utilisée pour définir un titre de niveau 1 ?",
        options: ["h2", "h1", "header", "title"],
        correct: "h1",
    },
    {
        id: "1",
        question: "Quelle propriété CSS est utilisée pour changer la couleur de fond d'une page ?",
        options: ["background-color", "color", "font-size", "border-color"],
        correct: "background-color",
    },
    {
        id: "2",
        question: "Quel attribut HTML est utilisé pour spécifier l'URL d'une image ?",
        options: ["src", "href", "alt", "image"],
        correct: "src",
    },
    {
        id: "3",
        question: "Quelle balise HTML est utilisée pour insérer une liste à puces ?",
        options: ["ul", "ol", "li", "list"],
        correct: "ul",
    },
    {
        id: "4",
        question: "Quel est l'élément HTML utilisé pour créer un lien hypertexte ?",
        options: ["link", "a", "button", "nav"],
        correct: "a",
    },
    {
        id: "5",
        question: "Comment centrer un texte avec CSS ?",
        options: ["text-align: left;", "text-align: center;", "align-text: center;", "center: true;"],
        correct: "text-align: center;",
    },
    {
        id: "6",
        question: "Quel attribut HTML permet d'ajouter un lien vers une autre page web ?",
        options: ["action", "href", "url", "src"],
        correct: "href",
    },
    {
        id: "7",
        question: "Comment ajouter un commentaire dans CSS ?",
        options: ["// Ceci est un commentaire", "/* Ceci est un commentaire */", "# Ceci est un commentaire", "!---Ceci est un commentaire ---"],
        correct: "/* Ceci est un commentaire */",
    },
    {
        id: "8",
        question: "Quel sélecteur CSS est utilisé pour sélectionner tous les éléments d'un type donné ?",
        options: ["#element", ".element", "element", "element#"],
        correct: "element",
    },
    {
        id: "9",
        question: "Quel est le code CSS pour rendre un élément invisible ?",
        options: ["visibility: hidden;", "display: none;", "opacity: 0;", "All of the above"],
        correct: "All of the above",
    },
];

// Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

// Next Button
nextBtn.addEventListener("click", () => {
    // Increment questionCount
    questionCount++;
    // If last question
    if (questionCount == quizArray.length) {
        // Hide question container and display score
        displayContainer.classList.add("hide");
        scoreContainer.classList.remove("hide");
        // User score
        userScore.innerHTML =
            "Votre score est " + scoreCount + " sur " + quizArray.length;
    } else {
        // Display questionCount
        countOfQuestion.innerHTML =
            questionCount + 1 + " sur " + quizArray.length + " questions";
        // Display quiz
        quizDisplay(questionCount);
        count = 11;
        clearInterval(countdown);
        timerDisplay();
    }
});

// Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            nextBtn.click(); // Simulate next button click
        }
    }, 1000);
};

// Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    // Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    // Display current question card
    quizCards[questionCount].classList.remove("hide");
};

// Quiz Creation
// Quiz Creation
// Quiz Creation
function quizCreator() {
    // Generate quiz
    quizArray.forEach((question, index) => {
        // Vérification des options manquantes : on s'assure qu'il y a 4 options.
        if (question.options.length < 4) {
            while (question.options.length < 4) {
                question.options.push("Option manquante"); // Ajout d'options manquantes par défaut
            }
        }

        // Mélanger les options de manière aléatoire
        question.options.sort(() => Math.random() - 0.5);

        // Création de la carte de la question
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");

        // Affichage de la question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = question.question;
        div.appendChild(question_DIV);

        // Création des boutons pour chaque option
        question.options.forEach(option => {
            let button = document.createElement("button");
            button.classList.add("option-div");
            button.innerHTML = option;
            button.onclick = () => checker(button); // Appel de la fonction checker au clic
            div.appendChild(button);
        });

        // Ajout de la carte de la question au container
        quizContainer.appendChild(div);
    });
}




// Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question = document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    // If user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        // For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    // Clear interval (stop timer)
    clearInterval(countdown);
    // Disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

// Initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

// When user clicks on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

// Hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};
