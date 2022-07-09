let text =
  "Ever since I left the city, you, you, you You and me we just don't get along";

function parseText(originalText) {
  const textWithoutPunctuation = originalText.replace(/[^a-z0-9 ]/gi, "");
  return textWithoutPunctuation.toLowerCase().split(" ");
}

function invalidWordCorpus(wordCorpus) {
  return !Array.isArray(wordCorpus) || wordCorpus.length === 0;
}

function generateWordPairs(wordCorpus) {
  if (invalidWordCorpus(wordCorpus)) {
    throw Error("Invalid word corpus: expected non empty array of words.");
  }

  const wordPairs = { [wordCorpus[0]]: [] };

  //Decided to use has own property instead of in because this seems like a case where we could run into conflicting property names.
  wordCorpus.reduce((previousWord, word, i) => {
    if (!wordPairs.hasOwnProperty(word) && i < wordCorpus.length - 1) {
      wordPairs[word] = [];
    }

    wordPairs[previousWord].push(word);
    return word;
  });

  return wordPairs;
}
