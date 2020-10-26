class Game {
    constructor([player1, player2]) {
        const factory = new RobotFactory();
        this.player1 = factory.create(player1.type, player1.name);
        this.player2 = factory.create(player2.type, player2.name);
        this.round = 0;
    }

    __goRound() {
        this.player2.getDamage(this.player1.bringDamage());
        if (!this.player2.isAlive()) {
            console.log(`${this.player1.name} win!`);
            return false;
        } else {
            this.player1.getDamage(this.player2.bringDamage());
            if (!this.player1.isAlive()) {
                console.log(`${this.player2.name} win!`);
                return false;
            }
        }
        return true;
    }

    play() {
        let notEnd = false;
        do {
            this.round++;
            notEnd = this.__goRound();
        } while (notEnd);
        console.log(this.round);
    }
}

class Robot {
    constructor(name, hp, damage) {
        this.name = name;
        this.hp = hp;
        this.damage = damage;
    }

    getDamage(damage) {
        this.hp = this.hp - damage;
    }

    bringDamage() {
        return this.damage;
    }

    isAlive() {
        return this.hp > 0;
    }

}

class Heavy extends Robot {
    constructor(name) {
        super(name, 50, 5);
        this.armor = 30;

    }
    getDamage(damage) {
        this.hp = this.hp - (damage * (1 - this.armor / 100));
    }
}

//const heavy = new Heavy("R2");
//heavy.getDamage(50);
//console.log(heavy);

class Assault extends Robot {
    constructor(name) {
        super(name, 50, 5);
        this.crit = 50;

    }
    bringDamage() {
        let v = Math.random() * 100;
        if (v > this.crit) {
            return this.damage;
        } else {
            return this.damage * 2;
        }
    }
}

// const heavy = new Assault("R2");
// console.log(heavy.bringDamage());

class Light extends Robot {
    constructor(name) {
        super(name, 50, 5);
        this.agility = 30;

    }
    getDamage(damage) {
        let v = Math.random() * 100;
        if (v < this.agility) {
            this.hp = this.hp - damage;
        }

    }
}

// const heavy = new Light("R2");
// heavy.getDamage(10);
//  console.log(heavy);

class RobotFactory {
    static type = {
        h: Heavy,
        a: Assault,
        l: Light
    }

    create(type, name) {
        const Robo = RobotFactory.type[type];
        const robo = new Robo(name);
        return robo;
    }
}

// const factory = new RobotFactory();
//  const myRobot = factory.create('l','R2');
//   console.log(myRobot);

const players = [
    { type: 'h', name: 'Kolya' },
    { type: 'a', name: 'Vasya' }
];

const a = new Game(players);
a.play();

