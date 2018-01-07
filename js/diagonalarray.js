
//Now I need to make a board to repreent the diagonal options available.
const getDiagArray = function(board){
var W = board[0].length;
var H = board.length;
var starts = [];
// Horizontal
for (var i=0; i<W; i++) {
  starts.push([i, 0]);
}
// Vertical, start at 1, because we already have 0, 0
for (var i=1; i<H; i++) {
  starts.push([0, i]);
}

console.log(starts);
// [[0,0], [1,0], [2,0], [3,0], [0,1], [0,2], [0,3]]

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

  var diagonalArray = [];
    starts.forEach(function(start) {
      var diag;
      diag = getDiag(start, 1);
      diag.length > 1 && diagonalArray.push(diag);
      // If you want to go top-right to bottom-left too, you need more starts: D2, D3, D4
      diag = getDiag(start, -1);
      diag.length > 1 && diagonalArray.push(diag);
      })
  return diagonalArray;
};

export default {getDiagArray()};

//
// let diagBoard = [];
// const createDiagBoard = function(numberOfRows, numberOfColumns){
//   diagBoard = [];
//   const diagRows = numberOfRows + numberOfColumns - 3;
//   for (let i = 0; i < diagRows; i++){
//     const diagRow = [];
//       let count = 0;
//       for (let j = 0; j < numberOfRows; j++){
//       if (i <= diagRows/2){
//
//         diagRow.push(`${count}, ${numberOfRows + j - 2 + count}`);
//         count++;
//         // console.log(count);
//         } else {
//         diagRow.push(`${1},${1}`);
//         }
//      }
//     // daigRow.slice()
//     diagBoard.push(diagRow);
//   }
//   return diagBoard;
// }
