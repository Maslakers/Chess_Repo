let firstSelectId = 0;
function selectFiles(selectedId)
{
    if(firstSelectId===0 && document.getElementById(selectedId).firstChild !== null)
    firstSelectId = selectedId;
    else
    {
        let selectedPieceId=-1;
        for(let i=0; i<32; i++)
        {
            if(pieces[i].x===Math.floor(firstSelectId/10) && pieces[i].y===firstSelectId%10)
            {
                selectedPieceId=i;
                break;
            }
        }
        firstSelectId = 0;
        if(selectedPieceId>-1 && fen[fen.length-1] === pieces[selectedPieceId].color)
        pieces[selectedPieceId].move(selectedId);
    }

}