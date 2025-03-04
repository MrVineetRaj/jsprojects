const fields = ["jobInput", "nameInput", "ageInput", "bioInput"];
const displayField = ["jobDisplay", "nameDisplay", "ageDisplay", "bioDisplay"];

const displayText = (targetId, text) => {
  document.getElementById(targetId).innerText = text || "Not provided";
};

fields.forEach((fieldId, i) => {
  const field = document.getElementById(fieldId);
  field.addEventListener("input", () => {
    displayText(displayField[i], field.value);
  });
});
