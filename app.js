const letterInputs = document.querySelectorAll(".letter-input");
let prevInput;
letterInputs.forEach((input) => {
    input.addEventListener("click", () => {
        if (input.classList.contains("edit")) {
            return;
        }
        input.classList.toggle("edit");
        if (!prevInput) {
            prevInput = input;
            return;
        }
        prevInput.classList.toggle("edit");
        prevInput = input;
    });
});

const blackSection = document.querySelector(".black");
const yellowSection = document.querySelector(".yellow");
const greenSection = document.querySelector(".green");
const rArrows = document.querySelectorAll(".right");
const lArrows = document.querySelectorAll(".left");

let actualSection = 0;

rArrows.forEach((arrow) => {
    arrow.addEventListener("click", () => {
        if (actualSection === 0) {
            blackSection.classList.toggle("hide");
            yellowSection.classList.toggle("hide");
            actualSection = 1;
            return;
        }
        if (actualSection === 1) {
            yellowSection.classList.toggle("hide");
            greenSection.classList.toggle("hide");
            actualSection = 2;
            return;
        }
    });
});

lArrows.forEach((arrow) => {
    arrow.addEventListener("click", () => {
        if (actualSection === 1) {
            yellowSection.classList.toggle("hide");
            blackSection.classList.toggle("hide");
            actualSection = 0;
            return;
        }
        if (actualSection === 2) {
            greenSection.classList.toggle("hide");
            yellowSection.classList.toggle("hide");
            actualSection = 1;
            return;
        }
    });
});

const letters = [
    "b",
    "d",
    "h",
    "i",
    "j",
    "k",
    "l",
    "o",
    "p",
    "q",
    "s",
    "u",
    "w",
    "x",
    "y",
    "z",
];

const firstLetter = letters.filter((letter) => {
    return letter !== "d";
});

const secondLetter = letters.filter((letter) => {
    return letter !== "o";
});

const thirdLetter = letters.filter((letter) => {
    return letter !== "l";
});

const fourthLetter = letters.filter((letter) => {
    return letter !== "d" && letter !== "s";
});

const fifthLetter = letters.filter((letter) => {
    return letter !== "l";
});

let words = [];

const matchingWords = [];

for (let a = 0; a < firstLetter.length; a++) {
    for (let b = 0; b < secondLetter.length; b++) {
        for (let c = 0; c < thirdLetter.length; c++) {
            for (let d = 0; d < thirdLetter.length; d++) {
                for (let e = 0; e < thirdLetter.length; e++) {
                    const combine =
                        firstLetter[a] +
                        secondLetter[b] +
                        thirdLetter[c] +
                        fourthLetter[d] +
                        fifthLetter[e];
                    if (
                        combine.includes("d") &&
                        combine.includes("l") &&
                        combine.includes("s") &&
                        combine.includes("o") &&
                        combine.length === 5
                    ) {
                        words.push(combine);
                    }
                }
            }
        }
    }
}
