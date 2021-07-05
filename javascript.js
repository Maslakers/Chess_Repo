
window.onload = building;

// Kogo kolej (W - white, B - black) 
let sideMove = 'W';

//Czy gracz draguje
let isMoving = false;

//Id figury ktora gracz sie porusza
let pieceId;

//Id pola na ktorym stala / stoi figura ktora gracz sie porusza
let pieceParentId;

//Czy wartosci na poczatku allowDrop() zostaly ustanowione
let isParentIdSettled = false;

//Figura ktora gracz dragguje;
let draggedPiece;

//Id pola, na ktorym stoi figura lub nie
let targetParentId;


//Funkcja ta buduje cala szachownice i oznacza ja oraz figury odpowiednimi id oraz klasami
function building() {
    let chessboard = document.getElementById('chessBoard');
    let column = 1;
    let notation = 'A';
    for(let i = 0;i<64;i++) {

        //Tworzenie pol i figur
        let TILE = document.createElement('div');
        let Piece = document.createElement('img');
        TILE.className = 'chessTiles';
        Piece.className = 'Piece';
        Piece.draggable = true;

        //Parametr sprawdzajacy czy gracz juz sie ruszyl tym pionkiem, 0 - nie 1 - tak
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

        //Ustawianie figur i kolorow pol na szachownicy
        //kolory
        if(i%2===0 && column%2===1){
            TILE.style.backgroundColor = 'white';
        }else if(i%2===1 && column%2===0) {
            TILE.style.backgroundColor = 'white';
        }

        //kolory
        if(i%2===1 && column%2===1){
            TILE.style.backgroundColor = '#b58863';
        }else if(i%2===0 && column%2===0) {
            TILE.style.backgroundColor = '#b58863';
        }

        //Wieze
        if(i===0&&column===1||i===7&&column===1){
            Piece.src = 'Pieces/black_rook.png';
            Piece.id = 'bR' + (i%2+1);
            TILE.append(Piece);
        }else if(i%8===0&&column===8||i%8===7&&column===8){
            Piece.src = 'Pieces/white_rook.png';
            Piece.id = 'wR' + (i%2+1);
            TILE.append(Piece);
        }

        //Skoczki
        if(i%8===1&&column===1||i%8===6&&column===1){
            Piece.src = 'Pieces/black_knight.png';
            Piece.id = 'bN' + (i%2+1);
            TILE.append(Piece);
        }else if(i%8===1&&column===8||i%8===6&&column===8){
            Piece.src = 'Pieces/white_knight.png';
            Piece.id = 'wN' + (i%2+1);
            TILE.append(Piece);
        }

        //Gonce
        if(i%8===2&&column===1||i%8===5&&column===1){
            Piece.src = 'Pieces/black_bishop.png';
            Piece.id = 'bB' + (i%2+1);
            TILE.append(Piece);
        }else if(i%8===2&&column===8||i%8===5&&column===8){
            Piece.src = 'Pieces/white_bishop.png';
            Piece.id = 'wB' + (i%2+1);
            TILE.append(Piece);
        }

        //Hetmany
        if(i%8===3&&column===1){
            Piece.src = 'Pieces/black_queen.png';
            Piece.id = 'bQ' + (i%2+1);
            TILE.append(Piece);
        }else if(i%8===3&&column===8){
            Piece.src = 'Pieces/white_queen.png';
            Piece.id = 'wQ' + (i%2+1);
            TILE.append(Piece);
        }

        //Krole
        if(i%8===4&&column===1){
            Piece.src = 'Pieces/black_king.png';
            Piece.id = 'bK' + (i%2+1);
            TILE.append(Piece);
        }else if(i%8===4&&column===8){
            Piece.src = 'Pieces/white_king.png';
            Piece.id = 'wK' + (i%2+1);
            TILE.append(Piece);
        }

        //Pionki
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
        //odniesienia do wszystkich elementow z klasy
        let tileRef = document.getElementsByClassName('chessTiles');
        let pieceRef = document.getElementsByClassName('Piece');

        //Dodawanie zawiadomienia do wszystkich odpowiednich elementow na szachownicy
        for(let j=0;j<64;j++){
            tileRef[j].addEventListener('drop', drop);
            tileRef[j].addEventListener('dragover', allowDrop);
            pieceRef[j%32].addEventListener('dragstart', drag);
        }
}

//Funkcja drop, aktywuje sie gdy uzytkownik upusci figure
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

//Ondragstart, dodatkowo resetuje parametry ciagnietej poprzednio figury 
function drag(ev) {
    ev.dataTransfer.setData('text', ev.target.id);
    isParentIdSettled = false;
}


//Ondragover, cala logika tego kiedy gracz moze sie poruszyc, czym i gdzie
function allowDrop(ev) {

    //Ustanawianie parametrow, Id figury, Figury ciagnietej, Id punktu startowego figury
    if(!isParentIdSettled){
        pieceId = ev.target.id;
        draggedPiece = document.getElementById(pieceId);
        pieceParentId = document.getElementById(pieceId).closest('div').id;
        if(pieceId[0].toUpperCase() === sideMove){
            isParentIdSettled = true;
        }
    }

    //Ustanawianie tego na co gracz patrzy (myszka)
    let targetId = ev.target.id;

    // Test sprawdzajacy czy porusza sie odpowiedni gracz w zaleznosci od tury
    if(draggedPiece.id[0] ==='b' && sideMove === 'B' || draggedPiece.id[0] === 'w' && sideMove === 'W')
    {
        //Parametr id pola na ktorym stoi inna figura lub nie
        targetParentId = document.getElementById(targetId).closest('div').id;

        //Sprawdzanie ktora figura sie gracz porusza
        switch(draggedPiece.id[1]){

            //Czy Pionek
            case 'P': {
                if(draggedPiece.id[0] === 'w') {
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
                    
                }else if(draggedPiece.id[0] === 'b') {
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

            //Czy krol
            case 'K': {
                if(draggedPiece.id[0] === 'w'){
                    if(Math.abs(parseInt(targetId[1]) - parseInt(pieceParentId[1])) < 2 && Math.abs(parseInt(targetId[0].charCodeAt(0)) - parseInt(pieceParentId[0].charCodeAt(0))) < 2){
                        ev.preventDefault();
                    }else if(Math.abs(parseInt(targetParentId[1]) - parseInt(pieceParentId[1])) < 2 && Math.abs(parseInt(targetParentId[0].charCodeAt(0)) - parseInt(pieceParentId[0].charCodeAt(0))) < 2 && targetId[0] === 'b'){
                        ev.preventDefault();
                    }

                }else if(draggedPiece.id[0] === 'b'){
                    if(Math.abs(parseInt(targetId[1]) - parseInt(pieceParentId[1])) < 2 && Math.abs(parseInt(targetId[0].charCodeAt(0)) - parseInt(pieceParentId[0].charCodeAt(0))) < 2){
                        ev.preventDefault();
                    }else if(Math.abs(parseInt(targetParentId[1]) - parseInt(pieceParentId[1])) < 2 && Math.abs(parseInt(targetParentId[0].charCodeAt(0)) - parseInt(pieceParentId[0].charCodeAt(0))) < 2 && targetId[0] === 'w'){
                        ev.preventDefault();
                    }
                }
            }break;

            //Czy goniec
            case 'B': {
                    if(draggedPiece.id[0] === 'w'){
                        //Wektor Poziomy
                        let Vector_Veri = parseInt(targetParentId[0].charCodeAt(0)) - parseInt(pieceParentId[0].charCodeAt(0));

                        //Wektor Pionowy
                        let Vector_Hori = parseInt(targetParentId[1]) - parseInt(pieceParentId[1]);

                        //Trasa Routingu ;)
                        let TileRouteId = new Array();

                        //Oznajmia czy na wybranej trasie nie stoi niepozadana przeszkoda - figura
                        let children = false;

                            //A z pola A1, pole B2      2 z pola B2,   1 z pola A1
                            //Czy |ASCII(A) - ASCII(B)| - |2            -            1| === 0   lub   |ASCII(B) - ASCII(A)| - |1            -            2| === 0
                            if( Math.abs(parseInt(targetParentId[1]) - parseInt(pieceParentId[1])) - Math.abs(parseInt(targetParentId[0].charCodeAt(0)) - parseInt(pieceParentId[0].charCodeAt(0))) === 0 && parseInt(targetParentId[1]) - parseInt(pieceParentId[1]) !== 0) {
                                
                                //Wypisywanie koordynatow sciezki w zaleznosci od wektory, czy - lub +
                                for(let i=1;i<=Math.abs(Vector_Hori);i++)
                                {
                                    if(Vector_Veri > 0 && Vector_Hori > 0){
                                        TileRouteId[i-1] = String.fromCharCode(parseInt(pieceParentId[0].charCodeAt(0)) + i) + (parseInt(pieceParentId[1]) + i);
                                    }else
                                    if(Vector_Veri < 0 && Vector_Hori > 0){
                                        TileRouteId[i-1] = String.fromCharCode(parseInt(pieceParentId[0].charCodeAt(0)) - i) + (parseInt(pieceParentId[1]) + i);
                                    }else
                                    if(Vector_Veri > 0 && Vector_Hori < 0){
                                        TileRouteId[i-1] = String.fromCharCode(parseInt(pieceParentId[0].charCodeAt(0)) + i) + (parseInt(pieceParentId[1]) - i);
                                    }else
                                    if(Vector_Veri < 0 && Vector_Hori < 0){
                                        TileRouteId[i-1] = String.fromCharCode(parseInt(pieceParentId[0].charCodeAt(0)) - i) + (parseInt(pieceParentId[1]) - i);
                                    }
                                }

                                    //Dla kazdego pola na trasie sprawdz:
                                    TileRouteId.forEach(element => {
                                    let tileCheck = document.getElementById(element);

                                    //Czy wogole wybrane pole na trasie ma dziecko?
                                    if(tileCheck.children.length !== 0 ){
                                        let childrenId = tileCheck.children[0].id.toString();

                                        //Czy tym dzieckiem jest figura mozliwa do zbicia ?
                                        if(childrenId[0] === 'b' && TileRouteId[TileRouteId.length-1] === element){} else{
                                            children = true;
                                        }
                                    } 
                                });

                                if(!children){
                                    ev.preventDefault();
                                }
                            
                        }
                    } else if(draggedPiece.id[0] === 'b'){
                        //Wektor Poziomy
                        let Vector_Veri = parseInt(targetParentId[0].charCodeAt(0)) - parseInt(pieceParentId[0].charCodeAt(0));

                        //Wektor Pionowy
                        let Vector_Hori = parseInt(targetParentId[1]) - parseInt(pieceParentId[1]);

                        //Trasa Routingu ;)
                        let TileRouteId = new Array();

                        //Oznajmia czy na wybranej trasie nie stoi niepozadana przeszkoda - figura
                        let children = false;

                            //A z pola A1, pole B2      2 z pola B2,   1 z pola A1
                            //Czy |ASCII(A) - ASCII(B)| - |2            -            1| === 0   lub   |ASCII(B) - ASCII(A)| - |1            -            2| === 0
                            if( Math.abs(parseInt(targetParentId[1]) - parseInt(pieceParentId[1])) - Math.abs(parseInt(targetParentId[0].charCodeAt(0)) - parseInt(pieceParentId[0].charCodeAt(0))) === 0 && parseInt(targetParentId[1]) - parseInt(pieceParentId[1]) !== 0) {

                                //Wypisywanie koordynatow sciezki w zaleznosci od wektory, czy - lub +
                                for(let i=1;i<=Math.abs(Vector_Hori);i++)
                                {
                                    if(Vector_Veri > 0 && Vector_Hori > 0){
                                        TileRouteId[i-1] = String.fromCharCode(parseInt(pieceParentId[0].charCodeAt(0)) + i) + (parseInt(pieceParentId[1]) + i);
                                    }
                                    if(Vector_Veri < 0 && Vector_Hori > 0){
                                        TileRouteId[i-1] = String.fromCharCode(parseInt(pieceParentId[0].charCodeAt(0)) - i) + (parseInt(pieceParentId[1]) + i);
                                    }
                                    if(Vector_Veri > 0 && Vector_Hori < 0){
                                        TileRouteId[i-1] = String.fromCharCode(parseInt(pieceParentId[0].charCodeAt(0)) + i) + (parseInt(pieceParentId[1]) - i);
                                    }
                                    if(Vector_Veri < 0 && Vector_Hori < 0){
                                        TileRouteId[i-1] = String.fromCharCode(parseInt(pieceParentId[0].charCodeAt(0)) - i) + (parseInt(pieceParentId[1]) - i);
                                    }
                                }

                                    //Dla kazdego pola na trasie sprawdz:
                                    TileRouteId.forEach(element => {
                                    let tileCheck = document.getElementById(element);

                                    //Czy wogole wybrane pole na trasie ma dziecko?
                                    if(tileCheck.children.length !== 0 ){
                                        let childrenId = tileCheck.children[0].id.toString();

                                        //Czy tym dzieckiem jest figura mozliwa do zbicia ?
                                        if(childrenId[0] === 'w' && TileRouteId[TileRouteId.length-1] === element){} else{
                                            children = true;
                                        }
                                    } 
                                });
                                
                                //Umozliwienie dropu dla gonca
                                if(!children){
                                    ev.preventDefault();
                                }
                            }
                        }
                }break;

            //Czy Wieza
            case 'R': {
                if(draggedPiece.id[0] === 'w'){

                    let CanVertical = false;

                    let Vector_Veri = parseInt(targetParentId[0].charCodeAt(0)) - parseInt(pieceParentId[0].charCodeAt(0));
                    let Vector_Hori = parseInt(targetParentId[1]) - parseInt(pieceParentId[1]);

                    let tileVerticalRouteId = new Array();

                    if( Math.abs(parseInt(targetParentId[1]) - parseInt(pieceParentId[1])) === 0 && pieceParentId.toString() !== targetParentId.toString() || Math.abs(parseInt(targetParentId[0].charCodeAt(0)) - parseInt(pieceParentId[0].charCodeAt(0))) === 0 && pieceParentId.toString() !== targetParentId.toString()) {

                        for(let i=1;i <= Math.abs(Vector_Hori) + Math.abs(Vector_Veri);i++)
                                {
                                    if(Vector_Veri > 0 && Vector_Hori === 0){
                                        tileVerticalRouteId[i-1] = String.fromCharCode(parseInt(pieceParentId[0].charCodeAt(0)) + i) + (parseInt(pieceParentId[1]));
                                    }
                                    if(Vector_Veri < 0 && Vector_Hori === 0){
                                        tileVerticalRouteId[i-1] = String.fromCharCode(parseInt(pieceParentId[0].charCodeAt(0)) - i) + (parseInt(pieceParentId[1]));
                                    }
                                    if(Vector_Veri === 0 && Vector_Hori > 0){
                                        tileVerticalRouteId[i-1] = String.fromCharCode(parseInt(pieceParentId[0].charCodeAt(0))) + (parseInt(pieceParentId[1]) + i);
                                    }
                                    if(Vector_Veri === 0 && Vector_Hori < 0){
                                        tileVerticalRouteId[i-1] = String.fromCharCode(parseInt(pieceParentId[0].charCodeAt(0))) + (parseInt(pieceParentId[1]) - i);
                                    }
                                }
                                console.log(tileVerticalRouteId);

                                CanVertical = true;
                                tileVerticalRouteId.forEach(element => {
                                    let tileCheck = document.getElementById(element);
                                        if(tileCheck.children.length !== 0 ){
                                            let childrenId = tileCheck.children[0].id.toString();
                                            if(childrenId[0] === 'b' && tileVerticalRouteId[tileVerticalRouteId.length-1] === element){} else{
                                                CanVertical = false;
                                            }
                                    }
                                })
                }
                if(CanVertical){
                    ev.preventDefault();
                }
            }

                else if(draggedPiece.id[0] === 'b'){

                    let CanVertical = false;

                    let Vector_Veri = parseInt(targetParentId[0].charCodeAt(0)) - parseInt(pieceParentId[0].charCodeAt(0));
                    let Vector_Hori = parseInt(targetParentId[1]) - parseInt(pieceParentId[1]);

                    let tileVerticalRouteId = new Array();
                    if( Math.abs(parseInt(targetParentId[1]) - parseInt(pieceParentId[1])) === 0 && pieceParentId.toString() !== targetParentId.toString() || Math.abs(parseInt(targetParentId[0].charCodeAt(0)) - parseInt(pieceParentId[0].charCodeAt(0))) === 0 && pieceParentId.toString() !== targetParentId.toString()) {

                        for(let i=1;i <= Math.abs(Vector_Hori) + Math.abs(Vector_Veri);i++){
                            if(Vector_Veri > 0 && Vector_Hori === 0){
                                tileVerticalRouteId[i-1] = String.fromCharCode(parseInt(pieceParentId[0].charCodeAt(0)) + i) + (parseInt(pieceParentId[1]));
                            }
                            if(Vector_Veri < 0 && Vector_Hori === 0){
                                        tileVerticalRouteId[i-1] = String.fromCharCode(parseInt(pieceParentId[0].charCodeAt(0)) - i) + (parseInt(pieceParentId[1]));
                            }
                            if(Vector_Veri === 0 && Vector_Hori > 0){
                                        tileVerticalRouteId[i-1] = String.fromCharCode(parseInt(pieceParentId[0].charCodeAt(0))) + (parseInt(pieceParentId[1]) + i);
                            }
                            if(Vector_Veri === 0 && Vector_Hori < 0){
                                tileVerticalRouteId[i-1] = String.fromCharCode(parseInt(pieceParentId[0].charCodeAt(0))) + (parseInt(pieceParentId[1]) - i);
                            }
                        }
                        console.log(tileVerticalRouteId);

                        CanVertical = true;
                        tileVerticalRouteId.forEach(element => {
                            let tileCheck = document.getElementById(element);
                            if(tileCheck.children.length !== 0 ){
                                let childrenId = tileCheck.children[0].id.toString();
                                if(childrenId[0] === 'w' && tileVerticalRouteId[tileVerticalRouteId.length-1] === element){} else{
                                    CanVertical = false;
                                }
                            }
                        })
                    }
                        if(CanVertical){
                            ev.preventDefault();
                        }
                }
            }break;


        //Czy Hetman
            case 'Q': {
                if(draggedPiece.id[0] === 'w'){

                    let CanVertical = false;
                    let CanDiagonal = false;

                    let Vector_Veri = parseInt(targetParentId[0].charCodeAt(0)) - parseInt(pieceParentId[0].charCodeAt(0));
                    let Vector_Hori = parseInt(targetParentId[1]) - parseInt(pieceParentId[1]);

                    let tileDiagonalRouteId = new Array();
                    let tileVerticalRouteId = new Array();

                    if( Math.abs(parseInt(targetParentId[1]) - parseInt(pieceParentId[1])) - Math.abs(parseInt(targetParentId[0].charCodeAt(0)) - parseInt(pieceParentId[0].charCodeAt(0))) === 0 && parseInt(targetParentId[1]) - parseInt(pieceParentId[1]) !== 0) {

                        for(let i=1;i<=Math.abs(Vector_Hori);i++)
                                {
                                    if(Vector_Veri > 0 && Vector_Hori > 0){
                                        tileDiagonalRouteId[i-1] = String.fromCharCode(parseInt(pieceParentId[0].charCodeAt(0)) + i) + (parseInt(pieceParentId[1]) + i);
                                    }
                                    if(Vector_Veri < 0 && Vector_Hori > 0){
                                        tileDiagonalRouteId[i-1] = String.fromCharCode(parseInt(pieceParentId[0].charCodeAt(0)) - i) + (parseInt(pieceParentId[1]) + i);
                                    }
                                    if(Vector_Veri > 0 && Vector_Hori < 0){
                                        tileDiagonalRouteId[i-1] = String.fromCharCode(parseInt(pieceParentId[0].charCodeAt(0)) + i) + (parseInt(pieceParentId[1]) - i);
                                    }
                                    if(Vector_Veri < 0 && Vector_Hori < 0){
                                        tileDiagonalRouteId[i-1] = String.fromCharCode(parseInt(pieceParentId[0].charCodeAt(0)) - i) + (parseInt(pieceParentId[1]) - i);
                                    }
                                }
                                CanDiagonal = true;
                                tileDiagonalRouteId.forEach(element => {
                                    let tileCheck = document.getElementById(element);
                                        if(tileCheck.children.length !== 0 ){
                                            let childrenId = tileCheck.children[0].id.toString();
                                            if(childrenId[0] === 'b' && tileDiagonalRouteId[tileDiagonalRouteId.length-1] === element){} else{
                                                CanDiagonal = false;
                                            }
                                    }
                                })
                                
                    }

                    if( Math.abs(parseInt(targetParentId[1]) - parseInt(pieceParentId[1])) === 0 && pieceParentId.toString() !== targetParentId.toString() || Math.abs(parseInt(targetParentId[0].charCodeAt(0)) - parseInt(pieceParentId[0].charCodeAt(0))) === 0 && pieceParentId.toString() !== targetParentId.toString()) {

                        for(let i=1;i <= Math.abs(Vector_Hori) + Math.abs(Vector_Veri);i++)
                                {
                                    if(Vector_Veri > 0 && Vector_Hori === 0){
                                        tileVerticalRouteId[i-1] = String.fromCharCode(parseInt(pieceParentId[0].charCodeAt(0)) + i) + (parseInt(pieceParentId[1]));
                                    }
                                    if(Vector_Veri < 0 && Vector_Hori === 0){
                                        tileVerticalRouteId[i-1] = String.fromCharCode(parseInt(pieceParentId[0].charCodeAt(0)) - i) + (parseInt(pieceParentId[1]));
                                    }
                                    if(Vector_Veri === 0 && Vector_Hori > 0){
                                        tileVerticalRouteId[i-1] = String.fromCharCode(parseInt(pieceParentId[0].charCodeAt(0))) + (parseInt(pieceParentId[1]) + i);
                                    }
                                    if(Vector_Veri === 0 && Vector_Hori < 0){
                                        tileVerticalRouteId[i-1] = String.fromCharCode(parseInt(pieceParentId[0].charCodeAt(0))) + (parseInt(pieceParentId[1]) - i);
                                    }
                                }
                                console.log(tileVerticalRouteId);

                                CanVertical = true;
                                tileVerticalRouteId.forEach(element => {
                                    let tileCheck = document.getElementById(element);
                                        if(tileCheck.children.length !== 0 ){
                                            let childrenId = tileCheck.children[0].id.toString();
                                            if(childrenId[0] === 'b' && tileVerticalRouteId[tileVerticalRouteId.length-1] === element){} else{
                                                CanVertical = false;
                                            }
                                    }
                                })
                    }

                    if(CanDiagonal || CanVertical){
                        ev.preventDefault();
                    }
                }
                
                if(draggedPiece.id[0] === 'b'){

                    let CanVertical = false;
                    let CanDiagonal = false;

                    let Vector_Veri = parseInt(targetParentId[0].charCodeAt(0)) - parseInt(pieceParentId[0].charCodeAt(0));
                    let Vector_Hori = parseInt(targetParentId[1]) - parseInt(pieceParentId[1]);

                    let tileDiagonalRouteId = new Array();
                    let tileVerticalRouteId = new Array();

                    if( Math.abs(parseInt(targetParentId[1]) - parseInt(pieceParentId[1])) - Math.abs(parseInt(targetParentId[0].charCodeAt(0)) - parseInt(pieceParentId[0].charCodeAt(0))) === 0 && parseInt(targetParentId[1]) - parseInt(pieceParentId[1]) !== 0) {

                        for(let i=1;i<=Math.abs(Vector_Hori);i++)
                                {
                                    if(Vector_Veri > 0 && Vector_Hori > 0){
                                        tileDiagonalRouteId[i-1] = String.fromCharCode(parseInt(pieceParentId[0].charCodeAt(0)) + i) + (parseInt(pieceParentId[1]) + i);
                                    }
                                    if(Vector_Veri < 0 && Vector_Hori > 0){
                                        tileDiagonalRouteId[i-1] = String.fromCharCode(parseInt(pieceParentId[0].charCodeAt(0)) - i) + (parseInt(pieceParentId[1]) + i);
                                    }
                                    if(Vector_Veri > 0 && Vector_Hori < 0){
                                        tileDiagonalRouteId[i-1] = String.fromCharCode(parseInt(pieceParentId[0].charCodeAt(0)) + i) + (parseInt(pieceParentId[1]) - i);
                                    }
                                    if(Vector_Veri < 0 && Vector_Hori < 0){
                                        tileDiagonalRouteId[i-1] = String.fromCharCode(parseInt(pieceParentId[0].charCodeAt(0)) - i) + (parseInt(pieceParentId[1]) - i);
                                    }
                                }
                                CanDiagonal = true;
                                tileDiagonalRouteId.forEach(element => {
                                    let tileCheck = document.getElementById(element);
                                        if(tileCheck.children.length !== 0 ){
                                            let childrenId = tileCheck.children[0].id.toString();
                                            if(childrenId[0] === 'w' && tileDiagonalRouteId[tileDiagonalRouteId.length-1] === element){} else{
                                                CanDiagonal = false;
                                            }
                                    }
                                })
                                
                    }

                    if( Math.abs(parseInt(targetParentId[1]) - parseInt(pieceParentId[1])) === 0 && pieceParentId.toString() !== targetParentId.toString() || Math.abs(parseInt(targetParentId[0].charCodeAt(0)) - parseInt(pieceParentId[0].charCodeAt(0))) === 0 && pieceParentId.toString() !== targetParentId.toString()) {
                        
                        for(let i=1;i <= Math.abs(Vector_Hori) + Math.abs(Vector_Veri);i++)
                                {
                                    if(Vector_Veri > 0 && Vector_Hori === 0){
                                        tileVerticalRouteId[i-1] = String.fromCharCode(parseInt(pieceParentId[0].charCodeAt(0)) + i) + (parseInt(pieceParentId[1]));
                                    }
                                    if(Vector_Veri < 0 && Vector_Hori === 0){
                                        tileVerticalRouteId[i-1] = String.fromCharCode(parseInt(pieceParentId[0].charCodeAt(0)) - i) + (parseInt(pieceParentId[1]));
                                    }
                                    if(Vector_Veri === 0 && Vector_Hori > 0){
                                        tileVerticalRouteId[i-1] = String.fromCharCode(parseInt(pieceParentId[0].charCodeAt(0))) + (parseInt(pieceParentId[1]) + i);
                                    }
                                    if(Vector_Veri === 0 && Vector_Hori < 0){
                                        tileVerticalRouteId[i-1] = String.fromCharCode(parseInt(pieceParentId[0].charCodeAt(0))) + (parseInt(pieceParentId[1]) - i);
                                    }
                                }
                                console.log(tileVerticalRouteId);

                                CanVertical = true;
                                tileVerticalRouteId.forEach(element => {
                                    let tileCheck = document.getElementById(element);
                                        if(tileCheck.children.length !== 0 ){
                                            let childrenId = tileCheck.children[0].id.toString();
                                            if(childrenId[0] === 'w' && tileVerticalRouteId[tileVerticalRouteId.length-1] === element){} else{
                                                CanVertical = false;
                                            }
                                    }
                                })
                    }

                    if(CanDiagonal || CanVertical){
                        ev.preventDefault();
                    }
                }

            }break;

            //Czy Skoczek
            case 'N': {
                if(draggedPiece.id[0] === 'w'){

                    let canMoveOnThat = false;
                    let isThereMyPiece = false;

                    if(Math.abs(parseInt(targetParentId[1])-parseInt(pieceParentId[1]))===2 && Math.abs((targetParentId[0].charCodeAt(0))-pieceParentId[0].charCodeAt(0))===1)
                    canMoveOnThat = true;
                    if(Math.abs(parseInt(targetParentId[1])-parseInt(pieceParentId[1]))===1 && Math.abs((targetParentId[0].charCodeAt(0))-pieceParentId[0].charCodeAt(0))===2)
                    canMoveOnThat = true;
                    if(targetId[0] === 'w'){
                        isThereMyPiece = true;
                    }

                    if(canMoveOnThat && !isThereMyPiece){
                        ev.preventDefault()
                    }
                }
                if(draggedPiece.id[0] === 'b'){

                    let canMoveOnThat = false;
                    let isThereMyPiece = false;

                    if(Math.abs(parseInt(targetParentId[1])-parseInt(pieceParentId[1]))===2 && Math.abs((targetParentId[0].charCodeAt(0))-pieceParentId[0].charCodeAt(0))===1)
                    canMoveOnThat = true;
                    if(Math.abs(parseInt(targetParentId[1])-parseInt(pieceParentId[1]))===1 && Math.abs((targetParentId[0].charCodeAt(0))-pieceParentId[0].charCodeAt(0))===2)
                    canMoveOnThat = true;
                    if(targetId[0] === 'b'){
                        isThereMyPiece = true;
                    }

                    if(canMoveOnThat && !isThereMyPiece){
                        ev.preventDefault()
                    }
                }
            } break;
        }
        
    }
}
