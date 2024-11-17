function Gameboard() {

  const winStates = [
    [[0, 0], [0, 1], [0, 2]], // Rows
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]], // Columns
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 1], [2, 2]], // Diagonals
    [[0, 2], [1, 1], [2, 0]]
  ]

  const GameState = {
    MOVE_ADDED: 'MOVE_ADDED',
    WINNER_P1: 'WINNER_P1',
    WINNER_P2: 'WINNER_P2',
    DRAW: 'DRAW',
    RESET: 'RESET'
  };

  let state = GameState.MOVE_ADDED; // Initial state

  let turnCounter = 0;

  let board =  new Array(3).fill(null).map(() => new Array(3).fill(null));

  function addMove(i, j) {
    board[i][j] = turnCounter%2;
    console.log(`move made at ${i} ${j}`)
    state = GameState.MOVE_ADDED
  }

  function isMoveTaken(i, j) {
    return board[i][j] !== null;
  }

  function areValidCoordinates(i, j) {
    return (i>=0 && i<3) && (j>=0 && j<3)
  }


  function checkForWinner() {
    for (let winState of winStates) {
      const [a, b, c] = winState;
      if (
        board[a[0]][a[1]] !== null &&
        board[a[0]][a[1]] === board[b[0]][b[1]] &&
        board[a[0]][a[1]] === board[c[0]][c[1]]
      ) {
        if(board[a[0]][a[1]] === 0) state = GameState.WINNER_P1;
        else state = GameState.WINNER_P2;
        
        boardContainer.classList.add('victory');

        setTimeout(() => {
          resetBoard();  
          boardContainer.classList.remove('victory')
        }, 2000);

        return true;
      }
    }
    if(state === GameState.MOVE_ADDED && turnCounter === 9) { 
      state = GameState.DRAW; 
      setTimeout(() => {
        resetBoard();  
      }, 2000);
    } 
    return false;
  }

  function validMove(i, j) {
    return !isMoveTaken(i,j) && areValidCoordinates(i, j);
  }

  const boardContainer = document.querySelector(".board-container");
  const fragment = document.createDocumentFragment();
  const outputField = document.querySelector(".output-field");
  const resetButton = document.querySelector(".reset-button");

  resetButton.addEventListener("click", () => {
    resetBoard();
  })

  function generateSquare(i, j) {
    const square = document.createElement("div");
    square.className = "grid-square"
    square.id = `gridsquare-${i}-${j}`;
    square.textContent = '\u00A0';

    square.addEventListener("click", () => {
      if(validMove(i,j) && state === GameState.MOVE_ADDED) {
        square.textContent = turnCounter%2 == 0 ? 'X' : 'O';
        addMove(i, j);
        turnCounter++;
        checkForWinner();
        setOutputField();
      }
    });

    return square;
  }

  function setOutputField() {
    switch(state) {
      case GameState.WINNER_P1:
        outputField.textContent = "Player 1 wins!";
        break;
      case GameState.WINNER_P2:
        outputField.textContent = "Player 2 wins!";
        break;
      case GameState.DRAW:
        outputField.textContent = "It's a draw.";
        break;
      default:
        outputField.textContent = "Next move.";
        break;
    }
  }

  function resetBoard() {
    state = GameState.RESET
    board =  new Array(3).fill(null).map(() => new Array(3).fill(null));
    turnCounter = 0;
    outputField.textContent = "Game reset. Player 1's turn.";

    document.querySelectorAll('.grid-square').forEach(square => {
      square.textContent = '\u00A0';
    });

    state = GameState.MOVE_ADDED;
  }

  function display() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        fragment.appendChild(generateSquare(i, j));
      }
    }
  
    boardContainer.appendChild(fragment);
  }

  display();
}

let asd = new Gameboard();