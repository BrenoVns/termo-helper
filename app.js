// Styling

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

// App Logic
const enterBtn = document.querySelector(".enter-btn");
const blackInputs = document.querySelectorAll(".black-input");
const greenInputs = document.querySelectorAll(".green-input");
const yellowInputs = document.querySelectorAll(".yellow-input");

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

// const letters = [
//     "b",
//     "d",
//     "h",
//     "i",
//     "j",
//     "k",
//     "l",
//     "o",
//     "p",
//     "q",
//     "s",
//     "u",
//     "w",
//     "x",
//     "y",
//     "z",
// ];

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

function getBlackInputValues() {
    blackInputs.forEach((input) => {
        if (input.value) {
            blackLetters.push(input.value);
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

                            createdWords.push(combinedWord);
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
            console.log(matchingWords);
        });
}

async function runLogic() {
    getBlackInputValues();
    getGreenInputValues();
    getYellowInputValues();
    await getResult();
}

enterBtn.addEventListener("click", () => {
    runLogic();
});
