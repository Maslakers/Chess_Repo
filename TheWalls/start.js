let started = false;
let playing = false;
function start()
{
    if (!started)
    {
        started = true;
        document.getElementById('board').removeChild(document.getElementById('opis'))
        let choice = document.createElement('div');
        choice.innerHTML = "Wybierz Figurę:";
        choice.id = 'choice';
        document.body.appendChild(choice);
        for(let i=0; i<4; i++)
        {
            let piece = document.createElement('img')
            let textures = ['R', 'N', 'B', 'Q'];
            piece.src = pieceTexture(textures[i]);
            piece.style.height = '65px';
            piece.style.width = '65px';
            piece.style.display = 'inline-block';
            piece.onclick = () => {play(textures[i])};
            document.getElementById("choice").appendChild(piece);
        }
    }
}
function play(piece)
{
    if(!playing)
    {
        pieces[0] = new Piece('w', 4, 1, piece);
        playing = true;
        generateStuff()
        selectLegalFiles(pieces[0]);
        renderPieces();
    }
}
function generateStuff()
{
    let x = Math.floor(Math.random()*8)+1;
    let y = Math.floor(Math.random()*8)+1;
    console.log(pieces[0].type, document.getElementById(x*10+y).className)
    while(document.getElementById(x*10+y).firstChild != null || (pieces[0].type == 'B' 
    && document.getElementById(x*10+y).className == 'darkSquare'))
    {
        console.log(document.getElementById(x*10+y).classList)
        x = Math.floor(Math.random()*8)+1;
        y = Math.floor(Math.random()*8)+1;
    }
    pieces[1] = new Piece('b', x, y, 'p');
    x = Math.floor(Math.random()*8)+1;
    y = Math.floor(Math.random()*8)+1;
    while(document.getElementById(x*10+y).firstChild != null || (pieces[0].type == 'B' 
    && document.getElementById(x*10+y).className == 'darkSquare'))
    {
        x = Math.floor(Math.random()*8)+1;
        y = Math.floor(Math.random()*8)+1;
    }
    let mur = document.createElement('img');
    mur.src = 'brick.png';
    mur.classList = 'piece mur';
    document.getElementById(x*10+y).appendChild(mur);
}