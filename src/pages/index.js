// const videoElement = document.getElementsByClassName("input_video")[0];
// const canvasElement = document.getElementsByClassName("output_canvas")[0];
// const canvasCtx = canvasElement.getContext("2d");
// import { getInitialState, getInitialRoundState } from '../utils/index.js'
//  import { TOTAL_ROUNDS, COLORS, getRandomInt, generateSequence, touched }  from '../utils/index.js'
// // getInitialState, getInitialRoundState = require('../utils/initialState');
// const maxSequenceLength = 7;
// let actualSequenceLenght = 4;

// const state = getInitialState();
// const roundState = getInitialRoundState();

// function render(results) {
//   canvasCtx.save();
//   canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
//   canvasCtx.drawImage(
//     results.image,
//     0,
//     0,
//     canvasElement.width,
//     canvasElement.height
//   );

//   const { handTriggerButton, initGameButton, helpButton, reinitGameButton } =
//     state;

//   if (results.multiHandLandmarks) {
//     results.multiHandLandmarks.forEach((landmarks, index) => {
//       const x = landmarks[8].x * canvasElement.width;
//       const y = landmarks[8].y * canvasElement.height;
//       const landmark = { x, y };

//       // if (roundState.userTime && !state.reinitGameButton.active) {
//       //   // getUserSequence({ landmark, ...roundState });
//       //   if (
//       //     roundState.actualUserSequence.length ===
//       //     roundState.colorSequence.length
//       //   ) {
//       //     roundState.userTime = false;
//       //     compareResults();
//       //   }
//       // }

//       if (touched(landmark, initGameButton)) {
//         state.initGameButton.active = !state.initGameButton.active;
//         state.initGameButton.canTrigger = false;
//         const dashboard = document.getElementsByClassName("dashboard")[0];
//         const game = document.getElementsByClassName("game")[0];
//         const round = document.getElementsByClassName("round")[0];
   
//         dashboard.classList.add("invisible");
//         game.classList.remove("invisible");
//         round.classList.remove("invisible");

//         displaySequence({ canvasCtx, ...roundState, actualIndex: 0 });
//       }

//       if (touched(landmark, handTriggerButton)) {
//         state.handTriggerButton.active = !state.handTriggerButton.active;
//         state.handTriggerButton.canTrigger = false;
//         setTimeout(function () {
//           state.handTriggerButton.canTrigger = true;
//         }, 2000);
//       }
//       if (
//         touched(landmark, reinitGameButton) &&
//         state.reinitGameButton.active
//       ) {
//         state.reinitGameButton.active = false;
//         state.reinitGameButton.canTrigger = false;

//         resetGame();
//       }

//       if (touched(landmark, helpButton)) {
//         state.helpButton.active = !state.helpButton.active;
//         state.helpButton.canTrigger = false;
//         const helpView = document.getElementsByClassName("help-view")[0];
//         const helpExplanation =
//           document.getElementsByClassName("help-explanation")[0];

//         if (state.helpButton.active) {
//           helpView.style.boxShadow = "0 0 0 0";
//           helpExplanation.classList.remove("invisible");
//         } else {
//           helpView.style.boxShadow =
//             "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)";
//           helpExplanation.classList.add("invisible");
//         }

//         setTimeout(function () {
//           state.helpButton.canTrigger = true;
//         }, 2000);
//       }

//       if (state.handTriggerButton.active) {
//         drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
//           color: "#00FF00",
//           lineWidth: 5,
//         });
//         drawLandmarks(canvasCtx, landmarks, { color: "#FF0000", lineWidth: 2 });
//         setTimeout(function () {
//           status = true;
//         }, 2000);
//       }
//     });
//   }

//   canvasCtx.restore();
// }

// const hands = new Hands({
//   locateFile: (file) => {
//     return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
//   },
// });
// hands.setOptions({
//   maxNumHands: 2,
//   minDetectionConfidence: 0.7,
//   minTrackingConfidence: 0.65,
// });
// hands.onResults(render);

// const camera = new Camera(videoElement, {
//   onFrame: async () => {
//     await hands.send({ image: videoElement });
//   },
//   width: 1280,
//   height: 720,
// });

