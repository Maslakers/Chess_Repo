function selectLegalFiles(piece)
{
    let parentNode;
    let id;
    switch(piece.type)
    {
        case 'P': case 'p': 
            if(piece.y == 2 && document.getElementById(piece.x*10+3).firstChild == null && document.getElementById(piece.x*10+4).firstChild == null) 
                document.getElementById(piece.x*10+4).classList.add('legalFile');
            if(document.getElementById(piece.x*10+piece.y+1).firstChild == null)
                document.getElementById(piece.x*10+piece.y+1).classList.add('legalFile')
            if(document.getElementById(piece.x*10+piece.y+11) != null && document.getElementById(piece.x*10+piece.y+11).firstChild != null && pieces[getPieceId(piece.x*10+piece.y+11)].color != color)
                document.getElementById(piece.x*10+piece.y+11).classList.add('legalFile');
            if(document.getElementById(piece.x*10+piece.y-9) != null && document.getElementById(piece.x*10+piece.y-9).firstChild != null && pieces[getPieceId(piece.x*10+piece.y-9)].color != color)
                document.getElementById(piece.x*10+piece.y-9).classList.add('legalFile'); break;
        case 'R': case 'r':
            for(let j=0; j<4; j++)
                for(let i=0; i<7; i++)
                {
                    switch(j){
                        case 0: id = (piece.x+i+1)*10+piece.y; break;
                        case 1: id = (piece.x-i-1)*10+piece.y; break;
                        case 2: id = piece.x*10+piece.y+i+1; break;
                        case 3: id = piece.x*10+piece.y-i-1; break;
                    }
                    parentNode = document.getElementById(id);
                    if(parentNode != null && parentNode.firstChild == null)
                    parentNode.classList.add('legalFile');
                    else {if(parentNode != null && pieces[getPieceId(id)].color != color)
                        parentNode.classList.add('legalFile')
                        break;}
                }
                break;
                case 'Q': case 'q':
            for(let j=0; j<4; j++)
                for(let i=0; i<7; i++)
                {
                    switch(j){
                        case 0: id = (piece.x+i+1)*10+piece.y; break;
                        case 1: id = (piece.x-i-1)*10+piece.y; break;
                        case 2: id = piece.x*10+piece.y+i+1; break;
                        case 3: id = piece.x*10+piece.y-i-1; break;
                    }
                    parentNode = document.getElementById(id);
                    if(parentNode != null && parentNode.firstChild == null)
                    parentNode.classList.add('legalFile');
                    else {if(parentNode != null && pieces[getPieceId(id)].color != color)
                        parentNode.classList.add('legalFile')
                        break;}
                }
        case 'B': case 'b':
            for(let j=0; j<4; j++)
                for(let i=0; i<7; i++)
                {
                    switch(j)
                    {
                        case 0: id = ((piece.x+1+i)*10+piece.y+1+i); break;
                        case 1: id = ((piece.x+1+i)*10+piece.y-1-i); break;
                        case 2: id = ((piece.x-1-i)*10+piece.y+1+i); break;
                        case 3: id = ((piece.x-1-i)*10+piece.y-1-i); break;
                    }
                    parentNode = document.getElementById(id);
                    if(parentNode != null && parentNode.firstChild == null)
                    parentNode.classList.add('legalFile')
                    else {if(parentNode != null && pieces[getPieceId(id)].color != color)
                    parentNode.classList.add('legalFile')
                    break;}
                }
            break;
        case 'N': case 'n':
            for(let i=0; i<8; i++)
            {
                switch(i)
                {
                    case 0: id = (piece.x-1)*10+piece.y+2; break;
                    case 1: id -= 4; break;
                    case 2: id = (piece.x-2)*10+piece.y+1; break;
                    case 3: id -= 2; break;
                    case 4: id = (piece.x+1)*10+piece.y+2; break;
                    case 5: id -= 4; break;
                    case 6: id = (piece.x+2)*10+piece.y+1; break;
                    case 7: id -= 2; break;
                }
                parentNode = document.getElementById(id);
                if(parentNode != null && (parentNode.firstChild == null || pieces[getPieceId(id)].color != color))
                    parentNode.classList.add('legalFile')
            }
            break;
        case 'K': case 'k':
            for(let i=0; i<8; i++)
            {
                switch(i)
                {
                    case 0: id = (piece.x-1)*10+piece.y-1; break;
                    case 1: case 2: id++; break;
                    case 3: case 4: id +=10; break;
                    case 5: case 6: id--; break;
                    case 7: id -= 10; break;
                }
                parentNode = document.getElementById(id);
                if(parentNode != null && (parentNode.firstChild == null || pieces[getPieceId(id)].color != color))
                    parentNode.classList.add('legalFile')
            }
        break;
    }
}