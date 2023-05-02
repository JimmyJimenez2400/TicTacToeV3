/* eslint-disable no-console */
// Main Objective: Build a functional Tic Tac Toe Game
// We need to separate User Interface from logic, so make two modules
// one that handles the game, the other handles the front end (calls methods)
// First we need to build a factory that will create our objects
// then the gameBoard (build it first using the console.log)
// lastly, the UI module that updates our stuff

// Player Factory That Creates Objects
const Players = (name, marker, points, playerPicks) => {
  const getName = () => name;
  const getMarker = () => marker;
  const getPoints = () => points;
  const getPlayerPicks = () => playerPicks;
  return {
    getName,
    getMarker,
    getPoints,
    getPlayerPicks,
  };
};

// Module for GameBoard
const gameBoard = (() => {
  const gameBoardArray = ["", "", "", "", "", "", "", "", "", ""];

  // Place Marker on Screen
  const placeMarkerOnBoard = (index, array2, activePlayer, indexPick) => {
    // gameBoardArray, index for button ,0 or 1
    if (gameBoardArray[index] === "") {
      // eslint-disable-next-line no-param-reassign
      gameBoardArray[index] = array2[activePlayer].getMarker();
      array2[activePlayer].getPlayerPicks().push(indexPick);
      array2[activePlayer].getPlayerPicks();
    } else {
      console.log("Sorry, Not available to use!");
    }

    return array2[activePlayer].getMarker();
  };

  const getGameBoardArray = () => gameBoardArray;

  return { getGameBoardArray, placeMarkerOnBoard };
})();

const gameController = (() => {
  // Grab Names Of Players From Values

  const gameArray = gameBoard.getGameBoardArray();
  const winCombos = [
    // Top To Bottom
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // Left To Right
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // Diagonal
    [0, 4, 8],
    [0, 4, 6],
  ];

  const player1Picks = [];
  const player2Picks = [];

  // const simpleValuesToMatch = [[0, 3, 6]];

  const playersArr = [];
  playersArr[0] = Players("Jimmy", "X", 0, player1Picks);
  playersArr[1] = Players("Axel", "O", 0, player2Picks);

  let activePlayer = 0;

  const getActivePlayer = () => activePlayer;

  const finalWinner = (player) => {
    // We see if the activePlayer reaches the max of 3 points, if they do. Return winner
    if (player.getPoints() === 3) {
      console.log(`${player.getName()}`);
      return true;
    }

    return false;
  };

  // gets called
  const addPoints = (player) => {
    let grabPlayerPoint = player.getPoints();
    console.log(grabPlayerPoint);
    grabPlayerPoint += 1;
    console.log(grabPlayerPoint);
    console.log(`ADDING 1 POINT TO PLAYER:${player.getName()}`);
  };

  // we need to implement a win conditions, where it continues checking
  const isWinner = (player) => {
    for (let i = 0; i < winCombos.length; i += 1) {
      if (
        winCombos[i].every((element) =>
          player.getPlayerPicks().includes(element)
        )
      ) {
        addPoints(player);
        return true;
      }
    }
    return false;
  };

  // gets called
  const isBoardFull = () => {
    // we want to check if the array is full then return `true`, else `false`
    const arrayMaxValues = 9;
    console.log(arrayMaxValues);
    if (gameArray.length === arrayMaxValues) {
      return true;
    }
    return false;
  };

  const isTie = () => {
    // When Board is Full, and no winners, I want to return 'true, else 'false

    if (isBoardFull() && !isWinner(player1Picks) && !isWinner(player2Picks)) {
      return true;
    }
    return false;
  };

  const switchPlayerTurn = () => {
    // Make this dynamic
    if (activePlayer === 0) {
      // eslint-disable-next-line prefer-destructuring
      activePlayer = 1;
      console.log(`${playersArr[activePlayer].getName()}`);
    } else {
      // eslint-disable-next-line prefer-destructuring
      activePlayer = 0;
      console.log(`${playersArr[activePlayer].getName()}`);
    }

    // eslint-disable-next-line prefer-destructuring
  };

  // We start the game, we render board,

  const resetBoards = () => {
    if (finalWinner() === true) {
      window.location.reload();
    }
    // The Plan here is to reset the gameBoard Array and the front-end board
    // We can just set the array to empty
    // We can just call the render function again in here
  };

  const startGame = () => {
    switchPlayerTurn();
  };

  return {
    getActivePlayer,
    playersArr,
    switchPlayerTurn,
    isWinner,
    isBoardFull,
    isTie,
    finalWinner,
    resetBoards,
  };
})();

const screenController = (() => {
  // Change activePlayer from an object to a number
  // We'll be referencing the array instead of the object
  // Look back on discord for @Bender help
  const game = gameController;

  const playerTurn = document.querySelector(".playerTurn");
  const gameBoardContainer = document.querySelector("#gameBoardContainer");
  const player1Name = document.querySelector(".playerOneInputName");
  const player2Name = document.querySelector(".playerTwoInputName");
  const player1Score = document.querySelector(".playerOneScore");
  const player2Score = document.querySelector(".playerTwoScore");

  playerTurn.textContent = `${game.playersArr[
    game.getActivePlayer()
  ].getName()} Turn!`;

  player1Name.textContent = `${game.playersArr[0].getName()}`;
  player2Name.textContent = `${game.playersArr[1].getName()}`;
  player1Score.textContent = `${game.playersArr[0].getPoints()}`;
  player2Score.textContent = `${game.playersArr[1].getPoints()}`;

  const createBoard = () => {
    for (let i = 0; i < 9; i += 1) {
      const buttonChildren = document.createElement("button");
      buttonChildren.setAttribute("class", "buttonChild");
      buttonChildren.setAttribute("data-index", `${i}`);
      buttonChildren.style.border = "1px solid red";
      buttonChildren.textContent = `${[i]}`;
      gameBoardContainer.appendChild(buttonChildren);
    }
  };

  const renderBoard = () => createBoard();

  renderBoard();

  const updateScreen = () => {
    // Update the screen such as who's turn, points, and board
    const player1Scores = document.querySelector(".playerOneScore");
    const player2Scores = document.querySelector(".playerTwoScore");
    const playerTurnOnScreen = document.querySelector(".playerTurn");

    playerTurnOnScreen.textContent = `${game.playersArr[
      game.getActivePlayer()
    ].getName()} Turn!`;

    player1Scores.textContent = `${game.playersArr[0].getPoints()}`;
    player2Scores.textContent = `${game.playersArr[1].getPoints()}`;

    // Update Buttons
  };

  const enableClickOnBoard = (e) => {
    const indexOfButton = e.target.dataset.index;
    const activeMarker = gameBoard.placeMarkerOnBoard(
      indexOfButton,
      gameController.playersArr,
      // eslint-disable-next-line comma-dangle
      gameController.getActivePlayer(),
      // eslint-disable-next-line comma-dangle
      indexOfButton
    );
    e.target.textContent = `${activeMarker}`;

    updateScreen();

    // This will allow the user to click on the board
    // Append the index to the specific players array
    // we will call switchPlayerTurn in here whenever a click happens
    // Update screen here
  };

  const buttonChildren = document.querySelectorAll(".buttonChild");
  buttonChildren.forEach((button) => {
    button.addEventListener("click", enableClickOnBoard);
  });
  // Update screen here for initial

  // We have to call these functions
  updateScreen();
})();
