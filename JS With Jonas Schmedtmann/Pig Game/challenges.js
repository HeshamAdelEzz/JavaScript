/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
// define variables
let roundScore, activePlayer, score,lastDice ;
    
diceImg = document.querySelectorAll('.dice'),
rollDiceBtn = document.querySelector('.btn-roll'),
holdBtn = document.querySelector('.btn-hold'),
newBtn = document.querySelector('.btn-new'),
playerTotalScore = document.querySelector(`#score-${activePlayer}`);

init();

//Declaire all event listeners
function loadEventListeners(){
// roll dice event
rollDiceBtn.addEventListener('click',function(){ 
//1- random number
let dice1 = Math.floor(Math.random()*6) + 1,
    dice2 = Math.floor(Math.random()*6) + 1;



// 2- display result
diceImg.forEach(item =>item.style.display ='block');
//diceImg.setAttribute('src',`dice-${dice1}.png`);
document.getElementById('dice-1').src = `dice-${dice1}.png`;
document.getElementById('dice-2').src = `dice-${dice2}.png`;

//3- update round score if the rolled number !== 1
if (dice1 === 6 && lastDice === 6) {
    // player loses the scoresco
    score[activePlayer]=0;
    document.querySelector(`#score-${activePlayer}`).textContent ='0';
}else if (dice1 !== 1 && dice2 !== 1) {
    roundScore += dice1 + dice2;
    document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
} else {
    // next player
    nextPlayer();
}
lastDice = dice;
});
// hold btn event
holdBtn.addEventListener('click',function(){ 
// add current score to global score  
score[activePlayer] += roundScore ;

// update the UI
let 
    currentScore = document.querySelector(`#current-${activePlayer}`), 
    globalScore  = document.querySelector(`#score-${activePlayer}`),
    inputWinScore = document.querySelector('.winning-score'),
    winningScore = 100;
    if (inputWinScore.value) 
        winningScore = inputWinScore.value ;
        
globalScore.textContent = score[activePlayer];
// check if the player win
if (score[activePlayer] >= winningScore) {
    document.querySelector(`#name-${activePlayer}`).textContent = 'winner';
    document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
    document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
    diceImg.style.display = 'none';
    rollDiceBtn.disabled = true;
    holdBtn.disabled = true;
} else {
    // next player
    nextPlayer();   
}
});
// new btn event
newBtn.addEventListener('click',function(){ 
rollDiceBtn.disabled = false;
holdBtn.disabled = false;
document.querySelector(`.player-${activePlayer}-panel`).classList.remove('winner');
document.querySelector(`#name-${activePlayer}`).textContent = `player ${activePlayer+1}`;
document.querySelector(`#name-${activePlayer}`).classList.remove('active');  
document.querySelector(`.player-0-panel`).classList.add('active');
init();

});
}



// functions Area
function init(){
roundScore = 0,
activePlayer = 0;  // 0 => firstPlayer & 1 => secondPlayer
score = [0,0];

document.querySelector(`#current-0`).textContent = '0';
document.querySelector(`#current-1`).textContent = '0';
document.querySelector(`#score-0`).textContent = '0'; 
document.querySelector(`#score-1`).textContent = '0'; 
//document.querySelector('.dice').style.display = 'none';
diceImg.forEach(item => item.style.display ='none');

}
function nextPlayer(){
document.querySelector(`#current-0`).textContent = '0';
document.querySelector(`#current-1`).textContent = '0';  
roundScore = 0;

document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
document.querySelector(`.player-${activePlayer}-panel`).classList.add('active');
diceImg.style.display = 'none';
}






loadEventListeners();