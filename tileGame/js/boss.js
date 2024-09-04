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
