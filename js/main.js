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
            // $("#" + btnId).on("click", playMove(btnId));
            rowArray.push(btnId);
          }
          board.push(rowArray);
        }
        console.log(board);
      };

      createRow(3, 3);
    },

    //Newboard function to replace

    clearBoard: function() {
      $("#new-game").on("click", function() {
        // $(".boardBtn").removeClass("oClicked xClicked");
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
        ticTac.playMove(player);
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
          console.log(btnId);
        }
        if (player === "xClicked") {
          board[x][y] = "O";
          console.log(btnId);
        }
      }
      this.count++;
    }

    //Create boardRules function
    //When a button is hit, take the id and get the row and index.
    // board[1][1] = id="1-1"
    // the function must then check the surrounding elements of the board for a X or O.
    //Get it working for the

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
  };
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

  ticTac.clearBoard();
  ticTac.createBoard($numberOfRows, $numberOfColumns, $winningStreak);
  ticTac.addPlayer();
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
});
