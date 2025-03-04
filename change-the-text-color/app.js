const colorBtnContainer = document.querySelector(".color-buttons");
const textTarget = document.getElementById("mainHeading");
colorBtnContainer.addEventListener("click", (e) => {
  if (e.target.id !== "") {
    const color = window.getComputedStyle(
      document.getElementById(e.target.id)
    ).backgroundColor;
    textTarget.style.color = color;
  }
});
