const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp= false;
let score=0;
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
        console.log('its the same one bud');
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    const time = randomTime(500, 1500);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp) peep();
    }, time);
}

function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 10000);
}

function bonk(e) {
    console.log("Clicked!"); // Log when the function is called
    if (!e.isTrusted) return; // Cheater!
    const hole = e.target.parentElement; // Get the parent element (the hole)
    if (hole.classList.contains('up')) {  // Check if the hole has class 'up'
      console.log("Mole whacked!"); // Log when a mole is whacked
      score++;
      hole.classList.remove('up');
      scoreBoard.textContent = score;
    }
  }  


holes.forEach(hole => hole.addEventListener('click', bonk));

