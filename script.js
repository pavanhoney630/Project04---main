let buttoncontrol = document.getElementById('btn');
let rulepage = document.getElementById('Rulepage');
let closebutton = document.getElementById('cross');

buttoncontrol.addEventListener('click', function() {
    rulepage.style.display = 'block';
    closebutton.style.display = 'block';
});

closebutton.addEventListener('click', function() {
    rulepage.style.display = 'none';
    closebutton.style.display = 'none';
});

document.querySelector('.container').style.display = 'block';
document.querySelector('.container2').style.display = 'none';
document.querySelector('.container3').style.display = 'none';

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'It\'s a tie!';
    }
    if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'You win!';
    }
    return 'Computer wins!';
}

function playGame(playerChoice) {
    const computerChoice = getComputerChoice();
    const result = determineWinner(playerChoice, computerChoice);

    // Retrieve scores from localStorage
    let computerScore = parseInt(localStorage.getItem('computerScore')) || 0;
    let playerScore = parseInt(localStorage.getItem('playerScore')) || 0;

    // Update scores based on the result
    if (result === 'You win!') {
        playerScore++;
    } else if (result === 'Computer wins!') {
        computerScore++;
    }

    // Save updated scores to localStorage
    localStorage.setItem('computerScore', computerScore);
    localStorage.setItem('playerScore', playerScore);

    // Update the UI
    document.getElementById('player1').textContent = playerScore;
    document.getElementById('player2').textContent = computerScore;
    document.getElementById('zero1-2').textContent = computerScore;
    document.getElementById('zero2-2').textContent = playerScore;

    // Remove previous winner class
    document.querySelectorAll('.user-selection').forEach(input => input.classList.remove('winner'));

    if (result === 'You win!') {
        document.querySelector('.player-choice').classList.add('winner');
        document.getElementById('win-msg1').textContent = 'YOU WIN';
        document.getElementById('win-msg2').textContent = 'AGAINST PC';
    } else if (result === 'Computer wins!') {
        document.querySelector('.computer-choice').classList.add('winner');
        document.getElementById('win-msg1').textContent = 'YOU LOST';
        document.getElementById('win-msg2').textContent = 'AGAINST PC';
    } else {
        document.getElementById('win-msg1').textContent = 'IT\'S A TIE';
        document.getElementById('win-msg2').textContent = 'Press Play Again';
    }
    
    document.querySelector('.text1 + h1').textContent = computerScore;
    document.querySelector('.text2 + h1').textContent = playerScore;
    

    // Show second container and hide first container
    document.querySelector('.container').style.display = 'none';
    document.querySelector('.container2').style.display = 'block';

    // Reflect selected images in the second container
    document.querySelector('.player-choice').style.backgroundImage = `url(./${playerChoice}.png)`;
    document.querySelector('.computer-choice').style.backgroundImage = `url(./${computerChoice}.png)`;
}

// Initialize scores on page load
document.addEventListener('DOMContentLoaded', () => {
    const playerScore = parseInt(localStorage.getItem('playerScore')) || 0;
    const computerScore = parseInt(localStorage.getItem('computerScore')) || 0;
    document.getElementById('player1').textContent = computerScore;
    document.getElementById('player2').textContent = playerScore;
    document.getElementById('zero1-2').textContent = computerScore;
    document.getElementById('zero2-2').textContent = playerScore;
});


document.getElementById('btn').addEventListener('click', () => {
    document.getElementById('Rulepage').classList.toggle('hidden');
});

document.getElementById('cross').addEventListener('click', () => {
    document.getElementById('Rulepage').classList.add('hidden');
});

document.getElementById('playagain').addEventListener('click', () => {
    // Reset scores in the second container
    document.querySelector('.player-choice').value = '';
    document.querySelector('.computer-choice').value = '';
    document.querySelector('.player-choice').classList.remove('winner');
    document.querySelector('.computer-choice').classList.remove('winner');

    // Show first container and hide second container
    document.querySelector('.container').style.display = 'block';
    document.querySelector('.container2').style.display = 'none';
});

document.getElementById('next').addEventListener('click', () => {
    const result = document.getElementById('win-msg1').textContent;

    // Show third container and hide second container
    document.querySelector('.container2').style.display = 'none';
    document.querySelector('.container3').style.display = 'block';

    if (result === 'YOU WIN') {
        // Add animation to the victory cup and stars
        document.getElementById('cup-image').classList.add('animate-cup');
        document.getElementById('star-image').classList.add('animate-stars');
        document.getElementById('win-emotion').textContent = 'HURRAY!!';
        document.getElementById('victory-msg').textContent = 'YOU WON THE GAME';
    } else if (result === 'YOU LOST') {
        // Add animation for losing
        document.getElementById('cup-image').classList.add('fall-cup');
        document.getElementById('star-image').classList.remove('animate-stars');
        document.getElementById('win-emotion').textContent = 'OH NO!!';
        document.getElementById('victory-msg').textContent = 'YOU LOST, TRY AGAIN';
    } else {
        // Handle tie case
        document.getElementById('cup-image').classList.remove('animate-cup', 'fall-cup');
        document.getElementById('star-image').classList.remove('animate-stars');
        document.getElementById('win-emotion').textContent = 'IT\'S A TIE';
        document.getElementById('victory-msg').textContent = 'TRY AGAIN';
    }
});

document.getElementById('playagain2').addEventListener('click', () => {
    // Reset everything and show first container
    document.querySelector('.container').style.display = 'block';
    document.querySelector('.container2').style.display = 'none';
    document.querySelector('.container3').style.display = 'none';
    document.querySelector('.text2 + h1').textContent = '0';
    document.querySelector('.text1 + h1').textContent = '0';
    document.querySelector('.player-choice').value = '';
    document.querySelector('.computer-choice').value = '';
    document.querySelector('.player-choice').classList.remove('winner');
    document.querySelector('.computer-choice').classList.remove('winner');
    document.getElementById('cup-image').classList.remove('animate-cup', 'fall-cup');
    document.getElementById('star-image').classList.remove('animate-stars');
});
