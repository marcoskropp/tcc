const setVisibileElement = (className, text) => {
    const element = document.getElementsByClassName(className)[0];

    if(element.classList.contains('invisible')) {
        element.classList.remove('invisible')
    }

    if(text) {
        const elementText = document.getElementsByClassName(`${className}-text`)[0];
        elementText.textContent = text
    }
}
  
const setInvisibleElement = (className) => {
    const element = document.getElementsByClassName(className)[0];

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
    element.style.left = (coordinate.x - 20) + 'px';
    element.style.top = (coordinate.y - 20) + 'px';
}

export {
    setVisibileElement,
    setInvisibleElement,
    createAnimalElement,
    setElementCoordinates,
}
