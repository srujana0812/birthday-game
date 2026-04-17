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
let currentCol = 0;
let answer = "ILUVU";

// KEYBOARD INPUT
document.addEventListener("keydown", function (event) {
  let key = event.key.toUpperCase();

  let rows = document.getElementsByClassName("row");

  // stop if finished
  if (currentRow >= 6) return;

  let boxes = rows[currentRow].children;

  // LETTERS
  if (/^[A-Z]$/.test(key)) {
    if (currentCol < 5) {
      boxes[currentCol].innerText = key;
      boxes[currentCol].classList.add("filled");
      currentCol++;
    }
  }

  // BACKSPACE
  else if (key === "BACKSPACE") {
    if (currentCol > 0) {
      currentCol--;
      boxes[currentCol].innerText = "";
    }
  }

  // ENTER
  else if (key === "ENTER") {
    let guess = "";

    for (let i = 0; i < 5; i++) {
      guess += boxes[i].innerText;
    }

    if (guess.length === 5) {
      checkGuess();
      currentRow++;
      currentCol = 0;
    }
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

  // COLOR WITH DELAY
  for (let i = 0; i < 5; i++) {
  setTimeout(() => {
    boxes[i].classList.add("flip");

    setTimeout(() => {
      if (guess[i] === answer[i]) {
        boxes[i].classList.add("green");
      } else if (answer.includes(guess[i])) {
        boxes[i].classList.add("pink");
      } else {
        boxes[i].classList.add("darkpink");
      }
    }, 300); // color after half flip

  }, i * 500); // delay between tiles
}

  // WIN
  if (guess === answer) {
    setTimeout(() => {
      alert("Yayyy !!!💖");
    }, 1600);
  }

  // LOSE
  if (currentRow === 5 && guess !== answer) {
    setTimeout(() => {
      alert("The word was " + answer + " 💔");
    }, 1600);
  }
}

// RESET
function resetGame() {
  let rows = document.getElementsByClassName("row");

  for (let i = 0; i < 6; i++) {
    let boxes = rows[i].children;
    for (let j = 0; j < 5; j++) {
      boxes[j].innerText = "";
      boxes[j].classList.remove("green", "pink", "darkpink", "filled", "flip");
    }
  }

  currentRow = 0;
  currentCol = 0;
}
function goBack() {
  window.location.href = "index.html";
}
document.getElementById("mobileInput").focus();
function submitGuess() {
  let input = document.getElementById("mobileInput");
  let guess = input.value.toUpperCase();

  if (guess.length !== 5) return;

  let rows = document.getElementsByClassName("row");
  let boxes = rows[currentRow].children;

  // fill row
  for (let i = 0; i < 5; i++) {
    boxes[i].innerText = guess[i];
    boxes[i].classList.add("filled");
  }

  checkGuess();
  currentRow++;
  currentCol = 0;

  input.value = ""; // clear input
}