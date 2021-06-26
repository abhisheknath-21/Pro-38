var dog, dog1;
var happyDog, happyDog1;
var database;
var foodS;
var foodStock;
var feedDog;
var addFoods;
var fedTime;
var lastFed;
var bedroom;
var garden;
var washroom;
var livingroom
var sadDog;
var gameState;
var changeState;
var readeState;

function preload()
{
	dog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
  bedroom = loadImage("images/Bed Room.png");
  garden = loadImage("images/Garden.png");
  washroom = loadImage("images/Wash Room.png");
  sadDog = loadImage("images/deadDog.png");
  livingroom = loadImage("images/Living Room.png");
}

function setup() {
  database=firebase.database();
	createCanvas(500, 700);

  dog1 = createSprite(250, 550, 50, 50);
  dog1.addImage(dog);
  dog1.scale = 0.2;

  foodStock=database.ref('Food');
  foodStock.on("value", function(data){
     foodS = data.val();
  });

  foodObj = new Food( );

  readState = database.ref('gameState');
  readState.on("value", function(data){
    gameState = data.val();
  });

  var Bath=createButton("I want to take Bath");
  Bath.position(580, 125);
  if(Bath.mousePressed(function(){
    gameState=3;
    database.ref('/').update({'gameState' : gameState});
  }))
  if(gameState===3){
    dog1.addImage(washroom);
    dog1.scale=1;
    milkBottle2.visible=false;
  }

  var Sleep=createButton("I am very Sleepy");
  Sleep.position(710, 125);
  if(Bath.mousePressed(function(){
    gameState=4;
    database.ref('/').update({'gameState' : gameState});
  }))
  if(gameState===4){
    dog1.addImage(bedroom);
    dog1.scale=1;
    milkBottle2.visible=false;
  }

  var Play=createButton("Lets Play !!");
  Play.position(500, 160);
  if(Bath.mousePressed(function(){
    gameState=5;
    database.ref('/').update({'gameState' : gameState});
  }))
  if(gameState===5){
    dog1.addImage(livingroom);
    dog1.scale=1;
    milkBottle2.visible=false;
  }

  var PlayInGarden=createButton("Lets Play in Park");
  PlayInGarden.position(585, 160);
  if(Bath.mousePressed(function(){
    gameState=6;
    database.ref('/').update({'gameState' : gameState});
  }))
  if(gameState===6){
    dog1.y = 175
    dog1.addImage(garden);
    dog1.scale=1;
  }


}


function draw() {  
  
  background(46, 139, 87);
  foodObj.display();
  writeStock(foodS);

  if(foodS == 0){
    dog1.addImage(happyDog);
  }else{
    dog1.addImage(sadDog);
  }

  fedTime=database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed=data.val();
  })

    if(gameState!= "Hungry"){
      dog1.remove();
    }else{
      dog1.addImage(sadDog);
    }

    if(gameState===1){
      dog1.addImage(happyDog);
      dog1.scale=0.175;
      dog1.y=250;
    }

    if(gameState===2){
      dog1.addImage(sadDog);
      dog1.scale=0.175;
      milkBottle2.visible=false;
      dog1.y=250;
    }



  drawSprites();

  }


function feedDog(){
  dog1.addImage(happyDog); 

  var food_stock_val = foodObj.getFoodStock();
  if(food_stock_val <= 0){
      foodObj.updateFoodStock(food_stock_val*0);
    }else{
      foodObj.updateFoodStock(food_stock_val-1);

  }
      database.ref('/').update({      
      Food : foodObj.getFoodStock(),
      FeedTime : hour()
     })
 }

/*function feedDog(){
    dog1.addImage(happyDog);

    foodObj.updateFoodStock(foodObj.getFoodStock(-1));
    database.ref(' / ').update({
      Food: foodObj.getFoodStock(),
      FeedTime : hour()
      }) 
}*/

function  addFoods(){
  foodS++;
  database.ref('/').update({
    Food : foodS
  })
}

function update(State){
  database.ref('/').update({
    gameState: State
   } );
}

function readStock(data){
    foodS = dala.val();
}

function writeStock(x){
    database.ref('/').update({
      food : x
    })
}
