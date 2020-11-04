var ghost , ghostimg , ghostimg2;
var door , doorimg , doorGroup;
var climber , climberimg , climberGroup;
var bg , bgimg;
var songimg;
var win;
var winimg;

var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score;

function preload() {
  ghostimg = loadImage("ghost-standing.png");
  doorimg = loadImage("door.png");
  climberimg = loadImage("climber.png");
  bgimg = loadImage("tower.png");
  ghostimg2 = loadImage("ghost-jumping.png");
  songimg = loadSound("spooky.wav",false);
  winimg = loadImage("win.png");
}

function setup() {
    createCanvas(windowWidth , windowHeight);

    bg = createSprite(width/2,350);
    bg.addImage("tower",bgimg);
    bg.scale = 2;

    ghost = createSprite(width/2,height/2 + 60 , 20 , 50);
    ghost.addImage("ghost",ghostimg);
    ghost.scale = 0.5;
    //ghost.debug = true;
    ghost.setCollider("rectangle",0,20,150,280);

    score = 0;
    
    doorGroup = new Group();
    climberGroup = new Group(); 
}

function draw() {

    background("white");

    fill("red");
    textSize(20);
    text("Score: " + score , 1000 , 75);

    if(gameState === PLAY){
        if(keyDown("space")){
            ghost.velocityY = -(8 + score/100);
            songimg.play();
        }
    
        score = score + Math.round(getFrameRate()/60);

        bg.velocityY = (7 +  score/100);

        ghost.velocityY = ghost.velocityY + 0.8;
    
        if(keyDown(LEFT_ARROW)){
            ghost.velocityX = -5;
        }
    
        if(keyDown(RIGHT_ARROW)){
            ghost.velocityX = 5;
        }
    
        if(keyWentUp(LEFT_ARROW)){
            ghost.velocityX = 0;
        }
    
        if(keyWentUp(RIGHT_ARROW)){
            ghost.velocityX = 0;
        }
        
        if(bg.y > 600){
        bg.y = 350;
        }
    
        if(ghost.isTouching(climberGroup)){
           gameState = END;
        }

        if(ghost.isTouching(doorGroup)){
            ghost.changeAnimation("win",ghostimg2);
        }

        if(ghost.y > 750){
            gameState = END;
        }

        if(ghost.y < 0){
            gameState = END;
        }

        spawndoor();
        drawSprites();
    }

    if(gameState === END){
       bg.velocityY = 0;
       ghost.velocityX = 0;
       ghost.velocityY = 0;
       doorGroup.setVelocityYEach(0);
       climberGroup.setVelocityYEach(0);
       doorGroup.setLifetimeEach(-5);
       climberGroup.setLifetimeEach(-5);
       stroke("cyan");
       fill("black");
       textSize(100);
       text("GAME OVER",400,350);
    }
     
    ghost.depth = ghost.depth + 1;

    ghost.collide(climberGroup);
    ghost.collide(doorGroup);

}

function spawndoor() {
     if(frameCount % 70 === 0){
         door = createSprite(600 , -10 , 20 , 60);
         door.velocityY = (6 +  score/100);
         door.addImage("DD",doorimg);
         door.scale = 1.25;
         door.x = Math.round(random(250 , 1000));

         climber = createSprite(600 , 50 , 20 , 10);
         climber.velocityY = (6 +  score/100 );
         climber.addImage("CC",climberimg);
         climber.scale = 1.25;
         climber.x = door.x;

         door.lifetime = 200;
         climber.lifetime = 150;
         doorGroup.add(door);
         climberGroup.add(climber);

         //door.debug = true;
         door.setCollider("rectangle",0,35,70,10);
         //climber.debug = true;
         climber.setCollider("rectangle",0,5,65,10);
     }
}