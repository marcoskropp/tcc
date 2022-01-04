import { 
  TOTAL_ROUNDS, COLORS, getRandomInt, generateSequence, touched, invertCoordinates,
  getInitialState, getInitialRoundState, getOffset, isInsideSquare,getRandomCoordinate, images
} from '../utils/index.js'

const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');

const state = getInitialState();
const roundState = getInitialRoundState()

let buttonsState = {}

const isValidCoordinate = (coordinate) => {
  Object.assign(coordinate, { width: 125, height: 75 })

  const buttonStateKeys = Object.keys(buttonsState)
 
  let isValidCoordinate = true

  for(let i = 0; i < buttonStateKeys.length; i++) {
    if(isInsideSquare(coordinate, buttonsState[buttonStateKeys[i]])) {
      isValidCoordinate = false
    }
  }

  return isValidCoordinate
}

const createButton = (imageName) => {
  let coordinate 
  let validCoordinate = false
  while(!validCoordinate) {
    coordinate = getRandomCoordinate()

    if(isValidCoordinate(coordinate)) {
      validCoordinate = true
    }
  }

  buttonsState[imageName] = { 
    className: imageName,
    x: coordinate.x,
    y: coordinate.y,
    width: 125,
    height: 75,
    active: false,
    canTrigger: true,
   }

  const img = new Image();
  img.src = `../assets/${imageName}.png`;
  img.className = imageName
  img.style.left = coordinate.x + 'px';
  img.style.top = coordinate.y + 'px';
  img.style.width = '125px'
  img.style.height = '75px'
  
  document.getElementsByClassName("canvas-container")[0].appendChild(img);
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
    state.selectedButtonDrag.name = button.className
  }

  if(state.dragIsActive && state.selectedButtonDrag.className === button.className) {
    const element = document.getElementsByClassName(state.selectedButtonDrag.className)[0];
    element.style.left = (landmarkIndicator.x) + 'px';
    element.style.top = (landmarkIndicator.y) + 'px';

    buttonsState[button.className].x = landmarkIndicator.x
    buttonsState[button.className].y = landmarkIndicator.y
  }
}

for(let i = 0 ; i < images.length; i++){
  createButton(images[i])
}

function render(results) {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
  

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
      console.log(buttonsState['cat'])

      const buttonStateKeys = Object.keys(buttonsState)

      for(let i = 0; i < buttonStateKeys.length; i++) {
          verifyTouchedAndDrag(landmark, landmarkThumb, buttonsState[buttonStateKeys[i]])
          if(isInsideSquare(topLeft, buttonsState[buttonStateKeys[i]])) {
          console.log('here', buttonStateKeys[i])
        }
      }

      // verifyTouchedAndDrag(landmark, landmarkThumb, teste1)

      // console.log('here123123',teste)

      

      // if(isInsideSquare(topRight, teste)) {
      //   console.log('hereasdasd',teste)
      // }
      // // console.log('here',teste)
      // if(isInsideSquare(bottomLeft, teste)) {
      //   console.log('here123123',teste)
      // }

      // if(isInsideSquare(bottomRight, teste)) {
      //   console.log('here123123',teste)
      // }


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