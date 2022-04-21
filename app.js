//All global variables, and main logic algorithm

// GLOBAL VARIABLES

//      DOM Selections

const changeScreenBtnElements = document.querySelectorAll(".change-screen-btn");
const mainSection = document.querySelector(".main-section");
const blackSectionElement = document.querySelector(".black-section");
const yellowSectionElement = document.querySelector(".yellow-section");
const greenSectionElement = document.querySelector(".green-section");
const rightArrowElements = document.querySelectorAll(".right-arrow");
const leftArrowElements = document.querySelectorAll(".left-arrow");
const letterInputElements = document.querySelectorAll(".letter-input");
const blackInputElements = document.querySelectorAll(".black-input");
const yellowInputElements = document.querySelectorAll(".yellow-input");
const greenInputElements = document.querySelectorAll(".green-input");
const enterBtnElement = document.querySelector(".enter-btn");
const possibleWordsBoxElement = document.querySelector(".possible-words-box");
const resultModalElement = document.querySelector(".result-modal");
const closeBtnElement = document.querySelector(".close-btn");

//      Const's and Variables

let actualSection = 0;
const ALPHABET_LETTERS = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
];
let letters = {
    firstLetterPossibilities: [],
    secondLetterPossibilities: [],
    thirdLetterPossibilities: [],
    fourthLetterPossibilities: [],
    fifthLetterPossibilities: [],
};
let lettersKeys = Object.keys(letters);
const LETTERS_KEYS_LENGTH = lettersKeys.length;
let blackInputLetters = [];
let yellowInputLetters = [];
let possibleLetters;
let createdWords = [];
let matchingWords = [];

// App Logic

function resetApp() {
    const resultWords = document.querySelectorAll(".possible-words-box span");
    const resultWordsBox = document.querySelector(".possible-words-box");

    createdWords = [];
    matchingWords = [];
    resultWords.forEach((word) => {
        resultWordsBox.removeChild(word);
    });
    resetLetters();
    resetVisualInputs();
}

function getBlackInputValues() {
    blackInputElements.forEach((input) => {
        if (input.value) {
            let isValid = true;
            blackInputLetters.forEach((letter) => {
                if (letter === input.value) {
                    isValid = false;
                }
            });
            isValid && blackInputLetters.push(input.value);
        }
    });
    possibleLetters = ALPHABET_LETTERS.filter((letter) => {
        return !blackInputLetters.includes(letter);
    });
}

function getGreenInputValues() {
    let actualInputIndex = 0;

    lettersKeys.forEach((key) => {
        const hasValue = greenInputElements[actualInputIndex].value || false;

        letters[key] = hasValue ? [greenInputElements[actualInputIndex].value] : [...possibleLetters];

        actualInputIndex++;
    });
}

function getYellowInputValues() {
    console.log("started");
    setFilteredPossibilities();
    console.log("filtered possibilities");
    console.log("creating words");
    getCreatedWords();
    console.log("finished");
}

function getMatchedWords() {
    // Maximum result length of 16 words
    for (const createdWord of createdWords) {
        TERMO_WORDS.includes(createdWord) && matchingWords.push(createdWord);

        if (matchingWords.length > 16) {
            console.log("more than 16 words");
            resetApp();
            return;
        }
    }

    if (!matchingWords.length) {
        console.log("no words");
        resetApp();
        return;
    }

    setResultWords();
}

function enterBtnClickHandler() {
    let isValid = false;

    for (const input of letterInputElements) {
        if (input.value) {
            isValid = true;
            break;
        }
    }

    isValid && runAppLogic();
}

function closeBtnClickHandler() {
    resetApp();
    resultModalElement.close();
}

enterBtnElement.addEventListener("click", () => {
    enterBtnClickHandler();
});

closeBtnElement.addEventListener("click", () => {
    closeBtnClickHandler();
});
