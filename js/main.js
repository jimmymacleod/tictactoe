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
      //Start game with x selected
      $Xselect.addClass("selected");
      if (!$Xselect.hasClass("selected") && !$0select.hasClass("selected")) {
        alert("select player");
      }
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

    //Newboard function to replace
    clearBoard: function() {
      $("#new-game").on("click", function() {
        //Hard coded
        $("#0, #1, #2").remove();
        ticTac.createBoard(3, 3, 0);
        ticTac.addPlayer();

        ///////////////////////////////////////////////////////////////////////
        newBoard = board.slice(3);
        console.table(newBoard);
        // this.resetArrayBoard();
      });
    },

    addPlayer: function() {
      $(".boardBtn").on("click", function() {
        $(this).addClass(player);
        ticTac.switchPlayer();
        ticTac.playMove(player); //changes the element on board to X/O
        let btnId = event.target.id;
        ticTac.boardRules(btnId);
      });
    },

    playMove: function(player) {
      if (this.count >= 1) {
        let btnId = event.target.id;
        btnId = btnId.split("-");
        let x = btnId[0];
        let y = btnId[1];
        if (player === "oClicked") {
          board[x][y] = "X";
        }
        if (player === "xClicked") {
          board[x][y] = "O";
        }
      }
      this.count++;
    },

    boardRules: function(btnId) {
      btnId = btnId.split("-");
      let x = btnId[0];
      let y = btnId[1];
      let diagonalArr1 = [];
      let diagonalArr2 = [];
      const diagArrs = function() {
        diagonalArr1.push(board[0][0]);
        diagonalArr1.push(board[1][1]);
        diagonalArr1.push(board[2][2]);
        diagonalArr2.push(board[0][2]);
        diagonalArr2.push(board[1][1]);
        diagonalArr2.push(board[2][0]);
      };
      diagArrs();
      console.log(diagonalArr2);
      console.log(diagonalArr1);
      if (
        board[x].join() === winnerArrX.join() ||
        board[x].join() === winnerArrO.join() ||
        diagonalArr1.join() === winnerArrX.join() ||
        diagonalArr1.join() === winnerArrO.join() ||
        diagonalArr2.join() === winnerArrX.join() ||
        diagonalArr2.join() === winnerArrO.join()
      ) {
        console.log("winner");
      }
    }
  };

  ticTac.clearBoard();
  ticTac.createBoard($numberOfRows, $numberOfColumns, $winningStreak);
  ticTac.addPlayer();
});

// btnId = btnId.split("-");
// let x = btnId[0]; // first element of id
// let y = btnId[1]; // secod Element of id
// console.log(btnId);
//
// for (let y = 0; y < board.length; y++) {
//   let row = board[y];
//   let cells = row.length;
//   for (var x = 0; x < cells; x++) {
//     var cell = row[x];
//     // console.log(board[y][x]);
//   }

// for (let i = 0; i < 3; i++) {}
//
// console.log(btnId);

// playMove: function(btnId) {
//   // $("#" + btnId).on("click", function() {
//   //replace the btnId in the board with a X/0.
//   //create two variable from btnId
//   btnId = btnId.split("-");
//   let x = btnId[0];
//   let y = btnId[1];
//   board[x][y] = "X";
//   // });
//   console.log(btnId);
// }

// const playMove = function(btnId) {
//   // $("#" + btnId).on("click", function() {
//   //replace the btnId in the board with a X/0.
//   //create two variable from btnId
//   btnId = btnId.split("-");
//   let x = btnId[0];
//   let y = btnId[1];
//   board[x][y] = "X";
//   // });
//   console.log(btnId);
// };

//
// $(".boardBtn").on("click", playMove() {
//   // get the particular id of this element
//   let btnId = event.target.id;
//   console.log(btnId);
//   btnId = btnId.split("-");
//   let x = btnId[0];
//   let y = btnId[1];
//
//   board[x][y] = "X";
//   // });
//   console.log(btnId);
// });
// ticTac.playMove("1-1");
// tryThisOut: function(board, x, y) {
//   var getCell = function(board, y, x) {
//     var NO_VALUE = null;
//     var value, hasValue;
//
//     try {
//       hasValue = board[y][x] !== undefined;
//       value = hasValue ? board[y][x] : NO_VALUE;
//     } catch (e) {
//       value = NO_VALUE;
//     }
//     return value;
//   };
//
//   function surroundings(board, y, x) {
//     // Directions are clockwise
//     return {
//       up: getCell(board, y - 1, x),
//       upRight: getCell(board, y - 1, x + 1),
//       right: getCell(board, y, x + 1),
//       downRight: getCell(board, y + 1, x + 1),
//       down: getCell(board, y + 1, x),
//       downLeft: getCell(board, y + 1, x - 1),
//       left: getCell(board, y, x - 1),
//       upLeft: getCell(board, y - 1, x - 1)
//     };
//   }
//
//   const eachCell = (board, action, thisArg = null) => {
//     baord.forEach((row, y) => {
//       row.forEach((cell, x) => {
//         action.call(thisArg, cell, y, x, board);
//       });
//     });
//
//     eachCell(board, function(cell, y, x, board) {
//       console.log(
//         "Adjacent cells to [" + y + ", " + x + "]: ",
//         surroundings(board, y, x),
//         "Current Value: " + cell + "."
//       );
//     });
//   };
// }

// boardRules: function(btnId) {
//   // btnId=1-1
//   //board[1][1];
//   //create varaibles to hold the x and y axis coordinates
//   console.log(board);
//   btnId = btnId.split("-");
//   let x = btnId[0];
//   let y = btnId[1];
//   //Write a loop that loops through the immediate neighbors.
//   for (let j = -1; j <= 1; j++) {
//     for (let k = -1; k <= 1; k++) {
//       let varX = x - j;
//       let varY = y - k;
//       if (board[varX][varY]) {
//         console.log(
//           `id= ${varX} ${varY} ---- board item: ${board[varX][varY]}`
//         );
//       }
//       // if (board[varX][varY] === "O" || board[varX][varY] === "X") {
//       //   console.log(
//       //     `id= ${event.target.id} ---- board item: ${board[varX][varY]}`
//       //   );
//     }
//   }
// }
