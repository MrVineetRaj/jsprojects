const accordionItem = document.querySelectorAll(".accordion-item");
const accordionButton = document.querySelectorAll(".accordion-button");
let prevIdx = -1;

accordionItem.forEach((item, i) => {
  item.addEventListener("click", () => {
    accordionItem[i].classList.add("active");
    accordionButton[i].classList.add("active");
    // let sameElement = prevIdx === i
    if (prevIdx !== -1) {
      accordionItem[prevIdx].classList.remove("active");
      accordionButton[prevIdx].classList.remove("active");

      if (prevIdx === i) {
        prevIdx = -1;
        return;
      }
    }

    prevIdx = i;
  });
});
