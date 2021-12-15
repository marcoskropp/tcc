const TOTAL_ROUNDS = 3;

const COLORS = {
    BLUE_PRIMARY : "#4287f5",
    BLUE_SECONDARY : "#2ff5e4",
    RED_PRIMARY : "#f54242",
    GREEN_PRIMARY : "#51d613",
    PINK_PRIMARY : "#930ee6",
    YELLOW_PRIMARY : "#f5eb2f",
}

function getRandomInt(max) {
    const min = Math.ceil(0);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateSequence(quantityOfButtons, quantityOfSequence) {
    let sequence = [];
    for (let i = 0; i < quantityOfSequence; i++) {
      sequence.push(getRandomInt(quantityOfButtons));
    }
    return sequence;
}

function touched1(landmark, button) {
    return landmark.x > button.x &&
      landmark.x < button.x + button.width &&
      landmark.y > button.y &&
      landmark.y < button.y + button.height &&
      button.canTrigger
      ? true
      : false;
}


function touched(landmarkIndicator,landmarkThumb, button) {
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

function invertCoordinates(x, y) {
    x = 1280 - x 
    y = 720 - y
    return { x , y }
}

function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
  }

export { 
    TOTAL_ROUNDS, 
    COLORS, 
    getRandomInt, 
    generateSequence, 
    touched, 
    invertCoordinates,
    getOffset
}