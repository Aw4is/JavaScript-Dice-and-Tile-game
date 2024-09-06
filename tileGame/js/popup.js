// popup.js
export function showWinPopup() {
  const popup = document.getElementById("win-popup");
  const message = document.getElementById("winner-message");
  message.textContent = `You have won the game!`;
  popup.style.display = "flex";
}

export function closeWinPopup() {
  const popup = document.getElementById("win-popup");
  popup.style.display = "none";
}
