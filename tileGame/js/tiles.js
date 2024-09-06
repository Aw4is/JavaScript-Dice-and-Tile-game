// tiles.js
export function changeCornerTilesColor(playerPosition, tileSize, tileGap) {
  const corners = [
    { x: 0, y: 0 },
    { x: gridSize - 3, y: 0 },
    { x: 0, y: gridSize - 3 },
    { x: gridSize - 3, y: gridSize - 3 },
  ];

  function colourBlock(corner, color) {
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        const tile = document.querySelector(
          `.tile[data-x='${corner.x + x}'][data-y='${corner.y + y}']`
        );
        if (tile) {
          tile.style.backgroundColor = color;
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

  setTimeout(() => {
    corners.forEach((corner) => colourBlock(corner, "blue"));
    updatePlayerPosition(); // Ensure player position is reapplied

    setTimeout(() => {
      corners.forEach((corner) => colourBlock(corner, "white"));
      updatePlayerPosition(); // Ensure player position is reapplied
    }, 3000);
  }, 3000);
}
