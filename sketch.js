var trex,trexrunning,ground,groundanimation,invisibleground, cloud,cloudimage,obstacle,obstacle1image,obstacle2image,obstacle3image,obstacle4image,obstacle5image,obstacle6image,rand,gamestate,ObGroup,cloudGroup,score,trexcollided,gameover,overimage,restart,restartimage;

localStorage["Highscore"]=0;



function preload(){
  trexrunning= loadAnimation("trex1.png","trex3.png","trex4.png");
  groundanimation= loadImage("ground2.png");
  cloudimage=loadImage("cloud.png");
  obstacle1image= loadImage ("obstacle1.png");
  obstacle2image= loadImage ("obstacle2.png");
  obstacle3image= loadImage ("obstacle3.png");
  obstacle4image= loadImage ("obstacle4.png");
  obstacle5image= loadImage ("obstacle5.png");
  obstacle6image= loadImage ("obstacle6.png");
  trexcollided= loadImage ("trex_collided.png");
  restartimage= loadImage("restart.png");
  overimage= loadImage ("gameOver.png");
}


function setup() {
  createCanvas(400, 400);
  trex= createSprite(50,370,10,10);
  trex.addAnimation("running",trexrunning);
  trex.addAnimation("trex",trexcollided);
  trex.scale=0.5
 
  ground= createSprite(200,380,400,5);
  ground.addImage(groundanimation);
  
  invisibleground= createSprite(200,390,400,5);
  gamestate="play";
  score=0;
  ObGroup= new Group();
  cloudGroup= new Group();
  trex.setCollider("circle",10,0,30);
  restart= createSprite(200,300,10,10);
  restart.addImage ("restartimage",restartimage);
  restart.scale=0.5;
 gameover= createSprite(200,200,10,10);
  gameover.addImage ("over",overimage);
  gameover.scale=0.5;
}


function draw() {
  background("black");
  text("Score:"+score,300,20);
 
  if (gamestate==="play"){
     ground.velocityX = -3;
    
  createCloud();
 createObstacle();
  
    restart.visible=false;
    gameover.visible=false;
    
  trex.collide(invisibleground);
 invisibleground.visible=false;
  
  ground.velocityX=-3;
  if (ground.x<0){
    ground.x=ground.width/2
  }

  
  if (keyDown("space")&&trex.y>368){
    trex.velocityY=-5
  }
    
  
 trex.velocityY= trex.velocityY+0.2;
    
    if(World.frameCount%20===0){
      score=score+1;
    }
  
    
    if (ObGroup.isTouching(trex)){
     gamestate="end"; 
    }
 
  }
  else if (gamestate==="end"){
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);

    trex.changeAnimation("trex",trexcollided);
    
    cloudGroup.setLifetimeEach(-1);
    ObGroup.setLifetimeEach(-1);
    
    restart.visible=true;
    gameover.visible=true;
    if (mousePressedOver(restart)){
     reset();  
    
    }
  }
  
  drawSprites();
}

function createCloud(){
if (World.frameCount%40===0){
cloud= createSprite(400,random(50,100),10,10);
cloud.addImage(cloudimage);
cloud.velocityX=-5
  cloudGroup.add(cloud);
cloud.lifetime=100;
  
} 
}

function createObstacle(){
if (World.frameCount%60===0){
obstacle= createSprite(400,370,10,10);
obstacle.velocityX=-5
  obstacle.scale=0.5
 rand=Math.round (random(1,6));
  obstacle.lifetime=100;
  switch(rand){
   case 1:obstacle.addImage(obstacle1image);
      break;
  case 2:obstacle.addImage(obstacle2image);
      break;
  case 3:obstacle.addImage(obstacle3image);
      break;
  case 4:obstacle.addImage(obstacle4image);
      break;
 case 5:obstacle.addImage(obstacle5image);
      break;
 case 6:obstacle.addImage(obstacle6image);
      break;
    default:break;
        }
   ObGroup.add(obstacle);

}
}
function reset(){
 gamestate="play"; 

   gameover.visible = false;
  restart.visible = false;
  
  ObGroup.destroyEach();
  cloudGroup.destroyEach();
  
  trex.changeAnimation("running", trexrunning);
  if (localStorage["Highscore"]<score){
      localStorage["Highscore"]=score;
}
  console.log("Your High Score"+localStorage["Highscore"]);
  score=0;
}