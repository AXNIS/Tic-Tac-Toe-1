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
const score = document.getElementById("smsg");
const p2_name = document.getElementById("p2msg");
const rank = document.getElementById("rank");
//const tb = document.getElementById("tableid");

let s_1 = localStorage.getItem(localStorage.getItem("p_1"));
let s_2 = localStorage.getItem(localStorage.getItem("p_2"));

let circleTurn;

startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
  circleTurn = false;
  scoreUpdate();

  leaderBoard();

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
    let d1 = localStorage.getItem("p_1");
    let d2 = localStorage.getItem("p_2");

    if (circleTurn) {
      let s2 = localStorage.getItem(d2);
      s2++;
      localStorage.setItem(d2, s2);
    } else {
      let s1 = localStorage.getItem(d1);
      s1++;
      localStorage.setItem(d1, s1);
    }
    scoreUpdate();

    leaderBoard();

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

function scoreUpdate() {
  let S_1 = localStorage.getItem(localStorage.getItem("p_1"));
  let S_2 = localStorage.getItem(localStorage.getItem("p_2"));
  S_1 = S_1 - s_1;
  S_2 = S_2 - s_2;
  score.innerHTML = `${S_1} : ${S_2}`;
}

function leaderBoard() {
  rank.innerHTML = "";
  let localStorageArray = [];
  let k = 0;
  for (i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i) != "p_1" && localStorage.key(i) != "p_2") {
      let obj = {
        userName: localStorage.key(i),
        wins: parseInt(localStorage.getItem(localStorage.key(i))),
        //wins: "56",
      };
      localStorageArray.push(obj);
      k++;
    }
  }

  let sortedArray = localStorageArray.sort((a, b) => {
    return b.wins - a.wins;
  });
  //return sortedArray;

  for (let i = 0; i < sortedArray.length; i++) {
    let idx = document.createElement("div");
    idx.className = `rows ${i + 1}`;

    let sn = document.createElement("div");
    sn.className = "serialNumber";
    sn.innerHTML = `${i + 1}`;
    idx.appendChild(sn);

    let un = document.createElement("div");
    un.className = "user_name";
    un.innerHTML = `${sortedArray[i].userName}`;
    idx.appendChild(un);

    let pt = document.createElement("div");
    pt.className = "pts";
    pt.innerHTML = `${sortedArray[i].wins}`;
    idx.appendChild(pt);

    rank.appendChild(idx);
  }
}
