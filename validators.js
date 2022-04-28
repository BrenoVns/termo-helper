export function createLettersValidator(inputColor) {
    const validatorName = `${inputColor} inputs validator`;

    const validator = { name: validatorName };

    inputColor === "black" && setBlackValidator(validator);
    inputColor === "yellow" && setYellowValidator(validator);
    inputColor === "green" && setGreenValidator(validator);

    return validator;
}

function setBlackValidator(validator) {
    validator.getInputLetters = function (inputs) {
        const alreadyLoopedValues = [];
        const uniqueLetters = inputs.filter((letter) => {
            const isDuplicatedLetter = alreadyLoopedValues.includes(letter);
            alreadyLoopedValues.push(letter);

            return letter && !isDuplicatedLetter;
        });

        validator.inputLetters = uniqueLetters;
        console.log(validator.inputLetters);
    };

    validator.validateWord = function (word) {
        const hasWordAnyBlackLetter = validator.inputLetters.some((letter) => {
            return word.includes(letter);
        });

        return !hasWordAnyBlackLetter;
    };
}

function setYellowValidator(validator) {
    validator.getLettersCount = function (wordAsArray) {
        const letterCount = {};

        wordAsArray.forEach((letter) => {
            if (!letter) return;

            const currentLetterCount = letterCount[letter] ?? 0;
            letterCount[letter] = currentLetterCount + 1;
        });

        return letterCount;
    };

    validator.getInputLetters = function (inputs) {
        validator.inputLetters = inputs;

        validator.inputLettersCount = validator.getLettersCount(inputs); //Getting input letters count
        console.log(validator.inputLettersCount);
    };

    validator.validateWord = function (word) {
        const wordLettersCount = validator.getLettersCount([...word]);

        const hasWordAllYellowLetters = Object.entries(validator.inputLettersCount).every(
            ([inputLetter, inputLetterCount]) => {
                if (!inputLetter) return true;

                const wordLetterCount = wordLettersCount[inputLetter];
                return wordLetterCount >= inputLetterCount;
            }
        );

        const hasWordAnyLetterOnSamePosition = validator.inputLetters.some((letter, letterIndex) => {
            if (!letter) return;

            return word[letterIndex] === letter;
        });

        return hasWordAllYellowLetters && !hasWordAnyLetterOnSamePosition;
    };
}

function setGreenValidator(validator) {
    validator.getInputLetters = function (inputs) {
        validator.inputLetters = inputs;
        console.log(validator.inputLetters);
    };

    validator.validateWord = function (word) {
        const hasAllLettersOnSamePosition = validator.inputLetters.every((letter, letterIndex) => {
            if (!letter) return true;

            return letter === word[letterIndex];
        });

        return hasAllLettersOnSamePosition;
    };
}
