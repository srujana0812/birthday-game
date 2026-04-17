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

// INPUT SYSTEM
const hiddenInput = document.getElementById("hiddenInput");

// focus
window.onload = () => hiddenInput.focus();
document.body.addEventListener("click", () => hiddenInput.focus());

// TYPE LETTERS
hiddenInput.addEventListener("input", function () {
  let value = hiddenInput.value.toUpperCase();

  let rows = document.getElementsByClassName("row");
  if (currentRow >= 6) return;

  let boxes = rows[currentRow].children;

  for (let i = 0; i < 5; i++) {
    boxes[i].innerText = value[i] || "";
  }
});

// ENTER + BACKSPACE
hiddenInput.addEventListener("keydown", function (event) {
  let rows = document.getElementsByClassName("row");
  let boxes = rows[currentRow].children;

  if (event.key === "Enter") {
    if (hiddenInput.value.length === 5) {
      checkGuess();
      currentRow++;
      hiddenInput.value = "";
    }
  }

  if (event.key === "Backspace") {
    setTimeout(() => {
      let val = hiddenInput.value;
      for (let i = 0; i < 5; i++) {
        boxes[i].innerText = val[i] || "";
      }
    }, 0);
  }
});

// CHECK GUESS
function checkGuess() {
  let rows = document.getElementsByClassName("row");
  let boxes = rows[currentRow].children;

  let guess = "";

  for (let i = 0; i < 5; i++) {
    guess += boxes[i].innerText;
  }

  for (let i = 0; i < 5; i++) {
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
