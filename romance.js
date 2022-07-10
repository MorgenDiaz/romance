const sirMixAlotAsReadByShakespeare = `Forsooth. Rebecca, gaze upon her fundament. Verily, the proportions are volimnous. Her appearance is interchangeable to the romantic partner of a musician specialising in failed poetry. Though I must inquire,Dost thou understand these men? Their interest stems from her physical similarity to a harlot. Bear witness to her derierre! For it is substantial. I deign to believe its spherical nature. It is, indeed, vociferous. Nay, egregious. Contemplate, for thine is sable. I prioritise bountiful posteriors and I will not speak falsehoods. Mine fraternal associates cannot contradict. When a fair maiden gallivants with a dainty waist, and a globular posterior in thou visage, thy become exposed, Resolution must be adamant, for I observe thine haunches are overindulged. Despite the choice of breeches she wears, Both mine fixation and attention is guaranteed. Verily, my fair maiden, I yearn to be in thine presence, And record your person through a captured image. Mine fellow Scions have labored to exhort, Unfortunately, thou gluteals have rendered me concupiscent.`;

function parseText(originalText) {
  const textWithoutPunctuation = originalText.replace(/[^a-z0-9 ]/gi, "");
  return textWithoutPunctuation.toLowerCase().split(" ");
}

function isNonEmptyArray(arr) {
  return Array.isArray(arr) && arr.length >= 0;
}

function updateKeyWords(keyWords, previousWord, depth) {
  keyWords.push(previousWord);

  if (keyWords.length > depth) {
    keyWords.shift();
  }
}

function addWordToKeyWordChains(keyWords, wordPairs, word) {
  for (key of keyWords) {
    wordPairs[key].push(word);
  }
}

function generateWordPairs(text, depth = 1) {
  let wordCorpus = parseText(text);

  if (!isNonEmptyArray(wordCorpus)) {
    throw Error(
      "Invalid word corpus: Expected text to be a string containing at least one word."
    );
  }

  let keyWords = [];
  const wordPairs = { [wordCorpus[0]]: [] };

  wordCorpus.reduce((previousWord, word, i) => {
    if (!wordPairs.hasOwnProperty(word) && i < wordCorpus.length - 1) {
      wordPairs[word] = [];
    }

    updateKeyWords(keyWords, previousWord, depth);
    addWordToKeyWordChains(keyWords, wordPairs, word);

    return word;
  });

  return wordPairs;
}

function generateRandomIntegerLessThan(max) {
  return Math.floor(Math.random() * max);
}

function pickRandomWordFromMarkovChain(keyWord, wordChain) {
  let words = wordChain[keyWord];
  //decided to pass the issue of no key or empty array for key off to a higher level of abstraction because I think that allows for better flexibility.
  if (!isNonEmptyArray(words)) {
    return;
  }

  let randomWordIndex = generateRandomIntegerLessThan(words.length);

  return words[randomWordIndex];
}

//I know that i could just pick a random element of the original words array but this way the random key word is garaunteed to have child words.
function pickRandomRootWord(wordChain) {
  let rootWords = Reflect.ownKeys(wordChain);
  let randomRootWordIndex = generateRandomIntegerLessThan(rootWords.length);
  return rootWords[randomRootWordIndex];
}

function writeLine(wordChain, wordCount) {
  let randomRootWord = pickRandomRootWord(wordChain);
  let poem = [randomRootWord];

  while (poem.length < wordCount) {
    let randomWord = pickRandomWordFromMarkovChain(randomRootWord, wordChain);

    if (!randomWord) {
      randomWord = pickRandomRootWord(wordChain);
    }

    poem.push(randomWord);
    randomRootWord = randomWord;
  }

  return poem.join(" ");
}

/*
The instructions do not specify what the return type should be or if it should log something to the console. 
I decided to return the lines in an array as that leaves the user with some options.
If the function returned a string, the user would have to go through more trouble to format the output, this way
I feel the user can easily use the array and apply their own formatting in a more straight forward way.
*/
function generatePoem(
  wordCorpusText,
  lines = 1,
  wordsPerLine = 1,
  markovChainDepth = 1
) {
  const wordChain = generateWordPairs(wordCorpusText, markovChainDepth);
  let poem = [];

  for (let i = 0; i < lines; i++) {
    poem.push(writeLine(wordChain, wordsPerLine));
  }

  return poem;
}

let babysGotBack = {
  verse1: generatePoem(sirMixAlotAsReadByShakespeare, 7, 7, 2).join("\n"),
  verse2: generatePoem(sirMixAlotAsReadByShakespeare, 7, 7).join("\n"),

  recite: function () {
    let par = `${this.verse1}\n\n${this.verse2}`;
    console.log(par);
  },
};

babysGotBack.recite();
