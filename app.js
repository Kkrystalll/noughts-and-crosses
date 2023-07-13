const startButton = document.querySelector(".start-button");
const homePage = document.querySelector(".page.home");
const gamePage = document.querySelector(".page.game");
const restartButton = document.querySelector(".restart-button");
const rescoreButton = document.querySelector(".rescore-button");
const gameTable = document.querySelector(".game-table");
const gameResult = document.querySelector(".game-result");
const scoreCrosses = document.querySelector(".score.crosses");
const scoreNoughts = document.querySelector(".score.noughts");

let currentPlayer = "X";
let gameOver = false;

scoreCrosses.textContent = localStorage.getItem("score crosses") || "0";
scoreNoughts.textContent = localStorage.getItem("score noughts") || "0";

startButton.addEventListener("click", function () {
  homePage.style.display = "none";
  gamePage.style.display = "flex";
});

function makeMove(lattice) {
  if (lattice.innerHTML === "") {
    let symbol =
      currentPlayer === "X"
        ? '<img src="/images/x.svg" alt="叉叉" class="x" />'
        : '<img src="/images/o.svg" alt="圈圈" class="o" />';
    lattice.innerHTML = symbol;
    checkWin();
    checkDraw();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

function checkWin() {
  const lattices = document.querySelectorAll(".lattice");
  let winSet = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winSet.length; i++) {
    const [a, b, c] = winSet[i];
    if (
      lattices[a].innerHTML &&
      lattices[a].innerHTML === lattices[b].innerHTML &&
      lattices[a].innerHTML === lattices[c].innerHTML
    ) {
      handleWin(lattices[a]);
      break;
    }
  }
}

function handleWin(winner) {
  const winnerImage = `<img
  src="/images/${winner.firstChild.className}_winner.svg"
  alt="${winner.firstChild.className} 獲勝"
  width="422"
  height="422"
  />`;
  gameResult.innerHTML = winnerImage;
  gameResult.style.display = "block";
  gameTable.style.display = "none";
  gameOver = true;

  if (winner.firstChild.className === "x") {
    updateScore(scoreCrosses);
  } else if (winner.firstChild.className === "o") {
    updateScore(scoreNoughts);
  }
}

function updateScore(scoreElement) {
  let currentScore = parseInt(scoreElement.textContent);
  let updatedScore = currentScore + 1;
  scoreElement.textContent = updatedScore;
  localStorage.setItem(scoreElement.className, updatedScore);
}

function checkDraw() {
  const lattices = document.querySelectorAll(".lattice");
  let isDraw = true;

  lattices.forEach(function (lattice) {
    if (!lattice.firstChild) {
      isDraw = false;
    }
  });

  if (isDraw && !gameOver) {
    const drawImage = `<img
    src="/images/draw.svg"
    alt="平手"
    width="422"
    height="422"
    />`;
    gameResult.innerHTML = drawImage;
    gameResult.style.display = "block";
    gameTable.style.display = "none";
    gameOver = true;
  }
}

restartButton.addEventListener("click", function () {
  clearTable();
  gameOver = false;
  gameResult.removeAttribute("style");
  gameTable.removeAttribute("style");
});

function clearTable() {
  const lattices = document.querySelectorAll(".lattice");

  lattices.forEach(function (lattice) {
    lattice.innerHTML = "";
  });
}

rescoreButton.addEventListener("click", function () {
  clearTable();
  gameOver = false;
  gameResult.removeAttribute("style");
  gameTable.removeAttribute("style");
  localStorage.clear();
  scoreCrosses.textContent = "0";
  scoreNoughts.textContent = "0";
});
