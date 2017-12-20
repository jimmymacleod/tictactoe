//Create file structuture

//Create a createTicTac function that take takes three arguements: rows, columns, stack .
//This function will create a board on the screen with the parameters set in the arguements.
//The parameters should be defined in the gui display but accessable in the console.
//For each row/columns arguement, the program will manipulate the DOM to create the board.

//Create a boardObject
//The board object will be defined by the values input by constructor.
//The object will have a "rows" number of keys of "column" elements.
//The default will be three rows of three elements.

//

//controller
//Create code to get values from the controller input that will be used to set the board dimensions.

//on clicking start-game-btn set the 3 variables with the values of their respective boxes.
let createTileBtn;
let rowIndex;
let board = [];
let vertArrs = [];
// let diagArrs = [];

let winnerArrX = ["X", "X", "X"];
let winnerArrO = ["O", "O", "O"];

$("document").ready(function() {
  let $numberOfRows = 3;
  let $numberOfColumns = 3;
  let $winningStreak = 3;
  let $controller = $(".controller");
  let $gameBoard = $(".gameBoard");

  // const $startBtn = $("button#start-game-btn");
  // console.log($startBtn);
  // // $startBtn.on("click", function() {
  //   console.log("working");
  //   $numberOfRows = $("#controller-rows").val();
  //   $numberOfColumns = $("#controller-columns").val();
  //   $winningStreak = $("#controller-rows").val();
  //   $controller.css("display", "none");
  //   $gameBoard.css("display", "flex");
  //   // $gameBoard.css('display')
  // });

  const $0select = $("#0-selector");
  const $Xselect = $("#X-selector");
  let player;

  $0select.on("click", function() {
    $0select.addClass("selected");
    $Xselect.removeClass("selected");
    player = "oClicked";
  });

  $Xselect.on("click", function() {
    $Xselect.addClass("selected");
    $0select.removeClass("selected");
    player = "xClicked";
  });

  const ticTac = {
    count: 0,
    switchPlayer: function() {
      if ($Xselect.hasClass("selected")) {
        $Xselect.removeClass("selected");
        $0select.addClass("selected");
        player = "oClicked";
      } else {
        $Xselect.addClass("selected");
        $0select.removeClass("selected");
        player = "xClicked";
      }
    },

    createBoard: function($numberOfRows, $numberOfColumns, $winnerStreak) {
      board = [];
      const createRow = function($numberOfRows, $numberOfColumns) {
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
      };

      createRow(3, 3);
    },

    boardRules: function(btnId) {
      btnId = btnId.split("-");
      let x = btnId[0];
      let y = btnId[1];
      let diagonalArr1 = [];
      let diagonalArr2 = [];
      vertArrs = [];
      diagArrs = [];

      const createVertArrs = function() {
        for (let k = 0; k < 3; k++) {
          vertArrs.push([]);
          for (let i = 0; i < 3; i++) {
            vertArrs[k].push(board[i][k]);
            vertArrs[k].push(board[i][k]);
          }
        }
      };
      createVertArrs();

      const createDiagArrs = function() {
        diagonalArr1.push(board[0][0]);
        diagonalArr1.push(board[1][1]);
        diagonalArr1.push(board[2][2]);
        diagonalArr2.push(board[0][2]);
        diagonalArr2.push(board[1][1]);
        diagonalArr2.push(board[2][0]);
      };
      createDiagArrs();
      // console.log(diagonalArr2);
      // console.log(diagonalArr1);

      for (let i = 0; i < 2; i++) {
        if ((i = 0)) {
          winningCom = winnerArrX.join();
        } else {
          winningCom = winnerArrO.join();
        }
        if (
          board[x].join() === winnerArrX.join() ||
          board[x].join() === winnerArrO.join() ||
          diagonalArr1.join() === winnerArrX.join() ||
          diagonalArr1.join() === winnerArrO.join() ||
          diagonalArr2.join() === winnerArrX.join() ||
          diagonalArr2.join() === winnerArrO.join() ||
          vertArrs[y].join() === winnerArrO.join() ||
          vertArrs[y].join() === winnerArrX.join()
        ) {
          console.log("winner");
        }
      }
    }
  };

  ticTac.createBoard(3, 3, 0);

  const newGame = function() {
    $("#new-game").on("click", function() {
      //Hard coded
      $("#0, #1, #2").remove();
      $("board").empty();
      ticTac.createBoard(3, 3, 0);
      console.log(board);
      addEventHandlers();
    });
  };

  newGame();

  const addEventHandlers = function() {
    $(".boardBtn").on("click", function() {
      $(this).addClass(player);
      playMove(player); //changes the element on board to X/O
      let btnId = event.target.id;
      ticTac.boardRules(btnId);
      if ($Xselect.hasClass("selected") || $0select.hasClass("selected")) {
        ticTac.switchPlayer();
      } else {
        alert("select player");
      }
    });
  };

  addEventHandlers();

  const playMove = function() {
    if ($0select.hasClass("selected") || $Xselect.hasClass("selected")) {
      let btnId = event.target.id;
      btnId = btnId.split("-");
      let x = btnId[0];
      let y = btnId[1];
      console.log({ player });
      if (player === "oClicked") {
        board[x][y] = "O";
      } else {
        board[x][y] = "X";
      }
    }
  };
});
