const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var score = 0;
var player;
var ground;
var playerSprite;
var asteroid;
var asteroidImg;
var asteroidGroup;

function preload(){
asteroidImg.loadImage("asteroid.png");
}

function setup() {
  createCanvas(1500,800);
  
  engine = Engine.create();
  world = engine.world;

  textSize(18);
  text("Score: " + score, 30,30);


  playerSprite = createSprite(750,650,150,150)

  ground = new Ground(750,750,1500,10);
  player = new Player(750,800,150,150);

  asteroidGroup = new Group();
}

function draw(){
  background("black");

  score = frameCount/40;

  if(keyIsDown(LEFT_ARROW)){
    playerSprite.x -= 10;
  }

  if(keyIsDown(RIGHT_ARROW)){
    playerSprite.x+=10;
  }

  if(asteroidGroup.isTouching(playerSprite)){
    asteroidGroup.destroyEach();
    playerSprite.destroy();
  }

  player.x = playerSprite.x;
  player.y = playerSprite.y;

ground.display();


spawnAsteroids();
  drawSprites();
}

function spawnAsteroids(){
  if(frameCount % 20 === 0){
    asteroid = createSprite(math.round(random(350,1150)),0,20,20);
    asteroid.addImage(asteroidImg);
    asteroid.scale = 0.1;
    asteroid.velocityX = math.round(random(-3,3));
    asteroid.velocityY = 30;
    asteroidGroup.add(asteroid);
    asteroidGroup.setLifeTimeEach = -1;
  }
}
