let fen = 'w';
let points = 0;
function selectFiles(id)
{
    let selected = document.getElementById(id)
    if(selected.classList[1] == 'legalFile' && moving == false) moveAnimation(pieces[0], id)
}
function getPieceId(id) {return 0;}
function opponentMove()
{
        if(pieces.length < 2)
        {
            generateStuff()
            let piece = document.createElement('img')
            piece.src = pieceTexture(pieces[1].type);
            piece.className='piece';
            document.getElementById(pieces[1].x*10+pieces[1].y).appendChild(piece);
            points++;
            document.getElementById('pointCount').innerHTML = points;
        }
        while(0<document.getElementsByClassName('legalFile').length)
        document.getElementsByClassName('legalFile')[0].classList.remove('legalFile');
        selectLegalFiles(pieces[0])
}