
window.onload = building;

let sideMove = 'W';
let isMoving = false;
let pieceId;
let pieceParentId;
let isParentIdSettled = false;
let draggedPiece;
let targetParentId;

function building() {
    let chessboard = document.getElementById('chessBoard');
    let column = 1;
    let notation = 'A';
    for(let i = 0;i<64;i++) {
        let TILE = document.createElement('div');
        let Piece = document.createElement('img');
        TILE.className = 'chessTiles';
        Piece.className = 'Piece';
        Piece.draggable = true;
        Piece.alt = '0';
        chessboard.append(TILE);
        if(i%8===0 && i!==0){
            column++;
        }
        switch(i%8){
            case 0: notation = 'A'; break;
            case 1: notation = 'B'; break;
            case 2: notation = 'C'; break;
            case 3: notation = 'D'; break;
            case 4: notation = 'E'; break;
            case 5: notation = 'F'; break;
            case 6: notation = 'G'; break;
            case 7: notation = 'H'; break;
        }
        TILE.id = `${notation}${9-column}`


        if(i%2===0 && column%2===1){
            TILE.style.backgroundColor = 'white';
        }else if(i%2===1 && column%2===0) {
            TILE.style.backgroundColor = 'white';
        }

        if(i%2===1 && column%2===1){
            TILE.style.backgroundColor = '#b58863';
        }else if(i%2===0 && column%2===0) {
            TILE.style.backgroundColor = '#b58863';
        }

        if(i===0&&column===1||i===7&&column===1){
            Piece.src = 'Pieces/black_rook.png';
            Piece.id = 'bR' + (i%2+1);
            TILE.append(Piece);
        }else if(i%8===0&&column===8||i%8===7&&column===8){
            Piece.src = 'Pieces/white_rook.png';
            Piece.id = 'wR' + (i%2+1);
            TILE.append(Piece);
        }


        if(i%8===1&&column===1||i%8===6&&column===1){
            Piece.src = 'Pieces/black_knight.png';
            Piece.id = 'bN' + (i%2+1);
            TILE.append(Piece);
        }else if(i%8===1&&column===8||i%8===6&&column===8){
            Piece.src = 'Pieces/white_knight.png';
            Piece.id = 'wN' + (i%2+1);
            TILE.append(Piece);
        }

        if(i%8===2&&column===1||i%8===5&&column===1){
            Piece.src = 'Pieces/black_bishop.png';
            Piece.id = 'bB' + (i%2+1);
            TILE.append(Piece);
        }else if(i%8===2&&column===8||i%8===5&&column===8){
            Piece.src = 'Pieces/white_bishop.png';
            Piece.id = 'wB' + (i%2+1);
            TILE.append(Piece);
        }

        if(i%8===3&&column===1){
            Piece.src = 'Pieces/black_queen.png';
            Piece.id = 'bQ' + (i%2+1);
            TILE.append(Piece);
        }else if(i%8===3&&column===8){
            Piece.src = 'Pieces/white_queen.png';
            Piece.id = 'wQ' + (i%2+1);
            TILE.append(Piece);
        }

        if(i%8===4&&column===1){
            Piece.src = 'Pieces/black_king.png';
            Piece.id = 'bK' + (i%2+1);
            TILE.append(Piece);
        }else if(i%8===4&&column===8){
            Piece.src = 'Pieces/white_king.png';
            Piece.id = 'wK' + (i%2+1);
            TILE.append(Piece);
        }





        if(column === 2){
            Piece.src = 'Pieces/black_pawn.png';
            Piece.id = 'bP' + (i%8+1);
            TILE.append(Piece)
        }else if(column === 7){
            Piece.src = 'Pieces/white_pawn.png';
            Piece.id = 'wP' + (i%8+1);
            TILE.append(Piece)
        }
    }
        let tileRef = document.getElementsByClassName('chessTiles');
        let pieceRef = document.getElementsByClassName('Piece');
        let jPiece = 0;
        for(let j=0;j<64;j++){
            tileRef[j].addEventListener('drop', drop);
            tileRef[j].addEventListener('dragover', allowDrop);
            pieceRef[j%32].addEventListener('dragstart', drag);
            if(jPiece<32){jPiece++;}
        }
}


