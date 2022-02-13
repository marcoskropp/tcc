const images = {
  alligator: 'alligator',
  ant: 'ant',
  bee: 'bee',
  beetle: 'beetle',
  canary: 'canary',
  cat: 'cat', 
  chicken: 'chicken',
  cow: 'cow', 
  cricket: 'cricket',
  dog: 'dog', 
  duck: 'duck',
  eagle: 'eagle',
  frog: 'frog',
  horse: 'horse', 
  ladybug: 'ladybug',
  monkey: 'monkey',
  owl: 'owl', 
  peacock: 'peacock',
  penguin: 'penguin',
  scorpion: 'scorpion', 
  shark: 'shark', 
  snake:'snake', 
  spider: 'spider',
  tiger: 'tiger', 
  turtle: 'turtle', 
  whale: 'whale',
  wolf: 'wolf', 
  chameleon: 'chameleon',
  fish: 'fish',
  pufferFish: 'puffer-fish',
  snail: 'snail',
}

const animalsTranslatedNames = {
  alligator: 'Jacaré',
  ant: 'Formiga',
  bee: 'Abelha',
  beetle: 'Besouro',
  canary: 'Canário',
  cat: 'Gato',
  chicken: 'Galinha',
  cow: 'Vaca',
  cricket: 'cigarra',
  dog: 'Cachorro',
  duck: 'Pato',
  eagle: 'Águia',
  frog: 'Sapo',
  horse: 'Cavalo',
  ladybug: 'Joaninha',
  monkey: 'Macaco',
  owl: 'Coruja', 
  peacock: 'Pavão',
  penguin: 'Pinguin',
  scorpion: 'Escorpião', 
  shark: 'Tubarão', 
  snake:'Cobra', 
  spider: 'Aranha',
  tiger: 'Tigre', 
  turtle: 'Tartaruga', 
  whale: 'Baleia',
  wolf: 'Lobo', 
  chameleon: 'Camaleão',
  fish: 'Peixe',
  pufferFish: 'Baiacu',
  snail: 'Lesma',
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
    images.beetle, images.chameleon, images.fish, images.pufferFish, 
    images.snail,
  ]
  
  const vertebrates = [
    images.cat, images.dog, images.cow, images.wolf, images.tiger, images.horse, 
    images.monkey, images.frog, images.snake, images.shark, images.turtle, 
    images.owl, images.chicken, images.whale, images.canary, images.peacock, 
    images.penguin, images.eagle, images.duck, images.alligator, 
    images.chameleon, images.fish, images.pufferFish,
  ]
  
  const invertebrates = [
    images.spider, images.ladybug, images.bee, images.cricket,
    images.ant, images.scorpion, images.beetle, 
  ]

  const feathers = [
    images.canary, images.chicken, images.duck, images.eagle, images.owl, 
    images.peacock, images.penguin
  ]

  const bristle = [
    images.bee, images.cat, images.cow, images.dog, images.horse, images.monkey, 
    images.tiger, images.wolf
  ]

  const scales = [
    images.alligator, images.snake, images.chameleon, images.pufferFish,
  ]

  const antennas = [
    images.ant, images.beetle, images.cricket, images.ladybug, 
    images.snail,
  ]
  
  const classifications = {
    mammals: mammals,
    oviparous: oviparous,
    vertebrates: vertebrates,
    invertebrates: invertebrates,
    feathers: feathers,
    bristle: bristle,
    scales: scales,
    antennas
  }
  
  const classificationsTranslate = {
    mammals: 'Mamíferos',
    oviparous: 'Ovíparos',
    vertebrates: 'Vertebrados',
    invertebrates: 'Invertebrados',
    feathers: 'Penas',
    bristle: 'Pelos',
    scales: 'Escamas',
    antennas: 'Antenas',
  }

  export { 
    images, 
    classifications,
    classificationsTranslate,
    animalsTranslatedNames
  }