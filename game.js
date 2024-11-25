// DOM Elements
const grid = document.getElementById("grid");
const targetColorDisplay = document.getElementById("target");
const scoreDisplay = document.getElementById("score-value");

// Game Variables
let targetColor = "";
let score = 0;
let gameInterval = null;

// Colors for the grid
const colors = ["red", "blue", "green", "yellow", "purple", "orange"];

// Initialize Game
function startGame() {
    resetGame(); // Reset variables and UI
    setNewTargetColor();
    gameInterval = setInterval(renderGrid, 1500); // Update grid every 1.5 seconds
}

// Reset the game variables and UI
function resetGame() {
    clearExistingIntervals(); // Stop any ongoing intervals
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

// End the game
function endGame() {
    clearExistingIntervals(); // Stop grid updates
    alert(`Game Over! Your final score is: ${score}`);

    // Display "Game Over" and reset UI
    grid.innerHTML = ""; // Clear the grid
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
