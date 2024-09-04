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
