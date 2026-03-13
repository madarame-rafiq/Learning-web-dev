console.log("Hello");
let boards = JSON.parse(localStorage.getItem('boards')) || []; 

//[
//     {
//         name: "New board",
//         goals: [{
//             goalName: 'Learn javascript'
//         },{
//             goalName: 'Learn Linux'
//         }]
//     },
//     {
//         name: "Gaming",
//         goals: [{
//             goalName: 'Sekiro'
//         },{
//             goalName: 'Dark Souls 3'
//         }]
//     }
// ];

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
// [
//     {
//         taskName: 'Learn loops',
//         goalId: 'Learn javascript',
//         completed: true
//     },
//     {
//         taskName: 'Learn functions',
//         goalId: 'Learn javascript',
//         completed: false
//     },
//     {
//         taskName: 'Learn commands',
//         goalId: 'Learn Linux',
//         completed: true
//     },
//     {
//         taskName: 'Kill genichiro',
//         goalId: 'sekiro',
//         completed: true
//     },
//     {
//         taskName: 'Learn gwyin',
//         goalId: 'Dark Souls 3',
//         completed: false
//     },
//     {
//         taskName: 'DevOps project',
//         goalId: null,
//         completed: true
//     }
// ];


let currDraggedElem = null;
let currBoard = boards[0] || null;
console.log(currBoard);


//Function to load the select tag in Navbar.
function loadBoardSelection(){
    let optionsHtml = ""    //Stores html options.
    boards.forEach((board, index)=>{
        optionsHtml += `<option value='${board.name}' ${board.name === currBoard.name ? 'selected': ""}>${board.name}</option>`
    });
    //add the Options inside select tag.
    document.querySelector('#myBoards').innerHTML = optionsHtml;
}

//Function to load the Inbox bar.
function loadInbox(){
    let inboxTasks = tasks.filter( t => t.goalId === null);     //gets all the tasks with goalId as null.

    // //Restet the inbox so u dont append new tasks to it.
    // document.querySelector('.task-container').innerHTML = "";

    let inboxHtml = "";
    inboxTasks.forEach((task, index) => {
        inboxHtml += `
                <div class="task" draggable='true'>
                    <img src="./assets/${task.completed? 'checked.png': 'unchecked.png'}" alt="unchecked" class="checkbox" onclick="toggleCheck('${task.taskName}', 'null')">
                    <h5 class="taskText">${task.taskName}</h5>
                    <img src="./assets/trash.png" alt="delete" class="deleteTask" onclick="deleteTask('${task.taskName}', 'null')">
                </div>
                `
    });
    //add the inboxHtml to task-container in html.
    document.querySelector('.task-container').innerHTML = inboxHtml;
}

//Function to load board.
function loadBoard(){

    //Check if there are no boards.
    if(currBoard === null){
        document.querySelector('.goal-container').innerHTML = "<h4>There are no boards at this moment.</h4>";
        return;
    }


    //Setting the heading that is the board name on top.
    document.querySelector('#boardHeading').textContent = currBoard.name;

    //Empty the goalContainer first so when called again it wont append the same goals again and again.
    document.querySelector('.goal-container').innerHTML = "";


    //For each goal in board[i].goals create a goal.div.
    currBoard.goals.forEach((goal, index) => {
        let goalDiv = document.createElement('div');
        goalDiv.classList.add('goal');

        //Add the top heading that is the name of the goal and delete button to the goal.
        goalDiv.innerHTML = `
                    <div class="top">
                        <h3 id="goalHeading">${goal.goalName}</h3>
                        <button id="deleteGoalBtn" class="create-btn" onclick="deleteGoal(${index})">Delete Goal</button>
                    </div>
        `;

        //Get all the tasks with the same goalId as this goal.
        let goalTasks = tasks.filter(t => t.goalId === goal.goalName);
        
        //Run the loop for all the tasks in goalTasks and add the html into the goalDiv.
        goalTasks.forEach((task, i) => {
            goalDiv.innerHTML += `
                <div class="task" draggable='true'>
                    <img src="./assets/${task.completed? 'checked.png': 'unchecked.png'}" width="20" alt="unchecked" class="checkbox" onclick="toggleCheck('${task.taskName}', 'goal')">
                    <h5 class="taskText">${task.taskName}</h5>
                    <img src="./assets/trash.png" alt="delete" class="deleteTask" onclick="deleteTask('${task.taskName}', '${goal.goalName}')">
                </div>
            `
        });

        
        //Add the new goal created in goal container.
        document.querySelector('.goal-container').appendChild(goalDiv);
        
        
    });
    //Create new goal creation input board.
    document.querySelector('.goal-container').innerHTML += `
                <div class="create-goal">
                    <h4>create new goal</h4>
                    <div class="newgoal-container">
                        <input type="text" id="newGoalInput" placeholder="Enter goal">
                        <button class="create-btn" id="createGoal" onclick="createNewGoal()">+</button>
                    </div>
                </div>
    `;
    applyDragtoGoals();
}

loadInbox();
loadBoardSelection();
loadBoard();


//oprations.

