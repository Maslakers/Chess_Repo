let color;
let points = 0;
function getPieceId(place) //funkcja, do znajdywania id bierki po jej koordynatach
{
    for(let i=0; i<pieces.length; i++)
        {
            if(pieces[i].x===Math.floor(place/10) && pieces[i].y===place%10)
            {
                return i;
            }
        }
}
function selectFiles(selectedId)
{
    if(document.getElementById(selectedId).firstChild !== null) //zaznacza figure na która klikniemy
    {
        if(document.getElementById(selectedId).firstChild == null || 
        pieces[getPieceId(selectedId)].color !== color) //sprawdza czy zaznaczono czarna bierke
        {
            timer();
            if(correctSelection(selectedId))
            {
                document.getElementById(selectedId).firstChild.classList.add("selectedPiece");
                points++;
                document.getElementById('pointCount').innerHTML = points;
            }
            else
            {
                document.getElementById(selectedId).firstChild.classList.add("incorrectPiece");
            }
        }
    }
}