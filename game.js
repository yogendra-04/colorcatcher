// DOM Elements
const grid = document.getElementById("grid");
const targetColorDisplay = document.getElementById("target");
const scoreDisplay = document.getElementById("score-value");
const highScoreDisplay = document.getElementById("high-score-value");
const pauseButton = document.getElementById("pause-button"); // Pause button
const gameOverOverlay = document.getElementById("game-over");
const restartButton = document.getElementById("restart-button");
const difficultyButton = document.getElementById("difficulty-button"); // Difficulty button

// Game Variables
let targetColor = "";
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let gameInterval = null;
let isPaused = false; // Track if the game is paused
let isDifficult = false; // Track difficulty level

// Colors for the grid
const colors = ["red", "blue", "green", "yellow", "purple", "orange"];

// Initialize Game
function startGame() {
    resetGame(); // Reset variables and UI
    updateHighScoreDisplay(); // Display current high score
    setNewTargetColor();
    gameInterval = setInterval(renderGrid, 1500); // Update grid every 1.5 seconds
    pauseButton.textContent = "Pause"; // Set pause button text
    isPaused = false; // Game starts unpaused
    gameOverOverlay.classList.remove("show"); // Hide Game Over overlay
}

// Reset the game variables and UI
function resetGame() {
    clearExistingIntervals();
    score = 0;
    scoreDisplay.textContent = score;
    grid.innerHTML = ""; // Clear the grid
    targetColorDisplay.textContent = "";
}

// Set a new target color
function setNewTargetColor() {
    if (!isDifficult) {
        // Easy mode: Target color matches the name
        targetColor = colors[Math.floor(Math.random() * colors.length)];
        targetColorDisplay.textContent = targetColor;
        targetColorDisplay.style.color = targetColor;
    } else {
        // Difficult mode: Target color name and its text color are different
        const colorIndex = Math.floor(Math.random() * colors.length);
        const nameIndex = (colorIndex + Math.floor(Math.random() * (colors.length - 1)) + 1) % colors.length;

        targetColor = colors[colorIndex]; // Actual target color
        targetColorDisplay.textContent = colors[nameIndex]; // Display a mismatched name
        targetColorDisplay.style.color = colors[colorIndex]; // Text color matches the target color
    }
}

// Render the grid with random colors
function renderGrid() {
    if (isPaused) return; // Don't render if the game is paused

    grid.innerHTML = ""; // Clear the grid
    for (let i = 0; i < 16; i++) {
        const square = document.createElement("div");
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        square.classList.add("square");
        square.style.backgroundColor = randomColor;

        // Add click event
        square.addEventListener("click", (event) => handleSquareClick(event, randomColor));

        grid.appendChild(square);
    }
}

// Handle square clicks
function handleSquareClick(event, color) {
    if (isPaused) return; // Ignore clicks when the game is paused

    if (color === targetColor) {
        updateScore(score + 1); // Update the score
        setNewTargetColor(); // Set a new target color
    } else {
        endGame(); // End game on wrong click
    }
}

// Update the score
function updateScore(newScore) {
    score = newScore;
    scoreDisplay.textContent = score;

    // Animate score display
    scoreDisplay.classList.remove("pulse");
    void scoreDisplay.offsetWidth; // Trigger reflow
    scoreDisplay.classList.add("pulse");
}

// Update the high score
function updateHighScore() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore); // Save high score to localStorage
        updateHighScoreDisplay(); // Update the display
    }
}

// Display the high score
function updateHighScoreDisplay() {
    highScoreDisplay.textContent = highScore;
}

// Pause or Resume the game
function togglePauseGame() {
    isPaused = !isPaused;
    pauseButton.textContent = isPaused ? "Resume" : "Pause";

    if (!isPaused) {
        // If resuming, restart the grid updates
        gameInterval = setInterval(renderGrid, 1500);
    } else {
        // If pausing, clear the interval
        clearExistingIntervals();
    }
}

// Toggle Difficulty
function toggleDifficulty() {
    isDifficult = !isDifficult;
    difficultyButton.textContent = isDifficult ? "Switch to Easy" : "Switch to Difficult";
    setNewTargetColor(); // Refresh the target color immediately
}

// End the game
function endGame() {
    clearExistingIntervals(); // Stop grid updates
    updateHighScore(); // Check and update the high score

    // Show the Game Over overlay
    document.getElementById("final-score").textContent = score;
    gameOverOverlay.classList.add("show");
}

// Clear all intervals
function clearExistingIntervals() {
    clearInterval(gameInterval);
}

// Start the game when the page loads
startGame();

// Add event listeners
pauseButton.addEventListener("click", togglePauseGame);
restartButton.addEventListener("click", startGame);
difficultyButton.addEventListener("click", toggleDifficulty);
