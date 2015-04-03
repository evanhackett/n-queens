/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n, x, y) {
  var board = new Board({n : n});

  x = x || 0;
  y = y || 0;

  board.togglePiece(x, y);


  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      if (i === y && j === x) {
        continue;
      } else {
        board.togglePiece(j, i);
        if (board.hasAnyRooksConflicts()) {
          board.togglePiece(j, i);
        }
      }
    }
  }

  var solution = board.rows();
  //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
// window.countNRooksSolutions = function(n) {
  
//   var solutions = {};
//   var matrix;
//   var string;
//   var charCount;

//   // call findNRooksSolution for each starting coordinate
//   for (var i = 0; i < n; i++) {
//     for (var j = 0; j < n; j++) {
//       matrix = findNRooksSolution(n, j, i);
//       // stringify each solution
//       string = JSON.stringify(matrix);

//       // count number of 1's
//       charCount = 0;
//       for (var k = 0; k < string.length; k++) {
//         if (string[k] === '1') {
//           charCount += 1;
//         }
//       }

//       // check if numPieces === n
//       if (charCount === n) {
//         // put solution string in an object
//         solutions[string] = 1;
//       }
//     }
//   }


//   // return number of strings in object (key count)
//   var solutionCount = Object.keys(solutions).length;
//   for(var key in solutions){
//     console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
//   }
//   console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
//   return solutionCount;

// };




