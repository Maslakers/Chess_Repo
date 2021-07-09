function loadPuzzle()
{
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
}