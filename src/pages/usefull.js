
// function drawBlock({ canvasCtx, x, y, width, height, color }) {
//   canvasCtx.fillStyle = color || "yellow";
//   canvasCtx.fillRect(x, y, width, height);
// }


// function displaySequence({ colorSequence, actualIndex }) {
//   roundState.userTime = false;
//   let selectedButton;
//   const blockNumber = colorSequence[actualIndex];

//   if (actualIndex >= colorSequence.length) {
//     setTimeout(() => {
//       roundState.userTime = true;
//       return;
//     }, 1000);
//   }

//   setTimeout(() => {
//     if (blockNumber === 0) {
//       selectedButton = document.getElementById("top-left-corner");
//       selectedButton.classList.add("active");
//     }

//     if (blockNumber === 1) {
//       selectedButton = document.getElementById("top-right-corner");
//       selectedButton.classList.add("active");
//     }

//     if (blockNumber === 2) {
//       selectedButton = document.getElementById("bottom-left-corner");
//       selectedButton.classList.add("active");
//     }

//     if (blockNumber === 3) {
//       selectedButton = document.getElementById("bottom-right-corner");
//       selectedButton.classList.add("active");
//     }

//     setTimeout(() => {
//       if (selectedButton) {
//         selectedButton.classList.remove("active");
//         // const effect = new Audio("crash-sound.mp3");
//         // effect.currentTime = 0.5;
//         // effect.play();
//       }

//       displaySequence({ colorSequence, actualIndex: actualIndex + 1 });
//     }, 1000);
//   }, 1000);
// }

// function getUserSequence({ colorSequence, buttons, landmark, actualIndex }) {
//   if (touched(landmark, buttons.topLeftCorner)) {
//     roundState.buttons.topLeftCorner.active =
//       !roundState.buttons.topLeftCorner.active;
//     roundState.buttons.topLeftCorner.canTrigger = false;
//     selectedButton = document.getElementById("top-left-corner");
//     selectedButton.classList.add("active");

//     setTimeout(function () {
//       selectedButton.classList.remove("active");
//       roundState.buttons.topLeftCorner.canTrigger = true;
//       roundState.actualUserSequence.push(0);
//     }, 1000);
//   }

//   if (touched(landmark, buttons.topRightCorner)) {
//     roundState.buttons.topRightCorner.active =
//       !roundState.buttons.topRightCorner.active;
//     roundState.buttons.topRightCorner.canTrigger = false;
//     selectedButton = document.getElementById("top-right-corner");
//     selectedButton.classList.add("active");
//     setTimeout(function () {
//       selectedButton.classList.remove("active");
//       roundState.buttons.topRightCorner.canTrigger = true;
//       roundState.actualUserSequence.push(1);
//     }, 2000);
//   }

//   if (touched(landmark, buttons.bottomLeftCorner)) {
//     roundState.buttons.bottomLeftCorner.active =
//       !roundState.buttons.bottomLeftCorner.active;
//     roundState.buttons.bottomLeftCorner.canTrigger = false;
//     selectedButton = document.getElementById("bottom-left-corner");
//     selectedButton.classList.add("active");
//     setTimeout(function () {
//       selectedButton.classList.remove("active");
//       roundState.buttons.bottomLeftCorner.canTrigger = true;
//       roundState.actualUserSequence.push(2);
//     }, 2000);
//   }

//   if (touched(landmark, buttons.bottomRightCorner)) {
//     roundState.buttons.bottomRightCorner.active =
//       !roundState.buttons.bottomRightCorner.active;
//     roundState.buttons.bottomRightCorner.canTrigger = false;
//     selectedButton = document.getElementById("bottom-right-corner");
//     selectedButton.classList.add("active");
//     setTimeout(function () {
//       selectedButton.classList.remove("active");
//       roundState.buttons.bottomRightCorner.canTrigger = true;
//       roundState.actualUserSequence.push(3);
//     }, 2000);
//   }
// }

// let actualUserSequence = 0;

// function nextRoundOrWin() {
//   roundState.round++;
//   const winGame = roundState.round === TOTAL_ROUNDS;
//   if (winGame) {
//     game = document.getElementsByClassName("game")[0];
//     game.classList.add("invisible");

//     // const effect = new Audio("win-game.mp3");
//     // effect.currentTime = 0.5;
//     // effect.play();

//     selectedButton = document.getElementsByClassName("win-game")[0];
//     selectedButton.classList.remove("invisible");

//     state.reinitGameButton.active = false;
//     state.reinitGameButton.canTrigger = false;
//     return;
//   } else {
//     selectedButton = document.getElementsByClassName("pass-round-game")[0];
//     selectedButton.classList.remove("invisible");
//     actualSequenceLenght++;
//     roundState.colorSequence = generateSequence(4, actualSequenceLenght);
//     roundState.actualUserSequence = [];
//     roundState.userTime = false;

//     setTimeout(function () {
//       displaySequence({ canvasCtx, ...roundState, actualIndex: 0 });
//       selectedButton = document.getElementsByClassName("pass-round-game")[0];
//       selectedButton.classList.add("invisible");
//       round = document.getElementById("round");
//       round.textContent = " " + roundState.round;
//     }, 2000);
//   }
// }

// function resetGame() {
//   state.reinitGameButton.active = false;

//   state.reinitGameButton.canTrigger = false;
//   selectedButton = document.getElementsByClassName("lost-game")[0];
//   selectedButton.classList.add("invisible");

//   electedButton = document.getElementsByClassName("win-game")[0];
//   selectedButton.classList.add("invisible");

//   const game = document.getElementsByClassName("game")[0];
//   game.classList.remove("invisible");
//   roundState.colorSequence = generateSequence(4, 4);
//   roundState.actualUserSequence = [];
//   roundState.userTime = false;

//   roundState.round = 1;
//   round = document.getElementById("round");
//   round.textContent = " " + roundState.round;

//   displaySequence({ canvasCtx, ...roundState, actualIndex: 0 });
// }

// function lostGame() {
//   game = document.getElementsByClassName("game")[0];
//   game.classList.add("invisible");

//   selectedButton = document.getElementsByClassName("lost-game")[0];
//   selectedButton.classList.remove("invisible");
//   const effect = new Audio("lost-game.mp3");
//   effect.currentTime = 0.5;
//   effect.play();

//   state.reinitGameButton.active = true;
//   state.reinitGameButton.canTrigger = true;
// }

// function compareResults() {
//   let allRight = true;

//   for (let i = 0; i < roundState.colorSequence.length; i++) {
//     if (roundState.colorSequence[i] !== roundState.actualUserSequence[i]) {
//       allRight = false;
//     }
//   }


//   if (allRight) {
//     nextRoundOrWin();
//   } else {
//     lostGame();
//   }
// }