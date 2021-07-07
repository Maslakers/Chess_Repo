function opponentMove()
{
    if(moveNo==1)
    {
        pieces[getPieceId(78)].move(88);
    }
    if(moveNo==2)
    {
        pieces[getPieceId(58)].move(78);
    }
    if(moveNo==3)
    {
        document.getElementById('beforeCorrect').id="correct"
    }
}