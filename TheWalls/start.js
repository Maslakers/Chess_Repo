let started = false;
let playing = false;
function start()
{
    if (!started)
    {
        started = true;
        if(document.getElementById('opis') != null) 
        document.getElementById('board').removeChild(document.getElementById('opis'))

        let choice = document.createElement('div');
        choice.innerHTML = "Wybierz Figurę:<br>";
        choice.id = 'choice';
        document.getElementById('panel').appendChild(choice);
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
    else
    {
        if(playing){
            clearInterval(id);
                let endScreen = document.createElement('div');
                endScreen.id = 'opis';
                endScreen.innerHTML = '<br><br><br><br><br>Koniec czasu! <br><br> Twój wynik: '+ points + 
                ' p. <br><br> Wciśnij przycis Start! aby zagrać ponownie';
                document.getElementById('board').appendChild(endScreen)
                timeLeft = 0;
                document.getElementById('timer').innerHTML = '1 : 00'
                started = false;
                playing = false;
                start();
        }
        document.body.removeChild(document.getElementById('board'));
        points = 0;
        document.getElementById('pointCount').innerHTML = points;
        let board = document.createElement('div');
        board.id = 'board';
        document.body.appendChild(board);
        generateBoard();
    }
}
let id=null;
function play(piece)
{
    if(!playing)
    {
        document.getElementById('panel').removeChild(document.getElementById('choice'))
        let timeLeft = 3;
        id = setInterval(time, 1000)
        function time()
        {
            if(timeLeft<=0)
            {
                clearInterval(id);
                let endScreen = document.createElement('div');
                endScreen.id = 'opis';
                endScreen.innerHTML = '<br><br><br><br><br>Koniec czasu! <br><br> Twój wynik: '+ points + 
                ' p. <br><br> Wciśnij przycis Start! aby zagrać ponownie';
                document.getElementById('board').appendChild(endScreen)
                timeLeft = 0;
                playing = true;
            }
            else
            {
                timeLeft--;
                document.getElementById('timer').innerHTML = '0 : '+ ((timeLeft < 10)? '0' + timeLeft : timeLeft);
            }
        }

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
    while(document.getElementById(x*10+y).firstChild != null ||
    pieces[0].x == x && pieces[0].y == y || 
    (pieces[0].type == 'B' 
    && document.getElementById(x*10+y).className == 'darkSquare'))
    {
        x = Math.floor(Math.random()*8)+1;
        y = Math.floor(Math.random()*8)+1;
    }
    pieces[1] = new Piece('b', x, y, 'p');
    x = Math.floor(Math.random()*8)+1;
    y = Math.floor(Math.random()*8)+1;
    while((pieces[1].x == x && pieces[1].y == y || pieces[0].x == x && pieces[0].y == y) || 
    document.getElementById(x*10+y).firstChild != null ||
    (pieces[0].type == 'B' && document.getElementById(x*10+y).className == 'darkSquare'))
    {
        x = Math.floor(Math.random()*8)+1;
        y = Math.floor(Math.random()*8)+1;
    }
    let mur = document.createElement('img');
    mur.src = 'brick.png';
    mur.classList = 'piece mur';
    document.getElementById(x*10+y).appendChild(mur);
}