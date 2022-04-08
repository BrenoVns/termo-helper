let possibleWords;

axios({
    method: 'get',
    url: 'https://raw.githubusercontent.com/fserb/pt-br/master/palavras',
})
    .then((response) => {
        possibleWords = response.data
            .split('\n')
            .map((word) => {
                return word.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            })
            .filter((word) => {
                return word.length === 5;
            });
    })
    .then(() => {
        possibleWords.forEach((word) => {
            words.forEach((word_) => {
                if (word === word_) {
                    matchingWords.push(word_);
                }
            });
        });
        console.log(matchingWords);
    });
