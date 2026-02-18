cols = document.querySelectorAll('.col')    //All columns on the baord.
dropElem = null;    //The element(X or O) that is currently being dragged.
winnerScreen = document.querySelector('.winner-screen');    //The winner screen.
playAgainBtn = document.querySelector('#play-again-btn'); 
console.log(cols);

board = [0,0,0,0,0,0,0,0,0,0];

//Making the all choices('X' and 'O') dynamically
function settingChoicesInTheBox(){
    for(let i = 0; i < 10; ++i){
        let div = document.createElement('div');
        div.classList.add('choice');
        if(i % 2 == 0){
            div.id = 'x';
            div.innerText = 'X'
        }else{
            div.id = 'o';
            div.innerText = 'O'
        }
        div.setAttribute('draggable', true);
        document.querySelector('.choices').appendChild(div);
    }
}
//Calling the function
settingChoicesInTheBox();

//Applying 'drag' event on each choice, so they are draggable.
function makingTheChoicesDraggable(){
    choices = document.querySelectorAll('.choice'); //All choices i.e, Os and Xs.
    console.log(choices);
    choices.forEach(choice => {
        choice.addEventListener('drag',()=>{
            //Setting the current element that is being dragging at the moment as the dropElem.
            dropElem = choice;
        });
    });
}
makingTheChoicesDraggable();

//Applying functinality to the play again button.
playAgainBtn.addEventListener('click',()=>{
    board = [0,0,0,0,0,0,0,0,0,0];
    winnerScreen.classList.remove('toggleWinnerScreen');
    console.log(cols);
    cols.forEach((col)=>{
        col.innerText = "";
    })
    document.querySelector('.choices').innerHTML = "";
    dropElem = null;
    settingChoicesInTheBox();
    makingTheChoicesDraggable();
});


//Applying events at columns of boards to handle the drag enter, leave and drop actions.
cols.forEach(col => {
    //When we enter while dragging an item(choice), adding the effect.
    col.addEventListener('dragenter', (e)=>{
        e.preventDefault;
        col.classList.add('colhover');
    });
    //When we leave remove the effect
    col.addEventListener('dragleave', (e)=>{
        e.preventDefault(e);
        col.classList.remove('colhover');
    });

    //Removing the default property of not letting anything drop on it.
    col.addEventListener('dragover', (e)=>{
        e.preventDefault();
    });

    //Handling when the choice is dropped.
    col.addEventListener('drop', (e)=>{
        col.appendChild(dropElem);
        //Getting weather the user dropped X or O.
        const droppedChoice = dropElem.innerText;
        //Getting the col the user dropped the choice and converting it into number.
        const droppedOnCol = parseInt(e.target.id, 10)
        console.log(droppedChoice);
        console.log(droppedOnCol);
        //Updating the array based on the input.
        board[droppedOnCol] = (droppedChoice == 'X')?1:2;
        console.log(board);
        col.classList.remove('colhover');
        checkWinner(droppedChoice);
    });
});


function checkWinner(currentChoice){
    console.log(currentChoice);
    if(board[1] != 0 && board[1] == board[2] && board[2] == board[3]){
        winner(currentChoice);
    }
    if(board[4] != 0 && board[4] == board[5] && board[5] == board[6]){
        winner(currentChoice);
    }
    if(board[7] != 0 && board[7] == board[8] && board[8] == board[9]){
        winner(currentChoice);
    }
    if(board[1] != 0 && board[4] == board[1] && board[4] == board[7]){
        winner(currentChoice);
    }
    if(board[2] != 0 && board[2] == board[5] && board[5] == board[8]){
        winner(currentChoice);
    }
    if(board[3] != 0 && board[3] == board[6] && board[6] == board[9]){
        winner(currentChoice);
    }
    if(board[1] != 0 && board[1] == board[5] && board[5] == board[9]){
        winner(currentChoice);
    }
    if(board[3] != 0 && board[3] == board[5] && board[5] == board[7]){
        winner(currentChoice);
    }
}

function winner(champ){
    console.log(champ);
    winnerScreen.classList.add('toggleWinnerScreen');
    document.querySelector('#winner-name').textContent = champ;
}
