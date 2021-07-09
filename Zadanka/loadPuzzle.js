let fen;
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
    let wrong = document.createElement('div');
    wrong.id = "beforeIncorrect";
    document.getElementById('board').appendChild(nice);
    document.getElementById('beforeCorrect').innerHTML = 'Correct!';
    document.getElementById('board').appendChild(wrong);
    document.getElementById('beforeIncorrect').innerHTML = 'Incorrect!';
    generateBoard();
    let randomizer = Math.floor(Math.random()*4);
    fen = database(randomizer);
    renderPieces();
}