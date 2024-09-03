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
  });

  const playerTile = document.querySelector(
    `.tile[data-x='${playerPosition.x}'][data-y='${playerPosition.y}']`
  );
  playerTile.classList.add("player");
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

// starts game
makeGrid();
window.addEventListener("keydown", movePlayer);
