let createTileBtn;
let rowIndex;
let board = [];
let vertArrs = [];
let diagArrs = [];

let winnerArrX = ["X", "X", "X"];
let winnerArrO = ["O", "O", "O"];
let player;
let winnerArr;
let winnerMessage;
let oScore = 0;
let xScore = 0;
$("#player-o-score").text(oScore);
$("#player-x-score").text(xScore);

$("document").ready(function() {
  const $startBtn = $("button#start-game-btn");
  $startBtn.on("click", function() {
    $(".controller").css("display", "none");
    $(".play").css("display", "block");
    ticTac.createBoard(3, 3, 0);
    addEventHandlers();
  });

  const $0select = $("#0-selector");
  const $Xselect = $("#X-selector");

  const toggleSelected = function(player, opposition) {
    player.addClass("selected");
    opposition.removeClass("selected");
  };

  $0select.on("click", function() {
    toggleSelected($0select, $Xselect);
    player = "oClicked";
  });

  $Xselect.on("click", function() {
    toggleSelected($Xselect, $0select);
    player = "xClicked";
  });

  const ticTac = {
    //Tic Tac Object stores
    count: 0,
    switchPlayer: function() {
      if ($Xselect.hasClass("selected")) {
        toggleSelected($0select, $Xselect);
        player = "xClicked";
        winnerArr = winnerArrX;
        winnerMessage = "X";
      } else {
        toggleSelected($Xselect, $0select);
        player = "oClicked";
        winnerArr = winnerArrO;
        winnerMessage = "O";
      }
    },

    createBoard: function($numberOfRows, $numberOfColumns, $winnerStreak) {
      board = [];
      for (let i = 0; i < $numberOfRows; i++) {
        let rowArray = [];
        $newRow = $("<div/>", { class: "gameRow", id: i });
        $(".gameBoard").append($newRow);
        for (let j = 0; j < $numberOfColumns; j++) {
          let btnId = "" + i + "-" + j;
          let newBtn = $("<button/>", {
            class: "boardBtn",
            id: btnId
          });
          let row = $("#" + i);
          $("#" + i).append(newBtn);
          rowArray.push(btnId);
        }
        board.push(rowArray);
      }
    },

    boardRules: function(btnId, player) {
      console.log(btnId);
      btnId = btnId.split("-");
      let x = btnId[0];
      let y = btnId[1];
      vertArrs = [];
      diagArrs = [];
      for (let k = 0; k < 3; k++) {
        vertArrs.push([]);
        for (let i = 0; i < 3; i++) {
          vertArrs[k].push(board[i][k]);
        }
      }
      counter = 0;
      for (let k = 0; k < 2; k++) {
        diagArrs.push([]);
        counter++;
        if (counter === 1) {
          for (let i = 0; i < 3; i++) {
            diagArrs[0].push(board[i][i]);
          }
        }
        if (counter === 2) {
          for (let u = 0; u < 3; u++) {
            o = board.length - u;
            diagArrs[k].push(board[u][o - 1]);
          }
        }
      }

      if (
        board[x].join() === winnerArr.join() ||
        vertArrs[y].join() === winnerArr.join() ||
        diagArrs[0].join() === winnerArr.join() ||
        diagArrs[1].join() === winnerArr.join()
      ) {
        this.scoreBoard(winnerArr.join());
      }
    },

    scoreBoard: function(winner) {
      if (winner === "X,X,X") {
        xScore += 1;
      } else {
        oScore += 1;
      }
      $("#player-o-score").text(oScore);
      $("#player-x-score").text(xScore);
      setTimeout(function() {
        alert(`Player ${winnerMessage} won`);
      }, 200);
    },

    playMove: function(player) {
      if ($0select.hasClass("selected") || $Xselect.hasClass("selected")) {
        let btnId = event.target.id;
        btnId = btnId.split("-");
        let x = btnId[0];
        let y = btnId[1];
        if (player === "oClicked") {
          board[x][y] = "O";
        } else {
          board[x][y] = "X";
        }
      }
    }
  }; // ticTac object

  const newGame = function() {
    $("#new-game").on("click", function() {
      $("#0, #1, #2").remove(); //!!!HardCoded
      $("board").empty();
      ticTac.createBoard(3, 3, 0); //!!!HardCoded
      addEventHandlers();
    });
  };

  const addEventHandlers = function() {
    $(".boardBtn").on("click", function() {
      if ($Xselect.hasClass("selected") || $0select.hasClass("selected")) {
        ticTac.switchPlayer();
        $(this).addClass(player); //adds the visual represation to the board.
        ticTac.playMove(player); //changes the element on board to X/O
        let btnId = event.target.id;
        ticTac.boardRules(btnId, player); //Checks for winner
      } else {
        alert("select player");
      }
    });
  };
  addEventHandlers();
  newGame();
}); //End document ready
