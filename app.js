// Styling



// MORE THAN 1 YELLOW INPUT WITH SAME LETTER ISSUE





const blackSectionEl = document.querySelector(".black");
const yellowSectionEl = document.querySelector(".yellow");
const greenSectionEl = document.querySelector(".green");
const rArrowsEl = document.querySelectorAll(".right");
const lArrowsEl = document.querySelectorAll(".left");
const letterInputsEl = document.querySelectorAll(".letter-input");
const blackInputsEl = document.querySelectorAll(".black-input");
const yellowInputsEl = document.querySelectorAll(".yellow-input");
const greenInputsEl = document.querySelectorAll(".green-input");

let prevInput;

letterInputsEl.forEach((input) => {
    input.addEventListener("focus", () => {
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

blackInputsEl.forEach((input) => {
    input.addEventListener("input", (e) => {
        if (e.inputType === "deleteContentBackward") {
            input.classList.remove("filled-input");
            if (!input.previousElementSibling) {
                return;
            }
            input.previousElementSibling.focus();
            return;
        }
        if (
            !input.classList.contains("filled-input") &&
            /^[A-Za-z\s]*$/.test(e.value) === true
        ) {
            input.classList.add("filled-input");
            input.readOnly = true;
            if (!input.nextElementSibling) {
                input.blur();
                return;
            }
            input.nextElementSibling.classList.remove("blocked");
            input.nextElementSibling.focus();
            input.nextElementSibling.readOnly = false;
        }
    });

    input.addEventListener("click", () => {
        if (input.classList.contains("filled-input")) {
            input.readOnly = false;
        }
    });
});

yellowInputsEl.forEach((input) => {
    input.addEventListener("input", (e) => {
        if (e.inputType === "deleteContentBackward") {
            input.classList.remove("filled-input");
            input.classList.add("blocked");
            input.readOnly = true;

            if (!input.previousElementSibling) {
                input.blur();
                return;
            }

            input.previousElementSibling.focus();
            return;
        }
        if (
            !input.classList.contains("filled-input") &&
            /^[A-Za-z\s]*$/.test(e.value) === true
        ) {
            input.classList.add("filled-input");
            input.readOnly = true;
            if (!input.nextElementSibling) {
                input.blur();
                return;
            }
            input.nextElementSibling.classList.remove("blocked");
            input.nextElementSibling.focus();
            input.nextElementSibling.readOnly = false;
        }
    });

    input.addEventListener("click", () => {
        if (input.readOnly === true) {
            for (const inp of yellowInputsEl) {
                if (
                    inp.readOnly === false &&
                    !inp.classList.contains("filled-input")
                ) {
                    inp.classList.add("blocked");
                    inp.readOnly = true;
                    break;
                }
            }
            input.classList.remove("blocked");
            input.readOnly = false;
        }

        if (input.classList.contains("filled-input")) {
            for (const inp of yellowInputsEl) {
                if (
                    inp.readOnly === false &&
                    !inp.classList.contains("filled-input")
                ) {
                    inp.classList.add("blocked");
                    inp.readOnly = true;
                    break;
                }
            }
        }
    });
});

greenInputsEl.forEach((input) => {
    input.addEventListener("input", (e) => {
        if (e.inputType === "deleteContentBackward") {
            input.classList.remove("filled-input");
            input.classList.add("blocked");
            input.readOnly = true;

            if (!input.previousElementSibling) {
                return;
            }

            input.previousElementSibling.focus();
            return;
        }
        if (
            !input.classList.contains("filled-input") &&
            /^[A-Za-z\s]*$/.test(e.value) === true
        ) {
            input.classList.add("filled-input");
            input.readOnly = true;

            if (!input.nextElementSibling) {
                input.blur();
                return;
            }
            input.nextElementSibling.classList.remove("blocked");
            input.nextElementSibling.focus();
            input.nextElementSibling.readOnly = false;
        }
    });

    input.addEventListener("click", () => {
        if (input.readOnly === true) {
            for (const inp of greenInputsEl) {
                if (
                    inp.readOnly === false &&
                    !inp.classList.contains("filled-input")
                ) {
                    inp.classList.add("blocked");
                    inp.readOnly = true;
                    break;
                }
            }
            input.classList.remove("blocked");
            input.readOnly = false;
        }

        if (input.classList.contains("filled-input")) {
            for (const inp of greenInputsEl) {
                if (
                    inp.readOnly === false &&
                    !inp.classList.contains("filled-input")
                ) {
                    inp.classList.add("blocked");
                    inp.readOnly = true;
                    break;
                }
            }
        }
    });
});

let actualSection = 0;

rArrowsEl.forEach((arrow) => {
    arrow.addEventListener("click", () => {
        if (actualSection === 0) {
            blackSectionEl.classList.toggle("hide");
            yellowSectionEl.classList.toggle("hide");
            actualSection = 1;
            return;
        }
        if (actualSection === 1) {
            yellowSectionEl.classList.toggle("hide");
            greenSectionEl.classList.toggle("hide");
            actualSection = 2;
            return;
        }
    });
});

lArrowsEl.forEach((arrow) => {
    arrow.addEventListener("click", () => {
        if (actualSection === 1) {
            yellowSectionEl.classList.toggle("hide");
            blackSectionEl.classList.toggle("hide");
            actualSection = 0;
            return;
        }
        if (actualSection === 2) {
            greenSectionEl.classList.toggle("hide");
            yellowSectionEl.classList.toggle("hide");
            actualSection = 1;
            return;
        }
    });
});

// App Logic
const enterBtn = document.querySelector(".enter-btn");
const blackInputs = document.querySelectorAll(".black-input");
const greenInputs = document.querySelectorAll(".green-input");
const yellowInputs = document.querySelectorAll(".yellow-input");
const possibleWordsBoxEl = document.querySelector(".possible-words-box");
const closeBtn = document.querySelector(".close-btn");

const alphabet = [
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

let actualInputNum = 0;
let firstLetter = [];
let secondLetter = [];
let thirdLetter = [];
let fourthLetter = [];
let fifthLetter = [];
let blackLetters = [];
let yellowLetters = [];
let possibleLetters;
let createdWords = [];
let possibleWords;
let matchingWords = [];

function reset() {
    actualInputNum = 0;
    firstLetter = [];
    secondLetter = [];
    thirdLetter = [];
    fourthLetter = [];
    fifthLetter = [];
    blackLetters = [];
    yellowLetters = [];
    possibleLetters = [];
    createdWords = [];
    possibleWords = [];
    matchingWords = [];
    document.querySelectorAll(".possible-words-box span").forEach((word) => {
        document.querySelector(".possible-words-box").removeChild(word);
    });

    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
        input.value = null;
        input.classList.remove("filled-input");
    });
    yellowInputs.forEach((input) => {
        input.classList.add("blocked");
        input.readOnly = true;
    });
    greenInputs.forEach((input) => {
        input.classList.add("blocked");
        input.readOnly = true;
    });
    blackInputs.forEach((input) => {
        input.classList.add("blocked");
        input.readOnly = true;
    });
    document.querySelector(".first-black").classList.remove("blocked");
    document.querySelector(".first-black").readOnly = false;
    // blackSectionEl.classList.toggle("hide");
    // greenSectionEl.classList.toggle("hide");
}

function getBlackInputValues() {
    blackInputs.forEach((input) => {
        if (input.value) {
            let isValid = true;
            blackLetters.forEach((letter) => {
                if (letter === input.value) {
                    isValid = false;
                }
            });
            isValid && blackLetters.push(input.value);
        }
    });
    possibleLetters = alphabet.filter((x) => {
        return !blackLetters.includes(x);
    });
}

function getGreenInputValues() {
    for (let i = 0; i < greenInputs.length; i++) {
        const actualInput = greenInputs[i];
        if (actualInput.value) {
            actualInputNum = i;
            if (actualInputNum === 0) {
                firstLetter = [actualInput.value];
                continue;
            }
            if (actualInputNum === 1) {
                secondLetter = [actualInput.value];
                continue;
            }
            if (actualInputNum === 2) {
                thirdLetter = [actualInput.value];
                continue;
            }
            if (actualInputNum === 3) {
                fourthLetter = [actualInput.value];
                continue;
            }
            if (actualInputNum === 4) {
                fifthLetter = [actualInput.value];
                continue;
            }
        }
    }
    if (!firstLetter.length) {
        firstLetter = possibleLetters;
    }
    if (!secondLetter.length) {
        secondLetter = possibleLetters;
    }
    if (!thirdLetter.length) {
        thirdLetter = possibleLetters;
    }
    if (!fourthLetter.length) {
        fourthLetter = possibleLetters;
    }
    if (!fifthLetter.length) {
        fifthLetter = possibleLetters;
    }
    actualInputNum = 0;
}

function getYellowInputValues() {
    yellowInputs.forEach((input) => {
        if (!input.value) {
            return;
        }
        yellowLetters.push(input.value.toLowerCase());
        if (actualInputNum === 0) {
            firstLetter = firstLetter.filter((letter) => {
                return letter !== input.value;
            });
            actualInputNum++;
            return;
        }
        if (actualInputNum === 1) {
            secondLetter = secondLetter.filter((letter) => {
                return letter !== input.value;
            });
            actualInputNum++;
            return;
        }
        if (actualInputNum === 2) {
            thirdLetter = thirdLetter.filter((letter) => {
                return letter !== input.value;
            });
            actualInputNum++;
            return;
        }
        if (actualInputNum === 3) {
            fourthLetter = fourthLetter.filter((letter) => {
                return letter !== input.value;
            });
            actualInputNum++;
            return;
        }
        if (actualInputNum === 4) {
            fifthLetter = fifthLetter.filter((letter) => {
                return letter !== input.value;
            });
            return;
        }
    });

    for (let a = 0; a < firstLetter.length; a++) {
        for (let b = 0; b < secondLetter.length; b++) {
            for (let c = 0; c < thirdLetter.length; c++) {
                for (let d = 0; d < fourthLetter.length; d++) {
                    for (let e = 0; e < fifthLetter.length; e++) {
                        let index = 0;
                        let yellowAvailable = [...yellowLetters];

                        for (let x = 0; x < yellowAvailable.length; x++) {
                            if (firstLetter[a] === yellowAvailable[x]) {
                                index++;
                                yellowAvailable.splice(x, 1);
                                break;
                            }
                        }
                        for (let x = 0; x < yellowAvailable.length; x++) {
                            if (secondLetter[b] === yellowAvailable[x]) {
                                index++;
                                yellowAvailable.splice(x, 1);
                                break;
                            }
                        }
                        for (let x = 0; x < yellowAvailable.length; x++) {
                            if (thirdLetter[c] === yellowAvailable[x]) {
                                index++;
                                yellowAvailable.splice(x, 1);
                                break;
                            }
                        }
                        for (let x = 0; x < yellowAvailable.length; x++) {
                            if (fourthLetter[d] === yellowAvailable[x]) {
                                index++;
                                yellowAvailable.splice(x, 1);
                                break;
                            }
                        }
                        for (let x = 0; x < yellowAvailable.length; x++) {
                            if (fifthLetter[e] === yellowAvailable[x]) {
                                index++;
                                yellowAvailable.splice(x, 1);
                                break;
                            }
                        }

                        if (index === yellowLetters.length) {
                            const combinedWord =
                                firstLetter[a] +
                                secondLetter[b] +
                                thirdLetter[c] +
                                fourthLetter[d] +
                                fifthLetter[e];

                            createdWords.push(
                                combinedWord
                                    .normalize("NFD")
                                    .replace(/[\u0300-\u036f]/g, "")
                            );
                        }
                    }
                }
            }
        }
    }
}

// function getYellowInputValues222() {
//     yellowInputs.forEach((input) => {
//         if (!input.value) {
//             return;
//         }
//         yellowLetters.push(input.value.toLowerCase());
//         if (actualInputNum === 0) {
//             firstLetter = firstLetter.filter((letter) => {
//                 return letter !== input.value;
//             });
//             actualInputNum++;
//             return;
//         }
//         if (actualInputNum === 1) {
//             secondLetter = secondLetter.filter((letter) => {
//                 return letter !== input.value;
//             });
//             actualInputNum++;
//             return;
//         }
//         if (actualInputNum === 2) {
//             thirdLetter = thirdLetter.filter((letter) => {
//                 return letter !== input.value;
//             });
//             actualInputNum++;
//             return;
//         }
//         if (actualInputNum === 3) {
//             fourthLetter = fourthLetter.filter((letter) => {
//                 return letter !== input.value;
//             });
//             actualInputNum++;
//             return;
//         }
//         if (actualInputNum === 4) {
//             fifthLetter = fifthLetter.filter((letter) => {
//                 return letter !== input.value;
//             });
//             return;
//         }
//     });

//     // -NOT REPEAT WORD
//     // -LOOP THROUGH 5 ARRAYS
//     // -WORDS WITH SAME LETTER

//     let condition = false;
//     let avYellowLetters = [...yellowLetters];

//     for (let a = 0; a < firstLetter.length; a++) {
//         for (let z = 0; z < avYellowLetters.length; z++) {
//             if (firstLetter[a] === avYellowLetters[z]) {
//                 condition = true;
//                 avYellowLetters.splice(z, 1);
//                 break;
//             }
//         }

//         if (condition === true) {
//             condition = false;

//             for (let b = 0; b < secondLetter.length; b++) {
//                 for (let z = 0; z < avYellowLetters.length; z++) {
//                     if (secondLetter[b] === avYellowLetters[z]) {
//                         condition = true;
//                         avYellowLetters.splice(z, 1);
//                         break;
//                     }
//                 }
//                 if (condition === true) {
//                     condition = false;

//                     for (let c = 0; c < thirdLetter.length; c++) {
//                         for (let z = 0; z < avYellowLetters.length; z++) {
//                             if (thirdLetter[c] === avYellowLetters[z]) {
//                                 condition = true;
//                                 avYellowLetters.splice(z, 1);
//                                 break;
//                             }
//                         }
//                         if (condition === true) {
//                             condition = false;

//                             for (let d = 0; d < fourthLetter.length; d++) {
//                                 for (
//                                     let z = 0;
//                                     z < avYellowLetters.length;
//                                     z++
//                                 ) {
//                                     if (
//                                         fourthLetter[d] === avYellowLetters[z]
//                                     ) {
//                                         condition = true;
//                                         avYellowLetters.splice(z, 1);
//                                         break;
//                                     }
//                                 }
//                                 if (condition === true) {
//                                     condition = false;

//                                     for (
//                                         let e = 0;
//                                         e < fifthLetter.length;
//                                         e++
//                                     ) {
//                                         for (
//                                             let z = 0;
//                                             z < avYellowLetters.length;
//                                             z++
//                                         ) {
//                                             if (
//                                                 fifthLetter[e] ===
//                                                 avYellowLetters[z]
//                                             ) {
//                                                 condition = true;
//                                                 avYellowLetters.splice(z, 1);
//                                                 break;
//                                             }
//                                         }
//                                         if (condition === true) {
//                                             condition = false;

//                                             let avYellowLetters2 = [
//                                                 ...yellowLetters,
//                                             ];

//                                             let c1 = false;
//                                             let c2 = false;
//                                             let c3 = false;
//                                             let c4 = false;
//                                             let c5 = false;

//                                             for (
//                                                 let x = 0;
//                                                 x < avYellowLetters2.length;
//                                                 x++
//                                             ) {
//                                                 if (
//                                                     firstLetter[a] ===
//                                                     avYellowLetters[x]
//                                                 ) {
//                                                 }
//                                             }

//                                             const combinedWord =
//                                                 firstLetter[a] +
//                                                 secondLetter[b] +
//                                                 thirdLetter[c] +
//                                                 fourthLetter[d] +
//                                                 fifthLetter[e];

//                                             createdWords.push(combinedWord);
//                                             console.log(createdWords);

//                                             avYellowLetters = [
//                                                 ...yellowLetters,
//                                             ];
//                                         }
//                                     }
//                                 }
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     }
// }

// function getYellowInputValues111() {
//     yellowInputs.forEach((input) => {
//         if (!input.value) {
//             return;
//         }
//         yellowLetters.push(input.value.toLowerCase());
//         if (actualInputNum === 0) {
//             firstLetter = firstLetter.filter((letter) => {
//                 return letter !== input.value;
//             });
//             actualInputNum++;
//             return;
//         }
//         if (actualInputNum === 1) {
//             secondLetter = secondLetter.filter((letter) => {
//                 return letter !== input.value;
//             });
//             actualInputNum++;
//             return;
//         }
//         if (actualInputNum === 2) {
//             thirdLetter = thirdLetter.filter((letter) => {
//                 return letter !== input.value;
//             });
//             actualInputNum++;
//             return;
//         }
//         if (actualInputNum === 3) {
//             fourthLetter = fourthLetter.filter((letter) => {
//                 return letter !== input.value;
//             });
//             actualInputNum++;
//             return;
//         }
//         if (actualInputNum === 4) {
//             fifthLetter = fifthLetter.filter((letter) => {
//                 return letter !== input.value;
//             });
//             return;
//         }
//     });

//     let avYellowLetters = [...yellowLetters];
//     for (let a = 0; a < firstLetter.length; a++) {
//         avYellowLetters.forEach((letter, i) => {
//             if (firstLetter[a] === letter) {
//                 avYellowLetters.splice(i, 1);
//                 return;
//             }
//         });

//         for (let b = 0; b < secondLetter.length; b++) {
//             avYellowLetters.forEach((letter, i) => {
//                 if (secondLetter[b] === letter) {
//                     avYellowLetters.splice(i, 1);
//                     return;
//                 }
//             });

//             for (let c = 0; c < thirdLetter.length; c++) {
//                 avYellowLetters.forEach((letter, i) => {
//                     if (thirdLetter[c] === letter) {
//                         avYellowLetters.splice(i, 1);
//                         return;
//                     }
//                 });

//                 for (let d = 0; d < fourthLetter.length; d++) {
//                     avYellowLetters.forEach((letter, i) => {
//                         if (fourthLetter[d] === letter) {
//                             avYellowLetters.splice(i, 1);
//                             return;
//                         }
//                     });

//                     for (let e = 0; e < fifthLetter.length; e++) {
//                         avYellowLetters.forEach((letter, i) => {
//                             if (fifthLetter[e] === letter) {
//                                 avYellowLetters.splice(i, 1);
//                                 return;
//                             }
//                         });
//                         if (avYellowLetters.length === 0) {
//                             const combinedWord =
//                                 firstLetter[a] +
//                                 secondLetter[b] +
//                                 thirdLetter[c] +
//                                 fourthLetter[d] +
//                                 fifthLetter[e];

//                             if (combinedWord.length === 5) {
//                                 createdWords.push(combinedWord);
//                                 console.log(createdWords);
//                             }
//                             console.log("have all letters");
//                         }
//                         avYellowLetters = yellowLetters;

//                         // if (yellowLetters) {
//                         //     console.log("a");
//                         //     if (combinedWord.length === 5) {
//                         //         if (yellowLetters[0]) {
//                         //             if (yellowLetters[1]) {
//                         //                 if (yellowLetters[2]) {
//                         //                     if (yellowLetters[3]) {
//                         //                         if (yellowLetters[4]) {
//                         //                             if (
//                         //                                 combinedWord.includes(
//                         //                                     yellowLetters[0]
//                         //                                 ) &&
//                         //                                 combinedWord.includes(
//                         //                                     yellowLetters[1]
//                         //                                 ) &&
//                         //                                 combinedWord.includes(
//                         //                                     yellowLetters[2]
//                         //                                 ) &&
//                         //                                 combinedWord.includes(
//                         //                                     yellowLetters[3]
//                         //                                 ) &&
//                         //                                 combinedWord.includes(
//                         //                                     yellowLetters[4]
//                         //                                 )
//                         //                             ) {
//                         //                                 createdWords.push(
//                         //                                     combinedWord
//                         //                                 );
//                         //                                 continue;
//                         //                             }
//                         //                         }
//                         //                         if (
//                         //                             combinedWord.includes(
//                         //                                 yellowLetters[0]
//                         //                             ) &&
//                         //                             combinedWord.includes(
//                         //                                 yellowLetters[1]
//                         //                             ) &&
//                         //                             combinedWord.includes(
//                         //                                 yellowLetters[2]
//                         //                             ) &&
//                         //                             combinedWord.includes(
//                         //                                 yellowLetters[3]
//                         //                             )
//                         //                         ) {
//                         //                             createdWords.push(
//                         //                                 combinedWord
//                         //                             );
//                         //                             continue;
//                         //                         }
//                         //                     }
//                         //                     if (
//                         //                         combinedWord.includes(
//                         //                             yellowLetters[0]
//                         //                         ) &&
//                         //                         combinedWord.includes(
//                         //                             yellowLetters[1]
//                         //                         ) &&
//                         //                         combinedWord.includes(
//                         //                             yellowLetters[2]
//                         //                         )
//                         //                     ) {
//                         //                         createdWords.push(combinedWord);
//                         //                         continue;
//                         //                     }
//                         //                 }
//                         //                 if (
//                         //                     combinedWord.includes(
//                         //                         yellowLetters[0]
//                         //                     ) &&
//                         //                     combinedWord.includes(
//                         //                         yellowLetters[1]
//                         //                     )
//                         //                 ) {
//                         //                     createdWords.push(combinedWord);
//                         //                     continue;
//                         //                 }
//                         //             }
//                         //             if (
//                         //                 combinedWord.includes(yellowLetters[0])
//                         //             ) {
//                         //                 createdWords.push(combinedWord);
//                         //             }
//                         //         }
//                         //     }
//                         //     continue;
//                         // }
//                     }
//                 }
//             }
//         }
//     }
// }

function getResult() {
    axios({
        method: "get",
        url: "https://raw.githubusercontent.com/fserb/pt-br/master/palavras",
    })
        .then((response) => {
            possibleWords = response.data
                .split("\n")
                .map((word) => {
                    return word
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "");
                })
                .filter((word) => {
                    return word.length === 5;
                });
        })
        .then(() => {
            possibleWords.forEach((pWord) => {
                createdWords.forEach((word) => {
                    if (pWord === word) {
                        matchingWords.push(word);
                    }
                });
            });
            if (matchingWords.length > 16) {
                console.log("more than 16 words");
                reset();
                return;
            }
            if (matchingWords.length === 0) {
                console.log("no words");
                console.log(createdWords, "black", blackLetters);
                reset();
                return;
            }
            matchingWords.forEach((word) => {
                const wordEl = document.createElement("span");
                wordEl.innerText = word;
                possibleWordsBoxEl.appendChild(wordEl);
            });
            document.querySelector(
                ".result-modal .heading-secondary"
            ).innerText = `${matchingWords.length.toString()} possible words`;
            document.querySelector(".result-modal").showModal();
            console.log(matchingWords);
        });
}

async function runLogic() {
    let isValid = false;
    blackInputs.forEach((input) => {
        if (input.value) {
            isValid = true;
            return;
        }
    });

    yellowInputs.forEach((input) => {
        if (input.value) {
            isValid = true;
            return;
        }
    });

    greenInputs.forEach((input) => {
        if (input.value) {
            isValid = true;
            return;
        }
    });

    if (!isValid) {
        return;
    }

    getBlackInputValues();
    getGreenInputValues();
    getYellowInputValues();
    await getResult();
}

enterBtn.addEventListener("click", () => {
    runLogic();
});

closeBtn.addEventListener("click", () => {
    reset();
    document.querySelector(".result-modal").close();
});
