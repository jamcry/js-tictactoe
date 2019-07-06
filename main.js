const winningPatterns = [
  // Horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diagonal
  [0, 4, 8],
  [6, 4, 2]
];
const cells = document.querySelectorAll(".cell");
const gameOverPopup = document.querySelector(".result");
const gameOverPopupText = document.querySelector(".winner-text");
const btnClosePopup = document.querySelector(".close");
const currentPlayerText = document.querySelector(".current-player");
let currentCells = [];
let currentPlayer = "";

function startGame() {
  currentCells = Array.from(Array(9).keys());
  currentPlayer = "X";
  updateCurrentPlayerText();
  [...cells].forEach(cell => {
    cell.textContent = "";
    cell.addEventListener("click", handleClick);
  });
}

function handleClick() {
  const cell = event.target;
  const id = cell.dataset.id;
  if (isCellValid(id)) {
    cell.textContent = currentPlayer;
    currentCells[id] = currentPlayer;
    if (checkWin()) endGame();
    else togglePlayer();
  } else {
    makeBlink(cell);
  }
}

function makeBlink(cell) {
  cell.style.animation = "blink .6s 2";
  setTimeout(() => (cell.style.animation = ""), 1200);
}

function endGame() {
  [...cells].forEach(cell => cell.removeEventListener("click", handleClick));
  currentPlayerText.textContent = "GAME OVER!";
  gameOverPopupText.textContent = `${currentPlayer} WINS!`;
  gameOverPopup.style.display = "block";
}

function isCellValid(id) {
  return (currentCells[id] == id);
}

function togglePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateCurrentPlayerText();
}

function updateCurrentPlayerText() {
  currentPlayerText.textContent = `${currentPlayer} will make a move`;
}

function checkWin() {
  for (let i = 0; i < winningPatterns.length; i++) {
    let pattern = winningPatterns[i];
    let [a, b, c] = pattern;
    if (
      currentCells[a] === currentCells[b] &&
      currentCells[b] === currentCells[c]
    ) {
      return true;
    }
  }
  return false;
}

btnClosePopup.onclick = () => (gameOverPopup.style.display = "none");
