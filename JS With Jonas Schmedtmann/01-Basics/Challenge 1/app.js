

// jonas
var heightJohn = 173;
var heightMike = 160;
var ageJohn = 40;
var ageMike = 26;

var scorejohn = heightJohn + 5 *ageJohn;
var scoreMike = heightMike + 5 *ageMike;

if (scorejohn > scoreMike) {
    console.log('john wins the game with '+scorejohn+' points');
} else if(scoreMike >scorejohn){
    console.log('Mike wins the game with '+scorejohn+' points');   
}else{
    console.log('there is a drow');
}


// mine
function Person(name,height,age){
    this.name=name,
    this.height=height,
    this.age=age,     
    this.getSCore = function(){
        return this.height + (this.age * 5);
    }
}



const 
    person1 = new Person('ahmed',173,40),
    person2 = new Person('etch',173,27);
      
if (person1.getSCore() > person2.getSCore()) {
    console.log(`${person1.name} wins ${person2.name} the game with score ${person1.getSCore()}`);
}

