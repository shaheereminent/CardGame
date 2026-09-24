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
    MAX         : 100
};


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


const switchPlayer = function()
{
    DOM[`current${CONFIG.ACTIVEPLAYER}`].textContent = 0;
    CONFIG.CURRENTSCORE = 0;
    CONFIG.ACTIVEPLAYER = CONFIG.ACTIVEPLAYER === 0 ? 1 : 0;
    DOM.player1.classList.toggle('player--active')
    DOM.player2.classList.toggle('player--active')
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
        CONFIG.SCORES[CONFIG.ACTIVEPLAYER] += CONFIG.CURRENTSCORE
        DOM[`score${CONFIG.ACTIVEPLAYER}`].textContent = CONFIG.SCORES[CONFIG.ACTIVEPLAYER]
    
        switchPlayer();
    };
});
