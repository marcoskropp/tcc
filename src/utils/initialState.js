import { firstPhase, secondPhase, thirdPhase } from './phases.js';

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
    usedAnimals: [],
    round: 1,
    roundSequence: [firstPhase, secondPhase, thirdPhase],
    buttons: {
      submit: {
        className: 'submit',
        x: 555,
        y: 600,
        width: 170,
        height: 60,
        active: false,
        canTrigger: true,
      },
      winGame: {
        className: 'win-game',
        x: 465,
        y: 150,
        width: 350,
        height: 100,
        active: false,
        canTrigger: false,
      },
      lostGame: {
        className: 'lost-game',
        x: 465,
        y: 150,
        width: 350,
        height: 100,
        active: false,
        canTrigger: true,
      },
      passRound: {
        className: 'pass-round-game',
        x: 525,
        y: 150,
        width: 230,
        height: 50,
        active: false,
        canTrigger: false,
      },
      initGame: {
        className: 'init-button',
        x: 450,
        y: 288,
        width: 400,
        height: 100,
        active: false,
        canTrigger: false,
      }
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