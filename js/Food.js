class Food{
    constructor(){
        this.foodStock=0
        this.lastFed;

        this.image = loadImage("images/milk.png");
    }

    getFoodStock(){
        return this.foodStock
      }

      updateFoodStock(foodStockRef){
          this.foodStock = foodStockRef
      }

      getFedTime(lastFed){
        this.lastFed = lastFed
      }
      
      deductFood(){
        if(this.foodStock>0){
            this.foodStock = this.foodStock - 1
        }
      }

        bedroom(){
            background(bedroom, 550, 500);
        }

       garden(){
         background(garden, 550, 500);
       }

       washroom(){
         background(washroom, 550, 500);
       }    

    display(){

      var button=createButton("Feed the Dog");
      button.position(400, 125);
    
      if(button.mousePressed(function(){
        foodS = foodS -1;
        gameState = 1;
        database.ref('/').update({'gameState' : gameState});
      }));


      var addFood=createButton("Add Food");
      addFood.position(500, 125);
    
      if(addFood.mousePressed(function(){
        foodS = foodS +1;
        gameState = 2;
        database.ref('/').update({'gameState' : gameState});
      }));

    }



}