const images = {
    cat: 'cat', 
    dog: 'dog', 
    cobra:'cobra', 
    cow: 'cow', 
    wolf: 'wolf', 
    tiger: 'tiger', 
    shark: 'shark', 
    turtle: 'turtle', 
    owl: 'owl', 
    horse: 'horse', 
    chicken: 'chicken',
    monkey: 'monkey',
    frog: 'frog',
    whale: 'whale',
    canary: 'canary',
    monkey: 'monkey',
    parrot: 'parrot',
    penguin: 'penguin',
    macaw: 'macaw',
    whiteParrot: 'white-parrot',
    alligator: 'alligator',
    spider: 'spider',
    butterfly: 'butterfly',
    ladybird: 'ladybird',
    bee: 'bee',
    cricket: 'cricket',
    ant: 'ant',
    scorpion: 'scorpion', 
    beetle: 'beetle',
    worm: 'worm', 
  }
  
  const mammals = [
    images.cat, images.dog, images.cow, images.wolf, images.tiger, images.horse, 
    images.monkey, images.whale, 
  ]
  
  const oviparous = [
    images.frog, images.cobra, images.shark, images.turtle, images.owl,
    images.chicken, images.canary, images.butterfly, images.parrot, 
    images.penguin, images.macaw, images.whiteParrot, images.alligator,
    images.ladybird, images.bee, images.cricket, images.ant, images.scorpion,
    images.beetle, 
  ]
  
  const vertebrates = [
    images.cat, images.dog, images.cow, images.wolf, images.tiger, images.horse, 
    images.monkey, images.frog, images.cobra, images.shark, images.turtle, 
    images.owl, images.chicken, images.whale, images.canary, images.parrot, 
    images.penguin, images.macaw, images.whiteParrot, images.alligator, 
  ]
  
  const invertebrates = [
    images.butterfly, images.spider, images.ladybird, images.bee, images.cricket,
    images.ant, images.scorpion, images.beetle, images.worm, 
  ]
  
  const classifications = {
    mammals: mammals,
    oviparous: oviparous,
    vertebrates: vertebrates,
    invertebrates: invertebrates,
  }
  
  const classificationsTranslate = {
    mammals: 'Mamíferos',
    oviparous: 'Ovíparos',
    vertebrates: 'Vertebrados',
    invertebrates: 'Invertebrados'
  }

  export { 
    images, 
    classifications,
    classificationsTranslate
  }