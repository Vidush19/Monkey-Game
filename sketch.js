// Calling out Global Variables
var monkey , monkey_running, monkeyEnd;
var banana ,bananaImage, obstacle, obstacleImage;
var ground;
var foodGroup, obstacleGroup;
var score = 0;
var survivalTime;
var sky, grass, bgImage, gImage;
var PLAY = 1;
var END = 2;
var START = 0;
var gameState = PLAY;
var game,gameImg,gameSound;
var zooImg, zoo;
var rail, railImg, rail2, rail3;
var life = 10;
var x = 0;
var jumpS;

function preload(){
  //loading animation for monkey
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkeyEnd = loadAnimation("sprite_0.png");
  
  //loading images for bananas and rocks
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bgImage = loadImage("Untitled.png");
  gImage = loadImage("images.jpg");
  zooImg = loadImage("zoo.jpg");
  railImg = loadImage("rail.jpg");
  gameImg = loadImage("Game.jpg");
  gameSound = loadSound("Game Over (Sound Effect).mp3");
  jumpS = loadSound("Cartoon Jump Sound Effect.mp3");
  
 }

function setup() {
  // creating canvas
  createCanvas(600,500);
  
  sky = createSprite(300,165,600,400)
  sky.shapeColor = "lightblue";
  sky.addImage(bgImage);
  sky.scale = 2.2;
  
  rail = createSprite(730,250,15,15);
  rail.addImage(railImg);
  rail.scale = 2;
  rail.velocityX = -5;
  rail2 = createSprite(1230,250,15,15);
  rail2.addImage(railImg);
  rail2.scale = 2;
  rail2.velocityX = -5;
  rail3 = createSprite(1730,250,15,15);
  rail3.addImage(railImg);
  rail3.scale = 2;
  rail3.velocityX = -5;
  
  
  zoo = createSprite(200,179,15,15);
  zoo.addImage(zooImg);
  zoo.scale = 1.95
  
  // making sprites
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.addAnimation("end",monkeyEnd);
  monkey.scale = 0.15;

  ground = createSprite(400,370,600,10);
  ground.x = ground.width/2;
  
  grass = createSprite(300,450,600,150);
  grass.shapeColor = "green";
  
  game = createSprite(300,100,15,15);
  game.addImage(gameImg);
  game.visible = false;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background("skyblue");
  
  x+=1;
  zoo.velocityX = -5;
  
  //making monkey stand on ground
  monkey.collide(ground);
  
  //providing gravity for the monkey
  monkey.velocityY += 0.8;
  
  //putting monkey in front of the sky sprite
  // monkey.depth = sky.depth;
  // monkey.depth+=1;
  
  if(rail.x<-280){
    rail.x = rail3.x + 500;
  }
  if(rail2.x<-280){
    rail2.x = rail.x + 500;
  }
  if(rail3.x<-280){
    rail3.x = rail2.x + 500;
  }
  
  if(gameState===PLAY){
  monkeyMove();
  spawnBananas();
  spawnObstacles();
  // rail3.velocityX = (5+(survivalTime/4));
  // rail2.velocityX = (5+(survivalTime/4));
  // rail.velocityX = (5+(survivalTime/4));
  survivalTime = Math.ceil(x/60);
    if(foodGroup.isTouching(monkey)){
      foodGroup.destroyEach();
      score +=2;
    }
    if(obstacleGroup.isTouching(monkey)){
      gameSound.setVolume(0.2);
      gameSound.play();
      gameState = END;
    }
    if(life===0){
      gameSound.setVolume(0.2);
      gameSound.play();
      gameState = END;
    }
    if(frameCount%100===0 && score>0 && life===10){
      score-=2;
    }
    if(frameCount%100===0 && score===0){
      life-=1;
    }
    if(frameCount%100===0 && score>0 && life<10){
      score-=2;
      life+=1;
    }
  }
  if(gameState===END){
    obstacle.velocityX = 0;
    banana.velocityX = 0;
    banana.lifetime = -1;
    obstacle.lifetime = -1;
    monkey.changeAnimation("end",monkeyEnd);
    rail.velocityX = 0;
    rail2.velocityX = 0;
    rail3.velocityX = 0;
    zoo.velocityX = 0;
    game.visible = true;
    }
  if(keyDown("space")&& gameState===END){
    restart();
   }
  drawSprites();
  
  textSize(24);
  fill("yellow");
  text("Food = "+score,500,50);
  
  
  textSize(24);
  fill("black");
  text("Survival Time = "+survivalTime,220,50);
  
  textSize(24);
  fill("red");
  text("Life = "+life,50,50);
}

function spawnBananas() {
  if(frameCount%80===0){
    banana = createSprite(600,0,15,15);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    
    banana.y = Math.round(random(120,200));
    
    banana.velocityX = -(10+(survivalTime/4));
    banana.lietime = 200;
    
    foodGroup.add(banana);  
  }
}

function spawnObstacles() {
  if(frameCount%100===0){
    obstacle = createSprite(600,330,15,15);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.25;
    obstacle.setCollider("rectangle",0,0,350,350)
    obstacle.velocityX = -(10+(survivalTime/4));
    obstacle.lifetime = 200;
    
    obstacleGroup.add(obstacle);
    
  }
}

function monkeyMove() {
  if(keyDown("space") && monkey.y>=300){
    jumpS.play();
    monkey.velocityY = -15;
  }
}
function restart() {
  game.visible = false;
    obstacleGroup.destroyEach();
    foodGroup.destroyEach();
    life = 10;
    x = 0;
    score = 0;
    monkey.changeAnimation("running",monkey_running);
    zoo.x = 200;
    zoo.velocityX = (5+(survivalTime/4));
    rail.x = 720;
    rail.velocityX = (5+(survivalTime/4));
    rail2.x = 1230;
    rail2.velocityX = (5+(survivalTime/4));
    rail3.x = 1730;
    rail3.velocityX = (5+(survivalTime/4));
    gameState = PLAY;
}