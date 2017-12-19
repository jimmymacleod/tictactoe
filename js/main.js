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
    //create method to select player.

    createBoard: function($numberOfRows, $numberOfColumns, $winnerStreak) {
      const switchPlayer = function() {
        if (!$Xselect.hasClass("selected") && !$0select.hasClass("selected")) {
          alert("select player");
        }
        if ($Xselect.hasClass("selected")) {
          $Xselect.removeClass("selected");
          $0select.addClass("selected");
          console.log("whats going on!");
          player = "oClicked";
        } else {
          $Xselect.addClass("selected");
          $0select.removeClass("selected");
          player = "xClicked";
        }
      };

      const createTileBtn = function(row, columnIndex) {
        rowIndex = row.match(/\d+/) - 1;
        let btnId = "" + rowIndex + "-" + columnIndex;
        let newBtn = $("<button/>", {
          class: "boardBtn",
          id: btnId
        });
        $("#" + row).append(newBtn);
        // addClickClass(rowIndex, columnIndex);
      };

      //Create a new array for each row, creating buttons on the board

      let newArr1 = [];
      let newArr2 = [];
      let newArr3 = [];

      for (let i = 0; i < $numberOfColumns; i++) {
        newArr1.push("n");
        createTileBtn("row1", i);
      }

      for (let i = 0; i < $numberOfColumns; i++) {
        newArr2.push("n");
        createTileBtn("row2", i);
      }

      for (let i = 0; i < $numberOfColumns; i++) {
        newArr3.push("n");
        createTileBtn("row3", i);
      }

      $(".boardBtn").on("click", function() {
        console.log("tile clicked");
        $(this).addClass(player);
        switchPlayer();
      });

      console.log(newArr1);
      console.log(newArr2);
      console.log(newArr3);

      //Create an array for each row;
      // Create buttons for each element in corresponding rows.

      //In the create board function we are creating the gui board and also creating the arrays that will work with the javascript.
      //First create a function that when called will add the correct amount of buttons to the gameRow.
    }
  };

  ticTac.createBoard($numberOfRows, $numberOfColumns, $winningStreak);
});

//
