const gameBoard = document.getElementById("game--board");
const playerElement = document.getElementById("player");

const gridSize = 10; //Number of grids 10x10
const tileSize = 50; // Size of each tile
const tileGap = 2; // Gap between tiles
let playerPosition = { x: 0, y: 0 };

const bossSize = 2; // Boss occupies a 2x2 area
let bossPosition = { x: 5, y: 5 }; // Initial position of the boss
const bossHealthElement = document.getElementById("boss--health");
let bossHealth = 50;

// ----------------- Making Grid  ----------------- //

// Make Game Grid
function makeGrid() {
  // Make loop to create tile which will be centered already by the body (CSS)
  // gameBoard.innerHTML = ""; // Clear existing tiles
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      tile.dataset.x = x;
      tile.dataset.y = y;
      gameBoard.appendChild(tile);
    }
  }
  // Update player position after grid has been rendered
  setTimeout(updatePlayerPosition, 0);
  setTimeout(updateBossPosition, 0);
}

// ----------------- Making Boss  ----------------- //

//Create boss
const bossElement = document.createElement("div");
bossElement.classList.add("boss");
bossElement.textContent = "B";
gameBoard.appendChild(bossElement);

//Fixing Boss Posiiton
function updateBossPosition() {
  // Set the boss's position using bossPosition
  const left = bossPosition.x * (tileSize + tileGap);
  const top = bossPosition.y * (tileSize + tileGap);
  bossElement.style.left = `${left}px`;
  bossElement.style.top = `${top}px`;
  bossElement.style.width = `${bossSize * (tileSize + tileGap) - tileGap}px`;
  bossElement.style.height = `${bossSize * (tileSize + tileGap) - tileGap}px`;
}

// ----------------- Player Movement System ----------------- //

// Updates player movement
function updatePlayerPosition() {
  // Calculate the left and top positions based on tile size and gap
  playerElement.style.left = `${playerPosition.x * (tileSize + tileGap)}px`;
  playerElement.style.top = `${playerPosition.y * (tileSize + tileGap)}px`;
}

//Basics movement handler function
function movePlayer(event) {
  switch (event.key) {
    case "ArrowUp":
      if (playerPosition.y > 0) playerPosition.y--;
      break;
    case "ArrowDown":
      if (playerPosition.y < gridSize - 1) playerPosition.y++;
      break;
    case "ArrowLeft":
      if (playerPosition.x > 0) playerPosition.x--;
      break;
    case "ArrowRight":
      if (playerPosition.x < gridSize - 1) playerPosition.x++;
      break;
  }
  updatePlayerPosition();
}

// ----------------- Attacking System ----------------- //

// ---- Implementing Cooldown
const cooldown = 1200; //in miliseconds
let isCooldown = false; //checks if attack is in cooldown

function playerAttack(event) {
  //If cooldown is false stop functioning from completely executing
  if (isCooldown) {
    return;
  }

  //If z is pressed and not in cooldown, player can attack (glow green)
  if (event.key === "z" || event.key === "Z") {
    const damage = Math.floor(Math.random() * 41); //random number from 0-40 is rolled
    console.log(damage);
    bossHealth = Math.max(bossHealth - damage, 0); //random number substracts boss health
    bossHealthElement.textContent = `Boss Health: ${bossHealth}`; //health updated
    checkForWin();

    playerElement.classList.add("attacking");
    isCooldown = true;

    setTimeout(() => {
      playerElement.classList.remove("attacking");
    }, 1000); // 1000 milliseconds = 1 second

    setTimeout(() => {
      isCooldown = false;
    }, cooldown);
  }
}

// ----------------- Tiling System ----------------- //

// Change colors of the top left/right and bottom left/right simultaneously
function changeCornerTilesColor() {
  const corners = [
    { x: 0, y: 0 }, // Top-left corner
    { x: gridSize - 3, y: 0 }, // Top right corner
    { x: 0, y: gridSize - 3 }, // Bottom left corner
    { x: gridSize - 3, y: gridSize - 3 }, // Bottom right corner
  ];

  function colourBlock(corner, color) {
    //Loops through tiles to change color
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        const tile = document.querySelector(
          `.tile[data-x='${corner.x + x}'][data-y='${corner.y + y}']`
        );
        if (tile) {
          tile.style.backgroundColor = color;

          // Reapply the player class if the tile is the player’s position
          if (
            playerPosition.x === corner.x + x &&
            playerPosition.y === corner.y + y
          ) {
            tile.classList.add("player");
            tile.style.zIndex = "10";
            tile.style.position = "relative";
          }
        }
      }
    }
  }

  corners.forEach((corner) => colourBlock(corner, "red"));

  // Change color to blue for 3 seconds
  // Change color to red
  corners.forEach((corner) => colourBlock(corner, "red"));

  // Change color to blue for 3 seconds
  setTimeout(() => {
    corners.forEach((corner) => colourBlock(corner, "blue"));
    updatePlayerPosition(); // Ensure player position is reapplied

    // Revert back to white permanently after 3 seconds
    setTimeout(() => {
      corners.forEach((corner) => colourBlock(corner, "white"));
      updatePlayerPosition(); // Ensure player position is reapplied
    }, 3000);
  }, 3000);
}

// ----------------- Popup & Restarting ----------------- //

//Restarts game to initial conditions
function restarts() {
  // Reset all variables to their initial state
  playerPosition = { x: 0, y: 0 };
  bossPosition = { x: 5, y: 5 };
  bossHealth = 50;
  bossHealthElement.textContent = `Boss Health: ${bossHealth}`;

  // Clear and recreate the game board
  makeGrid();

  // Hide the win popup if it's open
  closeWinPopup();
}

// Function to show the win popup
function showWinPopup() {
  const popup = document.getElementById("win-popup");
  const message = document.getElementById("winner-message");
  message.textContent = `You have won the game!`;
  popup.style.display = "flex";
}

// Function to close the win popup
function closeWinPopup() {
  const popup = document.getElementById("win-popup");
  popup.style.display = "none";
}

// Adding event listener to the close button
document
  .getElementById("close-win-popup")
  .addEventListener("click", closeWinPopup);

document
  .getElementById("restart-win-popup")
  .addEventListener("click", function () {
    location.reload();
  });

function checkForWin() {
  // This is a placeholder condition for winning.
  if (bossHealth === 0) {
    showWinPopup();
  }
}

// Starts game
makeGrid();
window.addEventListener("keydown", movePlayer);
window.addEventListener("keydown", playerAttack);
// setInterval(changeCornerTilesColor, 10000);
