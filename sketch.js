var PLAY = 1
var END = 0
var gameState = PLAY
var fish,fishImage,obstacle,coins,coinsGroup,obstacleImg
var enemyFish,enemyFishGroup,gameOverImg,gameOver,backgroundImg,CoinImg
var restart,restartImg
var score = 0

function preload() {
  fishImage = loadAnimation("fish3.jpeg","fish4.jpeg","fish5.jpeg","fish6.jpeg","fish8.jpeg","HAHA.jpeg","fishAnimation1.jpeg","fishAnimation2.jpeg")
  CoinImg = loadAnimation("1.jpg","2.jpg","3.jpg","5.jpg","4.jpg","6.jpg")
  backgroundImg = loadImage("bgOcean.jpg")
  gameOverImg = loadImage("gameOver.png")
  restartImg = loadImage("restart.png")
  obstacleImg = loadImage("shark.jpg")
}

function setup() {
  createCanvas(1200,700);
  fish = createSprite(80,400,20,10) 
  fish.addAnimation("swimming",fishImage) 
    
   enemyFishGroup = new Group()
    coinsGroup = new Group()
    var edges = createEdgeSprites()
    gameOver = createSprite(600,350,50,50)
    gameOver.addImage(gameOverImg)
    gameOver.visible = false
    restart = createSprite(600,300,30,30)
    restart.addImage(restartImg)
    restart.visible = false
}

function draw() {
  background(0);  
  
  if(gameState === PLAY){
    if(coinsGroup.isTouching(fish)){
      score = score+1
      coinsGroup.destroyEach()
    }
    if(keyDown("space")){
      fish.velocityY = -5
    }
    fish.velocityY = fish.velocityY + 0.8
    spawnEnemies()
    spawnCoins()
    
    if(enemyFishGroup.isTouching(fish)){
      gameState = END
    }
    if(fish.y > 700||fish.y < 0){
      gameState = END
    }
  }
  text("Score:"+score,1120,100)
 
   

  if(gameState === END){
    fish.velocityX = 0
    enemyFishGroup.setVelocityXEach(0)
    coinsGroup.setVelocityXEach(0)
    gameOver.visible = true
    restart.visible = true
    if(mousePressedOver(restart)){
    reset()
    }
  }

drawSprites()
}

function spawnEnemies(){
  if(frameCount % 60 === 0){
  var enemyFish = createSprite(1200,50,40,20)
  enemyFish.addImage(obstacleImg) 
  var rand = Math.round(random(100,800))
  enemyFish.y = rand
  enemyFish.velocityX = -4
  enemyFishGroup.add(enemyFish)
  enemyFish.lifetime = -1
}
}



function spawnCoins(){
if(frameCount % 80 === 0){
  var coins = createSprite(1200,50,20,20)
  coins.addAnimation("spin",CoinImg)






  
  coins.scale=0.5
  coins.y = Math.round(random(100,800))
  coins.velocityX = -4
  coinsGroup.add(coins)
 
  coins.lifetime = -1
}


}

function reset(){
  gameState = PLAY
  gameOver.visible = false
  restart.visible = false
  enemyFishGroup.destroyEach()
  coinsGroup.destroyEach()
  fish.y = 350
  score  = 0

}