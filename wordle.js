let grid = document.getElementById("grid");

// CREATE GRID
for (let i = 0; i < 6; i++) {
  let row = document.createElement("div");
  row.classList.add("row");

  for (let j = 0; j < 5; j++) {
    let box = document.createElement("div");
    box.classList.add("box");
    row.appendChild(box);
  }

  grid.appendChild(row);
}

// GAME STATE
let currentRow = 0;
let answer = "ILUVU";

// INPUT
const hiddenInput = document.getElementById("hiddenInput");

// focus
window.onload = () => hiddenInput.focus();
document.body.addEventListener("click", () => hiddenInput.focus());

// TYPE
hiddenInput.addEventListener("input", function () {
  let value = hiddenInput.value.toUpperCase();

  if (currentRow >= 6) return;

  let rows = document.getElementsByClassName("row");
  let boxes = rows[currentRow].children;

  for (let i = 0; i < 5; i++) {
    boxes[i].innerText = value[i] || "";
  }
});

// ENTER + BACKSPACE
hiddenInput.addEventListener("keydown", function (event) {

  if (currentRow >= 6) return;

  let rows = document.getElementsByClassName("row");
  let boxes = rows[currentRow].children;

  // ENTER
  if (event.key === "Enter") {
    let guess = hiddenInput.value.toUpperCase();

    if (guess.length !== 5) return;

    checkGuess(guess); // ✅ pass guess directly
    currentRow++;

    hiddenInput.value = "";
  }

  // BACKSPACE FIX
  if (event.key === "Backspace") {
    setTimeout(() => {
      let val = hiddenInput.value.toUpperCase();

      for (let i = 0; i < 5; i++) {
        boxes[i].innerText = val[i] || "";
      }
    }, 0);
  }
});

// CHECK GUESS
function checkGuess(guess) {
  let rows = document.getElementsByClassName("row");
  let boxes = rows[currentRow].children;

  for (let i = 0; i < 5; i++) {
    // FORCE correct letter display (important fix)
    boxes[i].innerText = guess[i];

    if (guess[i] === answer[i]) {
      boxes[i].classList.add("green");
    } else if (answer.includes(guess[i])) {
      boxes[i].classList.add("pink");
    } else {
      boxes[i].classList.add("darkpink");
    }
  }

  // WIN
  if (guess === answer) {
    setTimeout(() => alert("Yayyy !!!💖"), 200);
  }

  // LOSE
  if (currentRow === 5 && guess !== answer) {
    setTimeout(() => alert("The word was " + answer + " 💔"), 200);
  }
}

// RESET
function resetGame() {
  let rows = document.getElementsByClassName("row");

  for (let i = 0; i < 6; i++) {
    let boxes = rows[i].children;

    for (let j = 0; j < 5; j++) {
      boxes[j].innerText = "";
      boxes[j].classList.remove("green", "pink", "darkpink");
    }
  }

  currentRow = 0;
  hiddenInput.value = "";
}

// BACK
function goBack() {
  window.location.href = "index.html";
}