//Delete task:-
function deleteTask(taskname, itsContainer){
    if(itsContainer === 'null')
        itsContainer = null;
    console.log(itsContainer);
   

    let delIndex = tasks.findIndex(t => t.taskName === taskname && t.goalId === itsContainer);
    
    //remove the delIndex from the array 'tasks'.
    tasks.splice(delIndex, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    console.log("Inside delete task  deleted:", taskname, "inside", itsContainer);
    if(itsContainer){
        loadBoard();
    }else
        loadInbox();
    ///// More to be done/.ws.w'
}


//Create tasks.
document.querySelector('#createTask').addEventListener('click', ()=>{
    let taskInput = document.querySelector('#newTaskInput').value;
    if (taskInput === ""){
        alert('Please enter the task!!');
        return;
    }
    //Push the new object in tasks array.
    tasks.push({
        taskName: taskInput,
        goalId: null,
        completed: false
    });
    //load the Inbox again.
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadInbox();
    document.querySelector('#newTaskInput').value = "";
});


//Toggle Check or unchecked
function toggleCheck(task, itsContainer){
    console.log(task);
    //Find the task
    let toggleIndex = tasks.findIndex(t => t.taskName === task);

    if(tasks[toggleIndex].completed === true)
        tasks[toggleIndex].completed = false;
    else
        tasks[toggleIndex].completed = true;

    localStorage.setItem('tasks', JSON.stringify(tasks));
    if(itsContainer === 'null')
        loadInbox();
    else    
        loadBoard();

}


//Function to change the board, When the some other board(option) is selected.
document.querySelector('#myBoards').addEventListener('change',()=>{
    let changedBoardName = document.querySelector('#myBoards').value;
    currBoard = boards.find(board => board.name === changedBoardName);
    loadBoard();
});


//Function to delete Goal.
function deleteGoal(index){
    //find the index of the current board through currBoard.
    let boardIndex = boards.findIndex(board => board.name === currBoard.name);
    //Now delete the tasks that were in this goal.
    let newTask = tasks.filter(task => task.goalId !== boards[boardIndex].goals[index].goalName);
    tasks = newTask;
    console.log(tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    //Now delete the goal itself.
    boards[boardIndex].goals.splice(index, 1);
    localStorage.setItem('boards', JSON.stringify(boards));
    console.log(boards);
    loadBoard();
}

//Function to create new Goal.
function createNewGoal(){
    let inputGoalName = document.querySelector('#newGoalInput').value;
    console.log(inputGoalName);
    if(inputGoalName === ""){
        alert("Please enter the name of the goal");
        return;
    }
    let indexOfCurrBoard = boards.findIndex(board => board.name === currBoard.name);
    boards[indexOfCurrBoard].goals.push({
        goalName: inputGoalName
    });

    localStorage.setItem('boards', JSON.stringify(boards));
    loadBoard();
}

//Function to delete board.
document.querySelector('#deleteBoardBtn').addEventListener('click', ()=>{
    let delBoardIndex = boards.findIndex(board => board.name === currBoard.name);

    //Delete the tasks that are in this board.
    let newTask = tasks;
    boards[delBoardIndex].goals.forEach((goal, i) => {
        console.log(goal);
        newTask = newTask.filter((task, tIndex) => task.goalId !== goal.goalName);
    });
    tasks = newTask;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    // let newTask = tasks.filter(task => task.goalId !== boards[boardIndex].goals[index].goalName);
    // tasks = newTask;
    // console.log(tasks);


    //Now delte the board.
    boards.splice(delBoardIndex, 1);
    if (boards.length === 0) {
        currBoard = null;
    } else {
        // Clamp index so deleting the first board falls back to the new first board
        const newIndex = Math.max(0, delBoardIndex - 1);
        currBoard = boards[newIndex];
    }

    localStorage.setItem('boards', JSON.stringify(boards));
    loadBoardSelection();
    loadBoard();
});











//function for new board on and off.
function newBoardOff(){
    document.querySelector('.newboardContainer').style.display = 'none';
}
function newBoardOn(){
    document.querySelector('.newboardContainer').style.display = 'flex';
}
function createBoard(){
    let inputBoardName = document.querySelector('#newBoardInput').value;
    if(inputBoardName === ""){
        alert("Please enter the name of the board.");
        return;
    }
    boards.push({
        name: inputBoardName,
        goals:[]
    });
    localStorage.setItem('boards', JSON.stringify(boards));
    currBoard = boards[boards.length-1]
    newBoardOff();
    loadBoardSelection();
    loadBoard();

}




//Code to implement drag and drop functionality.

//Applying drag event to tasks in inbox     -> One time only, Using event delegation
document.querySelector('.task-container').addEventListener('drag', (e)=>{
    if(e.target.matches('.task')){
        currDraggedElem = e.target;
        // console.log(currDraggedElem);
    }
});


//Function to apply drag event on goals using event delegation      -> whenever board is loaded it is applued to every goal.
function applyDragtoGoals(){
    let goals = document.querySelectorAll('.goal');
    goals.forEach(goal => {
        goal.addEventListener('drag', (e)=>{
            if(e.target.matches('.task')){
                currDraggedElem = e.target;
            }
        });
        applydrop(goal);
    });
} 


//Functon to apply drop event on tasks and goals.

function applydrop(elem){
    console.log(elem);
    elem.addEventListener('dragenter', () => {
        elem.classList.add('hover');
    });
    
    elem.addEventListener('dragleave', () => {
        elem.classList.remove('hover');
    });
    
    elem.addEventListener('dragover', (e) => {
        e.preventDefault();
    });
    
    elem.addEventListener('drop', (e)=>{
        console.log(currDraggedElem.textContent);
        elem.classList.remove('hover');
        let indexOfDroppedTask = tasks.findIndex(task => task.taskName === currDraggedElem.querySelector('.taskText').textContent);
        console.log(indexOfDroppedTask);

        //change the value of goalId.
        if(elem.classList.contains('goal')){
            let goalName = elem.querySelector('#goalHeading').textContent;
            tasks[indexOfDroppedTask].goalId = goalName;
        }else{
            tasks[indexOfDroppedTask].goalId = null;
        }

        localStorage.setItem('tasks', JSON.stringify(tasks));

        loadInbox();
        loadBoard();
    });
}

applydrop(document.querySelector('.task-container'));