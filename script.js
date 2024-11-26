// Definindo o canvas e o contexto
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Definindo as variáveis do jogo
const gridSize = 20; // Tamanho das células do grid
const canvasSize = 400; // Tamanho do canvas
let snake = [{ x: 160, y: 160 }];
let direction = { x: gridSize, y: 0 }; // Começa movendo para a direita
let food = { x: 100, y: 100 };
let score = 0;
let gameOver = false;

// Função para desenhar o jogo
function drawGame() {
    if (gameOver) {
        showGameOver();
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas

    // Desenha a cobrinha
    ctx.fillStyle = 'lime';
    snake.forEach((segment) => {
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });

    // Desenha a comida
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);

    // Atualiza a pontuação
    document.getElementById('score').textContent = 'Pontuação: ' + score;
}

// Função para atualizar o estado do jogo
function updateGame() {
    if (gameOver) return;

    // Mover a cobrinha
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // Checa se a cobrinha bateu nas bordas ou em si mesma
    if (
        head.x < 0 || head.x >= canvasSize ||
        head.y < 0 || head.y >= canvasSize ||
        snake.some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        gameOver = true;
        return;
    }

    snake.unshift(head);

    // Checa se a cobrinha comeu a comida
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        food = generateFood();
    } else {
        snake.pop(); // Remove a cauda
    }

    drawGame();
}

// Função para gerar a comida em uma posição aleatória
function generateFood() {
    const x = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    const y = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    return { x, y };
}

// Função para controlar a direção da cobrinha com as teclas
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && direction.y === 0) {
        direction = { x: 0, y: -gridSize };
    } else if (e.key === 'ArrowDown' && direction.y === 0) {
        direction = { x: 0, y: gridSize };
    } else if (e.key === 'ArrowLeft' && direction.x === 0) {
        direction = { x: -gridSize, y: 0 };
    } else if (e.key === 'ArrowRight' && direction.x === 0) {
        direction = { x: gridSize, y: 0 };
    }
});

// Função para reiniciar o jogo
function resetGame() {
    snake = [{ x: 160, y: 160 }];
    direction = { x: gridSize, y: 0 };
    food = generateFood();
    score = 0;
    gameOver = false;
    document.getElementById('gameOverMessage').style.display = 'none';
    document.getElementById('restartButton').style.display = 'none';
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('score').style.display = 'block';
    document.getElementById('instructions').style.display = 'block';
}

// Função para exibir a tela de GAME OVER
function showGameOver() {
    document.getElementById('gameOverMessage').style.display = 'block';
    document.getElementById('finalScore').textContent = score;
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('restartButton').style.display = 'block';
    document.getElementById('score').style.display = 'none';
    document.getElementById('instructions').style.display = 'none';
}

// Função para iniciar o jogo
function startGame() {
    resetGame();
    setInterval(updateGame, 100);  // Atualiza o jogo a cada 100ms
}

// Função de reinício
document.getElementById('restartButton').addEventListener('click', () => {
    resetGame();
    setInterval(updateGame, 100);
});

// Função de iniciar novo jogo
document.getElementById('startButton').addEventListener('click', () => {
    startGame();
});