function drop(ev) {
    ev.preventDefault();
    draggedPiece.alt = '1';
    let data = ev.dataTransfer.getData('text');
    if(ev.target.id[0] === 'b' || ev.target.id[0] === 'w'){
        ev.target.remove();
        let parent = document.getElementById(targetParentId);
        parent.append(document.getElementById(data));
    }
    else{
        ev.target.append(document.getElementById(data));
    }
    if(sideMove === 'W'){
            sideMove = 'B';
        }else {
            sideMove = 'W';
        }
}

function drag(ev) {
    ev.dataTransfer.setData('text', ev.target.id);
    isParentIdSettled = false;
}












function allowDrop(ev) {

    if(!isParentIdSettled){
        pieceId = ev.target.id;
        draggedPiece = document.getElementById(pieceId);
        pieceParentId = document.getElementById(pieceId).closest('div').id;
        if(pieceId[0].toUpperCase() === sideMove){
            isParentIdSettled = true;
        }
    }

    let data = ev.dataTransfer.getData('text');
    let targetId = ev.target.id;
    if(data[0] ==='b' && sideMove === 'B' || data[0] === 'w' && sideMove === 'W')
    {
        targetParentId = document.getElementById(targetId).closest('div').id;
        switch(data[1]){
            case 'P': {
                if(data[0] === 'w') {
                    if(targetId[0] === pieceParentId[0]) {
                        if(parseInt(targetId[1])-1 === parseInt(pieceParentId[1])){
                            ev.preventDefault();
                        }else if(draggedPiece.alt === '0' && parseInt(targetId[1])-2 === parseInt(pieceParentId[1])){
                            ev.preventDefault();}

                    } else {
                        if(targetId[0] === 'b' && pieceParentId[0].charCodeAt(0) +1 === targetParentId[0].charCodeAt(0) && parseInt(pieceParentId[1]) +1 === parseInt(targetParentId[1])  || targetId[0] === 'b' && pieceParentId[0].charCodeAt(0) -1 === targetParentId[0].charCodeAt(0) && parseInt(pieceParentId[1]) +1 === parseInt(targetParentId[1])){
                            ev.preventDefault();
                        }
                    }
                    
                }else if(data[0] === 'b') {
                    if(targetId[0] === pieceParentId[0]) {
                        if(parseInt(targetId[1])+1 === parseInt(pieceParentId[1])){
                            ev.preventDefault();
                        }else if(draggedPiece.alt === '0' && parseInt(targetId[1])+2 === parseInt(pieceParentId[1])){
                            ev.preventDefault();}

                    } else {
                        targetParentId = document.getElementById(targetId).closest('div').id;
                        if(targetId[0] === 'w' && pieceParentId[0].charCodeAt(0) +1 === targetParentId[0].charCodeAt(0) && parseInt(pieceParentId[1]) -1 === parseInt(targetParentId[1])  || targetId[0] === 'w' && pieceParentId[0].charCodeAt(0) -1 === targetParentId[0].charCodeAt(0) && parseInt(pieceParentId[1]) -1 === parseInt(targetParentId[1])){
                            ev.preventDefault();
                        }
                    }
                }
            }break;

            case 'K': {
                if(data[0] === 'w'){
                    if(Math.abs(parseInt(targetId[1]) - parseInt(pieceParentId[1])) < 2 && Math.abs(parseInt(targetId[0].charCodeAt(0)) - parseInt(pieceParentId[0].charCodeAt(0))) < 2){
                        ev.preventDefault();
                    }else if(Math.abs(parseInt(targetParentId[1]) - parseInt(pieceParentId[1])) < 2 && Math.abs(parseInt(targetParentId[0].charCodeAt(0)) - parseInt(pieceParentId[0].charCodeAt(0))) < 2 && targetId[0] === 'b'){
                        ev.preventDefault();
                    }

                }else if(data[0] === 'b'){
                    if(Math.abs(parseInt(targetId[1]) - parseInt(pieceParentId[1])) < 2 && Math.abs(parseInt(targetId[0].charCodeAt(0)) - parseInt(pieceParentId[0].charCodeAt(0))) < 2){
                        ev.preventDefault();
                    }else if(Math.abs(parseInt(targetParentId[1]) - parseInt(pieceParentId[1])) < 2 && Math.abs(parseInt(targetParentId[0].charCodeAt(0)) - parseInt(pieceParentId[0].charCodeAt(0))) < 2 && targetId[0] === 'w'){
                        ev.preventDefault();
                    }
                }
            }break;

            case 'B': {
                    
            }break;

            case 'R': {

            }break;

            case 'Q': {

            }break;

            case 'N': {

            }
        }
        
    }
}
