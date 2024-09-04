//Variables
const openPopup = document.getElementById("open--popup");
const closePopup = document.getElementById("close--popup");
const popup = document.getElementById("instruction--popup");

//opening Popup
openPopup.addEventListener("click", function (e) {
  e.preventDefault();
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

//Variables
const openPopupT = document.getElementById("open--popupT");
const closePopupT = document.getElementById("close--popupT");
const popupT = document.getElementById("instruction--popupT");

//opening Popup
openPopupT.addEventListener("click", function (e) {
  e.preventDefault();
  popupT.style.display = "flex";
});

//Closing Popup
closePopupT.addEventListener("click", function () {
  popupT.style.display = "none";
});

//Closing Popup when clicking outside of it
window.addEventListener("click", function (e) {
  if (e.target === popupT) {
    popupT.style.display = "none";
  }
});
