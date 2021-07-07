function pieceTexture(type)
{
    switch (type)
        {
            case 'p': return "../Pieces/black_pawn.png"; break;
            case 'P': return "../Pieces/white_pawn.png"; break;
            case 'r': return "../Pieces/black_rook.png"; break;
            case 'R': return "../Pieces/white_rook.png"; break;
            case 'n': return "../Pieces/black_knight.png"; break;
            case 'N': return "../Pieces/white_knight.png"; break;
            case 'b': return "../Pieces/black_bishop.png"; break;
            case 'B': return "../Pieces/white_bishop.png"; break;
            case 'q': return "../Pieces/black_queen.png"; break;
            case 'Q': return "../Pieces/white_queen.png"; break;
            case 'k': return "../Pieces/black_king.png"; break;
            case 'K': return "../Pieces/white_king.png"; break;
        }
}

function renderPieces()
{
    for(let i=0; i<pieces.length; i++)
    {
        let piece = document.createElement('img');
        piece.src = pieceTexture(pieces[i].type);
        piece.className='piece';
        document.getElementById(pieces[i].x*10+pieces[i].y).appendChild(piece);
    }
}
renderPieces();