// Define HTML elements
const board = document.getElementById("game-board");
const instructionText = document.getElementById("instruction-text");
const logo = document.getElementById("logo");
const score = document.getElementById("score");
const highScoreText = document.getElementById("highScore");


// Define game variables
const gridSize = 20;
let human = [{ x: 10, y: 10 }];
// let food = generateFood();
let highScore = 0;
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;


// Draw game map, snake, food
function draw() {
	board.innerHTML = "";

}

// Draw snake
function drawHuman() {
	snake.forEach((segment) => {
		const humanElement = createGameElement("div", "human");
		setPosition(humanElement, segment);
		board.appendChild(humanElement);
	});
}