const gameBoard = document.getElementById("game--board");
const playerElement = document.getElementById("player");
const playerImg = document.querySelector(".playerImg")

const gridSize = 10; //Number of grids 10x10
const tileSize = 50; // Size of each tile
const tileGap = 2; // Gap between tiles
let playerPosition = { x: 0, y: 0 };

const bossSize = 4; // Boss occupies a 2x2 area
let bossPosition = { x: 5, y: 5 }; // Initial position of the boss
const bossHealthElement = document.getElementById("boss--health");
let bossHealth = 50;

let isPaused = false;

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

// ----------------- Boss Movement  ----------------- //

//Create boss
// const bossElement = document.createElement("div");
// bossElement.classList.add("boss");
// bossElement.textContent = "B";
// gameBoard.appendChild(bossElement);

const bossElement = document.querySelector(".boss")

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

function moveBossRandomly(){
  if (isPaused){return};
  const directions = [
    { x: 0, y: -1 }, // Move up
    { x: 0, y: 1 },  // Move down
    { x: -1, y: 0 }, // Move left
    { x: 1, y: 0 }   // Move right
  ];

  // Choose a random direction
  const direction = directions[Math.floor(Math.random() * directions.length)];

  // Calculate new position
  const newX = bossPosition.x + direction.x;
  const newY = bossPosition.y + direction.y;

  // Ensure the new position is within bounds
  if (isValidBossPosition(newX, newY)) {
    bossPosition.x = newX;
    bossPosition.y = newY;
    updateBossPosition();
  }
}

function isValidBossPosition(x, y) {
  // Ensure position is within grid bounds
  if (x < 0 || x > gridSize - bossSize || y < 0 || y > gridSize - bossSize) {
    return false;
  }

  // Check if the boss's new position overlaps with the player's position
  for (let i = 0; i < bossSize; i++) {
    for (let j = 0; j < bossSize; j++) {
      const tileX = x + i;
      const tileY = y + j;
      if (tileX === playerPosition.x && tileY === playerPosition.y) {
        return false; // Overlaps with player
      }
    }
  }

  return true;
}

function startBossMovement() {
  // Move boss randomly every 3 seconds (3000 ms)
  if (isPaused){return};
  setInterval(moveBossRandomly, 3000);
}

// Gets the coordinates of the boss tile to check if the player is within them
function getBossTiles() {
  const bossTiles = [];
  for (let i = 0; i < bossSize; i++) {
    for (let j = 0; j < bossSize; j++) {
      const x = bossPosition.x + i;
      const y = bossPosition.y + j;
      bossTiles.push({ x, y });
    }
  }
  return bossTiles;
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
  if (isPaused){return};
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
  if (isPaused){return};
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

    // playerElement.classList.add("attacking");
    playerImg.classList.add("attacking");
    isCooldown = true;

    setTimeout(() => {
      // playerElement.classList.remove("attacking");
      playerImg.classList.remove("attacking")
    }, 1000); // 1000 milliseconds = 1 second

    setTimeout(() => {
      isCooldown = false;
    }, cooldown);
  }
}

// ----------------- Tiling System ----------------- //

const timeToChange = 3000;

//--Change colors of the top left/right and bottom left/right simultaneously
const corners = [
  { x: 0, y: 0 }, // Top-left corner
  { x: gridSize - 3, y: 0 }, // Top right corner
  { x: 0, y: gridSize - 3 }, // Bottom left corner
  { x: gridSize - 3, y: gridSize - 3 }, // Bottom right corner
];

function colourBlock(corner, color) {
      //Loops through tiles to change color
      for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
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
const setColourCorner = function colourCorner3x3Tiles(){

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
      }, timeToChange);
    }, timeToChange);

  }
  

//--Change the outer tiles
function colourTopBottomRows(color) {
    for (let x = 0; x < gridSize; x++) {
      // Top two rows (y = 0 and y = 1)
      for (let y = 0; y < 2; y++) {
        const tile = document.querySelector(`.tile[data-x='${x}'][data-y='${y}']`);
        if (tile) {
          tile.style.backgroundColor = color;
        }
      }
  
      // Bottom two rows (y = gridSize - 2 and y = gridSize - 1)
      for (let y = gridSize - 2; y < gridSize; y++) {
        const tile = document.querySelector(`.tile[data-x='${x}'][data-y='${y}']`);
        if (tile) {
          tile.style.backgroundColor = color;
        }
      }
    }
  }

