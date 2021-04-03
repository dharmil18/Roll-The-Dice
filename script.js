'use strict';

//-> Selecting Elements

const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');

const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');

const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

const player0WinnerTextElement = document.getElementById('winner--0');
const player1WinnerTextElement = document.getElementById('winner--1');

const diceImageElement = document.querySelector('.dice');

const btnNewGame = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//-> Global vars to hold scores and current scores

let currentScore, activePlayer, finalScores, isGamePlaying;

// -> Functions for repetitive code

const init = function () {
  currentScore = 0;
  finalScores = [0, 0];
  activePlayer = 0;
  isGamePlaying = true;

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;

  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');
  player0WinnerTextElement.classList.add('hidden');
  player1WinnerTextElement.classList.add('hidden');
  diceImageElement.classList.add('hidden');
};

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
  currentScore = 0;
};

// -> Initialize the game (first webpage load)
init();

// -> Rolling the dice

btnRoll.addEventListener('click', function () {
  if (isGamePlaying) {
    //-> Generate Random Number
    const randomNumber = Math.trunc(Math.random() * 6) + 1;

    //-> Display Dice Image
    diceImageElement.classList.remove('hidden');
    diceImageElement.src = `./images/dice-${randomNumber}.png`;

    //-> Check if 1, if yes then switch player or add the score to current score
    if (randomNumber !== 1) {
      currentScore += randomNumber;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    }
    //Switch player
    else switchPlayer();
  }
});

//-> Holding the score

btnHold.addEventListener('click', function () {
  if (isGamePlaying) {
    //-> Add current score to final score and display it
    finalScores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      finalScores[activePlayer];

    //-> Check if final score is >= 100
    if (finalScores[activePlayer] >= 100) {
      isGamePlaying = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.toggle('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.toggle('player--active');
      document
        .getElementById(`winner--${activePlayer}`)
        .classList.remove('hidden');
      diceImageElement.classList.toggle('hidden');
    }
    // -> Switch Player
    else switchPlayer();
  }
});

// -> Resetting the game

btnNewGame.addEventListener('click', init);
