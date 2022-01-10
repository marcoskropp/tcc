import { generateSequence } from './functions.js'

let actualSequenceLenght = 4;

const getInitialState = () => {
  return {
      // handTriggerButton: {
    //   x: 1050,
    //   y: 20,
    //   width: 130,
    //   height: 160,
    //   active: false,
    //   canTrigger: true,
    // },
    // initGameButton: {
    //   x: 515,
    //   y: 365,
    //   width: 245,
    //   height: 47,
    //   active: false,
    //   canTrigger: true,
    // },
    // helpButton: {
    //   x: 30,
    //   y: 475,
    //   width: 130,
    //   height: 150,
    //   active: false,
    //   canTrigger: true,
    // },
    // reinitGameButton: {
    //   x: 470,
    //   y: 120,
    //   width: 340,
    //   height: 200,
    //   active: false,
    //   canTrigger: true,
    // },
    dragIsActive: false, 
    selectedButtonDrag: {
      name: 'selectedButtonDrag',
      className: null,
      x: null,
      y: null,
    },
    shoudlShowHandConnectors: false,
  };
}

const getInitialRoundState = () => {
  return {
    colorSequence: generateSequence(4, actualSequenceLenght),
    usedAnimals: [],
    userTime: false,
    round: 1,
    buttons: {
      submit: {
        className: 'submit',
        x: 565,
        y: 600,
        width: 150,
        height: 40,
        active: false,
        canTrigger: true,
      },
    },
    roundSquares: {
      topLeftAnimals: [],
      topRightAnimals: [],
      bottomLeftAnimals: [],
      bottomRightAnimals: []
    },
    squares: {
      topLeft: {
        className: 'top-left-square',
        name: 'topLeft',
        classification: '',
        x: 0,
        y: 0,
        width: 300,
        height: 300,
        active: false,
        canTrigger: false,
      },
      topRight: {
        className: 'top-right-square',
        name: 'topRight',
        classification: '',
        x: 900,
        y: 0,
        width: 300,
        height: 300,
        active: false,
        canTrigger: false,
      },
      bottomLeft: {
        className: 'bottom-left-square',
        name: 'bottomLeft',
        classification: '',
        x: 0,
        y: 380,
        width: 300,
        height: 300,
        active: false,
        canTrigger: false,
      },
      bottomRight: {
        className: 'bottom-right-square',
        name: 'bottomRight',
        classification: '',
        x: 980,
        y: 380,
        width: 300,
        height: 300,
        active: false,
        canTrigger: false,
      },
    },
  };
}
  
  

  export { 
    getInitialState, 
    getInitialRoundState, 
  }