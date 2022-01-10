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

const createAnimalElement = (imageName, coordinate) => {
    const img = new Image();
    img.src = `../assets/${imageName}.png`;
    img.className = imageName
    img.style.left = coordinate.x + 'px';
    img.style.top = coordinate.y + 'px';
    img.style.width = '125px'
    img.style.height = '75px'

    document.getElementsByClassName("canvas-container")[0]
        .appendChild(img);
}

const setElementCoordinates = (className, coordinate) => {
    const element = document.getElementsByClassName(className)[0];
    element.style.left = (coordinate.x) + 'px';
    element.style.top = (coordinate.y) + 'px';
}

export {
    setVisibileElement,
    setInvisibleElement,
    createAnimalElement,
    setElementCoordinates,
}