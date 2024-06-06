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
let exit = generateExit();
let quickSand = generateExit();
let highScore = 0;
let sandPits = [];
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;

// Draw game map, human, zombie, exit
function draw() {
	board.innerHTML = "";
    drawHuman();
    drawZombie();
    drawSand()
    drawExit();
}

// Draw human
function drawHuman() {
	human.forEach((segment) => {
		const humanElement = createGameElement("div", "human");
        humanElement.innerHTML = "H";
		setPosition(humanElement, segment);
		board.appendChild(humanElement);
	});
}

// Draw zombie
function drawZombie() {
	zombie.forEach((segment) => {
		const zombieElement = createGameElement("div", "zombie");
        zombieElement.innerHTML = "Z";
		setPosition(zombieElement, segment);
		board.appendChild(zombieElement);
	});
}

// Draw exit
function drawExit() {
	exit.forEach((segment) => {
		const exitElement = createGameElement("div", "exit");
        exitElement.innerHTML = "E";
		setPosition(exitElement, segment);
		board.appendChild(exitElement);
	});
}


// Generate ten random positions for the sand pits
for (let i = 0; i < 10; i++) {
    const sandPit = { x: Math.floor(Math.random() * gridSize) + 1, y: Math.floor(Math.random() * gridSize) + 1 };
    sandPits.push(sandPit);
}

// Draw the sand pits on the game board
function drawSand() {
    sandPits.forEach((sandPit) => {
        const sandElement = createGameElement("div", "sand");
        sandElement.innerHTML = "P";
        setPosition(sandElement, sandPit);
        board.appendChild(sandElement);
    });
}

// Call drawSand function to draw the sand pits
drawSand();

// Create a game element (human, zombie, exit)
function createGameElement(tag, className) {
	const element = document.createElement(tag);
	element.className = className;
	return element;
}

// Set element position on the grid
function setPosition(element, position) {
	element.style.gridColumnStart = position.x;
	element.style.gridRowStart = position.y;
}

// Generate a new exit position
function generateExit() {
	const x = Math.floor(Math.random() * gridSize) + 1;
	const y = Math.floor(Math.random() * gridSize) + 1;
	return [{ x: x, y: y }];
}

// Move human
function moveHuman(dx, dy) {
    const head = { x: human[0].x + dx, y: human[0].y + dy };
    if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
        return; // prevent moving out of bounds
    }
    human = [head];
    moveZombie();
    draw();
}

// Move zombie
function moveZombie() {
    const humanHead = human[0];
    const zombieHead = zombie[0];
    let dx = 0;
    let dy = 0;

    if (humanHead.x > zombieHead.x) {
        dx = 1;
    } else if (humanHead.x < zombieHead.x) {
        dx = -1;
    }

    if (humanHead.y > zombieHead.y) {
        dy = 1;
    } else if (humanHead.y < zombieHead.y) {
        dy = -1;
    }

    const newZombieHead = { x: zombieHead.x + dx, y: zombieHead.y + dy };
    zombie = [newZombieHead];
}

// Handle keyboard events for 8-directional movement
function handleKey(event) {
    if (
		(!gameStarted && event.code === "Space") ||
		(!gameStarted && event.key === " ")
	) {
		startGame();
	}else{
    switch (event.key) {
        case "ArrowUp":
        case "w":
            moveHuman(0, -1);
            break;
        case "ArrowDown":
        case "s":
            moveHuman(0, 1);
            break;
        case "ArrowLeft":
        case "a":
            moveHuman(-1, 0);
            break;
        case "ArrowRight":
        case "d":
            moveHuman(1, 0);
            break;
        case "i": // up-right
            moveHuman(1, -1);
            break;
        case "j": // down-left
            moveHuman(-1, 1);
            break;
        case "k": // down-right
            moveHuman(1, 1);
            break;
        case "l": // up-left
            moveHuman(-1, -1);
            break;
    }}
    checkCollisions();
}

document.addEventListener("keydown", handleKey);
// Function to check for collisions
function checkCollisions() {
    const humanHead = human[0];
    const zombieHead = zombie[0];

    // Check if human hits zombie
    if (humanHead.x === zombieHead.x && humanHead.y === zombieHead.y) {
        gameOver();
        return;
    }

      // Check if zombie hits sand
    const hitSandIndex = sandPits.findIndex((sandPit) => sandPit.x === zombieHead.x && sandPit.y === zombieHead.y);
    if (hitSandIndex !== -1) {
        zombie = []; // Remove the zombie
        gameWon();
        return;
    }

    // Check if human hits exit
    if (humanHead.x === exit[0].x && humanHead.y === exit[0].y) {
        gameWon();
    }
}

function gameOver() {
    // Game over logic
    console.log("Game over!");
    clearInterval(gameInterval); // Stop the game loop
}

function gameWon() {
    // Game won logic
    console.log("You win!");
    clearInterval(gameInterval); // Stop the game loop
}

// In the startGame function, start the game loop
function startGame() {
	gameStarted = true; // Keep track of a running game
	instructionText.style.display = "none";
	logo.style.display = "none";
    draw();
	gameInterval = setInterval(() => {
		draw();
	}, gameSpeedDelay);
}
draw();
