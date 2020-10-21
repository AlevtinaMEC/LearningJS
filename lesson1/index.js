class Game {
  constructor(){
      this.player1= new Robot("Vasya");
      this.player2= new Robot("Kuzya");
      this.round=0; 
  } 

  __goRound(){
      this.player2.getDamage(this.player1.bringDamage());
      if (!this.player2.isAlive()){
          console.log("Player1 win!");
          return false;
      } else {
          this.player1.getDamage(this.player2.bringDamage());
          if (!this.player1.isAlive()){
              console.log("Player2 win!");
              return false;
          }
      }
      return true;
  }
  
  play(){
      let notEnd = false;
      do {
        this.round++;
        notEnd = this.__goRound();
      } while(notEnd);
      console.log(this.round);
  }
}

class Robot{
    constructor(name){
        this.name = name;
        this.hp = 10;
        this.damage = 3;
    }

    getDamage(damage){
       this.hp = this.hp-damage; 
    }

    bringDamage(){
        return this.damage;
    }

    isAlive(){
        return this.hp > 0;  
    }

}

const game = new Game();
game.play();