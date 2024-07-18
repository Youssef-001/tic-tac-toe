function Game() {
    let gameBoard = [];
    let players = [];
    let gameBox = document.querySelector('.game-box');


    function resetBoard(){
        for (let i = 0; i < 3; i++) {
            gameBoard[i] = [];
            for (let j = 0; j < 3; j++) {
                gameBoard[i][j] = 'S';
            }
        }}

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
                return gameBoard[i][0];
            }

        }

        for (let i = 0; i < 3; i++)
            {
                if (gameBoard[0][i] === gameBoard[1][i] && gameBoard[1][i] === gameBoard[2][i] && gameBoard[0][i] === gameBoard[2][i] && gameBoard[0][i] !== 'S')
                {
                    return gameBoard[0][i];
                }
                
            }

        if (gameBoard[0][0] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][2] && gameBoard[0][0] == gameBoard[2][2] && gameBoard[0][0] != 'S')
            return gameBoard[0][0];
        

        if (gameBoard[0][2] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][0] && gameBoard[0][2] === gameBoard[2][0] && gameBoard[0][2] != 'S')
            return gameBoard[0][2];

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
            return 'tie';

        return -1; // still ongoing game
       }


       function playRound(symbol, cell)
       {
        let {r,c } = cell;   
        gameBoard[r][c] = symbol;
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
    
    
                    playRound(currentTurn, {r,c});
    
                    updateBoard({r,c}, currentTurn, event.target);
        
                    let gameWinner;
    
    
    
                isWin = checkWinner()
    
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
    
                gameTurn = !gameTurn;
    
    
            let gameOver = false;
    
            if (gameWinner == 'X'){
                console.log(`Player ${players[0]} Won!!`);
                gameOver = true;}
            else if (gameWinner == 'O'){
                console.log(`Player ${players[1]} Won!!`);
                gameOver = true;}
    
            else if (gameWinner == 'tie'){
            console.log("It's a tie!");
            gameOver = true;}
    
    
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

