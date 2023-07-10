const startButton = document.querySelector(".start-button");
const homePage = document.querySelector(".page.home");
const gamePage = document.querySelector(".page.game");
const restartButton = document.querySelector(".restart-button");
const gameTable = document.querySelector(".game-table");
const gameResult = document.querySelector(".game-result");

var currentPlayer = "X";
var gameOver = false;

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
  var cells = document.querySelectorAll(".lattice");
  // // TODO del
  // console.log(cells);
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
    // // TODO del
    // console.log(a, b, c, winningCombinations[i]);

    if (
      cells[a].innerHTML &&
      cells[a].innerHTML === cells[b].innerHTML &&
      cells[a].innerHTML === cells[c].innerHTML
    ) {
      var winnerImage = `<img src="/images/${cells[a].firstChild.className}_winner.svg" alt="${cells[a].firstChild.className} 獲勝" width="422" height="422" />`;

      gameResult.innerHTML = winnerImage;
      gameTable.style.display = "none";
      gameResult.style.display = "block";

      gameOver = true;
      break;
    }
  }
}

function checkDraw() {
  var cells = document.querySelectorAll(".lattice");
  var isDraw = true;

  cells.forEach(function (cell) {
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

restartButton.addEventListener("click", function () {
  // currentPlayer = "X";
  // gameOver = false;
  // randomNumber = getRandomNumber(0, 100);
  // guessNumber.value = "";
  // hint.textContent = "";
  // currentMinNumber.textContent = "0";
  // currentMaxNumber.textContent = "100";
});