// camera.start();
import { 
  TOTAL_ROUNDS, COLORS, getRandomInt, generateSequence, touched, invertCoordinates,
  getInitialState, getInitialRoundState
} from '../utils/index.js'

const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');

const state = getInitialState();
const roundState = getInitialRoundState();

const teste = document.getElementsByClassName('help-view')[0];
teste.style.position = "absolute";
teste.style.left = (state.helpButton.x + 1280) +'px';
teste.style.top = (state.helpButton.y + 80)+'px';

const teste1 = document.getElementsByClassName('init-button')[0];
teste1.style.position = "absolute";
teste1.style.left = (state.helpButton.x + 100) +'px';
teste1.style.top = (state.helpButton.y - 350)+'px';

function render(results) {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
  
  const { handTriggerButton, initGameButton, helpButton, reinitGameButton, teste, selectedButtonDrag } = state;

  if (results.multiHandLandmarks) {
    for (const landmarks of results.multiHandLandmarks) {
      const indicatorX = landmarks[8].x * canvasElement.width;
      const indicatorY = landmarks[8].y * canvasElement.height;
      const landmark = { x: indicatorX, y: indicatorY };
      // console.log('landmarkIndicator')
      // console.log(landmark.x)

      const thumbX = landmarks[4].x * canvasElement.width;
      const thumbY = landmarks[4].y * canvasElement.height; 
      const landmarkThumb = { x: thumbX, y: thumbY };
      // console.log(landmarkThumb.x)
      console.log(landmarkThumb)
      // const initButton = document.getElementsByClassName("init-button")[0];
      // initButton.style.position = "absolute";
      // initButton.style.left = (indicatorX + initGameButton.x) +'px';
      // initButton.style.top = (indicatorY + initGameButton.y)+'px';
      // console.log(['x',x])
      // console.log(['initGameButton.x',initGameButton.x])
      // console.log(['y',y])
      // console.log(['initGameButton.y',initGameButton.y])
      // console.log(['style',initButton.style])

     

      if(Math.abs(indicatorX - thumbX) <= 50
        && Math.abs(indicatorY - thumbY) <= 50 
        && !state.dragIsActive) {
        state.dragIsActive = true;
        state.selectedButtonDrag = {
          x: indicatorX,
          y: indicatorY,
          className: state.selectedButtonDrag.className
        }

      //   if(selectedButtonDrag.name) {
      //   state[selectedButtonDrag.name].x = selectedButtonDrag.x
      //   state[selectedButtonDrag.name].y = selectedButtonDrag.y
          
      // }
        
      } if(Math.abs(indicatorX - thumbX) > 50
      && Math.abs(indicatorY - thumbY) > 50 
      && state.dragIsActive) {
        // console.log('selectedButtonDrag',selectedButtonDrag)
        state.dragIsActive = false;
       
        state.selectedButtonDrag.className = null  
        // console.log('state.selectedButtonDrag',state.selectedButtonDrag)

      }

      if (touched(landmark, initGameButton) && state.dragIsActive && !state.selectedButtonDrag.className) {
        // console.log('aquiasd')
        state.selectedButtonDrag = initGameButton;

        state.selectedButtonDrag.className = 'init-button'  
        state.selectedButtonDrag.name = 'initGameButton'

        // state.selectedButtonDrag.y = 

        // state.initGameButton.active = !state.initGameButton.active;
        // state.initGameButton.canTrigger = false;
        // const dashboard = document.getElementsByClassName("dashboard")[0];
        // const game = document.getElementsByClassName("game")[0];
        // const round = document.getElementsByClassName("round")[0];

        // dashboard.classList.add("invisible");
        // game.classList.remove("invisible");
        // round.classList.remove("invisible");

        // displaySequence({ canvasCtx, ...roundState, actualIndex: 0 });
      }

      if(state.dragIsActive) {
        // console.log(state)
      }

      if(state.dragIsActive && state.selectedButtonDrag.className === 'init-button') {
        const element = document.getElementsByClassName(state.selectedButtonDrag.className)[0];
        // console.log('aqui123',element.style.top, indicatorY)








// aquiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
// criar um "tradutor" -> regra de três -> 0 -> 1280 e 0 -> 720, 
// assim não preciso ficar calculando a diferença toda vez






        element.style.position = "absolute";
        element.style.left = (-indicatorX + 800) +'px';
        element.style.top = (indicatorY - 250)+'px';
        state.initGameButton.x = selectedButtonDrag.x + 200
        state.initGameButton.y = selectedButtonDrag.y
        // element.style.left = (-indicatorX) +'px';
        // element.style.top = (indicatorY)+'px';


        // const element = document.getElementsByClassName(state.selectedButtonDrag.className)[0];
        // console.log('aqui123',element.style.top, indicatorY)

        // element.style.position = "absolute";
        // element.style.left = (-indicatorX + 800) +'px';
        // element.style.top = (indicatorY - 250)+'px';
        // element.style.left = (-indicatorX) +'px';


        // const initButton = document.getElementsByClassName("init-button")[0];
        // initButton.style.position = "absolute";
        // initButton.style.left = (indicatorX + initGameButton.x) +'px';
        // initButton.style.top = (indicatorY + initGameButton.y)+'px';
        // console.log(['x',x])
        // state.selectedButtonDrag.x 
        // state.selectedButtonDrag.y
      }

      const teste1 = document.getElementsByClassName('cat')[0];
      // teste.style.position = "absolute";
      // console.log(teste1.clientTop)
      // console.log(teste1.clientLeft)

      // console.log(teste1.clientWidth)
      
      // console.log(teste1.clientHeight)

      if (touched(landmark, teste) && state.dragIsActive  && !state.selectedButtonDrag.className) {
        console.log('aqui')
        state.selectedButtonDrag = teste;

        state.selectedButtonDrag.className = 'cat'  
        state.selectedButtonDrag.name = 'teste'

        // state.selectedButtonDrag.y = 

        // state.initGameButton.active = !state.initGameButton.active;
        // state.initGameButton.canTrigger = false;
        // const dashboard = document.getElementsByClassName("dashboard")[0];
        // const game = document.getElementsByClassName("game")[0];
        // const round = document.getElementsByClassName("round")[0];

        // dashboard.classList.add("invisible");
        // game.classList.remove("invisible");
        // round.classList.remove("invisible");

        // displaySequence({ canvasCtx, ...roundState, actualIndex: 0 });
      }

      if(state.dragIsActive && state.selectedButtonDrag.className === 'cat') {
        const element = document.getElementsByClassName(state.selectedButtonDrag.className)[0];
        // console.log('aqui1',element.style.top, indicatorY)


        // const element = document.getElementsByClassName(state.selectedButtonDrag.className)[0];
        // console.log('aqui123',element.style.top, indicatorY)

        // element.style.position = "absolute";
        // element.style.left = (-indicatorX + 800) +'px';
        // element.style.top = (indicatorY - 250)+'px';
        // element.style.left = (-indicatorX) +'px';

        element.style.position = "absolute";
        element.style.left = (-indicatorX + 1250) +'px';
        element.style.top = (indicatorY - 0)+'px';

        state.teste.x = indicatorX - 100
        state.teste.y = indicatorY 
        // element.style.left = (-indicatorX) +'px';
        // element.style.top = (indicatorY)+'px';

        // const initButton = document.getElementsByClassName("init-button")[0];
        // initButton.style.position = "absolute";
        // initButton.style.left = (indicatorX + initGameButton.x) +'px';
        // initButton.style.top = (indicatorY + initGameButton.y)+'px';
        // console.log(['x',x])
        // state.selectedButtonDrag.x 
        // state.selectedButtonDrag.y
      }


      drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS,
                     {color: '#00FF00', lineWidth: 5});
      drawLandmarks(canvasCtx, landmarks, {color: '#FF0000', lineWidth: 2});
    }
  }
  canvasCtx.restore();
}

const hands = new Hands({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
}});
hands.setOptions({
  maxNumHands: 2,
  modelComplexity: 1,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});
hands.onResults(render);

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({image: videoElement});
  },
  width: 1280,
  height: 720
});
camera.start();