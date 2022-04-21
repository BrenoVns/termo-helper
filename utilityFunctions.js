//UX

function changeVisualScreenMode() {
    mainSection.classList.toggle("screen-mode-full");
    changeScreenBtnElements.forEach((btn) => {
        btn.classList.toggle("hide");
    });
}

function setScreenMode() {
    if (sessionStorage.getItem("screenMode") === "1") {
        changeVisualScreenMode();
        return;
    }

    sessionStorage.setItem("screenMode", "0");
}

function screenButtonClickHandler() {
    changeVisualScreenMode();

    if (sessionStorage.getItem("screenMode") === "0") {
        sessionStorage.setItem("screenMode", "1");
        return;
    }
    sessionStorage.setItem("screenMode", "0");
}

function inputFocusHandler(input) {
    let previousInput;

    if (input.classList.contains("editing-input")) {
        return;
    }
    input.classList.toggle("editing-input");

    if (!previousInput) {
        previousInput = input;
        return;
    }

    previousInput.classList.toggle("editing-input");
    previousInput = input;
}

function inputChangeHandler(input, event) {
    const inputClasslist = input.classList;

    if (event.inputType === "deleteContentBackward") {
        inputClasslist.remove("filled-input");
        inputClasslist.add("blocked-input");
        input.readOnly = true;

        if (!input.previousElementSibling) {
            return;
        }

        input.previousElementSibling.readOnly = false;
        input.previousElementSibling.focus();
        return;
    }
    if (!inputClasslist.contains("filled-input") && /^[A-Za-z\s]*$/.test(event.value) === true) {
        inputClasslist.add("filled-input");
        input.readOnly = true;

        if (!input.nextElementSibling) {
            input.blur();
            return;
        }
        input.nextElementSibling.classList.remove("blocked-input");
        input.nextElementSibling.focus();
        input.nextElementSibling.readOnly = false;
    }
}

function inputClickHandler(input, inputColorElements) {
    if (input.readOnly === true) {
        for (const input_ of inputColorElements) {
            if (input_.readOnly === false && !input_.classList.contains("filled-input")) {
                input_.classList.add("blocked-input");
                input_.readOnly = true;
                break;
            }
        }
        input.classList.remove("blocked-input");
        input.readOnly = false;
    }

    if (input.classList.contains("filled-input")) {
        for (const input_ of inputColorElements) {
            if (input_.readOnly === false && !input_.classList.contains("filled-input")) {
                input_.classList.add("blocked-input");
                input_.readOnly = true;
                break;
            }
        }
    }
}

function arrowClickHandler(arrowSide) {
    if (arrowSide === "right") {
        if (actualSection === 0) {
            blackSectionElement.classList.toggle("hide");
            yellowSectionElement.classList.toggle("hide");
            actualSection = 1;
            return;
        }
        if (actualSection === 1) {
            yellowSectionElement.classList.toggle("hide");
            greenSectionElement.classList.toggle("hide");
            actualSection = 2;
            return;
        }
    }

    if (arrowSide === "left") {
        if (actualSection === 1) {
            yellowSectionElement.classList.toggle("hide");
            blackSectionElement.classList.toggle("hide");
            actualSection = 0;
            return;
        }
        if (actualSection === 2) {
            greenSectionElement.classList.toggle("hide");
            yellowSectionElement.classList.toggle("hide");
            actualSection = 1;
            return;
        }
    }
}

//APP LOGIC

function setBlockedClass(input) {
    input.classList.add("blocked-input");
    input.readOnly = true;
}

function resetVisualInputs() {
    for (const input of letterInputElements) {
        input.value = null;
        input.classList.remove("filled-input");
        setBlockedClass(input);
    }
}

//YELLOW

function setFilteredPossibilities() {
    let actualInputIndex = 0;

    lettersKeys.forEach((key) => {
        const actualInputValue = yellowInputElements[actualInputIndex].value;

        if (!actualInputValue) {
            actualInputIndex++;
            return;
        }

        yellowInputLetters.push(actualInputValue.toLowerCase());

        letters[key] = letters[key].filter((letter) => {
            return letter !== actualInputValue;
        });

        actualInputIndex++;
    });
}

function getLetterPossibilities(indexes) {
    let yellowAvailable = [...yellowInputLetters];
    let sum = 0;
    const YELLOW_AVAILABLE_LENGTH = yellowAvailable.length;

    for (let possibilitiesIndex = 0; possibilitiesIndex < LETTERS_KEYS_LENGTH; possibilitiesIndex++) {
        const currentLetter = letters[lettersKeys[possibilitiesIndex]][indexes[possibilitiesIndex]];

        for (let yellowAvailableIndex = 0; yellowAvailableIndex < YELLOW_AVAILABLE_LENGTH; yellowAvailableIndex++) {
            if (currentLetter === yellowAvailable[yellowAvailableIndex]) {
                sum++;
                yellowAvailable.splice(yellowAvailableIndex, 1);
                break;
            }
        }
    }

    if (sum === yellowInputLetters.length) {
        const firstLetter = letters.firstLetterPossibilities[indexes[0]];
        const secondLetter = letters.secondLetterPossibilities[indexes[1]];
        const thirdLetter = letters.thirdLetterPossibilities[indexes[2]];
        const fourthLetter = letters.fourthLetterPossibilities[indexes[3]];
        const fifthLetter = letters.fifthLetterPossibilities[indexes[4]];

        const createdWord = firstLetter + secondLetter + thirdLetter + fourthLetter + fifthLetter;
        createdWords.push(createdWord.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
    }
}

function getCreatedWords() {
    const FIRST_LETTER_LENGTH = letters["firstLetterPossibilities"].length;
    const SECOND_LETTER_LENGTH = letters["secondLetterPossibilities"].length;
    const THIRD_LETTER_LENGTH = letters["thirdLetterPossibilities"].length;
    const FOURTH_LETTER_LENGTH = letters["fourthLetterPossibilities"].length;
    const FIFTH_LETTER_LENGTH = letters["fifthLetterPossibilities"].length;

    for (let firstLetterIndex = 0; firstLetterIndex < FIRST_LETTER_LENGTH; firstLetterIndex++) {
        for (let secondLetterIndex = 0; secondLetterIndex < SECOND_LETTER_LENGTH; secondLetterIndex++) {
            for (let thirdLetterIndex = 0; thirdLetterIndex < THIRD_LETTER_LENGTH; thirdLetterIndex++) {
                for (let fourthLetterIndex = 0; fourthLetterIndex < FOURTH_LETTER_LENGTH; fourthLetterIndex++) {
                    for (let fifthLetterIndex = 0; fifthLetterIndex < FIFTH_LETTER_LENGTH; fifthLetterIndex++) {
                        const indexes = [
                            firstLetterIndex,
                            secondLetterIndex,
                            thirdLetterIndex,
                            fourthLetterIndex,
                            fifthLetterIndex,
                        ];

                        getLetterPossibilities(indexes);
                    }
                }
            }
        }
    }
}

//RESULT

function setResultWords() {
    const resultTitle = document.querySelector(".result-title");

    matchingWords.forEach((matchedWord) => {
        const wordElement = document.createElement("span");
        wordElement.innerText = matchedWord;
        possibleWordsBoxElement.appendChild(wordElement);
    });

    resultTitle.innerText = `${matchingWords.length.toString()} possible words`;
    resultModalElement.showModal();
}

function runAppLogic() {
    getBlackInputValues();
    getGreenInputValues();
    getYellowInputValues();
    getMatchedWords();
}
