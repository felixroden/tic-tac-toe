const playerOne = "X";
const playerTwo = "O";

const moves = new Map([
    [playerOne, []],
    [playerTwo, []]
]);

const winPatterns = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 5, 9],
    [3, 5, 7],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9]
];

let turn = 0;
let currentPlayer = playerOne;
let winner = null;
let gameOver = false;

const winnerLabel = document.getElementById("winner");
const resetButton = document.getElementById("resetButton");
const playerTurnLabel = document.getElementById("playerTurn");
const squares = document.querySelectorAll(".square");

squares.forEach(square => {
    square.addEventListener("click", () => {
        if (square.textContent !== "" || gameOver) return;

        square.textContent = currentPlayer;
        const currentMoves = moves.get(currentPlayer);
        currentMoves.push(Number(square.id));

        const winningPattern = winPatterns.find(pattern => compareValues(pattern, currentMoves));
        if (winningPattern) {
            winner = currentPlayer;
            winnerLabel.textContent = `Player ${currentPlayer} won!`;
            gameOver = true;

            winningPattern.forEach(id => {
                const winningSquare = document.getElementById(id.toString());
                winningSquare.classList.add("win");
            });

            return;
        }


        turn++;

        if (turn === 9) {
            winnerLabel.textContent = "Draw";
            gameOver = true;
            return;
        }

        nextPlayer();
    });
});

resetButton.addEventListener("click", () => {
    squares.forEach(square => {
        square.textContent = "";
        square.classList.remove("win");
    });

    moves.set(playerOne, []);
    moves.set(playerTwo, []);
    turn = 0;
    currentPlayer = playerOne;
    winner = null;
    gameOver = false;
    winnerLabel.innerText = "";
    playerTurnLabel.textContent = currentPlayer;
});

function nextPlayer() {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    playerTurnLabel.textContent = currentPlayer;
}

function compareValues(winPattern, playerMoves) {
    return winPattern.every(value => playerMoves.includes(value));
}
