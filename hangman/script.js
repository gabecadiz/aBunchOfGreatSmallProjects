const wordEl = document.getElementById('word');
const wrongLetterEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-again');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const word = ['application', 'programming', 'interface', 'wizard'];

let selectedWord = word[Math.floor(Math.random() * word.length)];

const correctLetters = [];
const wrongLetters = [];

// show hidden word
const displayWord = () => {
  wordEl.innerHTML = `
    ${selectedWord
      .split('')
      .map(
        (letter) =>
          `<span class="letter"> ${
            correctLetters.includes(letter) ? letter : ''
          }</span>`
      )
      .join('')}
  `;
  const innerWord = wordEl.innerText.replace(/\n/g, '');

  console.log(innerWord, selectedWord);
  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Congrats you won fam!';
    popup.style.display = 'flex';
  }
};

displayWord();
