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
    SCORES      : [0, 0],
    GAMESTATE   : true,
    CURRENTSCORE: 0,
    ACTIVEPLAYER: 0,
    MAX         : 20
};

console.log(`Current MAX SCORE: ${CONFIG.MAX}`);


// Game States

DOM.score0.textContent = 0;

DOM.score1.textContent = 0;

DOM.dice.classList.add('hidden');


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


const addScoreToCurrentPlayer = function()
    {
        CONFIG.SCORES[CONFIG.ACTIVEPLAYER] += CONFIG.CURRENTSCORE;
        DOM[`score${CONFIG.ACTIVEPLAYER}`].textContent = CONFIG.SCORES[CONFIG.ACTIVEPLAYER];
    };


const switchPlayer = function()
{
    DOM[`current${CONFIG.ACTIVEPLAYER}`].textContent = 0;
    CONFIG.CURRENTSCORE = 0;
    CONFIG.ACTIVEPLAYER = CONFIG.ACTIVEPLAYER === 0 ? 1 : 0;
    DOM.player1.classList.toggle('player--active')
    DOM.player2.classList.toggle('player--active')
};


const checkWinner = function()
{
    if (CONFIG.SCORES[CONFIG.ACTIVEPLAYER] >= CONFIG.MAX)
    {
        CONFIG.GAMESTATE = false;
        DOM[`player${CONFIG.ACTIVEPLAYER + 1}`].classList.add('player--winner');
        DOM[`player${CONFIG.ACTIVEPLAYER + 1}`].classList.remove('player--active');
        DOM.dice.classList.add('hidden');
        return;
    }
    else
    {
        switchPlayer();
    };
};


const resetGame = function()
{
    CONFIG.GAMESTATE = true;
    CONFIG.SCORES = [0, 0];
    DOM[`player${CONFIG.ACTIVEPLAYER + 1}`].classList.remove('player--active');
    DOM[`player${CONFIG.ACTIVEPLAYER + 1}`].classList.remove('player--winner');
    CONFIG.ACTIVEPLAYER = 0;
    CONFIG.CURRENTSCORE = 0;
    DOM.current0.textContent = 0;
    DOM.current1.textContent = 0;
    DOM.score0.textContent = 0;
    DOM.score1.textContent = 0;
    DOM.player1.classList.add('player--active');
};


DOM.btnRoll.addEventListener('click', function()
{
    if (CONFIG.GAMESTATE)
    {
        let randomDice = generateRandomNumber();
    
        rollDice(randomDice);

        if (randomDice!==1)
        {
            CONFIG.CURRENTSCORE += randomDice;
            DOM[`current${CONFIG.ACTIVEPLAYER}`].textContent = CONFIG.CURRENTSCORE;
        }
        else
        {
            switchPlayer();
        };
    };

});

DOM.btnHold.addEventListener('click', function()
{
    if (CONFIG.GAMESTATE)
    {
        addScoreToCurrentPlayer();
        checkWinner();
    }
});

DOM.btnNew.addEventListener('click', () => resetGame());
