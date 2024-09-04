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
