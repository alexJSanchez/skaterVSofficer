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
    drawHuman()

}

// Draw snake
function drawHuman() {
	human.forEach((segment) => {
		const humanElement = createGameElement("div", "human");
		setPosition(humanElement, segment);
		board.appendChild(humanElement);
	});
}
// Create a snake or food cube/div
function createGameElement(tag, className) {
	const element = document.createElement(tag);
	element.className = className;
	return element;
}
// Set the position of snake or food
function setPosition(element, position) {
	element.style.gridColumn = position.x;
	element.style.gridRow = position.y;
}

draw()