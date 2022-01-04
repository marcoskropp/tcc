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

function generateSequence(quantityOfButtons, quantityOfSequence) {
    let sequence = [];
    for (let i = 0; i < quantityOfSequence; i++) {
      // sequence.push(getRandomInt(quantityOfButtons));
    }
    return sequence;
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

// function isInsideSquare(square, button) {
//   return (Math.abs(square.x - button.x) * 2 <= (square.width + button.width)) &&
//   (Math.abs(square.y - button.y) * 2 <= (square.height + button.height));
// }

function isInsideSquare(square, button) {
  // square = invertCoordinates(square)
  // button = invertCoordinates(button)
  return (square.x + square.width > button.x) &&
  (square.x < button.x) && (square.y + square.height > button.y) &&
  (square.y < button.y)
  return !(button.x > square.width
      || button.width < square.x
      || button.y > square.height
      || button.height < square.y);
}



function invertCoordinates({x, y, width, height}) {
    x = 1280 - x 
    y = 720 - y
    return { x , y, width, height }
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
    getOffset,
    isInsideSquare,
    getRandomCoordinate
}