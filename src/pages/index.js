import { 
  TOTAL_ROUNDS, COLORS, getRandomInt, generateSequence, touched, 
  getInitialState, getInitialRoundState, getOffset, 
  isInsideSquare, getRandomCoordinate, images, classifications,
  classificationsTranslate, isValidCoordinate, verifyDrag, createButton,
  verifyTouched, verifyTouchedAndDrag, getValidAnimal, generateAnimal, 
  generatePhase, setVisibileElement, setInvisibleElement, validateSquare,
  verifyRightSquare, verifySquare, firstPhase, secondPhase
} from '../utils/index.js'

const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');

const state = getInitialState();
const roundState = getInitialRoundState()

let buttonsState = {}

const resetPhase = () => ({
  squares: {}, 
  classifications: {}, 
  classificationsTranslate: {},
  quantityOfAnimalsPerSquare: 0
})






/*
const thirdPhase = () => {
  const mammals = classifications.mammals
  const oviparous = classifications.oviparous
  const vertebrates = classifications.vertebrates
  // adicionar mais classificações

  for(let i = 0; i < 4; i++) {
    
    const validMammal = getValidAnimal(mammals)
    const validOviparou = getValidAnimal(oviparous)
    const validVertebrate = getValidAnimal(vertebrates)

    const { squares: { bottomLeft, bottomRight } } = roundState;

    bottomLeft.canTrigger = true
    bottomRight.canTrigger = true

    const bottomLeftElement = document.getElementsByClassName(bottomLeft.className)[0];
    bottomLeftElement.classList.remove('invisible')
    const bottomRightElement = document.getElementsByClassName(bottomRight.className)[0];
    bottomRightElement.classList.remove('invisible')

    createButton(validMammal)
    createButton(validOviparou)
    createButton(validVertebrate)

    roundState.usedAnimals.push(validMammal)
    roundState.usedAnimals.push(validOviparou)
    roundState.usedAnimals.push(validVertebrate)
  }
} 
*/
// console.log(roundState)

let actualPhase = roundState.roundSequence[0](roundState, {}, buttonsState) 
roundState.roundSequence.shift()
console.log('actualPhase', actualPhase )
// actualPhase = firstPhase(roundState, actualPhase, buttonsState)


const verifyResults = () => {
  const { 
    squares: { 
      topLeft, topRight, bottomLeft, bottomRight 
    }, 
  } = roundState;
  const buttonStateKeys = Object.keys(buttonsState)

  for(let i = 0; i < buttonStateKeys.length; i++) {
    validateSquare(topLeft, i, buttonsState, roundState)
    validateSquare(topRight, i, buttonsState, roundState)
    validateSquare(bottomLeft, i, buttonsState, roundState)
    validateSquare(bottomRight, i, buttonsState, roundState)
  }

  let wrongAnimals = []
  let rightSquareCounter = 0;

  for(let i = 0; i < buttonStateKeys.length; i++) {
    let wrongSquareCounter = 0;

    const topLeftAnimals = roundState.roundSquares.topLeftAnimals
    const topLeftSquare = actualPhase.squares.topLeft
    const { 
      rightCounter: topLeftRightCounter, 
      wrongCounter: topLeftwrongCounter 
    } = verifySquare(
      topLeftSquare, 
      topLeftAnimals, 
      buttonStateKeys[i], 
      rightSquareCounter, 
      wrongSquareCounter,
      actualPhase
    )
    rightSquareCounter = topLeftRightCounter
    wrongSquareCounter = topLeftwrongCounter

    const topRightAnimals = roundState.roundSquares.topRightAnimals
    const topRightSquare = actualPhase.squares.topRight
    const { 
      rightCounter: topRightRightCounter, 
      wrongCounter: topRightWrongCounter 
    } = verifySquare(
      topRightSquare, 
      topRightAnimals, 
      buttonStateKeys[i], 
      rightSquareCounter, 
      wrongSquareCounter,
      actualPhase
    )
    rightSquareCounter = topRightRightCounter
    wrongSquareCounter = topRightWrongCounter

    const bottomLeftAnimals = roundState.roundSquares.bottomLeftAnimals
    const bottomLeftSquare = actualPhase.squares.bottomLeft
    const { 
      rightCounter: bottomLeftRightCounter, 
      wrongCounter: bottomLeftWrongCounter 
    } = verifySquare(
      bottomLeftSquare, 
      bottomLeftAnimals, 
      buttonStateKeys[i], 
      rightSquareCounter, 
      wrongSquareCounter,
      actualPhase
    )
    rightSquareCounter = bottomLeftRightCounter
    wrongSquareCounter = bottomLeftWrongCounter

    const bottomRightAnimals = roundState.roundSquares.bottomRightAnimals
    const bottomRightSquare = actualPhase.squares.bottomRight
    const { 
      rightCounter: bottomRightRightCounter, 
      wrongCounter: bottomRightWrongCounter 
    } = verifySquare(
      bottomRightSquare, 
      bottomRightAnimals, 
      buttonStateKeys[i], 
      rightSquareCounter, 
      wrongSquareCounter,
      actualPhase
    )
    rightSquareCounter = bottomRightRightCounter
    wrongSquareCounter = bottomRightWrongCounter

    const squaresKeys = Object.keys(actualPhase.squares)
    console.log('wrongSquareCounter',wrongSquareCounter)

    if(squaresKeys.length === 2 && wrongSquareCounter > 1) {
      wrongAnimals.push(buttonStateKeys[i])
    }
    if(squaresKeys.length === 3 && wrongSquareCounter > 2) {
      wrongAnimals.push(buttonStateKeys[i])
    }
    if(squaresKeys.length === 4 && wrongSquareCounter > 3) {
      wrongAnimals.push(buttonStateKeys[i])
    }
  }

  console.log('roundState', roundState)
  console.log('actualPhase', actualPhase)
  console.log('buttonsState', buttonsState)
  console.log('wrongAnimals', wrongAnimals)

  console.log(rightSquareCounter, ' of ', buttonStateKeys.length, ' right', rightSquareCounter === buttonStateKeys.length)
  console.log('roundState.round', roundState.round, TOTAL_ROUNDS, roundState.round !== TOTAL_ROUNDS)

  if(rightSquareCounter === buttonStateKeys.length && roundState.round !== TOTAL_ROUNDS) {
    const passRoundButton = roundState.buttons.passRound
    setVisibileElement(passRoundButton)
    setTimeout(() => {
      setInvisibleElement(passRoundButton)
      roundState.round++
      rightSquareCounter = 0
      // actualPhase = resetPhase()
      wrongAnimals = []
      removeOldElements(buttonsState)
      buttonsState = {}
      actualPhase = roundState.roundSequence[0](roundState, actualPhase, buttonsState) 
      roundState.roundSequence.shift()
    }, 1500)


  } else if(rightSquareCounter === buttonStateKeys.length && roundState.round === TOTAL_ROUNDS) {
    const winGameButton = roundState.buttons.winGame
    setVisibileElement(winGameButton)
    // actualPhase = resetPhase()
    // console.log(wrongAnimals)
    // console.log(roundState)
    // actualPhase = roundState.roundSequence[0](roundState, actualPhase, buttonsState) 
    // roundState.roundSequence.shift()
    
  } else {
    const lostGameButton = roundState.buttons.lostGame
    setVisibileElement(lostGameButton)
    // actualPhase = resetPhase()
    

    // console.log('roundState.usedAnimals', roundState.usedAnimals)
    // removeOldElements(roundState.usedAnimals)
    
  }

 

}