window.countNRooksSolutions = function(n) {


  var solutions = {};
  var matrix;
  var string;
  var rounds;
  var startRounds = n;


  var findSolution = function(rounds, board){
    var i, j, matrixString;
    var boardSpawns = [];
    //if first call create empty nxn board
    if(!board){
      board = new Board({n : n});
      //spawn n*n boards with 1 piece on each spot

      for (i = 0; i < n; i++) {
        for (j = 0; j < n; j++) {
          board.togglePiece(j, i);
          matrixString = JSON.stringify(board.rows());
          boardSpawns.push(new Board(JSON.parse(matrixString)));
          board.togglePiece(j,i);
        }
      }
    }
          
    //end case; check if number of pieces is equal to number of rows or if rounds complete
    boardString = JSON.stringify(board.rows());

   // console.log("boardString: " + boardString);   
    var pieceCount = 0;
    for (var k = 0; k < boardString.length; k++) {
      if (boardString[k] === '1') {
          pieceCount += 1;
        }
    }
    if(pieceCount === n){
      solutions[boardString] = 1;
      // console.log("solutions: " + solutions);
      return;
    }
    if(!rounds){
      return;
    }
    //if not first round, spawn new boards with new piece on each spot
    if(boardSpawns.length === 0){
      for (i = 0; i < n; i++) {
        for (j = 0; j < n; j++) {
          if (board.rows()[j][i] === 1) {
            continue;
          } 
          else {
          //  console.log("board before toggle: " + board.rows());
            board.togglePiece(j, i);
          //  console.log("Toggling Piece: x: " + j + " y: " + i);
           // console.log("board after toggle: " + board.rows());
            if (board.hasAnyRooksConflicts()) {
              board.togglePiece(j, i);
              continue;
            }

            //console.log("board about to be pushed: " + (new Board(board.rows())).rows());
            matrixString = JSON.stringify(board.rows());
            boardSpawns.push(new Board(JSON.parse(matrixString)));
            board.togglePiece(j,i);
            }
          }
        }
    }
   // for(var z = 0; z < boardSpawns.length; z++){
   //   console.log("boardspawns:" + boardSpawns[z].rows());
   // }
    //recurse through board spawns
    for(var l = 0; l < boardSpawns.length; l++){
      findSolution(rounds-1,boardSpawns[l]);
    }
  };

  findSolution(startRounds);

  // return number of strings in object (key count)
  var solutionCount = Object.keys(solutions).length;
  // for(var key in solutions){
  //   console.log('Single solution for ' + n + ' rooks:' + key);
  // }
  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solutions = {};
  var matrix;
  var string;
  var rounds;
  var startRounds = n;


  var findSolution = function(rounds, board){
    var i, j, matrixString;
    var boardSpawns = [];
    if(Object.keys(solutions).length){
      return;
    }
    //if first call create empty nxn board
    if(!board){
      board = new Board({n : n});
      //spawn n*n boards with 1 piece on each spot

      for (i = 0; i < n; i++) {
        for (j = 0; j < n; j++) {
          board.togglePiece(j, i);
          matrixString = JSON.stringify(board.rows());
          boardSpawns.push(new Board(JSON.parse(matrixString)));
          board.togglePiece(j,i);
        }
      }
    }
          
    //end case; check if number of pieces is equal to number of rows or if rounds complete
    boardString = JSON.stringify(board.rows());

 
    var pieceCount = 0;
    for (var k = 0; k < boardString.length; k++) {
      if (boardString[k] === '1') {
          pieceCount += 1;
        }
    }
    if(pieceCount === n){
      solutions["solution"] = board.rows();
   
      return;
    }
    if(!rounds){
      return;
    }
    //if not first round, spawn new boards with new piece on each spot
    if(boardSpawns.length === 0){
      for (i = 0; i < n; i++) {
        for (j = 0; j < n; j++) {
          if (board.rows()[j][i] === 1) {
            continue;
          } 
          else {
        
            board.togglePiece(j, i);
         
            if (board.hasAnyQueensConflicts()) {
              board.togglePiece(j, i);
              continue;
            }

           
            matrixString = JSON.stringify(board.rows());
            boardSpawns.push(new Board(JSON.parse(matrixString)));
            board.togglePiece(j,i);
            }
          }
        }
    }

    //recurse through board spawns
    for(var l = 0; l < boardSpawns.length; l++){
      findSolution(rounds-1,boardSpawns[l]);
    }
  };

  findSolution(startRounds);

  // return number of strings in object (key count)
  var solutionCount = Object.keys(solutions).length;
  for(var key in solutions){
    console.log('Single solution for ' + n + ' queens:' + key);
  }
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  if(!solutions["solution"]){
    return new Board({"n": n}).rows();
  }
  return solutions["solution"];
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  
  var solutions = {};
  var matrix;
  var string;
  var rounds;
  var startRounds = n;


  var findSolution = function(rounds, board){
    var i, j, matrixString;
    var boardSpawns = [];
    //if first call create empty nxn board
    if(!board){
      board = new Board({n : n});
      //spawn n*n boards with 1 piece on each spot

      for (i = 0; i < n; i++) {
        for (j = 0; j < n; j++) {
          board.togglePiece(j, i);
          matrixString = JSON.stringify(board.rows());
          boardSpawns.push(new Board(JSON.parse(matrixString)));
          board.togglePiece(j,i);
        }
      }
    }
          
    //end case; check if number of pieces is equal to number of rows or if rounds complete
    boardString = JSON.stringify(board.rows());

   // console.log("boardString: " + boardString);   
    var pieceCount = 0;
    for (var k = 0; k < boardString.length; k++) {
      if (boardString[k] === '1') {
          pieceCount += 1;
        }
    }
    if(pieceCount === n){
      solutions[boardString] = 1;
      //console.log("solution: " + solutions[boardString]);
      return;
    }
    if(!rounds){
      return;
    }
    //if not first round, spawn new boards with new piece on each spot
    if(boardSpawns.length === 0){
      for (i = 0; i < n; i++) {
        for (j = 0; j < n; j++) {
          if (board.rows()[j][i] === 1) {
            continue;
          } 
          else {
          //  console.log("board before toggle: " + board.rows());
            board.togglePiece(j, i);
          //  console.log("Toggling Piece: x: " + j + " y: " + i);
           // console.log("board after toggle: " + board.rows());
            if (board.hasAnyQueensConflicts()) {
              board.togglePiece(j, i);
              continue;
            }

            //console.log("board about to be pushed: " + (new Board(board.rows())).rows());
            matrixString = JSON.stringify(board.rows());
            boardSpawns.push(new Board(JSON.parse(matrixString)));
            board.togglePiece(j,i);
            }
          }
        }
    }
   // for(var z = 0; z < boardSpawns.length; z++){
   //   console.log("boardspawns:" + boardSpawns[z].rows());
   // }
    //recurse through board spawns
    for(var l = 0; l < boardSpawns.length; l++){
      findSolution(rounds-1,boardSpawns[l]);
    }
  };

  findSolution(startRounds);

  // return number of strings in object (key count)
  var solutionCount = Object.keys(solutions).length;
  for(var key in solutions){
    console.log('Single solution for ' + n + ' queens:' + key);
  }
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
