let text =
  "Ever since I left the city, you, you, you You and me we just don't get along";

function parseText(originalText) {
  const textWithoutPunctuation = originalText.replace(/[^a-z0-9 ]/gi, "");
  return textWithoutPunctuation.toLowerCase().split(" ");
}

console.log(parseText(text));
