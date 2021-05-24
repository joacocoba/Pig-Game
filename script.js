'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNewGame = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const currentScore0El = document.querySelector('#current--0');
const currentScore1El = document.querySelector('#current--1');

let activePlayer, currentScore, score, playing;
// Starting conditions

const init = function (){
activePlayer = 0;
currentScore = 0;
score = [0, 0];
playing = true;

score0El.textContent = 0;
score1El.textContent = 0;
currentScore0El.textContent = 0;
currentScore1El.textContent = 0;
diceEl.classList.add('hidden');
player0El.classList.remove("player--winner");
player1El.classList.remove("player--winner");
player0El.classList.add("player--active");
player1El.classList.remove("player--active");
}
init();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6 + 1);
    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check roll 1
    if (dice !== 1) {
      // Adding dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch player
      switchPlayer();
    }
  }
});

// Holding functionality
btnHold.addEventListener('click', function () {
  if (playing) {
      // 1. Add current value to the active player's score
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
      
      // 2. Check if player's score is 100.
    if (score[activePlayer] >= 100) {
        // Finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
        // Switch to the next player
      switchPlayer();
    }
  }
});

// Restart Game functionality
btnNewGame.addEventListener("click", init);
