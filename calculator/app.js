const btns = document.querySelectorAll(".calc-btn");
const calcInput = document.getElementById("calc-display");
let expression = "";
let invalidContinuos = "+-X/.";

btns.forEach((btn, index) => {
  btn.addEventListener("click", (e) => {
    if (btn.classList.contains("clear")) {
      expression = "";
      calcInput.value = 0;
      return;
    }
    if (btn.classList.contains("operator")) {
      if (!expression) {
        alert("Enter valid expression");
        return;
      }
      if (invalidContinuos.includes(expression[expression.length - 1])) {
        expression = expression.split("");
        expression[expression.length - 1] = btn.innerText;
        expression = expression.join("");
        calcInput.value = expression;
        return;
      }
    }

    if (btn.classList.contains("equal")) {
      if (!expression) {
        expression = "0";
      }
      expression.replace("X", "*");
      let ans = eval(expression);
      calcInput.value = `ANS = ${ans}`;
      return;
    }

    if (calcInput.value.includes("ANS")) {
      expression = "";
    }

    expression += btn.innerText;
    calcInput.value = expression;
  });
});
