/** بسم الله الرحمن الرحيم
 * @name Budgty
 * @version 1.0.0
 * @author Jonas schem 
 * @license ETCH 
*/

// initialize data controller
const DataCtrl = (function(){
    const Expense = function (id,description,value){
        this.id=id;
        this.description=description;
        this.value=value;
        this.percentage = -1;
    };
    Expense.prototype = {
        calcPercentages(totalIncome){
            this.percentage =totalIncome >0 ? Math.round((this.value/totalIncome)*100):-1;
        },
        getPercentages(){
            return this.percentage;
        }
    }
    const Income = function (id,description,value){
        this.id=id;
        this.description=description;
        this.value=value;
    };
    const calculateTotal = function(type){
        let sum = 0;
        data.allItmes[type].forEach(item => sum += item.value);
        data.totals[type]=sum;
    };
    let data = {
        allItmes:{
            exp :[],
            inc :[]
        },
        totals :{
            exp :0,
            inc :0
        },
        budget : 0,
        percentage:-1
    };
return{
    addItem(item){
        let 
            newItem, 
            // create new ID
            ID = data.allItmes[item.type].length > 0 ? data.allItmes[item.type].length : 0;
        
        // create new item based on 'inc' or 'exp'
        if(item.type ==='inc'){
            newItem = new Income(ID,item.description,item.value);
        }else if(item.type ==='exp'){
            newItem = new Expense(ID,item.description,item.value);
        }

        // push the new item to the data structure
        data.allItmes[item.type].push(newItem);
        // return it
        return newItem;
    },
    CalculateBudget(){
        // claculate total income and expenses
        calculateTotal("inc");
        calculateTotal("exp");
        
        // calculate budget [income - expenses]
        data.budget = data.totals.inc - data.totals.exp;

        // calculate expenses percntage
        data.percentage = data.totals.inc > 0 ? Math.round((data.totals.exp/data.totals.inc)*100) : -1;
    },
    getBudget(){
        return{
            budget : data.budget,
            totalIns : data.totals.inc,
            totalExp : data.totals.exp,
            percentage : data.percentage,
        }
    },
    deleteItem(type,id){
        let 
            ids = data.allItmes[type].map(item => item.id),
            itemIndex =ids.indexOf(id);// data.allItmes[type].indexOf(id);
        
        if (itemIndex !== -1) {
            data.allItmes[type].splice(itemIndex,1);
        } 
    },
    updatePercentages(){
        data.allItmes.exp.forEach(item => item.calcPercentages(data.totals.inc));
    },
    getPercentages(){
       return data.allItmes.exp.map(item => item.getPercentages());
    },
    test(){
        console.log(data);
    }
}

})();

