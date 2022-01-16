const images = {
    cat: 'cat', 
    dog: 'dog', 
    snake:'snake', 
    cow: 'cow2', 
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
    peacock: 'peacock',
    penguin: 'penguin',
    eagle: 'eagle',
    duck: 'duck',
    alligator: 'alligator',
    spider: 'spider',
    ladybug: 'ladybug',
    bee: 'bee',
    cricket: 'cricket',
    ant: 'ant',
    scorpion: 'scorpion', 
    beetle: 'beetle',
  }
  
  const mammals = [
    images.cat, images.dog, images.cow, images.wolf, images.tiger, images.horse, 
    images.monkey, images.whale, 
  ]
  
  const oviparous = [
    images.frog, images.snake, images.shark, images.turtle, images.owl,
    images.chicken, images.canary, images.peacock, 
    images.penguin, images.eagle, images.duck, images.alligator,
    images.ladybug, images.bee, images.cricket, images.ant, images.scorpion,
    images.beetle, 
  ]
  
  const vertebrates = [
    images.cat, images.dog, images.cow, images.wolf, images.tiger, images.horse, 
    images.monkey, images.frog, images.snake, images.shark, images.turtle, 
    images.owl, images.chicken, images.whale, images.canary, images.peacock, 
    images.penguin, images.eagle, images.duck, images.alligator, 
  ]
  
  const invertebrates = [
    images.spider, images.ladybug, images.bee, images.cricket,
    images.ant, images.scorpion, images.beetle, 
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