let playerOne = [];
let playerTwo = [];
const winningArray = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

function compareArray(playerMove, winningMove) {
  for (let i = 0; i <= playerMove.length - 3; i++) {
    const replacedArray = playerMove.slice(); 
    const replacedElements = replacedArray.splice(i, 3); 

    for (let j = 0; j < winningMove.length; j++) {
      const currentSet = winningMove[j];

      if (arraysEqual(replacedElements, currentSet)) {
       console.log(`Match found: [${replacedElements}] matches [${currentSet}]`);
      }
    }
  }
}

function arraysEqual(a, b) {
  if (a.length !== b.length) {
    return false;
  }
  
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}