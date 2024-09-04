const gameBoard = document.getElementById("game--board");
const gridSize = 10;
let playerPosition = { x: 0, y: 0 };

//Make Game Grid
function makeGrid() {
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      // Creates a div element that represents each tile
      const tile = document.createElement("div");
      //Adds tile class to tile (div element)
      tile.classList.add("tile");
      //Sets data attributes
      tile.dataset.x = x;
      tile.dataset.y = y;
      //Adds newly created tile div to the gameboard
      gameBoard.appendChild(tile);
    }
  }
  updatePlayerPosition();
}

//Handles player movement
function updatePlayerPosition() {
  document.querySelectorAll(".tile").forEach((tile) => {
    tile.classList.remove("player");
    tile.style.zIndex = "";
  });

  const playerTile = document.querySelector(
    `.tile[data-x='${playerPosition.x}'][data-y='${playerPosition.y}']`
  );
  if (playerTile) {
    playerTile.classList.add("player");
    playerTile.style.zIndex = "10";
    playerTile.style.position = "relative";
  }
}

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

//Change colors of the top left/right and bottom left/right simultaneoulsy
function changeCornerTilesColor() {
  const corners = [
    { x: 0, y: 0 }, //Top-left corner
    { x: gridSize - 3, y: 0 }, //Top right corner
    { x: 0, y: gridSize - 3 }, //Bottom left corner
    { x: gridSize - 3, y: gridSize - 3 }, //Bottom right corner
  ];

  //Add color to each block (red)
  function colourBlock(corner, color) {
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

  // Revert colors to light orange after 1 second
  setTimeout(() => {
    corners.forEach((corner) => colourBlock(corner, "blue"));
    updatePlayerPosition(); // Ensure player position is reapplied
  }, 3000);

  setTimeout(() => {
    corners.forEach((corner) => colourBlock(corner, "white"));
    updatePlayerPosition(); // Ensure player position is reapplied
  }, 5000);
}

// starts game
makeGrid();
window.addEventListener("keydown", movePlayer);
setInterval(changeCornerTilesColor, 5000);
