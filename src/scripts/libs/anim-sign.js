const reverseIndex = (arr, current) => arr.length - 1 - current;

const makeWord = (oldWord, index) => {
  const newWord = document.createElement("SPAN");
  newWord.dataset["word"] = oldWord.innerText;
  newWord.classList.add("new-word", ...oldWord.classList);
  newWord.style.setProperty("--i-w", index);
  return newWord;
};

const isWhitespace = (char => char === ' ');

const makeChars = (newWord, indexFromEnd = false) => (char, idx, arr) => {
  const newChar = document.createElement("SPAN");
  newChar.dataset["char"] = char;
  newChar.classList.add(isWhitespace(char) ? 'new-whitespace' : "new-char");
  newChar.style.setProperty("--i-c", indexFromEnd ? reverseIndex(arr, idx) : idx);
  newChar.innerText = char;
  newWord.appendChild(newChar);
  return newChar;
};

export const animSignsPrevs = (secionSelector) => {
  const text = Array.from(document.querySelectorAll(`${secionSelector} .deco-sign span`));

  text.forEach((word, idx) => {
    const wordText = word.innerText;
    if (wordText === "") return;

    const newWord = makeWord(word, idx);

    const revsered = ["PUSH", "FORWARD"].includes(wordText);

    wordText.split("").forEach(makeChars(newWord, revsered));

    word.parentNode.replaceChild(newWord, word);

    // splitToLettersByIndex();
  });
  //   const letters = text.forEach
  //   console.log(text);
};
