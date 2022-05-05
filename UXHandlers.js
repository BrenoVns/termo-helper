import {
    changeScreenBtnElements,
    helpBtnElement,
    helpModalElement,
    mainSection,
    blackSectionElement,
    yellowSectionElement,
    greenSectionElement,
    rightArrowElements,
    leftArrowElements,
    letterInputElements,
    blackInputElements,
    yellowInputElements,
    greenInputElements,
    enterBtnElement,
} from "./globalVariables.js";

let actualSection = 0;

// Handlers
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

function moveInputFocusBackwards(input) {
    const inputClasslist = input.classList;
    const previousInput = input.previousElementSibling;

    inputClasslist.remove("filled-input");
    inputClasslist.add("blocked-input");
    input.readOnly = true;

    if (!previousInput) {
        return;
    }

    if (input.value) {
        input.value = null;
        previousInput.readOnly = false;
        previousInput.classList.remove("blocked-input");
        previousInput.focus();
        return;
    }
    previousInput.readOnly = false;
    previousInput.classList.remove("filled-input");
    previousInput.classList.remove("blocked-input");
    previousInput.focus();
    previousInput.value = null;

    return;
}

function inputChangeHandler(input, event) {
    if (event.inputType === "deleteContentBackward") {
        moveInputFocusBackwards(input);
    }
    if (!input.classList.contains("filled-input") && /^[A-Za-z\s]*$/.test(event.value) === true) {
        input.classList.add("filled-input");
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

setScreenMode(); // Set screen mode based on session storage data

// Listeners
changeScreenBtnElements.forEach((button) => {
    button.addEventListener("click", () => {
        screenButtonClickHandler();
    });
});

helpBtnElement.addEventListener("click", () => {
    helpModalElement.showModal();
});

helpModalElement.addEventListener("click", (ev) => {
    ev.target === helpModalElement && helpModalElement.close();
});

letterInputElements.forEach((input) => {
    input.addEventListener("focus", () => {
        inputFocusHandler(input);
    });

    input.addEventListener("keydown", (event) => {
        console.log(event);
        event.key === "Backspace" && moveInputFocusBackwards(input);
    });
});

blackInputElements.forEach((input) => {
    input.addEventListener("input", (event) => {
        inputChangeHandler(input, event);
    });

    input.addEventListener("click", () => {
        inputClickHandler(input, blackInputElements);
    });
});

yellowInputElements.forEach((input) => {
    input.addEventListener("input", (event) => {
        inputChangeHandler(input, event);
    });

    input.addEventListener("click", () => {
        inputClickHandler(input, yellowInputElements);
    });
});

greenInputElements.forEach((input) => {
    input.addEventListener("input", (event) => {
        inputChangeHandler(input, event);
    });

    input.addEventListener("click", () => {
        inputClickHandler(input, greenInputElements);
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
