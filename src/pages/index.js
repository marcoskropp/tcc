import { 
  TOTAL_ROUNDS, COLORS, getRandomInt, touched, 
  getInitialState, getInitialRoundState, getOffset, 
  isInsideSquare, getRandomCoordinate, images, classifications,
  classificationsTranslate, isValidCoordinate, verifyDrag, createButton,
  verifyTouched, verifyTouchedAndDrag, getValidAnimal, generateAnimal, 
  generatePhase, setVisibileElement, setInvisibleElement, validateSquare,
  verifyRightSquare, verifySquare, firstPhase, secondPhase, animalsTranslatedNames
} from '../utils/index.js'

const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');

const resetPhase = () => ({
  squares: {}, 
  classifications: {}, 
  classificationsTranslate: {},
  quantityOfAnimalsPerSquare: 0
})

let state = getInitialState();
let roundState = getInitialRoundState()
roundState.buttons.initGame.canTrigger = true;
let buttonsState = {}
let actualPhase = resetPhase()

const verifyResults = () => {
  const { 
    squares: { 
      topLeft, topRight, bottomLeft, bottomRight 
    }, 
    buttons: {
      submit
    }
  } = roundState;

  const submitElement = document.getElementsByClassName(submit.className)[0];

  if(!submitElement.classList.contains('invisible')) {
    setInvisibleElement(submitElement.className)
  }

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

  const passRound = rightSquareCounter === buttonStateKeys.length && roundState.round !== TOTAL_ROUNDS 
  const winGame = rightSquareCounter === buttonStateKeys.length && roundState.round === TOTAL_ROUNDS
  if(passRound) {
    const passRoundButton = roundState.buttons.passRound
    setVisibileElement(passRoundButton.className)
    setTimeout(() => {
      setInvisibleElement(passRoundButton.className)
      setInvisibleElement(submit.className)

      roundState.round++
      rightSquareCounter = 0
      // actualPhase = resetPhase()
      wrongAnimals = []
      removeOldElements(buttonsState)
      buttonsState = {}
      actualPhase = roundState.roundSequence[0](roundState, actualPhase, buttonsState) 
      roundState.roundSequence.shift()
      submit.canTrigger = true

    }, 1500)
  } else if(winGame) {
    const winGameButton = roundState.buttons.winGame
    setVisibileElement(winGameButton.className)
    winGameButton.canTrigger = true;
    // actualPhase = resetPhase()
    // console.log(wrongAnimals)
    // console.log(roundState)
    // actualPhase = roundState.roundSequence[0](roundState, actualPhase, buttonsState) 
    // roundState.roundSequence.shift()
    
  } else {
    const lostGameButton = roundState.buttons.lostGame
    setVisibileElement(lostGameButton.className)


    const wrongAnimalsTranslate = wrongAnimals.map(wrongAnimal => {
      return animalsTranslatedNames[wrongAnimal] 
    })
    const wrongAnimalsText = wrongAnimalsTranslate.join(', ')
    console.log('wrongAnimalsTranslate',wrongAnimalsTranslate, 'wrongAnimalsText: ', wrongAnimalsText)

    const wrongAnimalsElement = document.getElementsByClassName('wrong-animals')[0]
    
    wrongAnimalsElement.innerHTML = `Animais incorretos: ${wrongAnimalsText}`
     //actualPhase = resetPhase()
    

    // console.log('roundState.usedAnimals', roundState.usedAnimals)
    // removeOldElements(roundState.usedAnimals)
    
  }

 

}

const removeOldElements = (buttonsState) => {
  const buttonsStateKeys = Object.keys(buttonsState)
  for(let i = 0; i < buttonsStateKeys.length; i++) {
    setInvisibleElement(buttonsState[buttonsStateKeys[i]].className)

  }
}

let handsLoaded = false;
function render(results) {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

  if(!handsLoaded) {
    setInvisibleElement('loader')

    setVisibileElement('help-explanation')
    setVisibileElement('dashboard')
    setVisibileElement('developed-by')

    const element = document.getElementsByClassName('background-container')[0];
    element.style.opacity = '50%';

    handsLoaded = true;
  }

  const { 
    squares: { 
      topLeft, 
      topRight, 
      bottomLeft, 
      bottomRight 
    }, 
    buttons: { 
      submit,
      initGame,
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

      const isInitGameButtonTouched = touched(landmark, landmarkThumb, initGame, state)
      if(isInitGameButtonTouched && initGame.canTrigger) {
        console.log('initGame',initGame)

        console.log('aquiaqui')

        setInvisibleElement('help-explanation')
        setInvisibleElement('dashboard')
        setInvisibleElement('developed-by')

        const element = document.getElementsByClassName('background-container')[0];
        element.style.opacity = '15%';
        

        roundState.buttons.initGame.canTrigger = false;
        console.log('roundState',roundState)

        actualPhase = roundState.roundSequence[0](roundState, {}, buttonsState) 
        roundState.roundSequence.shift()
      }
      

      const submitElement = document.getElementsByClassName(submit.className)[0];
      if(allInsideSquares && buttonStateKeys.length > 0 && submit.canTrigger) {
        setVisibileElement(submitElement.className)
        console.log('submitButtonTouched')
        const isSubmitButtonTouched = touched(landmark, landmarkThumb, submit, state)

        if(isSubmitButtonTouched) {
          verifyResults()
          submit.canTrigger = false
          if(!submitElement.classList.contains('invisible')) {
            setInvisibleElement(submitElement.className)
          }
        }
      } 

      const winGameButton = roundState.buttons.winGame
      const isWinGameButtonTouched = touched(landmark, landmarkThumb, winGameButton, state)

      if(isWinGameButtonTouched && winGameButton.canTrigger) {
        console.log('winGameButtonTouched')
        // roundState = getInitialRoundState()
        // actualPhase = resetPhase()

        const winGameButton = roundState.buttons.winGame
        setInvisibleElement(winGameButton.className)
        roundState.buttons.winGame.canTrigger = false;
        removeOldElements(buttonsState)
        buttonsState = {}
        const actualSquares = Object.keys(actualPhase.squares)
        for(let i = 0; i < actualSquares.length; i++) {
          setInvisibleElement(actualPhase.squares[actualSquares[i]].className)

        }


        roundState = getInitialRoundState()
        roundState.usedAnimals = []


        actualPhase = roundState.roundSequence[0](roundState, actualPhase, buttonsState) 
        roundState.roundSequence.shift()
        submit.canTrigger = true



        state = getInitialState();
        roundState = getInitialRoundState()
        
        // roundState.buttons.initGame.canTrigger = true;
        // buttonsState = {}
        // actualPhase = resetPhase()

      }


      if(!allInsideSquares && !submitElement.classList.contains('invisible')) {
        setInvisibleElement(submitElement.className)
      }

     

      // drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS,
      //                {color: '#00FF00', lineWidth: 5});
      // drawLandmarks(canvasCtx, landmarks, {color: '#FF0000', lineWidth: 2});
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
    await hands.send({ image: videoElement });
  },
  width: 1280,
  height: 720
});
camera.start();