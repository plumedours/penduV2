const newGameBtn = document.getElementById("newGameBtn");
const lettersBtn = document.querySelectorAll(".letter");
const findWord = document.getElementById("findWord");
const wrongLabel = document.getElementById("wrongLabel");
const penduImg = document.getElementById("penduImg");
const keyboard = document.getElementById("keyboard");
const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");
const winOrLoseLabel = document.querySelector(".winOrLoseLabel");
const wordResponse = document.querySelector(".wordResponse");
const replayBtn = document.getElementById("replayBtn");
let wordsList = [];

fetch("./wordsList.json")
  .then((response) => response.json())
  .then((json) => {
    for (i = 0; i < json.length; i++) {
      wordsList.push(json[i].word);
    }
  });

let srcImg = 0;
let wrong = 7; //pour compter le nbr d'erreur
let arrayWord = []; //tableau pour split le mot en cours
let wordInGame = "";
let hidden_word = [];

function getRandomWord() {
  wordInGame = wordsList[Math.floor(Math.random() * wordsList.length)];
  hidden_word = Array(wordInGame.length).fill("_");
  arrayWord = wordInGame.split("");
  findWord.textContent = hidden_word.join(" ");
}

newGameBtn.addEventListener("click", () => {
  keyboard.style.display = "flex";
  getRandomWord();
  restParty();
});

lettersBtn.forEach((letter) => {
  letter.addEventListener("click", () => {
    for (let i = 0; i < arrayWord.length; i++) {
      if (letter.textContent === arrayWord[i]) {
        hidden_word.splice(i, 1, letter.textContent);
        findWord.textContent = hidden_word.join(" ");
        // console.log(hidden_word);
        // console.log(arrayWord);
      }
      letter.disabled = true;
    }

    if (!wordInGame.includes(letter.textContent)) {
      letter.classList.remove("btn-primary");
      letter.classList.add("btn-danger");
      srcImg++;
      wrong--;
      wrongLabel.textContent = wrong;
      penduImg.src = "./img/hangman_" + srcImg + ".png";
    } else {
      letter.classList.remove("btn-primary");
      letter.classList.add("btn-green");
    }
    if (isEqual(hidden_word, arrayWord)) {
      winOrLoseLabel.textContent = "Félicitation ! Vous avez gagé !";
      wordResponse.textContent = "Le mot à trouver était : " + wordInGame;
      modalContainer.classList.toggle("active");
    } else if (wrong === 0) {
      winOrLoseLabel.textContent = "Dommage ! Vous avez perdu !";
      wordResponse.textContent = "Le mot à trouver était : " + wordInGame;
      modalContainer.classList.toggle("active");
    }
  });
});

function restParty() {
  lettersBtn.forEach((letter) => {
    letter.classList.add("btn-primary");
    letter.classList.remove("btn-danger");
    letter.classList.remove("btn-green");
    letter.disabled = false;
    wrong = 7;
    srcImg = 0;
    wrongLabel.textContent = wrong;
    penduImg.src = "./img/hangman_" + srcImg + ".png";
  });
}

function isEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  return arr1.every((value, index) => value === arr2[index]);
}

replayBtn.addEventListener("click", () => {
  modalContainer.classList.toggle("active");
  getRandomWord();
  restParty();
});
