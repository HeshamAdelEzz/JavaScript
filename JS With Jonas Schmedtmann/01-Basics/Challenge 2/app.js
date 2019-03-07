
var personsBirthYear = [1950,1900,2000,2006,2018,1964,1990,1956,1992];

function printAges(personsBirthYear){
    var personsAge = [];
    var IsMan = [];
    for (let index = 0; index < personsBirthYear.length; index++) {
        personsAge.push((2019-personsBirthYear[index]));    
    }
    
    for (let index = 0; index < personsAge.length; index++) {
        if (personsAge[index] >= 18) {
             console.log(`person${index} is ${personsAge[index]} years old`);        
             IsMan.push(true);
            }
        else{
            console.log(`person${index} is ${personsAge[index]} years old, not full of age`);        
            IsMan.push(false);            
        }
    }
    return IsMan;
}

console.log(printAges(personsBirthYear));