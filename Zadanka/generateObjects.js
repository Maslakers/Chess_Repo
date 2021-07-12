class Piece{
    constructor(c, x, y, t){
        this.color=c;
        this.x=x;
        this.y=y;
        this.type=t;
    }
    move(targetId)
    {
        moving=false;
        document.getElementById(this.x*10+this.y).removeChild(document.getElementById(this.x*10+this.y).firstChild)
        document.getElementById(this.x*10+this.y).style.zIndex=0;
        if(document.getElementById(targetId).firstChild !== null)
        {
            for(let i=0; i<32; i++)
            {
                if(pieces[i].x === Math.floor(targetId/10) && pieces[i].y === targetId%10)
                {
                    pieces.splice(i, 1);
                    document.getElementById(targetId).removeChild(document.getElementById(targetId).firstChild);
                    break;
                }
            }
        }
        //stworzenie bierki na nowej pozycji
        let piece = document.createElement('img');
        piece.src = pieceTexture(this.type);
        piece.className = 'piece';
        this.x=Math.floor(targetId/10);
        this.y = targetId%10;
        document.getElementById(targetId).appendChild(piece);
        
        if(this.color === fen[fen.length-1]) opponentMove();
    }
}
let pieces = []

function generatePieces(fen){
    let y=8;
    let x=0;
    //odczytywanie kodu fen
    for(let i=0; i<128; i++)
    {
        x++;
        if(fen[i]=='/') {
            x=0;
            y--;
            continue;
        }
        if(fen[i]==' ') break;
        if(!isNaN(parseInt(fen[i]))){
            x+=fen[i]-1;
            continue;
        }
        let newPiece;
        if(fen[fen.length-1] == 'w')
        newPiece= new Piece( (fen.charCodeAt(i)<91)? 'w' : 'b', x, y, fen[i]);
        else
        newPiece= new Piece( (fen.charCodeAt(i)<91)? 'w' : 'b', 9-x, 9-y, fen[i]);
        pieces.push(newPiece);
    }
    color = fen[fen.length-1]
}