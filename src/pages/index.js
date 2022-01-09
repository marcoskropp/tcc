import { 
  TOTAL_ROUNDS, COLORS, getRandomInt, generateSequence, touched, 
  invertCoordinates, getInitialState, getInitialRoundState, getOffset, 
  isInsideSquare, getRandomCoordinate, images, classifications,
  classificationsTranslate
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

const verifyTouched = (landmarkIndicator, landmarkThumb, button) => {
  if (touched(landmarkIndicator, landmarkThumb, button)  
  && state.dragIsActive  
  && !state.selectedButtonDrag.className) {
    state.selectedButtonDrag.className = button.className
    state.selectedButtonDrag.name = button.className
    return true
  }
  return false
}

const verifyTouchedAndDrag = (landmarkIndicator, landmarkThumb, button) => {
  verifyTouched(landmarkIndicator, landmarkThumb, button)

  if(state.dragIsActive 
    && state.selectedButtonDrag.className === button.className) {
    const element = document.getElementsByClassName(state.selectedButtonDrag.className)[0];
    element.style.left = (landmarkIndicator.x) + 'px';
    element.style.top = (landmarkIndicator.y) + 'px';

    buttonsState[button.className].x = landmarkIndicator.x
    buttonsState[button.className].y = landmarkIndicator.y
  }
}

const getValidAnimal = (animals) => {
  const index = getRandomInt(0, (animals.length -1))

  if(!roundState.usedAnimals.find((animal) => animal === animals[index])) {
    return animals[index]

  }

  return getValidAnimal(animals)
}

const setVisibileElement = (button, text) => {
  const element = document.getElementsByClassName(button.className)[0];
  
  if(element.classList.contains('invisible')) {
    element.classList.remove('invisible')
  }

  if(text) {
    const elementText = document.getElementsByClassName(`${button.className}-text`)[0];
    elementText.textContent = text
  }
}

const setInvisibleElement = (button) => {
  const element = document.getElementsByClassName(button.className)[0];
  
  if(!element.classList.contains('invisible')) {
    element.classList.add('invisible')
  }
}

const generateAnimal = (classificatedAnimals) => {
  const animal = getValidAnimal(classificatedAnimals)
  createButton(animal)
  roundState.usedAnimals.push(animal)
}

let actualPhase = {
  squares: {}, 
  classifications: {}, 
  classificationsTranslate: {},
  quantityOfAnimalsPerSquare: 0
}

const generatePhase = ({
  squares, 
  classifications, 
  classificationsTranslate,
  quantityOfAnimalsPerSquare
}) => {
  const classificationsKeys = Object.keys(classificationsTranslate)
  const squaresKeys = Object.keys(squares)

  actualPhase = {
    squares, 
    classifications, 
    classificationsTranslate,
    quantityOfAnimalsPerSquare
  }

  for(let i = 0; i < squaresKeys.length; i++) {
    setVisibileElement(squares[squaresKeys[i]], classificationsTranslate[classificationsKeys[i]])
    for(let j = 0; j < quantityOfAnimalsPerSquare; j++) {
      generateAnimal(classifications[classificationsKeys[i]])
    }
  }
}

const firstPhase = () => {
  const { squares: { topRight, topLeft } } = roundState;

  const squares = { topRight, topLeft }

  const classificationsTranslateSelected = { 
    vertebrates: classificationsTranslate.vertebrates, 
    invertebrates: classificationsTranslate.invertebrates
   }

   const classificationsSelected = {
    vertebrates: classifications.vertebrates, 
    invertebrates: classifications.invertebrates
   }

  generatePhase({ 
    squares, 
    classificationsTranslate: classificationsTranslateSelected,  
    classifications: classificationsSelected, 
    quantityOfAnimalsPerSquare: 1
  })
} 

const secondPhase = () => {
  const { squares: { topRight, topLeft, bottomLeft } } = roundState;

  const squares = { topRight, topLeft, bottomLeft }

  const classificationsTranslateSelected = { 
    mammals: classificationsTranslate.mammals,
    oviparous: classificationsTranslate.oviparous,
    vertebrates: classificationsTranslate.vertebrates
  }
   
  const classificationsSelected = {
    mammals: classifications.mammals,
    oviparous: classifications.oviparous,
    vertebrates: classifications.vertebrates
  }

  generatePhase({ 
    squares, 
    classificationsTranslate: classificationsTranslateSelected,  
    classifications: classificationsSelected, 
    quantityOfAnimalsPerSquare: 3
  })
} 

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
firstPhase()

const verifySquare = (square, index) => {
  const buttonStateKeys = Object.keys(buttonsState)

  if(isInsideSquare(square, buttonsState[buttonStateKeys[index]])) {
    const animalsInSquare = roundState.roundSquares[`${square.name}Animals`]

    if(animalsInSquare && !animalsInSquare.find(
      (animal) => animal === buttonStateKeys[index])
    ) {
      roundState.roundSquares[`${square.name}Animals`].push(buttonStateKeys[index])

    }
  }
}

const verifyResults = () => {
  const { 
    squares: { 
      topLeft, topRight, bottomLeft, bottomRight 
    }, 
  } = roundState;
  const buttonStateKeys = Object.keys(buttonsState)

  for(let i = 0; i < buttonStateKeys.length; i++) {
    verifySquare(topLeft, i)
    verifySquare(topRight, i)
    verifySquare(bottomLeft, i)
    verifySquare(bottomRight, i)
  }

  let wrongAnimals = []
  let rightSquareCounter = 0;

  for(let i = 0; i < buttonStateKeys.length; i++) {
    let wrongSquareCounter = 0;

    const teste = !!roundState.roundSquares.topLeftAnimals.find(
      (animal) => animal === buttonStateKeys[i]
    )
    console.log('actualPhase: ', actualPhase, 'roundState: ', roundState)

    if(teste) {
      const classificationsKeys = Object.keys(actualPhase.classificationsTranslate)
      console.log(actualPhase.classifications)
      console.log('classificationsKeys[0]',classificationsKeys[0])
      const rightSquare = !!actualPhase.classifications[classificationsKeys[0]].find(
        (animal) => animal === buttonStateKeys[i])
      
      if(rightSquare) {
        rightSquareCounter++
        console.log('rightSquareCounterLeft',rightSquareCounter)

      }
    } else {
      wrongSquareCounter++
    }

    const teste1 = !!roundState.roundSquares.topRightAnimals.find(
      (animal) => animal === buttonStateKeys[i]
    )

    if(teste1) {
      const classificationsKeys = Object.keys(actualPhase.classificationsTranslate)

      const rightSquare = !!actualPhase.classifications[classificationsKeys[1]].find(
        (animal) => animal === buttonStateKeys[i]
      )
      if(rightSquare) {
        console.log('rightSquareCounter',rightSquareCounter)
        rightSquareCounter++
      }
      
    } else {
      wrongSquareCounter++
    }
    if(wrongSquareCounter > 1) {
      wrongAnimals.push(buttonStateKeys[i])
    }


  }
  console.log(rightSquareCounter, buttonStateKeys.length)

  if(rightSquareCounter === buttonStateKeys.length) {
    console.log('==============huhuhkuh')
  } else {
    console.log(wrongAnimals)
  }
  //roundSquares.topLeft.find((animal) => animal === buttonStateKeys[i])

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

     
      verifyDrag({ indicatorX, indicatorY, thumbX, thumbY })

      const buttonStateKeys = Object.keys(buttonsState)

      let allInsideSquares = true
      for(let i = 0; i < buttonStateKeys.length; i++) {
        verifyTouchedAndDrag(landmark, landmarkThumb, buttonsState[buttonStateKeys[i]])
        
        if(!isInsideSquare(topLeft, buttonsState[buttonStateKeys[i]])
        && !isInsideSquare(topRight, buttonsState[buttonStateKeys[i]])
        && !isInsideSquare(bottomLeft, buttonsState[buttonStateKeys[i]]) 
        && !isInsideSquare(bottomRight, buttonsState[buttonStateKeys[i]])) { 
          allInsideSquares = false
        }
      }

      const { buttons: { submit } } = roundState
      const submitElement = document.getElementsByClassName(submit.className)[0];
      if(allInsideSquares) {
        setVisibileElement(submitElement)
        const isSubmitButtonTouched = verifyTouched(landmark, landmarkThumb, submit)
        console.log('isSubmitButtonTouched', isSubmitButtonTouched)
        if(isSubmitButtonTouched) {
          verifyResults()
        }
      } 
      if(!allInsideSquares && !submitElement.classList.contains('invisible')) {
        setInvisibleElement(submitElement)
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