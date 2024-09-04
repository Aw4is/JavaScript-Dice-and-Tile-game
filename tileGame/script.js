const gameBoard = document.getElementById("game--board");
const playerElement = document.getElementById("player");
const gridSize = 10; //Number of grids 10x10
const tileSize = 50; // Size of each tile
const tileGap = 2; // Gap between tiles
let playerPosition = { x: 0, y: 0 };

// Make Game Grid
function makeGrid() {
  // Make loop to create tile which will be centered already by the body (CSS)
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
}

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
  setTimeout(() => {
    corners.forEach((corner) => colourBlock(corner, "blue"));
    updatePlayerPosition(); // Ensure player position is reapplied
  }, 3000);

  // Revert back to whites 5 seconds
  setTimeout(() => {
    corners.forEach((corner) => colourBlock(corner, "white"));
    updatePlayerPosition(); // Ensure player position is reapplied
  }, 5000);
}

// Starts game
makeGrid();
window.addEventListener("keydown", movePlayer);
setInterval(changeCornerTilesColor, 5000);
