var zombie , explosion , heart_1 , heart_2 , heart_3;
var lose , shooter_2 , shooter_3 , win , bg , bgImg;
var gameState = "fight";
var life = 3;
var score = 0;

function preload(){
zombie = loadImage("assets/zombie.png");
bgImg = loadImage("assets/bg.jpeg");
heart_1= loadImage("assets/heart_1.png");
heart_2 = loadImage("assets/heart_2.png");
heart_3 = loadImage("assets/heart_3.png");
shooter_2 = loadImage("assets/shooter_2.png");
shooter_3 = loadImage("assets/shooter_3.png");
}

function setup(){
createCanvas(1000,1000);

bg = createSprite(700,500);
bg.addImage(bgImg);
bg.scale = 1.1;

player = createSprite(200,650,20,20);
player.addImage(shooter_2);
player.scale = 0.5;
player.debug = false;
player.setCollider("rectangle",0,0,300,300);

heart1 = createSprite(900,90,20,20);
heart1.visible = false;
heart1.addImage(heart_1);
heart1.scale = 0.3;

heart2 = createSprite(900,90,20,20);
heart2.visible = false;
heart2.addImage(heart_2);
heart2.scale = 0.3;

heart3 = createSprite(850,90,20,20);
heart3.visible = false;
heart3.addImage(heart_3);
heart3.scale = 0.3;

zombieGroup = new Group();
bulletGroup = new Group();
}

function draw(){
    background(0);

    if(gameState === "fight"){
        if(life === 3){
        heart3.visible = true;
        heart2.visible = false;
        heart1.visible = false;
        }
        if(life === 2){
        heart3.visible = false;
        heart2.visible = true;
        heart1.visible = false;
        }
        if(life === 1){
        heart3.visible = false;
        heart2.visible = false;
        heart1.visible = true;
        }
        if(life === 0){
        gameState = "lost"
        }
        if(keyDown("UP_ARROW")){
            player.y -= 30;
           }
           if(keyDown("DOWN_ARROW")){
           player.y += 30;
           }
           if(keyDown("SPACE")){
           bullet = createSprite(200,player.y-30,20,20);
           bullet.velocityX = 10;
           bulletGroup.add(bullet);
           player.addImage(shooter_3);
           }
           if(zombieGroup.isTouching(bulletGroup)){
            for(var i = 0; i<zombieGroup.length; i++){
            if(zombieGroup[i].isTouching(bulletGroup)){
            zombieGroup[i].destroy();
            bulletGroup.destroyEach();
            score +=10;
            }
            }
          
            }
           if(zombieGroup.isTouching(player)){
               for(var i = 0; i<zombieGroup.length; i++){
                if(zombieGroup[i].isTouching(player)){
                zombieGroup[i].destroy();
                life = life-1
                }
            }
            }
            enemy();
             }
    drawSprites();
    textSize(30);
    fill("black");
    text("SCORE:"+score,200,50);
    text("LIVES:"+life,800,50);
    
    if(gameState === "lost"){
    zombieGroup.destroyEach();
    player.destroy();
    }
    else if(gameState === "won"){
    textSize(30);
    text("YOU WON",400,40);
    zombieGroup.destroyEach();
    player.destroy();
    }
}


function enemy(){
if(frameCount%50===0){
    zombie1 = createSprite(random(500,1000),random(100,500),20,20);
    zombie1.addImage(zombie);
    zombie1.scale = 0.3;
    zombie1.velocityX = -3;
    zombie1.debug = false;
    zombie1.setCollider("rectangle",0,0,400,400);
    zombieGroup.add(zombie1);
}
}