let createBoard;
let scoreBoard;
let diagBoard;
let playerMove;
let togglePlayer;
let clearBoard;
let checkForWinner;
let addEventHandlers;
let player;
let opposition;
let count;
let message;
let checkForDraw;
let board = [];

$("document").ready(function() {
  let vertBoard = [],
    lastRowCall,
    lastColumnCall;

  let Xscore = 0;
  let Oscore = 0;

  getPlayer = function(count) {
    if (count % 2 === 1) {
      player = "X";
      $("#X").addClass("selected");
      $("#O").removeClass("selected");
    } else {
      player = "O";
      $("#O").addClass("selected");
      $("#X").removeClass("selected");
    }
  };

  message = function(string) {
    $(".messageBoard,h3").text(string);
  };

  scoreBoard = function(player) {
    if (player === "O") {
      Oscore++;
    }
    if (player === "X") {
      Xscore++;
    }
    $("#Oscore").html(Oscore);
    $("#Xscore").html(Xscore);
  };

  getDiagBoard = function(board) {
    diagBoard = [];
    var W = board[0].length;
    var H = board.length;
    var starts = [];
    // Horizontal
    for (var i = 0; i < W; i++) {
      starts.push([i, 0]);
    }
    // Vertical, start at 1, because we already have 0, 0
    for (var i = 1; i < H; i++) {
      starts.push([0, i]);
    }

    var validCoord = function(C) {
      return C[0] >= 0 && C[0] < W && C[1] < H;
    };

    var getDiag = function(start, dx) {
      var C = [start[0], start[1]]; // copy
      var diag = [];
      while (validCoord(C)) {
        diag.push(board[C[1]][C[0]]);
        C[0] += dx; // One to the left/right
        C[1] += 1; // One down
      }
      return diag;
    };

    starts.forEach(function(start) {
      var diag;
      diag = getDiag(start, 1);
      diag.length > 1 && diagBoard.push(diag);
      diag = getDiag(start, -1);
      diag.length > 1 && diagBoard.push(diag);
    });
    return diagBoard;
  };

  addClickHandlers = function() {
    $(".boardBtn").on("click", function() {
      let btnId = event.target.id;
      btnId = btnId.split("-");
      let rowIndex = btnId[0];
      let colIndex = btnId[1];
      playerMove(player, rowIndex, colIndex);
    });
  };

  createBoard = function(numberOfRows, numberOfColumns) {
    (board = []), (vertBoard = []);
    lastRowCall = numberOfRows;
    lastColumnCall = numberOfColumns;
    $(".gameBoard").empty();
    for (let i = 0; i < numberOfRows; i++) {
      const row = [],
        column = [];
      $newRow = $("<div/>", { class: "gameRow", id: i });
      $(".gameBoard").append($newRow);
      for (let j = 0; j < numberOfColumns; j++) {
        row.push(`${i}-${j}`);
        column.push(`${j}-${i}`);
        let newBtn = $("<button/>", {
          class: "boardBtn",
          id: `${i}-${j}`
        });
        let $thisRow = $("#" + i);
        $thisRow.append(newBtn);
      }
      board.push(row);
      vertBoard.push(column);
    }
    message("Game in play");
    addClickHandlers();
    return board;
  };

  playerMove = function(player, rowIndex, columnIndex) {
    if (
      board[rowIndex][columnIndex] === "X" ||
      board[rowIndex][columnIndex] === "O"
    ) {
      console.log(`Played tile.`);
    } else {
      board[rowIndex][columnIndex] = player;
      vertBoard[columnIndex][rowIndex] = player;
      $("#" + rowIndex + "-" + columnIndex).addClass(player);
      $("#" + rowIndex + columnIndex).css("background-color", "black");
      getDiagBoard(board);
      checkForWinner(player);
      count++;
      getPlayer(count);
    }
  };

  // player = "X";
  //From the selector we will get the player (either X or O)

  //I must attach event handler to each of the boardBtns that calls playMove

  // $(".boardBtn").on();

  clearBoard = function() {
    $(".gameBoard").empty();
    createBoard(lastRowCall, lastColumnCall);
  };

  winStreak = function(player) {
    const $winningVal = $("#winning-streak").val();
    let winner = "";
    for (var i = 0; i < $winningVal; i++) {
      winner += player;
    }
    return winner;
  };

  checkForWinner = function(player) {
    const winnerX = winStreak("X"),
      winnerO = winStreak("O");
    for (let i = 0; i < board[0].length; i++) {
      if (
        board[i].join("").indexOf(winnerX) >= 0 ||
        board[i].join("").indexOf(winnerO) >= 0
      ) {
        message(`${player} is the winner!!!`);
        scoreBoard(player);
        $(".boardBtn").off("click");
        window.setTimeout(clearBoard, 3000);
      }
    }
    for (let j = 0; j < vertBoard.length; j++) {
      if (
        vertBoard[j].join("").indexOf(winnerX) >= 0 ||
        vertBoard[j].join("").indexOf(winnerO) >= 0
      ) {
        message(`${player} is the winner!!!`);
        scoreBoard(player);
        $(".boardBtn").off("click");
        window.setTimeout(clearBoard, 3000);
      }
    }
    for (let k = 0; k < diagBoard.length; k++) {
      if (
        diagBoard[k].join("").indexOf(winnerX) >= 0 ||
        diagBoard[k].join("").indexOf(winnerO) >= 0
      ) {
        message(`${player} is the winner!!!`);
        scoreBoard(player);
        $(".boardBtn").off("click");
        window.setTimeout(clearBoard, 3000);
      }
    }
  };
}); //End document ready

window.onload = function() {
  document.getElementById("close-modal").onclick = function() {
    const $inputRows = $("#controller-rows").val();
    const $inputColumns = $("#controller-columns").val();
    createBoard($inputRows, $inputColumns);
    document.getElementById("modal").style.display = "none";
    count = 1;
    getPlayer(count);
  };
};

//////player selector
