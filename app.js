const { AutomaticPrefetchPlugin } = require('webpack');

const letters = [
    'b',
    'd',
    'h',
    'i',
    'j',
    'k',
    'l',
    'o',
    'p',
    'q',
    's',
    'u',
    'w',
    'x',
    'y',
    'z',
];

const firstLetter = letters.filter((letter) => {
    return letter !== 'd';
});

const secondLetter = letters.filter((letter) => {
    return letter !== 'o';
});

const thirdLetter = letters.filter((letter) => {
    return letter !== 'l';
});

const fourthLetter = letters.filter((letter) => {
    return letter !== 'd' && letter !== 's';
});

const fifthLetter = letters.filter((letter) => {
    return letter !== 'l';
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
                        combine.includes('d') &&
                        combine.includes('l') &&
                        combine.includes('s') &&
                        combine.includes('o') &&
                        combine.length === 5
                    ) {
                        words.push(combine);
                    }
                }
            }
        }
    }
}
