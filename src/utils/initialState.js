import { generateSequence } from './teste.js'

let actualSequenceLenght = 4;

const images = ['cat', 'dog', 'cobra', 'cow', 'wolf', 'tiger', 'shark', 'turtle', 'owl', 'horse', 'hen']

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
    /*teste: {
      name: 'teste',
      x: 0,
      y: 200,
      width: 130,
      height: 150,
      active: false,
      canTrigger: true,
    },*/
    dragIsActive: false, 
    selectedButtonDrag: {
      name: 'selectedButtonDrag',
      className: null,
      x: null,
      y: null,
    },
    teste: {
      name: 'teste',
      className: 'cat',
      x: 50,
      y: 50,
      width: 125,
      height: 75,
      active: false,
      canTrigger: true,
    },
    teste1: {
      name: 'teste1',
      className: 'dog',
      x: 150,
      y: 150,
      width: 125,
      height: 125,
      active: false,
      canTrigger: true,
    },
    shoudlShowHandConnectors: false,
  };
}

const getInitialRoundState = () => {
  return {
    colorSequence: generateSequence(4, actualSequenceLenght),
    actualUserSequence: [],
    userTime: false,
    round: 1,
    squares: {
      topLeft: {
        x: 0,
        y: 0,
        width: 300,
        height: 300,
        active: false,
        canTrigger: true,
      },
      topRight: {
        x: 900,
        y: 0,
        width: 300,
        height: 300,
        active: false,
        canTrigger: true,
      },
      bottomLeft: {
        x: 0,
        y: 380,
        width: 300,
        height: 300,
        active: false,
        canTrigger: true,
      },
      bottomRight: {
        x: 980,
        y: 380,
        width: 300,
        height: 300,
        active: false,
        canTrigger: true,
      },
    },
  };
}
  
  

  export { getInitialState, getInitialRoundState, images }