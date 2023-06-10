var score =0;
var player,enemy1,enemy2, bullet, boarder;

var playerImg,alienImg,ufoImg, bulletImg, blastImg, boarderImg;

var enemy1Group, enemy2Group, bulletGroup;

var bg,sh,blast,ufo;




var life =3;
var score=0;
var gameState=1

function preload(){
  playerImg = loadImage("sp1.png")
 blastImg = loadImage("blast.png")
  bulletImg = loadImage("bl1.png")
  alienImg = loadImage("alien-removebg-preview.png")
  ufoImg = loadImage("redbubble.png")
  boarderImg= loadImage("back.jpg")
  bg = loadImage  ("space.png")
  sh = loadImage  ("sp2 (2).png")
  gunShoot = loadSound ("lasergun.mp3")
  blast = loadSound ("blast.mp3")
  ufo = loadImage("ufo.png")
 
  
}
function setup() {
  createCanvas(windowWidth, windowHeight);

  boarder= createSprite(-50, 370, 100,height);
  boarder.shapeColour = ("white")
  
  
  player= createSprite(100, height/2, 50,50);
  player.addImage(playerImg);
  player.scale=1

  
  
  bulletGroup = createGroup();   
  enemy1Group = createGroup();   
  enemy2Group = createGroup();   
  
  heading= createElement("h1");
  scoreboard= createElement("h1");


}

function draw() {
  background("black");
  
  heading.html("Life: "+life)
  heading.style('color:red'); 
  heading.position(150,20)

  scoreboard.html("Score: "+score)
  scoreboard.style('color:red'); 
  scoreboard.position(width-200,20)

  if(gameState===1){
    player.y=mouseY  

    if (frameCount % 80 === 0) {
      drawenemy1();
    }

    if (frameCount % 100 === 0) {
      drawenemy2();
    }

    if(keyWentDown("space")){
 
     player.addImage(sh)
     
    }
      else if(keyDown("space")){
        player.addImage(playerImg)
        
      }



    if(keyDown("space")){
      shootBullet();
      gunShoot.play()
    }

    if (enemy1Group.collide(boarder)){
      handleGameover(enemy1Group);
      
    }
    if (enemy2Group.collide(boarder)) {
      handleGameover(enemy2Group);
      
    }
    
    if(enemy1Group.collide(bulletGroup)){
      handleEnemyCollision(enemy1Group);
      
    }

    if(enemy2Group.collide(bulletGroup)){
      handleEnemyCollision(enemy2Group);
      blast.play()
       }

    
    

    drawSprites();
  }
    
  
}

function drawenemy1(){
  enemy1 = createSprite(800,random(20,780),40,40);
  enemy1 .addImage(alienImg);
  enemy1 .scale = 0.6;
  enemy1 .velocityX = -8;
  enemy1 .lifetime = 400;
  enemy1Group .add(enemy1);
}
function drawenemy2(){
  enemy2 = createSprite(800,random(20,780),40,40);
  enemy2.addImage(ufo);
  enemy2.scale = 0.5;
  enemy2.velocityX = -8;
  enemy2.lifetime = 400;
  enemy2Group.add(enemy2);
}

function shootBullet(){
  bullet= createSprite(150, width/2, 50,20)
  bullet.y= player.y-40
  bullet.addImage(bulletImg)
  bullet.scale=0.12
  bullet.velocityX= 7
  bulletGroup.add(bullet)
  
}

function handleEnemyCollision(bubbleGroup){
    if (life > 0) {
       score=score+1;
    }

   blast= createSprite(bullet.x+60, bullet.y, 50,50);
  blast.addImage(blastImg);
   blast.scale=0.3
 blast.life=20
    bulletGroup.destroyEach()
    bubbleGroup.destroyEach()
  }
    
  

function handleGameover(bubbleGroup){
  
    life=life-1;
    bubbleGroup.destroyEach();
    

    if (life === 0) {
      gameState=2
      
     
    }
  
}
