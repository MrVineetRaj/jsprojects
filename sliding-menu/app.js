const toggleButton = document.querySelector(".toggle-btn");
const closeBtn = document.querySelector(".close-btn");
const body = document.querySelector("body");
const panel = document.querySelector(".panel");

toggleButton.addEventListener("click", (e) => {
  e.stopPropagation();
  if (!panel.classList.contains("active")) {
    panel.classList.add("active");
  } else {
    panel.classList.remove("active");
  }
});
closeBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  panel.classList.remove("active");
});

panel.addEventListener("click", (e) => {
  e.stopPropagation();
});

body.addEventListener("click", () => {
  panel.classList.remove("active");
});

