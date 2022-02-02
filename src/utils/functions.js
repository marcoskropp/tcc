import { createAnimalElement, setVisibileElement, setElementCoordinates } from './screenFunctions.js'


const TOTAL_ROUNDS = 3;

const COLORS = {
    BLUE_PRIMARY : "#4287f5",
    BLUE_SECONDARY : "#2ff5e4",
    RED_PRIMARY : "#f54242",
    GREEN_PRIMARY : "#51d613",
    PINK_PRIMARY : "#930ee6",
    YELLOW_PRIMARY : "#f5eb2f",
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomCoordinate() {
  const x = getRandomInt(310, 830)
  const y = getRandomInt(10, 630)

  return { x, y }
}

function touched(landmarkIndicator, landmarkThumb, button) {
  return landmarkIndicator.x > button.x &&
      landmarkThumb.x > button.x &&
    landmarkIndicator.x < button.x + button.width &&
    landmarkThumb.x < button.x + button.width &&

    landmarkIndicator.y > button.y &&
    landmarkThumb.y > button.y &&

    landmarkIndicator.y < button.y + button.height &&
    landmarkThumb.y < button.y + button.height &&

    button.canTrigger
    ? true
    : false;
}

function isInsideSquare(square, button) {
  return (square.x + square.width > button.x) &&
  (square.x < button.x) && (square.y + square.height > button.y) &&
  (square.y < button.y)
}

function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}


const isValidCoordinate = (coordinate, buttonsState) => {
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


const verifyDrag = ({ indicatorX, indicatorY, thumbX, thumbY, state }) => {
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

const createButton = (imageName, buttonsState) => {
  let coordinate 
  let validCoordinate = false
  while(!validCoordinate) {
    coordinate = getRandomCoordinate()

    if(isValidCoordinate(coordinate, buttonsState)) {
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

  createAnimalElement(imageName, coordinate)
}

const verifyTouched = (landmarkIndicator, landmarkThumb, button, state) => {
  if (touched(landmarkIndicator, landmarkThumb, button)  
  && state.dragIsActive  
  && !state.selectedButtonDrag.className) {
    state.selectedButtonDrag.className = button.className
    state.selectedButtonDrag.name = button.className
    return true
  }
  return false
}

const verifyTouchedAndDrag = (
  landmarkIndicator, 
  landmarkThumb, 
  button, 
  state, 
  buttonsState
) => {
  verifyTouched(landmarkIndicator, landmarkThumb, button, state)

  if(state.dragIsActive 
    && state.selectedButtonDrag.className === button.className) {
 
      const coordinate = {
        x: (landmarkIndicator.x + landmarkThumb.x) / 2,
        y: (landmarkIndicator.y + landmarkThumb.y) / 2
      }
    setElementCoordinates(state.selectedButtonDrag.className, coordinate)

    buttonsState[button.className].x = coordinate.x
    buttonsState[button.className].y = coordinate.y
  }
}

const getValidAnimal = (animals, roundState) => {
  const index = getRandomInt(0, (animals.length -1))

  if(!roundState.usedAnimals.find((animal) => animal === animals[index])) {
    return animals[index]
  }

  return getValidAnimal(animals, roundState)
}

const generateAnimal = (classificatedAnimals, buttonsState, roundState) => {
  const animal = getValidAnimal(classificatedAnimals, roundState)
  
  createButton(animal, buttonsState)
  roundState.usedAnimals.push(animal)
}

const generatePhase = ({
  squares, 
  classifications, 
  classificationsTranslate,
  quantityOfAnimalsPerSquare,
  actualPhase,
  buttonsState,
  roundState
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
    setVisibileElement(squares[squaresKeys[i]].className, classificationsTranslate[classificationsKeys[i]])
    actualPhase.squares[squaresKeys[i]].classification = classificationsKeys[i]

    for(let j = 0; j < quantityOfAnimalsPerSquare; j++) {
      generateAnimal(classifications[classificationsKeys[i]], buttonsState, roundState)
    }
  }

  return actualPhase
}

const validateSquare = (square, index, animalsState, roundState) => {
  const animalsStateKeys = Object.keys(animalsState)

  if(isInsideSquare(square, animalsState[animalsStateKeys[index]])) {
    const animalsInSquare = roundState.roundSquares[`${square.name}Animals`]

    if(animalsInSquare && !animalsInSquare.find(
      (animal) => animal === animalsStateKeys[index])
    ) {
      roundState.roundSquares[`${square.name}Animals`].push(animalsStateKeys[index])
    }
  }
}

const verifyRightSquare = (
  animals, 
  classification, 
  animalStateKey, 
  rightSquareCounter, 
  wrongSquareCounter,
  actualPhase
) => {
  const isAnimalInSquare = !!animals.find(
    (animal) => animal === animalStateKey
  )

  if(isAnimalInSquare) {
    const isAnimalInRightSquare = !!actualPhase.classifications[classification].find(
      (animal) => animal === animalStateKey
    )
    
    if(isAnimalInRightSquare) {
      rightSquareCounter++
    } else {
      wrongSquareCounter++
    }
  } else {
    wrongSquareCounter++
  }

  return { rightCounter: rightSquareCounter, wrongCounter: wrongSquareCounter }
}

const verifySquare = (
  square, 
  animals, 
  buttonStateKey, 
  rightCounter, 
  wrongCounter,
  actualPhase
) => {
  let actualRightCounter = rightCounter
  let actualWrongCounter = wrongCounter
  if(square) {  
    const { 
      rightCounter: newRightCounter, 
      wrongCounter: newWrongCounter 
    } = verifyRightSquare(
      animals, 
      square.classification, 
      buttonStateKey, 
      rightCounter, 
      wrongCounter,
      actualPhase
    )
    // console.log('actualRightCounter', actualRightCounter, newRightCounter)

    actualRightCounter = newRightCounter
    actualWrongCounter = newWrongCounter
  }

  return { rightCounter: actualRightCounter, wrongCounter: actualWrongCounter }
}


export { 
    TOTAL_ROUNDS, 
    COLORS, 
    getRandomInt, 
    touched, 
    getOffset,
    isInsideSquare,
    getRandomCoordinate,
    isValidCoordinate,
    verifyDrag,
    createButton,
    verifyTouched,
    verifyTouchedAndDrag,
    getValidAnimal,
    generateAnimal,
    generatePhase,
    validateSquare,
    verifyRightSquare,
    verifySquare,
}