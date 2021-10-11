const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMessage");
const restartButton = document.getElementById("restartButton");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
const p1_name = document.getElementById("p1msg");
const p2_name = document.getElementById("p2msg");

let circleTurn;

startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
  circleTurn = false;

  let d1 = localStorage.getItem("p_1");
  let d2 = localStorage.getItem("p_2");
  p1_name.innerHTML = "P1: " + d1;
  p2_name.innerHTML = "P2: " + d2;

  if (circleTurn) {
    p2_name.classList.add("turn");
    p1_name.classList.remove("turn");
  } else {
    p1_name.classList.add("turn");
    p2_name.classList.remove("turn");
  }

  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove("show");
  //leader_board();
}

function handleClick(e) {
  // placeMark
  // Check for win
  // Check for draw
  // Switch turn
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;

  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "Draw!";
  } else {
    winningMessageTextElement.innerText = `${
      circleTurn ? "Player 2" : "Player 1"
    } Wins!`;
  }
  winningMessageElement.classList.add("show");
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;

  if (circleTurn) {
    p2_name.classList.add("turn");
    p1_name.classList.remove("turn");
  } else {
    p1_name.classList.add("turn");
    p2_name.classList.remove("turn");
  }
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

// function leader_board()
// {

// }
