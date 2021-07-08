function opponentMove()
{
    if(moveNo==1)
    {
        moveAnimation(pieces[getPieceId(78)], 88);
    }
    if(moveNo==2)
    {
        moveAnimation(pieces[getPieceId(58)], 78);
    }
    if(moveNo==3)
    {
        document.getElementById('beforeCorrect').id="correct"
    }
}