let fen="rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b"

class Piece{
    constructor(c, x, y, t){
        this.color=c;
        this.x=x;
        this.y=y;
        this.type=t;
    }
    move(targetId)
    {
        //usunięcie bierki, ze starej pozycji
        console.log("move from"+this.x+this.y+"to"+targetId);
        let parentNode = document.getElementById(this.x*10+this.y);
        parentNode.removeChild(parentNode.firstChild)

        //zbicia
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

    }
}
let pieces = []

function generatePieces(){
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
        let newPiece= new Piece( (fen.charCodeAt(i)<91)? 'w' : 'b', x, y, fen[i]);
        pieces.push(newPiece);
    }
}

generatePieces();