// initialize UI controller
const UICtrl = (function(){
    const 
        DOMStrings = {
            inputType : '.add__type',
            inputDescription : '.add__description',
            inputValue : '.add__value',
            incomelist : '.income__list',
            expenseslist : '.expenses__list',
            inputBTN : '.add__btn',
            totalBudget:'.budget__value',
            budgetExpensesValue:'.budget__expenses--value',
            budgetIncomeValue:'.budget__income--value',
            percentage:'.budget__expenses--percentage',
            deleteBtn : '.item__delete--btn',
            container : '.container',
            expenPercLabel :'.item__percentage',
            monthSpan :'.budget__title--month'
        }, 
        incomList = document.querySelector(DOMStrings.incomelist),
        expenseslist = document.querySelector(DOMStrings.expenseslist),
        budget = document.querySelector(DOMStrings.totalBudget),
        budgetIncomeValue = document.querySelector(DOMStrings.budgetIncomeValue),
        budgetExpensesValue = document.querySelector(DOMStrings.budgetExpensesValue);
        percentage = document.querySelector(DOMStrings.percentage);
    
    const formateNumber = function(num){
        num = (Math.abs(num)).toFixed(2);
        let 
            numSplite = num.split('.'),
            dec,
            int = numSplite[0];

        if (int.length > 3) {
            int = int.substr(0,int.length-3) + ',' + int.substr(int.length-3,int.length);
        }
        dec = numSplite[1];            

        return int +'.' +dec;
    };

    return {
        getInputsValue(){
            let 
                type = document.querySelector(DOMStrings.inputType).value,
                description = document.querySelector(DOMStrings.inputDescription).value,
                value = parseFloat(document.querySelector(DOMStrings.inputValue).value);
                if (description !== ''&& !isNaN(value) && value > 0) {
                    return {
                        type,
                        description,
                        value
                    };
                } else {
                    alert("please enter all data");
                }
        },
        getDOMStrings(){
            return DOMStrings;
        },
        addItem(newItem,type){
            if (type === "inc") {
                incomList.innerHTML += `
                    <div class="item clearfix" id="inc-${newItem.id}">
                        <div class="item__description">${newItem.description}</div>
                        <div class="right clearfix">
                            <div class="item__value">+ ${formateNumber(newItem.value)}</div>
                            <div class="item__delete">
                                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                            </div>
                        </div>
                    </div>
            `;
            } else {
                expenseslist.innerHTML += `
                    <div class="item clearfix" id="exp-${newItem.id}">
                        <div class="item__description">${newItem.description}</div>
                        <div class="right clearfix">
                            <div class="item__value">- ${formateNumber(newItem.value)}</div>
                            <div class="item__percentage"></div>
                            <div class="item__delete">
                                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                            </div>
                        </div>
                    </div>
                `;
                
            }
            
        },
        clearinputs(){
            document.querySelector(DOMStrings.inputType).value = "inc",
            document.querySelector(DOMStrings.inputDescription).value = "",
            document.querySelector(DOMStrings.inputValue).value = "";
        },
        displayBudget(budgetObj){

            budget.textContent =`+ ${formateNumber(budgetObj.budget)}`;
            budgetIncomeValue.textContent =`+ ${formateNumber(budgetObj.totalIns)}`;
            budgetExpensesValue.textContent =`- ${formateNumber(budgetObj.totalExp)}`;
            percentage.textContent = budgetObj.percentage>0 ?`${budgetObj.percentage} %`:`---`;

        },
        deleteListItem(itemId){
            document.getElementById(`${itemId}`).remove();
        },
        displayPercentages(percentages){
            let expPercLabels = document.querySelectorAll(DOMStrings.expenPercLabel);
            expPercLabels.forEach((item,index)=>item.textContent = `${percentages[index]} %` );
        },
        displayMonth(){
            let 
                date = new Date(),
                year = date.getFullYear(),
                months = ['Jan','Feb','March','April','May','June','July','August','Sept','Oct','Nove','Dec'],
                month = date.getMonth();

            document.querySelector(DOMStrings.monthSpan).textContent =months[month] +' '+ year;
        },
        changeType(){
            let fields = document.querySelectorAll(
                DOMStrings.inputType +','+
                DOMStrings.inputDescription +','+
                DOMStrings.inputValue
            );
            fields.forEach(item => item.classList.toggle('red-focus'));
            document.querySelector(DOMStrings.inputBTN).classList.toggle('red');
        }
    }
})();

// initialize Global App controller
const AppCtrl = (function(UICtrl,DataCtrl){

    // load all event listeners 
    function loadEventListeners(){

        // get dom class names
        const DOM = UICtrl.getDOMStrings();
        //create event listener on add btn 'true icon'
        document.querySelector(DOM.inputBTN).addEventListener('click',ctrlAddItem),
        // event listener for enter btn
        document.addEventListener('keypress',function(e){
            if (e.keyCode === 13 || e.which === 13) {
                ctrlAddItem();
            }
        });
        // event for deleting item
        document.querySelector(DOM.container).addEventListener('click',deleteItem);
        // enent for change type ddl
        document.querySelector(DOM.inputType).addEventListener('change',UICtrl.changeType);

    }

    const updateBudget = function(){
        //1-calculate budget
        DataCtrl.CalculateBudget();
        //2- return the budget
        let budget = DataCtrl.getBudget();
        //3-display the budget on the UI
        UICtrl.displayBudget(budget);
    }
    const updatePercentage = function(){
        //1-calculate percentage    
        DataCtrl.updatePercentages();
        //2- read percentages from data controller
        let percentages = DataCtrl.getPercentages();
        //3- update the ui with the new budget 
        UICtrl.displayPercentages(percentages);
    }
    const ctrlAddItem = function(){
        //1-get inputs data
          let inputs = UICtrl.getInputsValue();
          if (inputs) {
            //2-add item to budget controller
            let newItem = DataCtrl.addItem(inputs);
             //3-add the item to the UI
            UICtrl.addItem(newItem,inputs.type);
            //4-clear inputs 
            UICtrl.clearinputs();
            //5- calculate and update badget
            updateBudget();   
            //6- calculate and update percentage
            updatePercentage();
          }
    }
    const deleteItem = function(e) {
            if (e.target.classList.contains('ion-ios-close-outline')) {
                let 
                    itemId = e.target.parentNode.parentNode.parentNode.parentNode.id,
                    type = itemId.split('-')[0],
                    id = Number(itemId.split('-')[1]);           
                    
                //1- delete the item from data structure
                DataCtrl.deleteItem(type,id);
                //2-deletethe item from UI
                UICtrl.deleteListItem(itemId);
                //3- update and show the new budget
                updateBudget();   
                //4- calculate and update percentage
                updatePercentage();
            }
            e.preventDefault();
        };


    return {
        // declaration for initialization function
        init() {
            // display month
            UICtrl.displayMonth();
            loadEventListeners();
        }
    };
})(UICtrl,DataCtrl);


AppCtrl.init();