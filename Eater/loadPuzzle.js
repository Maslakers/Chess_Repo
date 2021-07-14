let started = false;
let reloding = false;
function loadPuzzle()
{
    if(!started)
    {
        if(!reloding)
        points = 0;
        document.getElementById('pointCount').innerHTML = points;
        timer();
        if(document.getElementById('opis') != null) document.getElementById('board').removeChild(document.getElementById('opis'))
        pieces = [];
        console.log("restarting")
        document.body.removeChild(document.getElementById('board'));
        let board = document.createElement('div');
        board.id = 'board';
        document.body.appendChild(board);
        let nice = document.createElement('div');
        nice.id = "beforeCorrect";
        document.getElementById('board').appendChild(nice);
        document.getElementById('beforeCorrect').innerHTML = 'Nice!';
        generateBoard();
        database();
        renderPieces();
        started = true;
        reloding = false;
    }
}