loremink: https://jimmymacleod.github.io/tictactoe/

This is my TIC TAC BRO board.

This a scaleable game board for two players. Players can describe the desired scale of board, as well as the desired winning streak - ie how many markers in a row a player must get in order to win a single game. 

The board is pretty self explanatory. The game is reset automatically after a winning combination. Scoreboard is adjusted and a bro will appear at a random index along the board.

There a couple of bugs to be addresses.

1. The checkForDraw function does not check the first array of tiles on the board for played tiles.

2. The getDiagBoard function create a daigBoard that does not contain all of the possible diagonal combinations. This code is only partly complete.
