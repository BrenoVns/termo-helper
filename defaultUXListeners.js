// All UX Handlers

//  Set screen mode based on session storage data
setScreenMode();

changeScreenBtnElements.forEach((button) => {
    button.addEventListener("click", () => {
        screenButtonClickHandler();
    });
});

letterInputElements.forEach((input) => {
    input.addEventListener("focus", () => {
        inputFocusHandler(input);
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
