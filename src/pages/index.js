import { 
  TOTAL_ROUNDS, COLORS, getRandomInt, generateSequence, touched, invertCoordinates,
  getInitialState, getInitialRoundState, getOffset, isInsideSquare,getRandomCoordinate
} from '../utils/index.js'

const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');

const state = getInitialState();
const roundState = getInitialRoundState()

const coordinate = getRandomCoordinate()
state.teste.x = coordinate.x
state.teste.y = coordinate.y
console.log(coordinate)
var img = new Image();
img.src = '../assets/owl.png';
img.className = 'cat'
img.style.left = coordinate.x + 'px';
img.style.top = coordinate.y + 'px';

  document.getElementsByClassName("canvas-container")[0].appendChild(img);
const createButton = () => {
  
}

const verifyDrag = ({ indicatorX, indicatorY, thumbX, thumbY }) => {
  if(Math.abs(indicatorX - thumbX) <= 50
  && Math.abs(indicatorY - thumbY) <= 50 
  && !state.dragIsActive) {
    state.dragIsActive = true;
  } 

  if(Math.abs(indicatorX - thumbX) > 50
  && Math.abs(indicatorY - thumbY) > 50 
  && state.dragIsActive) {
    state.dragIsActive = false;       
    state.selectedButtonDrag.className = null  
  }
}

const verifyTouchedAndDrag = (landmarkIndicator, landmarkThumb, button) => {
  if (touched(landmarkIndicator, landmarkThumb, button)  && state.dragIsActive  && !state.selectedButtonDrag.className) {
    state.selectedButtonDrag.className = button.className
    state.selectedButtonDrag.name = button.name
  }

  if(state.dragIsActive && state.selectedButtonDrag.className === button.className) {
    const element = document.getElementsByClassName(state.selectedButtonDrag.className)[0];
    element.style.left = (landmarkIndicator.x) +'px';
    element.style.top = (landmarkIndicator.y) +'px';

    state[button.name].x = landmarkIndicator.x
    state[button.name].y = landmarkIndicator.y
  }
}

function render(results) {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
  
  const { teste, teste1 } = state;

  const { squares: { topLeft, topRight, bottomLeft, bottomRight } } = roundState;

  if (results.multiHandLandmarks) {
    for (const landmarks of results.multiHandLandmarks) {
      let indicatorX = -(landmarks[8].x * canvasElement.width) + 1280;
      const indicatorY = landmarks[8].y * canvasElement.height;
      
      const landmark = { x: indicatorX, y: indicatorY };

      const thumbX = -(landmarks[4].x * canvasElement.width) + 1280;
      const thumbY = landmarks[4].y * canvasElement.height; 
      const landmarkThumb = { x: thumbX, y: thumbY };

     
      verifyDrag({indicatorX, indicatorY, thumbX, thumbY})

      verifyTouchedAndDrag(landmark, landmarkThumb, teste)
      // verifyTouchedAndDrag(landmark, landmarkThumb, teste1)

      // console.log('here123123',teste)

      if(isInsideSquare(topLeft, teste)) {
        console.log('here',teste)
      }

      if(isInsideSquare(topRight, teste)) {
        console.log('hereasdasd',teste)
      }
      // console.log('here',teste)
      if(isInsideSquare(bottomLeft, teste)) {
        console.log('here123123',teste)
      }

      if(isInsideSquare(bottomRight, teste)) {
        console.log('here123123',teste)
      }


      // criar gerador de fases, onde tem-se um array com todos os botões da fase,
      // gerados aleatóriamente, através de uma função que gera o x e y aleatorio, 
      // porém, verificando se não está em cima de algum outro botão já inserido no array
      // e também cuidando a parte de extrapolação de bordas (1270 x 710)


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
  maxNumHands: 1,
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