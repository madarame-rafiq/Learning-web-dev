
// function to dynamically making the board.
function generateBoard(){
    let cardsId = 1;
    let board = document.querySelector('.game-board');
    for(let i = 0; i < 5; ++i){
        let row = document.createElement('div');
        row.classList.add('row');
        for(let i = 0; i < 4; ++i){
            let card = document.createElement('div');
            card.id = cardsId++;
            card.classList.add('card');
            row.appendChild(card);
        }
        board.appendChild(row);
    }
    console.log(board);
}

generateBoard();


// To generate imaged array. to know what image if where randomly
const images = Array.from({ length: 10 }, (_, i) => i + 1);

// Shuffle using Fisher-Yates algorithm
for (let i = images.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [images[i], images[j]] = [images[j], images[i]];
}
console.log(images)



// getting all the cards in the board in an array
let cards = document.querySelectorAll('.card');
console.log(cards);

// Applying event listener on all the cards 
cards.forEach(card => {
    card.addEventListener('click', () => {
        let img = document.createElement('img');
        card.style.transform = `rotateY(90deg)`;
        setTimeout(()=>{
            img.src = `./assets/img${(card.id == 20 || card.id == 10)?10:card.id%10}.png`;
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