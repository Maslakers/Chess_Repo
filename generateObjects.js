let fen="rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b"

class Piece{
    constructor(c, x, y, t){
        this.color=c;
        this.x=x;
        this.y=y;
        this.type=t;
    }
}
let pieces = []

function generatePieces(){
    let y=8;
    let x=0;
    //odczytywanie kodu fen
    for(let i=0; i<64; i++)
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
