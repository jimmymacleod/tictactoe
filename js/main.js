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
let diagArrs = [];

let winnerArrX = ["X", "X", "X"];
let winnerArrO = ["O", "O", "O"];
let player;

$("document").ready(function() {
  let $numberOfRows = 3;
  let $numberOfColumns = 3;
  let $winningStreak = 3;
  let $controller = $(".controller");
  let $play = $(".play");

  const $startBtn = $("button#start-game-btn");
  $numberOfRows = $("#controller-rows").val();
  $numberOfColumns = $("#controller-columns").val();
  $winningStreak = $("#controller-rows").val();
  // $controller.css("display", "block");
  // $play.css("display", "none");

  $startBtn.on("click", function() {
    $controller.css("display", "none");
    $play.css("display", "block");
  });

  const $0select = $("#0-selector");
  const $Xselect = $("#X-selector");

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
    //Tic Tac Object stores
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
    boardRules: function(btnId, player) {
      btnId = btnId.split("-");
      let x = btnId[0];
      let y = btnId[1];
      vertArrs = [];
      diagArrs = [];

      if (player === "oClicked") {
        winnerArr = winnerArrO.join();
      }
      if (player === "xClicked") {
        winnerArr = winnerArrX.join();
      }
      for (let k = 0; k < 3; k++) {
        // Create vertical perspective arrays
        vertArrs.push([]);
        for (let i = 0; i < 3; i++) {
          vertArrs[k].push(board[i][k]);
        }
      }
      counter = 0; //Create Diagonal perspectice arrays
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
            y = board.length - u;
            diagArrs[k].push(board[u][y - 1]);
          }
        }
      }
      if (
        // Check for winner in all 8 arrays;
        board[x].join() === winnerArr ||
        vertArrs[y].join() === winnerArr ||
        diagArrs[0].join() === winnerArr ||
        diagArrs[1].join() === winnerArr
      ) {
        console.log("winner");
      }
    },
    playMove: function() {
      if ($0select.hasClass("selected") || $Xselect.hasClass("selected")) {
        let btnId = event.target.id;
        btnId = btnId.split("-");
        let x = btnId[0];
        let y = btnId[1];
        console.log(player);
        if (player === "oClicked") {
          board[x][y] = "O";
        } else {
          board[x][y] = "X";
        }
      }
    }
  }; // ticTac object
  ticTac.createBoard(3, 3, 0);
  // Code snippet creates new bord upon click of new-game
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
  // Code snippet adds event handles to the board buttons.
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
}); //End document ready
