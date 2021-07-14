function loadPuzzle()
{
    checked = false;
    document.getElementById('panel').removeChild(document.getElementById('bierki'));
    let bierki = document.createElement('div');
    bierki.id = 'bierki';
    document.getElementById('panel').appendChild(bierki);
    pieces = [];
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
}