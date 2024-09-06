export function playerAttack(
  event,
  playerElement,
  bossHealth,
  bossHealthElement,
  checkForWin,
  isCooldown,
  setIsCooldown,
  cooldown
) {
  if (isCooldown) {
    return; // Exit if attack is on cooldown
  }

  if (event.key === "z" || event.key === "Z") {
    const damage = Math.floor(Math.random() * 41);
    console.log(`Damage: ${damage}`); // Logging for debugging
    bossHealth = Math.max(bossHealth - damage, 0);
    bossHealthElement.textContent = `Boss Health: ${bossHealth}`;
    checkForWin();

    // Add attacking class to player
    playerElement.classList.add("attacking");

    // Set cooldown to true
    isCooldown.value = true;

    // Remove attacking class after 1 second
    setTimeout(() => {
      playerElement.classList.remove("attacking");
    }, 1000);

    // Reset cooldown after specified time
    setTimeout(() => {
      isCooldown.value = false;
    }, cooldown);
  }
}
