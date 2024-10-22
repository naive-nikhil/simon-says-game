// Game sequence array and user sequence array
let gameSeq = [];
let userSeq = [];

// Button colors array
let btnsArr = ["blue", "red", "orange", "yellow"];

// Game states and variables
let started = false;
let level = 0;
let highScore = 0;
let isAnimating = false; // Flag to prevent multiple inputs during reset

// DOM element selectors for score, high score, and game info
let hiScore = document.querySelector("#hi");
let score = document.querySelector("#sc");
let info = document.querySelector(".bottom-card");
let btns = document.querySelectorAll(".btn"); // All color buttons

// Function to add event listeners to buttons (for both click and touchend events)
function addBtnListeners() {
  btns.forEach((btn) => {
    btn.addEventListener("click", btnPress);
    btn.addEventListener("touchend", btnPress); // Ensures proper input for mobile devices
  });
}

// Function to start the game (triggered by keypress or touch)
function startGame() {
  if (!started && !isAnimating) {
    started = true;
    levelUp(); // Start the first level
    addBtnListeners(); // Enable button interactions
  }
}

// Start game on keypress or touch
document.addEventListener("keypress", startGame);
document.addEventListener("touchend", startGame);

// Function to handle level progression
function levelUp() {
  userSeq = []; // Reset user sequence for the new level
  level++; // Increase the level
  score.innerText = `Score: ${level}`; // Update score on the screen
  info.innerText = "Game Started!"; // Update game status

  // Choose a random button to flash
  let ranIdx = Math.floor(Math.random() * btnsArr.length); // Pick a random index
  let ranColor = btnsArr[ranIdx]; // Get the corresponding color
  let ranBtn = document.querySelector(`.${ranColor}`); // Select the button element

  gameSeq.push(ranColor); // Add color to game sequence
  console.log(`GameSeq - ${gameSeq}`); // Log game sequence for debugging
  btnFlash(ranBtn); // Flash the randomly selected button
}

// Function to check if the user's answer is correct
function checkAns(idx) {
  if (gameSeq[idx] === userSeq[idx]) { // If user pressed the correct button
    flashInfo("right", 300); // Show green flash indicating correct press

    if (gameSeq.length === userSeq.length) { // If user completed the sequence
      setTimeout(levelUp, 1000); // Move to the next level after 1 second
    }
  } else {
    gameOver(); // If user pressed the wrong button, end the game
  }
}

// Function to handle game over sequence
function gameOver() {
  if (isAnimating) return; // Prevent multiple triggers during reset
  isAnimating = true;

  flashInfo("wrong", 300); // Show red flash indicating wrong press

  // Display game over message
  info.innerHTML = `Game Over!<br>Press any key to start again 😊`;

  // Disable button interactions during game over/reset
  removeBtnListeners();

  // Delay to allow the Game Over message to be displayed before reset
  setTimeout(() => {
    if (level > highScore) { // Update high score if necessary
      highScore = level;
      hiScore.innerText = `High Score: ${highScore}`;
    }
    resetGame(); // Reset the game
    isAnimating = false; // Re-enable input after reset
  }, 500); // Short delay for Game Over message
}

// Function to flash a button with a brief visual effect
function btnFlash(btn) {
  btn.classList.add("flash");

  // Remove flash class after 300ms to simulate button press
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 300);
}

// Function to handle user button press
function btnPress(e) {
  e.preventDefault(); // Prevent default behavior (useful for mobile)

  if (!started || isAnimating) return; // Ignore input if the game is not started or during reset

  let color = this.getAttribute("id"); // Get the color of the pressed button
  userSeq.push(color); // Add color to user's sequence
  console.log(`UserSeq - ${userSeq}`); // Log user sequence for debugging

  btnFlash(this); // Flash the pressed button
  checkAns(userSeq.length - 1); // Check if the user's input matches the game sequence
}

// Function to remove event listeners from buttons
function removeBtnListeners() {
  btns.forEach((btn) => {
    btn.removeEventListener("click", btnPress);
    btn.removeEventListener("touchend", btnPress);
  });
}

// Function to reset the game variables and state
function resetGame() {
  started = false; // Set game state to not started
  gameSeq = []; // Clear game sequence
  userSeq = []; // Clear user sequence
  level = 0; // Reset level
  removeBtnListeners(); // Remove button event listeners
}

// Helper function to flash the game info element for correct/wrong actions
function flashInfo(type, duration) {
  info.classList.add(type);
  info.classList.add("flash");

  setTimeout(() => {
    info.classList.remove(type);
    info.classList.remove("flash");
  }, duration);
}
