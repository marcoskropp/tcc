import {  
    classifications,
    classificationsTranslate, 
    generatePhase, 
} from '../utils/index.js'

const firstPhase = (roundState, actualPhase, buttonsState) => {
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
        quantityOfAnimalsPerSquare: 1,
        actualPhase,
        buttonsState,
        roundState
    })

    return actualPhase
} 

const secondPhase = (roundState, actualPhase, buttonsState) => {
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

    actualPhase = generatePhase({ 
        squares, 
        classificationsTranslate: classificationsTranslateSelected,  
        classifications: classificationsSelected, 
        quantityOfAnimalsPerSquare: 3,
        actualPhase,
        buttonsState,
        roundState
    })

    return actualPhase
} 

export { firstPhase, secondPhase }