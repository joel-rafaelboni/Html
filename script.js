// Variáveis do jogo
let ball, player1, player2, gameArea, startButton;
let ballSpeedX = 2, ballSpeedY = 2;
let player1Speed = 0, player2Speed = 0;
let gameInterval;

// Função para iniciar o jogo
function startGame() {
    // Esconder o botão de começar e mostrar a área de jogo
    startButton.style.display = 'none';
    gameArea.style.display = 'block';

    // Iniciar o movimento da bola
    gameInterval = setInterval(moveBall, 1000 / 60); // 60 frames por segundo
}

// Função para mover a bola
function moveBall() {
    let ballRect = ball.getBoundingClientRect();
    let player1Rect = player1.getBoundingClientRect();
    let player2Rect = player2.getBoundingClientRect();
    let gameAreaRect = gameArea.getBoundingClientRect();

    // Movendo a bola
    ball.style.left = ball.offsetLeft + ballSpeedX + 'px';
    ball.style.top = ball.offsetTop + ballSpeedY + 'px';

    // Verifica colisão com a parede superior e inferior
    if (ball.offsetTop <= 0 || ball.offsetTop + ball.offsetHeight >= gameAreaRect.height) {
        ballSpeedY = -ballSpeedY; // Inverte direção
    }

    // Verifica colisão com os jogadores
    if (ball.offsetLeft <= player1Rect.right && ball.offsetTop + ball.offsetHeight >= player1Rect.top && ball.offsetTop <= player1Rect.bottom) {
        ballSpeedX = -ballSpeedX;
    }
    if (ball.offsetLeft + ball.offsetWidth >= player2Rect.left && ball.offsetTop + ball.offsetHeight >= player2Rect.top && ball.offsetTop <= player2Rect.bottom) {
        ballSpeedX = -ballSpeedX;
    }

    // Verifica se a bola saiu da área de jogo (ponto)
    if (ball.offsetLeft <= 0 || ball.offsetLeft + ball.offsetWidth >= gameAreaRect.width) {
        resetBall();
    }
}

// Função para resetar a bola
function resetBall() {
    ball.style.left = '50%';
    ball.style.top = '50%';
    ballSpeedX = -ballSpeedX; // Inverte a direção
}

// Função para mover os jogadores
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') player2Speed = -5;
    if (e.key === 'ArrowDown') player2Speed = 5;
    if (e.key === 'w') player1Speed = -5;
    if (e.key === 's') player1Speed = 5;
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') player2Speed = 0;
    if (e.key === 'w' || e.key === 's') player1Speed = 0;
});

// Atualiza as posições dos jogadores
function movePlayers() {
    let player1Top = player1.offsetTop + player1Speed;
    let player2Top = player2.offsetTop + player2Speed;

    // Impede que os jogadores saiam da área de jogo
    if (player1Top >= 0 && player1Top + player1.offsetHeight <= gameArea.offsetHeight) {
        player1.style.top = player1Top + 'px';
    }
    if (player2Top >= 0 && player2Top + player2.offsetHeight <= gameArea.offsetHeight) {
        player2.style.top = player2Top + 'px';
    }
}

// Função principal para atualizar o jogo
function updateGame() {
    moveBall();
    movePlayers();
}

// Inicia o jogo quando a página carrega
window.onload = () => {
    ball = document.getElementById('ball');
    player1 = document.getElementById('player1');
    player2 = document.getElementById('player2');
    gameArea = document.getElementById('gameArea');
    startButton = document.getElementById('startButton');

    startButton.addEventListener('click', startGame);

    // Atualiza o jogo a cada frame
    setInterval(updateGame, 1000 / 60); // 60 fps
};

