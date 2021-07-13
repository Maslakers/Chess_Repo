function selectLegalFiles(piece)
{
    let parentNode;
    let id;
    switch(piece.type)
    {
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
                    else {if(parentNode != null && parentNode.firstChild.classList != 'piece mur')
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
                    else {if(parentNode != null && parentNode.firstChild.classList != 'piece mur')
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
                    else {if(parentNode != null && parentNode.firstChild.classList != 'piece mur')
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
                if(parentNode != null && (parentNode.firstChild == null || parentNode.firstChild.classList != 'piece mur'))
                    parentNode.classList.add('legalFile')
            }
            break;
    }
}