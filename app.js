import { TERMO_WORDS } from "./termoWordsRepository.js";
import { createLettersValidator } from "./validators.js";
import {
    letterInputElements,
    blackInputElements,
    yellowInputElements,
    greenInputElements,
    enterBtnElement,
    resetBtnElement,
    possibleWordsBoxElement,
    resultModalElement,
    closeBtnElement,
} from "./globalVariables.js";

let blackLetters = [];
let yellowLetters = [];
let greenLetters = [];

// Reset logic

function resetInputLetters() {
    blackLetters = [];
    yellowLetters = [];
    greenLetters = [];
}

function resetVisualInputs() {
    for (const input of letterInputElements) {
        input.textContent = "";
        input.classList.remove("filled-input");
    }
}

function resetResultWords() {
    const resultWordsElements = document.querySelectorAll(".possible-words-box span");
    const resultWordsBoxElement = document.querySelector(".possible-words-box");

    resultWordsElements.forEach((word) => {
        resultWordsBoxElement.removeChild(word);
    });
}

function resetApp() {
    resetInputLetters();
    resetVisualInputs();
    resetResultWords();
}

// App Logic

let loadMoreBtnElement;
const BATCH_SIZE = 16;
let resultWordsIterator;
const inputLettersValidators = {
    black: createLettersValidator("black"),
    yellow: createLettersValidator("yellow"),
    green: createLettersValidator("green"),
};

function setLetterArrays() {
    blackInputElements.forEach((input) => {
        input.textContent && blackLetters.push(input.textContent.toLowerCase());
    });
    yellowInputElements.forEach((input) => {
        yellowLetters.push(input.textContent.toLowerCase());
    });
    greenInputElements.forEach((input) => {
        greenLetters.push(input.textContent.toLowerCase());
    });
}

function* getResultWordsByBatch(allWords, batchSize, isValidWord) {
    let possibleWords = [];

    for (const word of allWords) {
        if (!isValidWord(word)) continue;

        possibleWords.push(word);

        if (possibleWords.length >= batchSize) {
            yield possibleWords;
            possibleWords = [];
        }
    }
    if (possibleWords.length > 0) {
        yield possibleWords;
    }
}

function setLoadMoreBtn(resultWords) {
    if (resultWords.length < 16 && loadMoreBtnElement) {
        possibleWordsBoxElement.removeChild(loadMoreBtnElement);
        loadMoreBtnElement = null;
        return;
    }
    if (resultWords.length < 16) return;

    loadMoreBtnElement && possibleWordsBoxElement.removeChild(loadMoreBtnElement);

    possibleWordsBoxElement.insertAdjacentHTML(
        "beforeend",
        '<ion-icon name="add-outline" class="load-more-btn"></ion-icon>'
    );
    loadMoreBtnElement = document.querySelector(".load-more-btn");
    loadMoreBtnElement.addEventListener("click", () => {
        loadMoreBtnClickHandler();
    });
}

function setResultWordsElements(resultWords) {
    resultWords.forEach((matchedWord) => {
        const wordElement = document.createElement("span");
        wordElement.innerText = matchedWord;
        possibleWordsBoxElement.appendChild(wordElement);
    });

    setLoadMoreBtn(resultWords);
}

function setResultWordsScreen(resultWords) {
    const portugueseResultTitle = document.querySelector(".result-title-pt");
    const englishResultTitle = document.querySelector(".result-title-en");

    resetResultWords();
    setResultWordsElements(resultWords);
    portugueseResultTitle.innerText =
        resultWords.length < 16 ? `${resultWords.length.toString()} possíveis palavras` : "16+ possíveis palavras";
    englishResultTitle.innerText =
        resultWords.length < 16 ? `${resultWords.length.toString()} possible words` : "16+ possible words";

    resultModalElement.showModal();
}

function setupValidators() {
    inputLettersValidators["black"].getInputLetters(blackLetters);
    inputLettersValidators["yellow"].getInputLetters(yellowLetters);
    inputLettersValidators["green"].getInputLetters(greenLetters);
}

function isValidWord(word) {
    for (const validator in inputLettersValidators) {
        if (!inputLettersValidators[validator].validateWord(word)) {
            return false;
        }
    }

    return true;
}

function getResult() {
    setupValidators();

    resultWordsIterator = getResultWordsByBatch(TERMO_WORDS, BATCH_SIZE, isValidWord);
    const { value: resultWords } = resultWordsIterator.next();

    setResultWordsScreen(resultWords);

    console.log("Result Words:", resultWords);
}

function runAppLogic() {
    setLetterArrays();
    getResult();
}

export function enterBtnClickHandler() {
    let isValid = false;

    for (const input of letterInputElements) {
        if (input.textContent) {
            isValid = true;
            break;
        }
    }

    isValid && runAppLogic();
}

function closeModalHandler() {
    resultModalElement.close();
}

function loadMoreBtnClickHandler() {
    console.log("loading more...");

    const { value: resultWords, done } = resultWordsIterator.next();
    !done && setResultWordsElements(resultWords);

    console.log("New Words:", resultWords);
}

enterBtnElement.addEventListener("click", () => {
    enterBtnClickHandler();
});

resetBtnElement.addEventListener("click", () => {
    resetApp();
});

resultModalElement.addEventListener("close", () => {
    resetInputLetters();
});

closeBtnElement.addEventListener("click", () => {
    closeModalHandler();
});

resultModalElement.addEventListener("click", (ev) => {
    ev.target === resultModalElement && closeModalHandler();
});
