// List of image file names (placeholder for now)
const imageFilenames = [
    'bird_image.png',
    'deer_image.png',
    'chameleon_image.png',
    'squirrel_image.png',
    'tiger_image.png',



  
];

// Duplicate the images
const imagePairs = imageFilenames.concat(imageFilenames);

// Shuffle the image pairs
function shuffleImages() {
    let shuffledImages = [];
    let tempPairs = imagePairs.slice(); // Copy the image pairs

    while (tempPairs.length > 0) {
        const randomIndex = Math.floor(Math.random() * tempPairs.length);
        const chosenImage = tempPairs.splice(randomIndex, 1)[0];
        shuffledImages.push(chosenImage);
    }

    return shuffledImages;
}

// Variables to hold the state of the game
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;

// Get the game board element
const gameBoard = document.getElementById('game-board');

// Function to create the cards in the DOM
function createBoard(shuffledImages) {
    for (let i = 0; i < shuffledImages.length; i++) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.index = i; // Set the index as a data attribute
        cardElement.addEventListener('click', flipCard);

        const imgElement = document.createElement('img');
        imgElement.src = shuffledImages[i];
        cardElement.appendChild(imgElement);

        gameBoard.appendChild(cardElement);
    }
}

// Function to flip a card
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

// Function to check if the flipped cards match
function checkMatch() {
    const firstImg = firstCard.querySelector('img').src;
    const secondImg = secondCard.querySelector('img').src;

    if (firstImg === secondImg) {
        matches++;
        // Remove event listeners so matched cards can't be flipped again
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        resetBoard();

        // Check if all matches are found
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

// Function to reset the board state
function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

// Initialize the game when the page loads
window.addEventListener('DOMContentLoaded', () => {
    // Shuffle the images
    const shuffledImages = shuffleImages();
    
    // Create the board with shuffled images
    createBoard(shuffledImages);
});

