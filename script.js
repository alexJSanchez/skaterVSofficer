// Define HTML elements
const board = document.getElementById("game-board");
const instructionText = document.getElementById("instruction-text");
const logo = document.getElementById("logo");
const score = document.getElementById("score");
const highScoreText = document.getElementById("highScore");


// Define game variables
const gridSize = 20;
let human = [{ x: 10, y: 10 }];
let zombie = [{ x: 5, y: 5 }];
let exit = generateExit()
// let food = generateFood();
let highScore = 0;
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;


// Draw game map, snake, food
function draw() {
	board.innerHTML = "";
    drawHuman()
    drawZombie()
    drawExit()

}

// Draw human
function drawHuman() {
	human.forEach((segment) => {
		const humanElement = createGameElement("div", "human");
        humanElement.innerHTML = "H"
		setPosition(humanElement, segment);
		board.appendChild(humanElement);
	});
}
// Draw zombie
function drawZombie() {
	zombie.forEach((segment) => {
		const zombieElement = createGameElement("div", "zombie");
        zombieElement.innerHTML = "Z"
		setPosition(zombieElement, segment);
		board.appendChild(zombieElement);
	});
}
// generate exit
function drawExit() {
	exit.forEach((segment) => {
		const exitElement = createGameElement("div", "exit");
        exitElement.innerHTML = "E"
		setPosition(exitElement, segment);
		board.appendChild(exitElement);
	});
}
// Create a snake or food cube/div
function createGameElement(tag, className) {
	const element = document.createElement(tag);
	element.className = className;
	return element;
}
// set element on grid position
function setPosition(element, position) {
	element.style.gridColumn = position.x;
	element.style.gridRow = position.y;
}
// Generate food
function generateExit() {
	const x = Math.floor(Math.random() * gridSize) + 1;
	const y = Math.floor(Math.random() * gridSize) + 1;
	return [{ x:x, y:y }];
}
draw()