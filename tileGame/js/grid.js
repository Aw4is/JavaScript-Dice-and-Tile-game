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
