// Write your code here.
const gameHeading = document.getElementById("game-heading");
const allSquares = document.querySelectorAll(".game-square");
const restartButton = document.getElementById("restart-button");
const BOARD_WIDTH = 3;
let boardSet = createTicTacToeBoard();
let counter = 0;
let currentPlayer = 1;

function createTicTacToeBoard(){
  return new Array(BOARD_WIDTH).fill().map(() => new Array(BOARD_WIDTH));
}

allSquares.forEach((gameSquare, i) => {
  gameSquare.addEventListener("click", () => {
    let row = Math.floor(i / BOARD_WIDTH);
    let col = i % BOARD_WIDTH;
    squareClicked(gameSquare, row, col);
  });
});

restartButton.addEventListener("click", resetButton);

function squareClicked(gameSquare, row, col){
  gameSquare.textContent = currentPlayer == 1 ? "X" : "O";
 
  gameSquare.disabled = true;
  counter++;
  boardSet[row][col] = currentPlayer;

  if(didPlayerWin(currentPlayer)){
    gameHeading.textContent = `Player ${currentPlayer} Won!`;
    endGame()
  }else if(didGameTie()){
    gameHeading.textContent = `Tie Game!`;
    endGame();
  }else{
    currentPlayer = currentPlayer == 1 ? 2 : 1;
    setHeading();
  }
  
}

function didPlayerWin(){
  let rows = [0, 1, 2];
  let wonHorizontally  = rows.some((row) => {
    return (
      boardSet[row][0] === currentPlayer &&
      boardSet[row][1] === currentPlayer &&
      boardSet[row][2] === currentPlayer
    )
  });
  let cols = [0, 1, 2]
  let wonVertically = cols.some((col) => {
    return (
      boardSet[0][col] === currentPlayer &&
      boardSet[1][col] === currentPlayer &&
      boardSet[2][col] === currentPlayer
    )
  });
  let wonRightDiagonally = boardSet[0][2] === currentPlayer && boardSet[1][1] === currentPlayer && boardSet[2][0] === currentPlayer;
  let wonLeftDiagonally = boardSet[0][0] === currentPlayer && boardSet[1][1] === currentPlayer && boardSet[2][2] === currentPlayer;
  
  return (
    wonVertically || wonHorizontally || wonRightDiagonally || wonLeftDiagonally
  )
}

function didGameTie(){
  return counter >= 9;
}

function resetButton (){
   boardSet = createTicTacToeBoard();
  counter = 0;
  currentPlayer = 1;
  setHeading();
  allSquares.forEach((gameSquare) => {
    gameSquare.textContent = "";
    gameSquare.disabled = false;
  });
  restartButton.style.display = "none";
}

function endGame(){
  restartButton.style.display = "block";
  allSquares.forEach((gameSquare) => {
    gameSquare.disabled = true;
  })
}

function setHeading(){
  gameHeading.textContent = `Player ${currentPlayer}'s Turn`;
}