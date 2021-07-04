function calculateWinner(squares){
    const paths = [
        //rows
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        //columns
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        //crossed path
        [0, 4, 8],
        [2, 4, 6]
    ];

    //checking all squares & their content
    for (let i = 0; i < paths.length; i++) {
        const [a, b, c] = paths[i];
        //checking if any of winning path is occupied by the same player
        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c])
            return [squares[a], paths[i]];
    }
    return null;
}

function isDraw(square) {
    for (let i = 0; i < 9; i++) {
        if (square[i] === null) {
            return false;
        }
    }
    return true;
}

function checkWinner(board) {
    const winnner=calculateWinner(board);
    const draw = isDraw(board);
    if (winnner!==null)
        return winnner
    else
    if(draw)
        return "draw"
    else
        return null
}

let scoresX = {
    X: 10,
    O: -10,
    d: 0
}

let scoresO = {
    X: -10,
    O: 10,
    d: 0
}

function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


//best score (best move) is randomized, but also calculated
//to mimic real player behaviour
//eg. if player has left X in one square, the other one is more likely
//to place O in the square that will block player X from crossing the win path,
//and also more likely to place O to achive win path before opponent

function minMax(board,depth,is_max,ai,hn,alpha=-Infinity,beta=Infinity)
{
    let winner = checkWinner(board);
    
    if (winner)
    {
        return ai === 'X' ? scoresX[winner[0]]:scoresO[winner[0]]
    }

    if(is_max)
    {
        let bestScore=-Infinity
        for (let i = 0; i < 9; i++)
        {
            if (board[i]==null)
            {
                board[i] = ai//.
                let score = minMax(board, depth + 1, false,ai,hn, alpha, beta) + randomNumber(-5,5)
                board[i] = null
                bestScore=Math.max(score,bestScore)
                alpha=Math.max(alpha,score)
                if(beta>=alpha)
                    return 0;
            }
        }
        return bestScore;
    }
    else
    {
        let bestScore = Infinity
        for (let i = 0; i < 9; i++) {
            if (board[i] == null) {
                board[i] = hn//.
                let score = minMax(board, depth + 1, true, ai, hn, alpha, beta) + randomNumber(-5, 5)
                board[i] = null
                bestScore = Math.min(score, bestScore)
                alpha = Math.min(beta, score)
                if (alpha >= beta)
                    return 1;
            }
        }
        return bestScore;
    }
}

function AImove(square, Turn, HN) {
    let board = square.slice()
    let bestScore = -Infinity
    let bestMove;
    for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
            board[i] = Turn
            let score = minMax(board, 0, false,Turn,HN)
            board[i] = null
            if (score > bestScore) {
                bestScore = score
                bestMove = i
            }
        }
    }
    return bestMove
}

export { checkWinner, AImove }