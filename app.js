function Game() {
    let gameBoard = [];
    let players = [];
    let gameBox = document.querySelector('.game-box');


    function resetBoard(){
        for (let i = 0; i < 3; i++) {
            gameBoard[i] = [];
            for (let j = 0; j < 3; j++) {
                gameBoard[i][j] = 'S';
                let cell = document.getElementById(`${i} ${j}`);
                cell.innerHTML = '';
                cell.style.backgroundColor = ''
            }
        }
    
    
    
    }

        function addPlayer(name)
        {
            players.push(name);
        }

        function updateBoard(cell, symbol, element) // Draw board will only fire once, then just edit it
        {
            let {r,c} = cell;
           element.innerHTML = symbol
        }

        
       function checkWinner()
       {
        for (let i = 0; i < 3; i++)
        {
            if (gameBoard[i][0] === gameBoard[i][1] && gameBoard[i][1] === gameBoard[i][2] && gameBoard[i][0] === gameBoard[i][2] && gameBoard[i][0] !== 'S')
            {
                // return gameBoard[i][0];
                return {winner: gameBoard[i][0],
                    c1: `${i} 0`,
                    c2: `${i} 1`,
                    c3: `${i} 2`,
                }
            }

        }

        for (let i = 0; i < 3; i++)
            {
                if (gameBoard[0][i] === gameBoard[1][i] && gameBoard[1][i] === gameBoard[2][i] && gameBoard[0][i] === gameBoard[2][i] && gameBoard[0][i] !== 'S')
                {
                    return {winner: gameBoard[i][0],
                        c1: `0 ${i}`,
                        c2: `1 ${i}`,
                        c3: `2 ${i}`,
                    }
                }
                
            }

        if (gameBoard[0][0] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][2] && gameBoard[0][0] == gameBoard[2][2] && gameBoard[0][0] != 'S')
           {
            return {winner: gameBoard[0][0],
                c1: `0 0`,
                c2: `1 1`,
                c3: `2 2`,
            }
           }
        

        if (gameBoard[0][2] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][0] && gameBoard[0][2] === gameBoard[2][0] && gameBoard[0][2] != 'S')
        {
            return {winner: gameBoard[0][2],
                c1: `0 2`,
                c2: `1 1`,
                c3: `2 0`,
            }
        }

        let tie = true;

        for (let i = 0; i < 3; i++)
        {
            for (let j = 0; j < 3; j++)
            {
                if (gameBoard[i][j] == 'S')
                {
                    tie = false;
                    break;
                }
            }
        }

        if (tie)
            return {
        tie:'tie'};

        return -1; // still ongoing game
       }


       function playRound(symbol, cell)
       {
        // First we need to check if the cell is already full
        if (gameBoard[cell.r][cell.c]!= 'X' && gameBoard[cell.r][cell.c] != 'O' && gameBoard[cell.r][cell] != 'S')
        {
        let {r,c } = cell;   
        gameBoard[r][c] = symbol;
        return true
        }
       }


       function checkForGameWinner(gameWinner)
       {
        gameOver = false;
        if (gameWinner == 'X'){
            console.log(`Player ${players[0]} Won!!`);
            gameOver = true;}
        else if (gameWinner == 'O'){
            console.log(`Player ${players[1]} Won!!`);
            gameOver = true;}

        else if (gameWinner == 'tie'){
        console.log("It's a tie!");
        gameOver = true;}

        return gameOver;
       }

       let gameTurn = true; 
       function playGame()
       {
        resetBoard();


        let gameBox = document.querySelector('.game-box');

        gameBox.addEventListener('click', capture)

        function capture(event)
        {
            
                let position = event.target.id;
                position = position.split(' ');
                let r = position[0];
                let c = position[1];
          
    
                let currentTurn;


                
                if (gameTurn == true)
                    currentTurn = 'X';
                else
                    currentTurn = 'O';
    
    
                    if(playRound(currentTurn, {r,c}) == true)
                        {gameTurn = !gameTurn;
                        updateBoard({r,c}, currentTurn, event.target);
                        }
            
                    let gameWinner;
    
    
                winnerObject = checkWinner();
                isWin = winnerObject.winner;
                console.log(winnerObject);
    
                if (isWin == 'X')
                {
                    gameWinner = 'X';
                }
    
                else if (isWin == 'O')
                {
                    gameWinner = 'O';
                }
                else if (isWin == 'tie')
                {
                    gameWinner = 'tie';
                }
    
                // gameTurn = !gameTurn;
    
    
            let gameOver = false;
            
            if (isWin == 'X' || isWin == 'O') // Game over
            {
                gameOver = checkForGameWinner(gameWinner);
                let c1 = winnerObject.c1;
                let c2 = winnerObject.c2;
                let c3 = winnerObject.c3;
                console.log(c1);

                let cell1 = document.getElementById(c1);
                let cell2 = document.getElementById(c2);
                let cell3 = document.getElementById(c3);
                
                cell1.style.backgroundColor = '#22c55e';
                cell2.style.backgroundColor = '#22c55e';
                cell3.style.backgroundColor = '#22c55e';
            }

            else if (winnerObject.tie == 'tie')
            {
                console.log("It's a tie");
                gameOver = true;

                let cells = document.querySelectorAll('.box-cell');
                cells.forEach(cell => {
                    cell.style.backgroundColor = '#f8717144'
                });
            }

            
    
    
            if (gameOver){
                gameBox.removeEventListener('click',capture)
            }

        }

        
       }

    

    return {addPlayer,playGame}
}




let restartButton = document.querySelector('.restart');

restartButton.addEventListener('click', startGame);
let startGameEvent = new Event('click');


restartButton.dispatchEvent(startGameEvent);

function startGame(event)
{
    (function() {
        let instance = Game();
        instance.addPlayer(prompt("Enter player one name"));
        instance.addPlayer(prompt("Enter player two name"));
        instance.playGame();
    })();
}

