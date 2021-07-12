let moveNo = 0;
let solverMoves;
let opponentMoves;
function incorrect()
{
    document.getElementById('beforeIncorrect').id = 'incorrect';
    document.getElementById('incorrect').classList = 'alert';
    setTimeout(() => {document.getElementById('incorrect').id = 'beforeIncorrect';}, 2000)
}


function correctMoves(from, to)
{

    if(from == Math.floor(solverMoves[moveNo]/100) && to == solverMoves[moveNo]%100)
    {
        moveNo++;
        return true;
    }
    else incorrect();
}
function opponentMove()
{
    if(moveNo === solverMoves.length)
    {
        document.getElementById('beforeCorrect').id = 'correct';
        setTimeout(() => {loadPuzzle()}, 2000)
    } 
    else moveAnimation(pieces[getPieceId(Math.floor(opponentMoves[moveNo-1]/100))], opponentMoves[moveNo-1]%100);
}