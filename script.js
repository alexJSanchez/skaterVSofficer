// Define HTML elements
const board = document.getElementById("game-board");
const instructionText = document.getElementById("instruction-text");
const logo = document.getElementById("logo");
const score = document.getElementById("score");
const highScoreText = document.getElementById("highScore");

// Define game variables
const gridSize = 20;
let human = [{ x: 10, y: 10 }];
let zombies = [];
let exit = generateExit();
let sandPits = [];
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;


// Draw game map, human, zombies, exit
function draw() {
    board.innerHTML = "";
    drawHuman();
    drawZombies();
    drawSand();
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

// Draw zombies
function drawZombies() {
    zombies.forEach((zombiePos) => {
        const zombieElement = createGameElement("div", "zombie");
        zombieElement.innerHTML = "Z";
        setPosition(zombieElement, zombiePos);
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

// Generate ten random positions for the zombies
for (let i = 0; i < 5; i++) {
    const zombiePos = { x: Math.floor(Math.random() * gridSize) + 1, y: Math.floor(Math.random() * gridSize) + 1 };
    zombies.push(zombiePos);
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
    moveZombies()
    checkCollisions();
    draw();
}

// Move zombies
function moveZombies() {
    zombies = zombies.map((zombiePos) => {
        let dx = 0;
        let dy = 0;

        if (human[0].x > zombiePos.x) {
            dx = 1;
        } else if (human[0].x < zombiePos.x) {
            dx = -1;
        }

        if (human[0].y > zombiePos.y) {
            dy = 1;
        } else if (human[0].y < zombiePos.y) {
            dy = -1;
        }

        return { x: zombiePos.x + dx, y: zombiePos.y + dy };
    });
}

// Handle keyboard events for movement
function handleKey(event) {
    if (!gameStarted) {
        startGame();
    } else {
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
        }
    }
}

// Function to check for collisions
function checkCollisions() {
    const humanHead = human[0];

    // Check if human hits zombies
    zombies.forEach((zombiePos, index) => {
        if (humanHead.x === zombiePos.x && humanHead.y === zombiePos.y) {
            gameOver();
        }
    });

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
    logo.style.display  = "none";
    draw();
}

document.addEventListener("keydown", handleKey);