const removeOldElements = (buttonsState) => {
  const buttonsStateKeys = Object.keys(buttonsState)
  for(let i = 0; i < buttonsStateKeys.length; i++) {
    setInvisibleElement(buttonsState[buttonsStateKeys[i]])

  }
}

function render(results) {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

  const { 
    squares: { 
      topLeft, 
      topRight, 
      bottomLeft, 
      bottomRight 
    }, 
    buttons: { 
      submit
    } 
  } = roundState;

  if (results.multiHandLandmarks) {
    for (const landmarks of results.multiHandLandmarks) {
      let indicatorX = -(landmarks[8].x * canvasElement.width) + 1280;
      const indicatorY = landmarks[8].y * canvasElement.height;
      
      const landmark = { x: indicatorX, y: indicatorY };

      const thumbX = -(landmarks[4].x * canvasElement.width) + 1280;
      const thumbY = landmarks[4].y * canvasElement.height; 
      const landmarkThumb = { x: thumbX, y: thumbY };

     
      verifyDrag({ indicatorX, indicatorY, thumbX, thumbY, state })

      const buttonStateKeys = Object.keys(buttonsState)

      let allInsideSquares = true
      for(let i = 0; i < buttonStateKeys.length; i++) {
        verifyTouchedAndDrag(landmark, landmarkThumb, buttonsState[buttonStateKeys[i]], state, buttonsState)
        
        if(!isInsideSquare(topLeft, buttonsState[buttonStateKeys[i]])
        && !isInsideSquare(topRight, buttonsState[buttonStateKeys[i]])
        && !isInsideSquare(bottomLeft, buttonsState[buttonStateKeys[i]]) 
        && !isInsideSquare(bottomRight, buttonsState[buttonStateKeys[i]])) { 
          allInsideSquares = false
        }
      }

      const submitElement = document.getElementsByClassName(submit.className)[0];
      if(allInsideSquares) {
        setVisibileElement(submitElement)

        const isSubmitButtonTouched = verifyTouched(landmark, landmarkThumb, submit, state)

        if(isSubmitButtonTouched) {
          verifyResults()
        }
      } 

      if(!allInsideSquares && !submitElement.classList.contains('invisible')) {
        setInvisibleElement(submitElement)
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