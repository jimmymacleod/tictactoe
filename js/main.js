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
    var G = board.length;
    var starts = [];
    // Horizontal
    for (var i = 0; i < W; i++) {
      starts.push([i, 0]);
    }
    // Vertical, start at 1, because we already have 0, 0
    for (var i = 1; i < H; i++) {
      starts.push([0, i]);
    }
    // for (var i = 1; i <= G; i++) {
    //   starts.push([i, G]);
    // }
    // console.log(starts);
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

  checkForDraw = function() {
    let drawCount = 0;
    parse = function(r) {
      return parseFloat(r) * 2 * Math.PI;
    };
    for (let i = 0; i < board.length; i++) {
      for (let k = 0; k < board[i].length; k++) {
        if (!parse(board[i][k])) {
          drawCount++;
        }
      }
    }
    if (drawCount === board.length * board[1].length) {
      message("It's a draw");
      console.log(drawCount);
      window.setTimeout(clearBoard, 3000);
    }
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
    winnerFunc = function(player) {
      message(`${player} is the winner!!!`);
      scoreBoard(player);
      animate();
      $(".boardBtn").off("click");
      window.setTimeout(clearBoard, 3000);
    };
    const winnerX = winStreak("X"),
      winnerO = winStreak("O");
    const boards = [board, vertBoard, diagBoard];
    for (let b = 0; b < boards.length; b++) {
      for (let i = 0; i < boards[b].length; i++) {
        if (
          boards[b][i].join("").indexOf(winnerX) >= 0 ||
          boards[b][i].join("").indexOf(winnerO) >= 0
        ) {
          winnerFunc(player);
        } else {
          checkForDraw();
        }
      }
    }
  };

  animate = function() {
    // console.log(Math.floor(Math.random() * board[0].length);
    var randomIndex = Math.floor(
      Math.random() * (board[1].length * board[1].length)
    );
    $(".boardBtn")
      .eq(randomIndex)
      .css({
        "background-image": gifArr[Math.floor(Math.random() * gifArr.length)],
        "background-size": "cover",
        "background-repeat": "no-repeat",
        "background-position": "center"
      });
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

let gifArr = [
  "url(./images/bro_gifs/stalone.gif)",
  "url(./images/bro_gifs/jackson.gif)",
  "url(./images/bro_gifs/drake.gif)",
  "url(./images/bro_gifs/jonny.gif)",
  "url(./images/bro_gifs/nicolas.gif)"
];
