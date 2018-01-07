checkForDraw = function() {
  let drawCount = 0;
  parse = function(r) {
    return parseFloat(r) * 2;
  };
  for (let i = 0; i < board.length; i++) {
    for (let k = 0; i < board[i].length; k++) {
      if (parse(!board[i][k])) {
        drawCount++;
      }
    }
  }
  console.log(drawCount);
};
