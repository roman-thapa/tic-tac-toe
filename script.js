const winningArray = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

let playerOne = [];
let playerTwo = [];
let count = 1;
let win = false;
const info = document.querySelector("#info");
const finalVerdic = document.createElement("div");
const moves = document.querySelectorAll(".grid");
const reset = document.createElement("button");

moves.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText === "" && win === false) {
      box.innerText = updateDOM(box.id, count);
      count++;
    } else {
      box.off();
    }
  });
});

const updateDOM = function (move, count) {
  if (count % 2 === 1) {
    updateMove(playerOne, move);
    lengthChecker(playerOne);
    return "O";
  } else {
    updateMove(playerTwo, move);
    lengthChecker(playerTwo);
    return "X";
  }
};

const updateMove = function (player, move) {
  player.push(move);
};

const lengthChecker = function (player) {
  if (player.length >= 3) {
    const win = gameBegin(player, winningArray);
    if (win) {
      gameOver(win);
    }
  }
  if (win === false && playerOne.length === 5 && playerTwo.length === 4) {
    finalVerdic.innerText = "It's a draw";
    info.append(finalVerdic);
    reset.innerText = "Reset";
    reset.onclick = resetAll;
    info.append(reset);
  }
};

const gameBegin = function (player, conditionTowin) {
  const sortedMove = sortMove(player);
  const playerMoveSet = setOfPlayerMove(sortedMove);
  return gameLogic(playerMoveSet, conditionTowin);
};

const sortMove = function (move) {
  const temp = move.slice();
  temp.sort();
  return temp;
};

const setOfPlayerMove = function (playerMove) {
  const setOfMove = [];
  const len = playerMove.length;
  for (let i = 0; i < len - 2; i++) {
    const firstElement = playerMove[i];
    for (let j = i + 1; j < len - 1; j++) {
      const secondElement = playerMove[j];
      for (let k = j + 1; k < len; k++) {
        const thirdElement = playerMove[k];
        const arr = [firstElement, secondElement, thirdElement];
        setOfMove.push(arr);
      }
    }
  }
  return setOfMove;
};

const gameLogic = function (player, winCondition) {
  let result = false;
  for (let i = 0; i < player.length; i++) {
    let playerMove = player[i];
    for (let j = 0; j < winCondition.length; j++) {
      let winArray = winCondition[j];
      result = arraysEqual(playerMove, winArray);
      if (result) {
        return playerMove;
      }
    }
  }
  return "";
};

const arraysEqual = function (array1, array2) {
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] != array2[i]) {
      return false;
    }
  }
  return true;
};

const gameOver = function (boxes) {
  win = true;
  if (count % 2 === 1) {
    finalVerdic.innerText = "Player One won";
    info.append(finalVerdic);
    reset.innerText = "Reset";
    reset.onclick = resetAll;
    info.append(reset);
  } else {
    finalVerdic.innerText = "Player Two won";
    info.append(finalVerdic);
    reset.innerText = "Reset";
    reset.onclick = resetAll;
    info.append(reset);
  }
  for (let i = 0; i < boxes.length; i++) {
    moves[boxes[i] - 1].style.backgroundColor = "lightgreen";
    moves[boxes[i] - 1].style.fontWeight = "bolder";
  }
};

const resetAll = function () {
  playerOne = [];
  playerTwo = [];
  win = false;
  count = 1;
  moves.forEach((box) => {
    box.innerText = "";
    box.style.backgroundColor = "#F6F1F1";
    box.style.fontWeight = "normal";
  });
  info.removeChild(finalVerdic);
  info.removeChild(reset);
};
