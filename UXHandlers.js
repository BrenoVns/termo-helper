import {
    changeScreenBtnElements,
    helpBtnElement,
    helpModalElement,
    switchLanguageElements,
    mainSection,
    blackSectionElement,
    yellowSectionElement,
    greenSectionElement,
    rightArrowElements,
    leftArrowElements,
    letterInputElements,
    enterBtnElement,
    mobileKeysElements,
} from "./globalVariables.js";
import { enterBtnClickHandler } from "./app.js";

let actualSection = 0;
let selectedInput;

// Handlers

function changeVisualScreenMode() {
    mainSection.classList.toggle("screen-mode-full");
    changeScreenBtnElements.forEach((btn) => {
        btn.classList.toggle("hide");
    });
}

function screenButtonClickHandler() {
    changeVisualScreenMode();

    if (sessionStorage.getItem("screenMode") === "0") {
        sessionStorage.setItem("screenMode", "1");
        return;
    }
    sessionStorage.setItem("screenMode", "0");
}

function switchLanguage() {
    document.body.querySelectorAll("[lang=pt]").forEach((portugueseText) => {
        portugueseText.classList.toggle("hide");
    });
    document.body.querySelectorAll("[lang=en]").forEach((portugueseText) => {
        portugueseText.classList.toggle("hide");
    });
    switchLanguageElements.forEach((switchLanguage) => {
        switchLanguage.classList.toggle("hide");
    });
}

function languageSwitchClickHandler() {
    switchLanguage();

    if (sessionStorage.getItem("language") === "0") {
        sessionStorage.setItem("language", "1");
        return;
    }
    sessionStorage.setItem("language", "0");
}

function inputTextHandler(actualInput, event, mobileKey) {
    actualInput.textContent = event.key || mobileKey;
    if (!actualInput.nextElementSibling) {
        actualInput.classList.add("filled-input");

        selectedInput = actualInput;
        return;
    }

    // Jump to next empty input
    const parentInputElement = actualInput.parentElement;
    const sectionInputElements = parentInputElement.querySelectorAll(".letter-input");

    let actualIndex;
    sectionInputElements.forEach((input, index) => {
        if (actualInput === input) {
            actualIndex = index;
        }
    });

    for (let inputIndex = actualIndex; inputIndex < sectionInputElements.length; inputIndex++) {
        const sectionInput = sectionInputElements[inputIndex];
        if (sectionInput.textContent === "") {
            sectionInput.focus();

            selectedInput = sectionInput;
            break;
        }
    }

    actualInput.classList.add("filled-input");
}

function inputBackspaceHandler(input) {
    // IF INPUT HAS VALUE
    if (input.textContent) {
        input.textContent = "";
        input.classList.remove("filled-input");
        return;
    }
    // IF INPUT HASN'T VALUE
    //// IF HAS PREVIOUS INPUT
    const previousInput = input.previousElementSibling;

    if (previousInput) {
        previousInput.classList.remove("filled-input");
        previousInput.textContent = "";
        previousInput.focus();

        selectedInput = previousInput;
    }
}

function inputKeyUpHandler(input, event) {
    /^[a-zA-Z]{1}$/.test(event.key) && inputTextHandler(input, event);

    event.key === "Backspace" && inputBackspaceHandler(input);
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
            enterBtnElement.classList.toggle("hide");
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
            enterBtnElement.classList.toggle("hide");
            actualSection = 1;
            return;
        }
    }
}

function mobileKeyClickHandler(key) {
    key.textContent.length === 1 && inputTextHandler(selectedInput, "", key.textContent);

    key.textContent === "enter" && enterBtnClickHandler();

    key.id === "backspace-key" && inputBackspaceHandler(selectedInput);
}

function setScreenMode() {
    if (sessionStorage.getItem("screenMode") === "1") {
        changeVisualScreenMode();
        return;
    }

    sessionStorage.setItem("screenMode", "0");
}

function setLanguage() {
    if (sessionStorage.getItem("language") === "1") {
        switchLanguage();
        return;
    }

    sessionStorage.setItem("language", "0");
}

setScreenMode(); // Set screen mode based on session storage data
setLanguage(); // Set language based on session storage data

// Listeners
changeScreenBtnElements.forEach((button) => {
    button.addEventListener("click", () => {
        screenButtonClickHandler();
    });
});

switchLanguageElements.forEach((languageSwitch) => {
    languageSwitch.addEventListener("click", () => {
        languageSwitchClickHandler();
    });
});

helpBtnElement.addEventListener("click", () => {
    helpModalElement.showModal();
});

helpModalElement.addEventListener("click", (ev) => {
    ev.target === helpModalElement && helpModalElement.close();
});

letterInputElements.forEach((input) => {
    input.addEventListener("keyup", (event) => {
        inputKeyUpHandler(input, event);
    });

    input.addEventListener("click", () => {
        selectedInput = input;
    });
});

rightArrowElements.forEach((arrow) => {
    arrow.addEventListener("click", () => {
        arrowClickHandler("right");
    });
});

leftArrowElements.forEach((arrow) => {
    arrow.addEventListener("click", () => {
        arrowClickHandler("left");
    });
});

mobileKeysElements.forEach((key) => {
    key.addEventListener("click", () => {
        mobileKeyClickHandler(key);
    });
});
