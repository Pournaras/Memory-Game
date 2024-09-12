//Store all cards
const cards = document.querySelectorAll(".memory-card");

//Click check variables
let hasFlippedCard = false;
let firstCard = null, secondCard = null;

//Lock board variables
let lockBoard = false;

//Win-restart conditions variables
let lives = 6;
let flippedCards = 0;


function flipCard() {
	
	if(lockBoard) return;
	if(this === firstCard) return;
	
	this.classList.add("flip");
	
	if(!hasFlippedCard) {
		
		//First click
		hasFlippedCard = true;
		firstCard = this;
		
		return;
	}
		
	//Second click
	hasFlippedCard = false;
	secondCard = this;
		
	checkForMatch();
}

//Card match
function checkForMatch() {
	
	let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
	
	isMatch? disableCards() : unflipCards();
	
}

function disableCards() {
	
	lockBoard = true;
	flippedCards+=2;
	
	if(flippedCards === 16) {
		
		firstCard.removeEventListener("click", flipCard);
		secondCard.removeEventListener("click", flipCard);
			
		winGame();
	}
	else{
		setTimeout(() => {
			firstCard.removeEventListener("click", flipCard);
			secondCard.removeEventListener("click", flipCard);
	
			resetBoard();
		
		}, 1000);
	}
}

function unflipCards() {
	
	lockBoard = true;
	lives--;
	
	if(lives > 0){
		
		setTimeout(() => {
			firstCard.classList.remove("flip");
			secondCard.classList.remove("flip");
		
			resetBoard();
		}, 1000);
	}
	else{
		lockBoard = true;
		
		setTimeout(restartGame, 1000);
	}
	
}

function resetBoard() {
	
	hasFlippedCard = false;
	lockBoard = false;
	firstCard = null;
	secondCard = null;
}

function shuffle() {
	
	cards.forEach(card => {
		
		let randomPosition = Math.floor(Math.random() * 16);
		card.style.order = randomPosition;
	});
}

function restartGame() {
	
	var x = document.getElementById("memoryGameSolutionButton");
	x.style.display = "none";
	
	cards.forEach(card => {
		
		if(card.classList.contains("flip")) {
			card.classList.remove("flip");
			card.addEventListener("click", flipCard);
		}
	});
	
	setTimeout(() => {
		
		shuffle();
		
		lives = 6;
		flippedCards = 0;
		//lockBoard = false;
	
		resetBoard();
		
	}, 1000);
	
		
}

function winGame() {
	
	lockBoard = true;
	
	var x = document.getElementById("memoryGameSolutionButton");
	x.style.display = "block";
}

shuffle();

//Make cards clickable
cards.forEach(card => card.addEventListener("click", flipCard));