function colourLeftRightColumns(color) {
    for (let y = 0; y < gridSize; y++) {
      // Left two columns (x = 0 and x = 1)
      for (let x = 0; x < 2; x++) {
        const tile = document.querySelector(`.tile[data-x='${x}'][data-y='${y}']`);
        if (tile) {
          tile.style.backgroundColor = color;
        }
      }
  
      // Right two columns (x = gridSize - 2 and x = gridSize - 1)
      for (let x = gridSize - 2; x < gridSize; x++) {
        const tile = document.querySelector(`.tile[data-x='${x}'][data-y='${y}']`);
        if (tile) {
          tile.style.backgroundColor = color;
        }
      }
    }
  }

const setColourOuter = function colourOuterLines(){
  // Color the outer tiles (rows and columns)
  colourTopBottomRows("red");
  colourLeftRightColumns("red");

  // Change the colors after 3 seconds
  setTimeout(() => {
    colourTopBottomRows("blue");
    colourLeftRightColumns("blue");

  // Revert back to white after another 3 seconds
  setTimeout(() => {
    colourTopBottomRows("white");
    colourLeftRightColumns("white");
  }, timeToChange);
}, timeToChange);
  }

//--Change the color of the middle three tiles
function changeMiddleColour(colour) {
  for (let x = 2; x < 8; x++) {
    for (let y = 2; y < 8; y++) {
      const tile = document.querySelector(`.tile[data-x='${x}'][data-y='${y}']`);
      if (tile) {
        tile.style.backgroundColor = colour; // Use 'red' as a string
        }
      }
    }
  }

  const setColourMiddle = function colourMiddleTiles() {
    // Change the middle tiles to red initially
    changeMiddleColour("red");
  
    // Change color to blue after 3 seconds
    setTimeout(() => {
      changeMiddleColour("blue");
  
      // Revert back to white after another 3 seconds
      setTimeout(() => {
        changeMiddleColour("white");
      }, timeToChange);
    }, timeToChange);
  }

//--Call three functions as a random interval
const changeColourFunctions = {
  1: setColourCorner,
  2: setColourMiddle,
  3: setColourOuter,
};

function getRandomNum() {
  return Math.floor(Math.random() * 3) + 1;
}

function getRandomInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setRandomPattern(){
  if (isPaused){return};
  const randomNum = getRandomNum();
  const selectedFunction = changeColourFunctions[randomNum];
  if (selectedFunction) {
    selectedFunction(); // Call the function
  } else {
    console.error("No function found for number:", randomNum);
  }
}

// Function to repeatedly call setRandomTile at random intervals
function getRandomPattern() {
  if (isPaused){return}
  function callSetRandomTile() {
    setRandomPattern();
    checkForWin();

    // Schedule the next call with a random delay between 8 and 12 seconds
    const interval = getRandomInterval(8000, 12000); // 8000 ms to 12000 ms
    setTimeout(callSetRandomTile, interval);
  }

  callSetRandomTile();
}




// ----------------- Popup & Restarting ----------------- //


const popUpText = document.getElementById("winner-message");
const popUpHeading = document.querySelector(".popupHeading");
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

function showLosePopup() {
  const popup = document.getElementById("win-popup");
  const message = document.getElementById("winner-message");
  popUpHeading.textContent = "Oh no"
  message.textContent = `You have lost the game!`;
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
  if (isPaused){return;}
  updatePlayerPosition();
 

  const playerTile = document.querySelector(
    `.tile[data-x='${playerPosition.x}'][data-y='${playerPosition.y}']`
  );

  if (bossHealth === 0) {
    isPaused = true;
    showWinPopup();
  }

  if (playerTile) {
    const tileColor = window.getComputedStyle(playerTile).backgroundColor;
    
    // checks if player is standing on a blue tile
    if (tileColor === 'rgb(0, 0, 255)' || tileColor === 'blue'){
      isPaused = true;
      showLosePopup();
    }

  }
  const bossTiles = getBossTiles();
  const playerInBossArea = bossTiles.some(tile => 
    tile.x === playerPosition.x && tile.y === playerPosition.y
  );

  if (playerInBossArea) {
    isPaused = true;
    showLosePopup();
  }
}

// Runs checkforwin 24/7
function checkForWinLoop() {
  checkForWin();
  requestAnimationFrame(checkForWinLoop); // Continuously call the function
}


function getBossTilesLoop(){
  getBossTiles();
  requestAnimationFrame(getBossTiles)
}


const startPopup = document.getElementById("start-popup")
// Starts game
function startGame() {
  if (!isPaused) {
    // makeGrid();
    startPopup.classList.add("hidden");

    window.addEventListener("keydown", movePlayer);
    window.addEventListener("keydown", playerAttack);
    setTimeout(getRandomPattern, 2000);
    checkForWinLoop();
    startBossMovement();
  }
}

const startBtn = document.getElementById("start-button");
makeGrid()
startBtn.addEventListener("click",startGame);



