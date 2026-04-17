document.addEventListener("DOMContentLoaded", () => {
const gridData = [
  ['E','S','L','L','Y','A'],
  ['A','M','O','E','S','L'],
  ['G','A','N','N','S','C'],
  ['D','D','Y','N','I','G'],
  ['S','R','W','L','A','H'],
  ['M','E','A','S','T','S'],
  ['A','S','Y','O','N','G']
];
const correctPaths = [
  [[2,5],[1,5],[0,5],[1,4],[2,4]],
  [[0,2],[1,2],[2,2],[1,3],[0,3],[0,4]],
  [[2,0],[1,0],[1,1],[0,0],[0,1]],
  [[3,1],[4,1],[5,1],[6,0],[5,0],[4,0]],
  [[5,3],[6,3],[6,4],[6,5],[5,5]],
  [[4,4],[4,3],[4,2],[5,2],[6,2],[6,1]],
  [[3,0],[2,1],[3,2],[2,3],[3,3],[3,4],[3,5],[4,5],[5,4]]
];
const validWords = [
  "class", "lonely", "games", "songs", "dreams", "daynnight"
]; // edit this list

const grid = document.getElementById("grid");
const output = document.getElementById("output");

let isSelecting = false;
let selectedCells = [];
let currentWord = "";

// Create grid
gridData.forEach((row, i) => {
  row.forEach((letter, j) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = letter;
    cell.dataset.row = i;
    cell.dataset.col = j;

    // Mouse
    cell.addEventListener("mousedown", startSelect);
    cell.addEventListener("mouseover", moveSelect);

    // Touch
    cell.addEventListener("touchstart", startSelect);
    cell.addEventListener("touchmove", touchMove);

    grid.appendChild(cell);
  });
});

function comparePaths(p1, p2) {
  if (p1.length !== p2.length) return false;

  for (let i = 0; i < p1.length; i++) {
    if (p1[i][0] !== p2[i][0] || p1[i][1] !== p2[i][1]) {
      return false;
    }
  }
  return true;
}
// Start selection
function startSelect(e) {
  e.preventDefault();
  isSelecting = true;
  clearSelection();

  addCell(e.target);
}

// Move selection (mouse)
function moveSelect(e) {
  if (!isSelecting) return;
  addCell(e.target);
}

// Move selection (touch)
function touchMove(e) {
  e.preventDefault();
  const touch = e.touches[0];
  const elem = document.elementFromPoint(touch.clientX, touch.clientY);

  if (elem && elem.classList.contains("cell")) {
    addCell(elem);
  }
}
function markCorrect(cells) {
  cells.forEach(cell => {
    cell.classList.add("correct");
  });

  selectedCells = [];
}
// Add cell to path
function addCell(cell) {
  if (selectedCells.includes(cell) || cell.classList.contains("correct")) return;

  const last = selectedCells[selectedCells.length - 1];

  if (last) {
    const r1 = +last.dataset.row;
    const c1 = +last.dataset.col;
    const r2 = +cell.dataset.row;
    const c2 = +cell.dataset.col;

    // adjacency check (8 directions)
    if (Math.abs(r1 - r2) > 1 || Math.abs(c1 - c2) > 1) return;
  }

  cell.classList.add("selected");
  selectedCells.push(cell);
  currentWord += cell.textContent;
}

// End selection
document.body.addEventListener("mouseup", endSelect);
document.body.addEventListener("touchend", endSelect);

function endSelect() {
    const userPath = selectedCells.map(cell => [
  +cell.dataset.row,
  +cell.dataset.col
]);

  if (!isSelecting) return;

  isSelecting = false;

 let found = false;

for (let path of correctPaths) {
  if (comparePaths(userPath, path) || comparePaths(userPath, [...path].reverse())) {
    found = true;
  }
}

if (found) {
  output.textContent = "✅ Correct!";
  markCorrect(selectedCells);
} else {
  output.textContent = "❌ Wrong!";
  clearSelection();
}

  currentWord = "";
  checkWin();
}

// Reset
function resetGrid() {
  const cells = document.querySelectorAll(".cell");

  cells.forEach(cell => {
    cell.classList.remove("selected");
    cell.classList.remove("correct");
  });

  // reset tracking
  selectedCells = [];
  currentWord = "";
  output.textContent = "";
}

function goBack() {
  window.location.href = "index.html";
}

// Clear all
function clearSelection() {
  selectedCells.forEach(c => c.classList.remove("selected"));
  selectedCells = [];
  currentWord = "";
}
function checkWin() {
  const totalCorrect = document.querySelectorAll(".correct").length;

  let required = 0;
  correctPaths.forEach(p => required += p.length);

  if (totalCorrect === required) {
    output.textContent = "🎉 YOU WIN!";
  }
}
document.getElementById("resetBtn").addEventListener("click", resetGrid);
document.getElementById("backBtn").addEventListener("click", goBack);
});