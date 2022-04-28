import { TERMO_WORDS } from "./termoWordsRepository.js";
import { createLettersValidator } from "./validators.js";
import {
    letterInputElements,
    blackInputElements,
    yellowInputElements,
    greenInputElements,
    enterBtnElement,
    possibleWordsBoxElement,
    resultModalElement,
    closeBtnElement,
} from "./globalVariables.js";

let blackLetters = [];
let yellowLetters = [];
let greenLetters = [];
let possibleWords = [];

// Reset logic
function setBlockedClass(input) {
    input.classList.add("blocked-input");
    input.readOnly = true;
}

function resetLetters() {
    blackLetters = [];
    yellowLetters = [];
    greenLetters = [];
    possibleWords = [];
}

function resetVisualInputs() {
    for (const input of letterInputElements) {
        input.value = null;
        input.classList.remove("filled-input");
        setBlockedClass(input);
    }
}

function resetApp() {
    const resultWords = document.querySelectorAll(".possible-words-box span");
    const resultWordsBox = document.querySelector(".possible-words-box");

    possibleWords = [];
    resultWords.forEach((word) => {
        resultWordsBox.removeChild(word);
    });
    resetLetters();
    resetVisualInputs();
}

function setLetterArrays() {
    blackInputElements.forEach((input) => {
        input.value && blackLetters.push(input.value.toLowerCase());
    });
    yellowInputElements.forEach((input) => {
        yellowLetters.push(input.value.toLowerCase());
    });
    greenInputElements.forEach((input) => {
        greenLetters.push(input.value.toLowerCase());
    });
}

// App Logic
const BATCH_SIZE = 16;

function getResultWordsByBatch(allWords, batchSize, isValidWord) {
    for (const word of allWords) {
        if (!isValidWord(word)) continue;

        possibleWords.push(word);

        if (possibleWords.length >= batchSize) {
            return possibleWords;
        }
    }
}

function getResult() {
    const inputLettersValidators = {
        black: createLettersValidator("black"),
        yellow: createLettersValidator("yellow"),
        green: createLettersValidator("green"),
    };
    inputLettersValidators["black"].getInputLetters(blackLetters);
    inputLettersValidators["yellow"].getInputLetters(yellowLetters);
    inputLettersValidators["green"].getInputLetters(greenLetters);

    const isValidWord = (word) => {
        for (const validator in inputLettersValidators) {
            if (!inputLettersValidators[validator].validateWord(word)) {
                return false;
            }
        }
        return true;
    };

    getResultWordsByBatch(TERMO_WORDS, BATCH_SIZE, isValidWord);
}

function setResultWordsScreen() {
    const resultTitle = document.querySelector(".result-title");

    possibleWords.forEach((matchedWord) => {
        const wordElement = document.createElement("span");
        wordElement.innerText = matchedWord;
        possibleWordsBoxElement.appendChild(wordElement);
    });

    resultTitle.innerText = `${possibleWords.length.toString()} possible words`;
    resultModalElement.showModal();
}

function runAppLogic() {
    setLetterArrays();
    getResult();
    setResultWordsScreen();
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
