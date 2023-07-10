const startButton = document.querySelector(".start-button");
const homePage = document.querySelector(".page.home");
const gamePage = document.querySelector(".page.game");
const restartButton = document.querySelector(".restart-button");
const rescoreButton = document.querySelector(".rescore-button");
const gameTable = document.querySelector(".game-table");
const gameResult = document.querySelector(".game-result");
const scoreCrosses = document.querySelector(".score.crosses");
const scoreNoughts = document.querySelector(".score.noughts");

var currentPlayer = "X";
var gameOver = false;

scoreNoughts.textContent = localStorage.getItem("score noughts") || "0";
scoreCrosses.textContent = localStorage.getItem("score crosses") || "0";

startButton.addEventListener("click", function () {
  homePage.style.display = "none";
  gamePage.style.display = "flex";
});

function makeMove(lattice) {
  if (gameOver) return;

  if (lattice.textContent === "") {
    var symbol =
      currentPlayer === "X"
        ? '<img src="/images/x.svg" alt="叉叉" class="x" />'
        : '<img src="/images/o.svg" alt="圈圈" class="o" />';
    lattice.innerHTML = symbol;
    checkWin();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    checkDraw();
  }
}

function checkWin() {
  var lattices = document.querySelectorAll(".lattice");
  var winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // 水平
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // 垂直
    [0, 4, 8],
    [2, 4, 6], // 对角线
  ];

  for (var i = 0; i < winningCombinations.length; i++) {
    var [a, b, c] = winningCombinations[i];

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

function handleWin(winningCell) {
  var winnerImage = `<img src="/images/${winningCell.firstChild.className}_winner.svg" alt="${winningCell.firstChild.className} 獲勝" width="422" height="422" />`;

  gameResult.innerHTML = winnerImage;
  gameTable.style.display = "none";
  gameResult.style.display = "block";
  gameOver = true;

  if (winningCell.firstChild.className === "o") {
    updateScore(scoreNoughts);
  } else if (winningCell.firstChild.className === "x") {
    updateScore(scoreCrosses);
  }
}

function updateScore(scoreElement) {
  var currentScore = parseInt(scoreElement.textContent);
  var updatedScore = currentScore + 1;
  scoreElement.textContent = updatedScore;
  localStorage.setItem(scoreElement.className, updatedScore);
}

function checkDraw() {
  var lattices = document.querySelectorAll(".lattice");
  var isDraw = true;

  lattices.forEach(function (cell) {
    if (!cell.firstChild) {
      isDraw = false;
    }
  });

  if (isDraw && !gameOver) {
    gameResult.innerHTML =
      '<img src="/images/draw.svg" alt="平手" width="422" height="422" />';
    gameTable.style.display = "none";
    gameResult.style.display = "block";

    gameOver = true;
  }
}

function clearBoard() {
  var lattices = document.querySelectorAll(".lattice");
  lattices.forEach(function (cell) {
    cell.innerHTML = "";
  });
}

restartButton.addEventListener("click", function () {
  clearBoard();
  gameOver = false;
  gameResult.removeAttribute("style");
  gameTable.removeAttribute("style");
});

rescoreButton.addEventListener("click", function () {
  clearBoard();
  gameOver = false;
  gameResult.removeAttribute("style");
  gameTable.removeAttribute("style");
  scoreCrosses.textContent = "0";
  scoreNoughts.textContent = "0";
  localStorage.clear();
});
