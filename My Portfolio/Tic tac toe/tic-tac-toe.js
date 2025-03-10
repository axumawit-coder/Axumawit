let playBtn = document.getElementById('play');
let exitBtn = document.getElementById('exit');
let resetBtn = document.getElementById('reset');

let board = [
    document.getElementById('cell1'),
    document.getElementById('cell2'),
    document.getElementById('cell3'),
    document.getElementById('cell4'),
    document.getElementById('cell5'),
    document.getElementById('cell6'),
    document.getElementById('cell7'),
    document.getElementById('cell8'),
    document.getElementById('cell9')
];

let currentPlayer = "X";
let running = false;
let gameOver = false;

// Add event listeners to each cell
board.forEach(cell => {
    cell.addEventListener('click', handleMove);
});

playBtn.addEventListener('click', function() {
    playBtn.disabled = true;  // Disable the play button after the game starts
    running = true;  // Game starts
    gameOver = false;  // Reset the game over state
    currentPlayer = "X";  // Start with player X
    console.log("Game started. It's X's turn.");
    // Enable board cells for the game
    board.forEach(cell => {
        cell.classList.remove("taken");  // Remove "taken" class for fresh start
        cell.textContent = "";  // Clear text
    });
    document.getElementById('status').textContent = "Player " + currentPlayer + "'s turn."; 
    document.getElementById('tie').textContent = " "; 
});

resetBtn.addEventListener('click', function() {
    // Reset board and game state
    board.forEach(cell => {
        cell.textContent = "";  // Clear text content of each cell
        cell.classList.remove("taken");  // Remove taken class
    });
    playBtn.disabled = false;  // Enable play button again for a new game
    running = false;  // Reset the running state
    gameOver = false;  // Reset the game over state
    currentPlayer = "X";  // Start with player X
    console.log("Game reset. It's X's turn.");
    // Update the status
    document.getElementById('status').textContent = " ";  
    document.getElementById('tie').textContent = " ";
    document.getElementById('win').textContent = " ";
});
exitBtn.addEventListener('click', function() {
    window.location.href = "tic-tac-toe-cover.html"; // Change to your desired page URL
});


// Handling moves
function handleMove(event) {
    const index = board.indexOf(event.target);
    if (!board[index].textContent && !gameOver && running) {
        board[index].textContent = currentPlayer;
        board[index].classList.add("taken");  // Mark as taken
        checkForWin(); 

        if (!gameOver) {
            // Switch player
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            console.log(`It's ${currentPlayer}'s turn.`);
            // Update the status
            document.getElementById('status').textContent = "Player " + currentPlayer + "'s turn.";
        }
    }
}

// Checking win condition
function checkForWin() {
    // Check rows for win
    for (let i = 0; i < 3; i++) {
        if (board[i * 3].textContent === board[i * 3 + 1].textContent && board[i * 3 + 1].textContent === board[i * 3 + 2].textContent && board[i * 3].textContent !== "") {
            document.getElementById('status').textContent = " ";  
            document.getElementById('win').textContent = board[i * 3].textContent + " wins!";
            gameOver = true;
            return;
        }
    }

    // Check columns for win
    for (let i = 0; i < 3; i++) {
        if (board[i].textContent === board[i + 3].textContent && board[i + 3].textContent === board[i + 6].textContent && board[i].textContent !== "") {
            document.getElementById('status').textContent = " ";  
            document.getElementById('win').textContent = board[i].textContent + " wins!";
            gameOver = true;
            return;
        }
    }

    // Check diagonals for win
    if (board[0].textContent === board[4].textContent && board[4].textContent === board[8].textContent && board[0].textContent !== "") {
        document.getElementById('status').textContent = " ";  
        document.getElementById('win').textContent = board[0].textContent + " wins!";
        gameOver = true;
        return;
    }
    if (board[2].textContent === board[4].textContent && board[4].textContent === board[6].textContent && board[2].textContent !== "") {
        document.getElementById('status').textContent = " ";  
        document.getElementById('win').textContent = board[2].textContent + " wins!";
        gameOver = true;
        return;
    }

    // Check if tie
    if (board.every(cell => cell.textContent !== "")) {
        document.getElementById('status').textContent = " ";  
        document.getElementById('tie').textContent = "It's a tie!";
        gameOver = true;
        return;
    }
}
