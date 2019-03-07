// Storage Controller
const StoragCtrl=(()=>{
    // private members

    // public Members
    return{
        storeItem(item){
            // List item Array
            let items = [];
            //ckeck if there are any elements in the list
            if( localStorage.getItem('items') !== null) 
               // insert item from LS to the List Array
                items = JSON.parse(localStorage.getItem('items'));

            // add the item to the list
            items.push(item);
            // create local storage and insert items array elemnts on it
            localStorage.setItem('items',JSON.stringify(items));
        },
        getItemFromStorage(){
            let items = [];
            if(localStorage.getItem('items') !== null)
                 items = JSON.parse(localStorage.getItem('items'));
            // return list item list full or []
            return items;
        },
        updateItemStorage(updatedItem){
            let items = JSON.parse(localStorage.getItem('items'))

            items.forEach((item,index)=>{
                if (item.id === updatedItem.id) {
                    items.splice(index,1,updatedItem);
                }
            });
            localStorage.setItem('items',JSON.stringify(items));
        },
        deleteItemFromStorage(delItem){
            let items = JSON.parse(localStorage.getItem('items'))

            items.forEach((item,index)=>{
                if (item.id === delItem.id) {
                    items.splice(index,1);
                }
            });
            
            localStorage.setItem('items',JSON.stringify(items));
        },
        clearAllFromStorage(){
            localStorage.removeItem('items');
        },
    }
})();
// item controller
const ItemCtrl = (() =>{
    // private data
    const Item = function(id,name,calories){
        this.id =id;
        this.name = name;
        this.calories = calories;
    }
    // data Structure / State / entity / dataBase
    const data={
        items : StoragCtrl.getItemFromStorage(),
        currentItem : null,
        totalCalories : 0
    };
    // Public Methods
    return{
        addItem(input){
            // create id 
            let ID;
            const ItemsCount = data.items.length;
            if (ItemsCount > 0)
                ID = ItemsCount;  //ID =data.items[ItemsCount-1].id +1;
            else 
                ID = 0;
            
            // calories to number
            calories = Number(input.calories);
            // create new Item By The constructor
            newItem = new Item(ID,input.name,calories);
            // add new Item to the Items list
            data.items.push(newItem);
            return newItem;
        },
        getItems(){
            return data.items;
        },
        getItemById(id){
           // return data.items.filter(item=>item.id === id);
           //return data.items.forEach(item=>item.id === id);
           let found = null;
           data.items.forEach(function(item){
               if(item.id === id){
                found = item;
               }});
               return found;
        },
        updateItem(input){
            const currentItem = ItemCtrl.getCurrentItem();
            currentItem.calories = Number(input.calories);
            currentItem.name = input.name;
            return currentItem;
        },
        deleteItem(delItem){
            const ids = data.items.map(item=>item.id);
            let index = ids.indexOf(delItem.id);
            data.items.splice(index,1);
        },
        ClearAllItem(){
            data.items = [];
        },
        setCurrentItem(item){
            data.currentItem=item;
        },
        getCurrentItem(){
            return data.currentItem;
        },
        logData(){
            return data;
        },
        getTotalCalories(){
            data.totalCalories = data.items.reduce((sum,item)=>sum += item.calories,0);
            return data.totalCalories ;
        }
    }
})();
// UI Controller
const UICtrl = (()=> {
    // Define Ui Selectors
    const UISelectors = {
        itemList : '#item-list',
        listItems : '#item-list li',
        itemNameInput :'#item-name',
        itemCaloriesInput :'#item-calories',
        addItemBtn :'.add-btn',
        updateBtn :'.update-btn',
        deleteBtn :'.delete-btn',
        backBtn :'.back-btn',
        clearBtn : '.clear-btn',
        totalCalories :'.total-calories',
        editItem :'.edit-item',

    }
    // Define Ui Variables
    const 
        itemList = document.querySelector(UISelectors.itemList),
        listItems = document.querySelectorAll(UISelectors.listItems),
        itemName = document.querySelector(UISelectors.itemNameInput),
        itemCalories = document.querySelector(UISelectors.itemCaloriesInput),
        addBtn = document.querySelector(UISelectors.addItemBtn),
        updateBtn = document.querySelector(UISelectors.updateBtn),
        deleteBtn = document.querySelector(UISelectors.deleteBtn),
        backBtn = document.querySelector(UISelectors.backBtn),
        totalCaloriesSpan = document.querySelector(UISelectors.totalCalories),
        editItem = document.querySelector(UISelectors.editItem);
    // public methods
    return{
        populateItemsList(items){
            let html = '';
            items.forEach(item => {
                html += `
                    <li class="collection-item" id="item-${item.id}">
                        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                        <a href="#" class="secondary-content">
                        <i class="edit-item fa fa-pencil"></i>
                        </a>
                    </li>`;
            });
            // insert list items
            itemList.innerHTML = html;
        },
        // make UISelector Public
        getSelectors(){
            return UISelectors;
        },
        // get name & calories Values
        GetItemInput(){
            return {
                name:itemName.value,
                calories:itemCalories.value
            }
        },
        addListItem(newItem){
            // show list
            itemList.style.display = 'block';
            // craete li element
            const li = document.createElement('li');
            li.className = "collection-item"; // set class name
            li.id = `item-${newItem.id}`; // set id value
            li.innerHTML =  // set html
            `
                <strong>${newItem.name}: </strong> <em>${newItem.calories} Calories</em>
                <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil"></i>
                </a>
            `;
            // insert item to the ui list
            itemList.insertAdjacentElement('beforeend',li);
        },
        addItemToForm(){
            itemName.value = ItemCtrl.getCurrentItem().name;
            itemCalories.value = ItemCtrl.getCurrentItem().calories;
        },
        updateListItem(updatedItem){
            // turn listItems node list to an array
            const listItemsArray = Array.from(document.querySelectorAll(UISelectors.listItems));
            listItemsArray.forEach(listItem =>{
                let ItemID = listItem.getAttribute('id');
                if (ItemID === `item-${updatedItem.id}`) {
                    document.querySelector(`#${ItemID}`).innerHTML = `
                        <strong>${updatedItem.name}: </strong> <em>${updatedItem.calories} Calories</em>
                        <a href="#" class="secondary-content">
                        <i class="edit-item fa fa-pencil"></i>
                        </a>
                    `;
                }
            })
            
        },
        deleteListItem(item){
            document.querySelector(`#item-${item.id}`).remove();
        },
        showTotalCalories(total){
            totalCaloriesSpan.textContent = total;
        },
        ClearAllItemList(){
            //itemList.remove();
            const listItems = Array.from(document.querySelectorAll(UISelectors.listItems));
            listItems.forEach(item => item.remove());
        },
        // clear inputs
        clearInputs(){
            itemName.value = '';
            itemCalories.value = '';
        },
        // clear edit state
        clearEditState() {
            UICtrl.clearInputs();
            updateBtn.style.display = 'none';
            deleteBtn.style.display = 'none';
            backBtn.style.display = 'none';
            addBtn.style.display = 'inline';


        },
        showEditState() {
            updateBtn.style.display = 'inline';
            deleteBtn.style.display = 'inline';
            backBtn.style.display = 'inline';
            addBtn.style.display = 'none';
        },
        hideList(){
            itemList.style.display = 'none';
        },
    }
})();
// App Controller
const AppCtrl = ((UICtrl,ItemCtrl,StoragCtrl)=> {
    //Load event listeners
    const loadEventListeners=function(){
        //Get UI Selectos
        const UISelectors = UICtrl.getSelectors();
        // add item event
        document.querySelector(UISelectors.addItemBtn).addEventListener('click',itemAddSubmit)
        // disable submit on enter
        document.addEventListener('keypress',function(e){
            if (e.keyCode === 13 || e.which === 13) {
                e.preventDefault();
                return false;   
            }
        })
        // edit item event
        document.querySelector(UISelectors.itemList).addEventListener('click',itemEditClick)
        // update Item event updateBtn
        document.querySelector(UISelectors.updateBtn).addEventListener('click',itemUpdateSubmit)
        // BackBtn Clear list
        document.querySelector(UISelectors.deleteBtn).addEventListener('click',itemDeleteSubmit)
        // BackBtn Clear list
        document.querySelector(UISelectors.backBtn).addEventListener('click',UICtrl.clearEditState)
        //  Clear All list
        document.querySelector(UISelectors.clearBtn).addEventListener('click',clearAllItemsClick)
   
    }
    // events functions (Add item Submit)
    const itemAddSubmit = function(e){
        // get Form Input from UICtrl
        const input = UICtrl.GetItemInput();
        // validation for item name and calories
        if (input.name !== '' && input.calories !== '' ) {
            //add item
            const newItem = ItemCtrl.addItem(input);
            // add item to the UI
            UICtrl.addListItem(newItem);
            // add item to local storage
            StoragCtrl.storeItem(newItem);
            // Get Total Calories
            const totalCalories = ItemCtrl.getTotalCalories();
            // show total cal in the ui
            UICtrl.showTotalCalories(totalCalories);
            // clear inputs
            UICtrl.clearInputs();
        }
        e.preventDefault();
    }
    // click edit item 
    const itemEditClick = function(e){
        if(e.target.classList.contains('edit-item')){
            // get list item id [0|1|2|3] from item-1
            const listId = Number((e.target.parentNode.parentNode.id).split('-')[1]);
           // get item from items list 
            const itemToEdit = ItemCtrl.getItemById(listId);
            // set currnt item 
            ItemCtrl.setCurrentItem(itemToEdit);
            // add item to the form
            UICtrl.addItemToForm();
            // show 
            UICtrl.showEditState();
        };
        e.preventDefault();
    }
    // update data 
    const itemUpdateSubmit = function(e){
        // get Form Input from UICtrl
        const input = UICtrl.GetItemInput();
        // validation for item name and calories
        if (input.name !== '' && input.calories !== '' ) {
            //update item
            const updatedItem = ItemCtrl.updateItem(input);
            // update UI list item
            UICtrl.updateListItem(updatedItem);
            // update item in Storage
            StoragCtrl.updateItemStorage(updatedItem);
            // Get Total Calories
            const totalCalories = ItemCtrl.getTotalCalories();
            // show total cal in the ui
            UICtrl.showTotalCalories(totalCalories);
            // clear inputs
            UICtrl.clearEditState();
        }
        e.preventDefault();
    }
    const itemDeleteSubmit = function(e){
        const currentItem = ItemCtrl.getCurrentItem();
        // delete item from data structure
        ItemCtrl.deleteItem(currentItem);
        // remove item from UI list
        UICtrl.deleteListItem(currentItem);
        // delete itm from storage
        StoragCtrl.deleteItemFromStorage(currentItem);
        // Get Total Calories
        const totalCalories = ItemCtrl.getTotalCalories();
        // show total cal in the ui
        UICtrl.showTotalCalories(totalCalories);
        // clear inputs
        UICtrl.clearEditState();
        e.preventDefault();
    }
    const clearAllItemsClick = function(e){
        //alert("hi");
        // delete All list from data structure
        ItemCtrl.ClearAllItem();
        // delete All list from UI
        UICtrl.ClearAllItemList();
        // clear all from storage
        StoragCtrl.clearAllFromStorage();
        // hide list
        UICtrl.hideList();
        // Get Total Calories
        const totalCalories = ItemCtrl.getTotalCalories();
        // show total cal in the ui
        UICtrl.showTotalCalories(totalCalories);
        e.preventDefault();
    }
    // public methods
    return{
        init(){
            // clear edit state / set initial 
            UICtrl.clearEditState();

            // Get Items from data Structure
            const items = ItemCtrl.getItems();
            if (items.length === 0) {
                UICtrl.hideList();
            }else 
                UICtrl.populateItemsList(items);
        
            // Get Total Calories
            const totalCalories = ItemCtrl.getTotalCalories();
            // show total cal in the ui
            UICtrl.showTotalCalories(totalCalories);
            //Load event listeners
             loadEventListeners();
        }
    }
})(UICtrl,ItemCtrl,StoragCtrl);

AppCtrl.init();
