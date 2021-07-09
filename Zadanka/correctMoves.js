let moveNo = 0;
let moveAmount = 3;
let movesWhite;
let movesBlack;
function incorrect()
{
    document.getElementById('beforeIncorrect').id = 'incorrect';
    setTimeout(() => {document.getElementById('incorrect').id = 'beforeIncorrect';}, 2000)
}


function correctMoves(from, to)
{
    if(from == Math.floor(movesWhite[moveNo]/100) && to == movesWhite[moveNo]%100)
    {
        moveNo++;
        return true;
    }
    else incorrect();
}
function opponentMove()
{
    if(moveNo === moveAmount)
    {
        document.getElementById('beforeCorrect').id = 'correct';
        setTimeout(() => {loadPuzzle()}, 2000)
    } 
    else moveAnimation(pieces[getPieceId(Math.floor(movesBlack[moveNo-1]/100))], movesBlack[moveNo-1]%100);
}