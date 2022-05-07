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
} from "./globalVariables.js";

let actualSection = 0;

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

function inputTextHandler(actualInput, event) {
    actualInput.textContent = event.key;
    if (!actualInput.nextElementSibling) {
        actualInput.classList.add("filled-input");
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
    if (input.previousElementSibling) {
        input.previousElementSibling.classList.remove("filled-input");
        input.previousElementSibling.textContent = "";
        input.previousElementSibling.focus();
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
