let fen="r1bqr1k1/1pp2Npp/p1np4/2n1p3/1b2P3/1QNPB3/PPP1BPPP/2KR3R w"
let moveNo = 0;
function incorrect()
{
    document.getElementById('beforeIncorrect').id = 'incorrect';
    setTimeout(() => {document.getElementById('incorrect').id = 'beforeIncorrect';}, 2000)
}


function correctMoves(from, to)
{
    if(moveNo == 0 && from == 67 && to == 86)
    {
        moveNo++;
        return true;
    }
    else if(moveNo == 0) incorrect();
    if(moveNo == 1 && from == 23 && to == 78)
    {
        moveNo++;
        return true;
    } 
    else if(moveNo == 1) incorrect();
    if(moveNo == 2 && from == 86 && to == 67)
    {
        moveNo++;
        return true;
    }
    else if(moveNo == 2) incorrect();
}