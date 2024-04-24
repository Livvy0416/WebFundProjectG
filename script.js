//this is a list of the images that we want to use for the game-matching
const imageFilenames = [
    'bird_image.png',
    'deer_image.png',
    'chameleon_image.png',
    'squirrel_image.png',
    'tiger_image.png',



  
];

//this doubles the images so that there is gonna be a matching pair
const imagePairs = imageFilenames.concat(imageFilenames);

//this shuffles that images so that it isn't like the same every time
function shuffleImages() {
    let shuffledImages = [];
    let tempPairs = imagePairs.slice(); //this copies the image pairs

    while (tempPairs.length > 0) {
        const randomIndex = Math.floor(Math.random() * tempPairs.length);
        const chosenImage = tempPairs.splice(randomIndex, 1)[0];
        shuffledImages.push(chosenImage);
    }

    return shuffledImages;
}

//this does the actual state of the game so it starts with no matches 
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;

// we need the element of the game 'game-board'
const gameBoard = document.getElementById('game-board');

// this creates the cards like the board for them
function createBoard(shuffledImages) {
    for (let i = 0; i < shuffledImages.length; i++) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.index = i; // this index is a data attribute
        cardElement.addEventListener('click', flipCard);

        const imgElement = document.createElement('img');
        imgElement.src = shuffledImages[i];
        cardElement.appendChild(imgElement);

        gameBoard.appendChild(cardElement);
    }
}

//this function flips the cards when clicked on
function flipCard(event) {
    if (lockBoard) return;

    const clickedCard = event.currentTarget;

    // If the card is already flipped, return
    if (clickedCard.classList.contains('flipped')) {
        return;
    }

    clickedCard.classList.add('flipped');

    if (!firstCard) {
        firstCard = clickedCard;
    } else {
        secondCard = clickedCard;
        checkMatch();
    }
}
//this sees if the cards match, if they do then they stay
function checkMatch() {
    const firstImg = firstCard.querySelector('img').src;
    const secondImg = secondCard.querySelector('img').src;

    if (firstImg === secondImg) {
        matches++;
        // this removes them from the event so they cant be clicked on again
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        resetBoard();

        // see if everything has been matched, if it did it tells the player- 'You won the game!'
        if (matches === imageFilenames.length) {
            alert('You won the game!');
        }
    } else {
        lockBoard = true;

        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1000);
    }
}

//this resets the board
function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

//we need to initalize the page before
window.addEventListener('DOMContentLoaded', () => {
    // Shuffle the images
    const shuffledImages = shuffleImages();
    
    //creates our board of shuffled images
    createBoard(shuffledImages);
});

