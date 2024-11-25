// DOM Elements
const grid = document.getElementById("grid");
const targetColorDisplay = document.getElementById("target");
const scoreDisplay = document.getElementById("score-value");
const highScoreDisplay = document.getElementById("high-score-value");
const pauseButton = document.getElementById("pause-button"); // Pause button

// Game Variables
let targetColor = "";
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let gameInterval = null;
let isPaused = false; // Track if the game is paused

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
    targetColor = colors[Math.floor(Math.random() * colors.length)];
    targetColorDisplay.textContent = targetColor;
    targetColorDisplay.style.color = targetColor;
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
        square.addEventListener("click", () => {
            if (square.style.backgroundColor === targetColor) {
                updateScore(score + 1); // Update the score
                setNewTargetColor(); // Set a new target color
            } else {
                endGame(); // End game on wrong click
            }
        });

        grid.appendChild(square);
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

// End the game
function endGame() {
    clearExistingIntervals(); // Stop grid updates
    updateHighScore(); // Check and update the high score
    alert(`Game Over! Your final score is: ${score}`);
    
    // Reset UI
    grid.innerHTML = "";
    targetColorDisplay.textContent = "Game Over";

    // Restart the game after a delay
    setTimeout(() => startGame(), 2000);
}

// Clear all intervals
function clearExistingIntervals() {
    clearInterval(gameInterval);
}

// Start the game when the page loads
startGame();

// Add event listener for pause button
pauseButton.addEventListener("click", togglePauseGame);
