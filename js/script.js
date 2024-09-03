//Variables
const openPopup = document.getElementById("open--popup");
const closePopup = document.getElementById("close--popup");
const popup = document.getElementById("instruction--popup");

//opening Popup
openPopup.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("hellow rodl");
  popup.style.display = "flex";
});

//Closing Popup
closePopup.addEventListener("click", function () {
  popup.style.display = "none";
});

//Closing Popup when clicking outside of it
window.addEventListener("click", function (e) {
  if (e.target === popup) {
    popup.style.display = "none";
  }
});
