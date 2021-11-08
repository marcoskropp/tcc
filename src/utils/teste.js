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

function touched(landmark, button) {
    return landmark.x > button.x &&
      landmark.x < button.x + button.width &&
      landmark.y > button.y &&
      landmark.y < button.y + button.height &&
      button.canTrigger
      ? true
      : false;
}

export { TOTAL_ROUNDS, COLORS, getRandomInt, generateSequence, touched }