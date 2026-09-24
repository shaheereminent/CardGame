'use strict';

const DOM = 
{
    score0   : document.getElementById('score--0'),       
    score1   : document.getElementById('score--1'),
    current0 : document.getElementById('current--0'),
    current1 : document.getElementById('current--1'),
    dice     : document.querySelector ('.dice'),
    btnNew   : document.querySelector ('.btn--new'),      
    btnRoll  : document.querySelector ('.btn--roll'),      
    btnHold  : document.querySelector ('.btn--hold'),
    player1  : document.querySelector ('.player--0'),
    player2  : document.querySelector ('.player--1')
};

const CONFIG = 
{
    score       : 0
};

// Game States

DOM.score0.textContent = CONFIG.score;

DOM.score1.textContent = CONFIG.score;

DOM.dice.classList.add('hidden');

let currentScore = CONFIG.score;

let activePlayer = false;


// helper functions
const generateRandomNumber = function()
{
    return Math.trunc(Math.random() * 6 + 1);
};

const rollDice = function(diceNumber)
{
    DOM.dice.src = `dice-${diceNumber}.png`;
    DOM.dice.classList.remove('hidden');
};



DOM.btnRoll.addEventListener('click', function()
{
    let randomDice = generateRandomNumber();

    rollDice(randomDice);
    console.log(DOM.player);

    if (!activePlayer)
    {
        if (randomDice !== 1)
        {
            currentScore += randomDice;
            DOM.current0.textContent = currentScore;
            console.log(`Player-1: ${currentScore}`);
        }
        else
        {
            activePlayer = true;
            currentScore = 0;
            DOM.current0.textContent = currentScore;
            DOM.player1.classList.remove('player--active');
            DOM.player2.classList.add('player--active');
        };
    }
    else if (activePlayer)
    {
        if (randomDice !== 1)
        {
            currentScore += randomDice;
            DOM.current1.textContent = currentScore;
            console.log(`Player-2: ${currentScore}`);
        }
        else
        {
            activePlayer = false;
            currentScore = 0;
            DOM.current1.textContent = currentScore;
            DOM.player1.classList.add('player--active');
            DOM.player2.classList.remove('player--active');
        };
    };

});
