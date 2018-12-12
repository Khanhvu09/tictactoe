// ============ GLOBALS ============
// init game as player 1's turn 
let whosTurn = 1;
// Make an array for both players, and push each new square
// onto the appropriate array
let player1Squares = [];
let player2Squares = [];

// Array of all winning combos
const winningCombos = [
    ['A1','B1', 'C1'],
    ['A2','B2', 'C2'],
    ['A3','B3', 'C3'],
    ['A1','A2', 'A3'],
    ['B1','B2', 'B3'],
    ['C1','C2', 'C3'],
    ['A1','B2', 'C3'],
    ['A3','B2', 'C1'],
]
let board = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3']
let gameOn = true;
let player1Score = 0
let player2Score = 0


// 1. Set up board --- Check
// 2. User should be able to click on a button --- Check
// that players mark (X or O) 
// 3. If it's X's turn put an X in, otherwise, put an O in
// 4. In order to accomplish 3, we need to keep track of who's turn it is
// After X goes, it becomes O's turn, and vice versa
// 5. Keep other player from taking a square
// 6. See if someone won, if so congratulate them
// 7. Stop the game if someone won, otherwise let it keep going

// squares is an array with 9 object in it
// Each element is an HTML button element
const squares = document.getElementsByClassName('square');
// const squares = document.getElementsByTagName('button');
// console.log(squares)

for (let i = 0; i < squares.length; i++){
    // console.log(squares[i])
    // now that we have all the squares individually (squares[i])
    // we can add an event listener to each one
    // to add eventListener:
    // 1. What to listen to
    // 2. add the method (addEventListener)
    // 3. first arg: what event to listen for
    // 4. second arg: function to run if that even happens
    squares[i].addEventListener('click',function(event){
        // EVERY JS event, will give you the event object
        console.log(this)
        // Check to see if the square is taken
        if (gameOn){
            if(this.innerHTML === "-"){
                // it's not taken, so see whos turn it is
                if(whosTurn === 1){
                    this.innerHTML = "X"
                    // Update the DOM
                    document.getElementById('message').innerHTML = "It's O's turn"
                    player1Squares.push(this.id)
                    index = board.indexOf(this.id)
                    board.splice(index, 1)
                    console.log(board)
                    whosTurn = 2; // update JS
                    checkWin(player1Squares,1)
                } if(whosTurn === 2) {
                    let rand = board[Math.floor(Math.random() * board.length)];
                    index = board.indexOf(rand)
                    board.splice(index, 1)
                    console.log(board)
                    if (!player1Squares.includes(rand) && !player2Squares.includes(rand)){
                        player2Squares.push(rand)
                        squares[rand].innerHTML = "0"
                        whosTurn = 1;
                        document.getElementById('message').innerHTML = "It's X's turn"
                        // player2Squares.push(this.id)
                        checkWin(player2Squares,2)
                    }
                }
            } else {
                document.getElementById('message').innerHTML = "Sorry that square is taken."
            }
        }
    })
}

function checkWin(playerSquares, whoMarked){
    console.log(playerSquares)
    console.log(whoMarked)
    // we know who just went (whoMarked)
    // and we know what squares they have (playerSquares)
    // Outer loop - Check each winning combination
    for (let i = 0; i < winningCombos.length; i++){
        // Keep track of how many squares in THIS combo
        let squareCount = 0
        // Inner Lopp - Check each square inside of THIS winning combo
        // winningCombos[i] = the winningCombo we are onemptied(3 squares)
        for (let j = 0; j < winningCombos[i].length; j++){
            // winningCombos[i][j] = the square in the winningCombos we are on
            const winningSquare = winningCombos[i][j]
            if (playerSquares.includes(winningSquare)){
                // player has this square!!
                squareCount++
            }

        }
        if (squareCount === 3){
            console.log(squareCount)
            // console.log("player won")
            // console.log(winningCombos[i])
            endGame(winningCombos[i], whoMarked)
        }
    }

}
function endGame(winningCombo, whoWon){
    gameOn = false;
    // if we get to endGame WINNER WINNER CHICKEN DINNER
    // so the game is over
    document.querySelector('#message').innerHTML = `Congrats to player ${whoWon}`
    // we know which squares are the winning squares
    for (let i = 0; i < winningCombo.length; i++){
        let winningSquare = winningCombo[i]
        let squareElem = document.getElementById(winningSquare);
        squareElem.className += " winning-square"
        document.querySelector('.replay').style.visibility = "visible"
    }
}
function reset(){
    document.querySelector('.replay').style.visibility = "hidden"
    player1Squares = []
    player2Squares = []
    let squares = document.getElementsByClassName('square')
    for (let i = 0; i < squares.length; i++){
        squares[i].textContent = '-'
        squares[i].classList.remove('winning-square')
        document.getElementById('message').innerHTML = "It's X's Turn"
        whosTurn = 1
        board = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3']
        gameOn = true;
        
    }
}
function quit(){
    gameOn = false
}