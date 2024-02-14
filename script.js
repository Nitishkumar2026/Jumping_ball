const ball = document.getElementById('ball');
const wall = document.getElementById('wall');
const scoreSpan = document.getElementById('score');
const distanceSpan = document.getElementById('distance');
const timerSpan = document.getElementById('time');
const restartButton = document.getElementById('restartButton');
const pauseResumeButton = document.getElementById('pauseResumeButton');

let isJumping = false;
let jumpTimeout;
let score = 0;
let distance = 0;
let timer = 0;
let gamePaused = false;
let wallInterval;
let scoreInterval;
let gameStopped = false;

function jump() {
    if (!isJumping && !gamePaused && !gameStopped) {
        isJumping = true;
        ball.style.bottom = '150px';
        jumpTimeout = setTimeout(() => {
            ball.style.bottom = '0';
            isJumping = false;
        }, 300);
    }
}

function moveWall() {
    const maxWidth = window.innerWidth;
    const randomPosition = Math.floor(Math.random() * (maxWidth - 100));
    wall.style.right = randomPosition + 'px';
}

function updateScore() {
    score++;
    scoreSpan.textContent = score;
}

function updateDistance() {
    distanceSpan.textContent = distance;
}

function updateTimer() {
    timer++;
    timerSpan.textContent = timer;
    if (timer >= 240) { // 4 minutes (240 seconds)
        stopGame();
        alert(`Time's up!\nYour Score: ${score}`);
        resetGame();
    }
}

function stopGame() {
    clearInterval(wallInterval);
    clearInterval(scoreInterval);
    clearTimeout(jumpTimeout);
    gameStopped = true;
}

function resetGame() {
    stopGame();
    score = 0;
    distance = 0;
    timer = 0;
    scoreSpan.textContent = score;
    distanceSpan.textContent = distance;
    timerSpan.textContent = timer;
    moveWall();
    gameStopped = false;
}

moveWall();
wallInterval = setInterval(moveWall, 2000);
scoreInterval = setInterval(updateTimer, 1000);

document.addEventListener('click', () => {
    jump();
});

restartButton.addEventListener('click', () => {
    resetGame();
});

pauseResumeButton.addEventListener('click', () => {
    if (!gamePaused && !gameStopped) {
        clearInterval(wallInterval);
        clearInterval(scoreInterval);
        clearTimeout(jumpTimeout);
        gamePaused = true;
        pauseResumeButton.textContent = 'Resume';
    } else if (!gameStopped) {
        wallInterval = setInterval(moveWall, 2000);
        scoreInterval = setInterval(updateTimer, 1000);
        jump();
        gamePaused = false;
        pauseResumeButton.textContent = 'Pause';
    }
});

setInterval(() => {
    const ballBottom = parseInt(ball.style.bottom);
    const wallRight = parseInt(wall.style.right);
    if (ballBottom <= 100 && wallRight <= 50) {
        stopGame();
        alert(`Game Over!\nYour Score: ${score}\nDistance Traveled: ${distance}`);
        resetGame();
    } else if (!gamePaused && !gameStopped) {
        distance++;
        updateDistance();
        updateScore();
    }
}, 50);