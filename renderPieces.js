function renderPieces()
{
    for(let i=0; i<32; i++)
    {
        let piece = document.createElement('img');
        switch (pieces[i].type)
        {
            case 'p': piece.src="./Pieces/black_pawn.png"; break;
            case 'P': piece.src="./Pieces/white_pawn.png"; break;
            case 'r': piece.src="./Pieces/black_rook.png"; break;
            case 'R': piece.src="./Pieces/white_rook.png"; break;
            case 'n': piece.src="./Pieces/black_knight.png"; break;
            case 'N': piece.src="./Pieces/white_knight.png"; break;
            case 'b': piece.src="./Pieces/black_bishop.png"; break;
            case 'B': piece.src="./Pieces/white_bishop.png"; break;
            case 'q': piece.src="./Pieces/black_queen.png"; break;
            case 'Q': piece.src="./Pieces/white_queen.png"; break;
            case 'k': piece.src="./Pieces/black_king.png"; break;
            case 'K': piece.src="./Pieces/white_king.png"; break;
        }
        piece.className='piece'
        document.getElementById(pieces[i].x*10+pieces[i].y).appendChild(piece);
    }
}
renderPieces();