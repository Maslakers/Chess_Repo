let firstSelectId = 0;
let color;
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
    if(firstSelectId===0 && document.getElementById(selectedId).firstChild !== null) //zaznacza figure na która klikniemy
    {
        while(0<document.getElementsByClassName('legalFile').length)
        document.getElementsByClassName('legalFile')[0].classList.remove('legalFile');

        firstSelectId = selectedId;
        document.getElementById(selectedId).firstChild.classList.add("selectedPiece");
        selectLegalFiles(pieces[getPieceId(selectedId)]);
    }
    else if(firstSelectId !== 0)    //zaznacza pole, na które chcey się ruszyć figurą
    {
        let selectedPieceId=getPieceId(firstSelectId);
        let selectNewPiece=false;
        document.getElementById(firstSelectId).firstChild.className = "piece";
        if(selectedPieceId>-1 && fen[fen.length-1] === pieces[selectedPieceId].color)   //zapobiega ruszaniu figurami przeciwnika
        {
            if(document.getElementById(selectedId).firstChild == null || pieces[getPieceId(selectedId)].color !== color)     // zapobiega zbijaniu własnych figur
            {
                if(!moving && document.getElementById(selectedId).classList[1] == 'legalFile')
                {
                    if(correctMoves(firstSelectId, selectedId))     //sprawdza czy ruch jest poprawny
                    {
                        moveAnimation(pieces[selectedPieceId], selectedId);
                    }
                }
            } else selectNewPiece=true;
        }
        firstSelectId = 0;
        while(0<document.getElementsByClassName('legalFile').length)
        document.getElementsByClassName('legalFile')[0].classList.remove('legalFile');
        if(selectNewPiece) selectFiles(selectedId);
    }

}