

(function (){

    function Question(question,answers,correctAnswer){
        this.question = question,
        this.answers = answers,
        this.correctAnswer = correctAnswer
    }
    Question.prototype = {
        DisplayQuestion(){
            console.log(this.question);        
            this.answers.forEach((ans,index) =>console.log(`${index} : ${ans}`));
        },
        checkAnswer(answer){
            if (answer === this.correctAnswer) {
                score ++;
                    console.log(`correct answer, your score is ${score}`);
                    console.log(`-----------------------------------------------`);
                 }else{
                     score --;
                     console.log(`wrong answer, your score is ${score}, try again`);
                    console.log(`-----------------------------------------------`);
                 }
        }
    }
    
    const 
    question1 = new Question('What is the most Important programing language',['C#','PHP','JS'],2),
    question2 = new Question('What is My Son Name',['Seif','Omar','Malek'],0),
    question3 = new Question('What is My city',['cairo','Alex','Mahalla'],2),
    question4 = new Question('What is My best Coloe',['black','red','blue'],1),
    question5 = new Question('What is the no of my experince',[1,2,3],1),
    question6 = new Question('What is the constructor course name',['jonas','brad'],0),
    Questions = [question1,question2,question3,question4,question5,question6];
    
    let score =0;
    function nextQuestion(){
        let Num = Math.floor(Math.random()* Questions.length);
    
        Questions[Num].DisplayQuestion();
        
        const answer = Number(prompt('please chose th correct answer'));
        
        if (answer !== -1) {
            Questions[Num].checkAnswer(answer);
            nextQuestion();            
        }
    }
    nextQuestion();
})();



