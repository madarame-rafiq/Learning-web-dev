
// function to dynamically making the board.
function generateBoard(){
    let cardsId = 1;
    let board = document.querySelector('.game-board');
    let top = 10;
    for(let i = 0; i < 5; ++i){
        let left = 10;
        for(let i = 0; i < 4; ++i){
            let card = document.createElement('div');
            card.id = cardsId++;
            card.classList.add('card');
            card.style.left = `${left}px`;
            card.style.top = `${top}px`;
            board.appendChild(card);
            left += 173;
        }
        top += 135;
    }
    console.log(board);
}

generateBoard();


// To generate imaged array. to know what image if where randomly
// Create array with numbers 1–10 appearing twice
const images = [...Array(10).keys()].map(n => n + 1)  // [1..10]
  .concat([...Array(10).keys()].map(n => n + 1));  // duplicate

// Shuffle using Fisher–Yates algorithm
for (let i = images.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [images[i], images[j]] = [images[j], images[i]];
}

console.log(images);



// getting all the cards in the board in an array
let cards = document.querySelectorAll('.card');
console.log(cards);

// Applying event listener on all the cards 
cards.forEach(card => {
    card.addEventListener('click', (e) => {
        console.log(e);
        let img = document.createElement('img');
        card.style.transform = `rotateY(90deg)`;
        setTimeout(()=>{
            img.src = `./assets/img${(card.id == 20 || card.id == 10)?images[10]:images[card.id%10]}.png`;
            img.width = 90;
            card.appendChild(img);
            card.style.transform = `rotateY(180deg)`;
        },600);
        
        setTimeout(()=>{
            card.style.transform = `rotateY(90deg)`;
            setTimeout(()=>{
                card.removeChild(img);
                card.style.transform = `rotateY(0deg)`;
            },600);

        },1500);
    });
});





// using Oops to create players i.e, red and blue
class Player {
    constructor(color){
        this.color = color;
        this.backgroundColor = color;
        this.score = 0;
    }
    changeBackgroundColor(){
        document.querySelector('.main').style.backgroundColor = `var(--${this.backgroundColor}-bg)`;
    }
}

let blue = new Player('blue');
let red = new Player('red');
