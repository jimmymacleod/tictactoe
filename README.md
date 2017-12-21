#TIC TAC BURNTOUT

![Alt Text](https://media.giphy.com/media/406BrsGSpOKze/giphy.gif)

Here is my Tic Tac Toe gameboard. The title of the game reflects the mental state that engulfed the creator upon coming to refactor. I designed the board to scale, creating the rows and columns using javascript, ideally input by the user. However, this created some problems for me over the course of the project.

The board is created using the ticTac.createBoard function, which also creates a corresponding board array (of arrays), which represents the value of the items in each row. Each item on the board is given an id respective of their row/column index, which is also pushed into the board array.

Event handlers are then added to the elements on the board in the addEventHandlers function. This function is called on creating the board (when the start button is pressed) and again, in the newGame function. These event handlers call the functions - switchPlayer, playMove, boardRules, as well as adding classes to the respective grid items to represent the board in the GUI console.

In ticTac.boardRules two more arrays (of arrays) are built; one to represent the board on its side (arrays of the columns) and one to represent the diagonal options. Also in this function, we test for winning combinations, checking all the arrays across the three master arrays against the possible winning sequences (winnerArr).

The playMove function inserts the selected player into the assigned value into the corresponding element in the board array (this is then copied over in the vertArr array and diagArr array in boardRules).

When board || vertArrs || diagArrs is equal to the winnerArr variable a message alert is shown to indicate which player has won. The scoreBoard function is also called with the winning player.

##Know bugs:

The create board controller functionality doesn’t work, the createBoard function is hard coded into the Javascript.
If a tile button is clicked twice the player in the board array will change, but visual representation will not.
There is no indication of a draw. The players can keep playing on the board, changing the elements to different players.
The selector can be manipulated so that a player can play two goes in a row.
upon
