let moving = false;
function moveAnimation(object, destination)
{
    moving = true;
    let id=null;
    //suma klatek w animacji
    let hopCount = 200; 
    
    //stworzenie nowego obrazu do animacji
    let animatedPiece = document.createElement('img');
    animatedPiece.src = pieceTexture(object.type);
    animatedPiece.id = 'animate';
    animatedPiece.className = 'piece';
    console.log(animatedPiece.style.left)
    document.getElementById('board').appendChild(animatedPiece);
    let element = document.getElementById('animate');

    //matematyka
    let xpos = (object.x-1)*65;
    let ypos = (object.y-1)*65;
    let xhop = ((Math.floor(destination/10-1)*65) - xpos)/hopCount;
    let yhop = ((((destination%10)-1)*65) - ypos)/hopCount;
    clearInterval(id);
    id = setInterval(frame, 5);

    //kontynuacjia kodu
    setTimeout(() => {pieces[getPieceId(object.x*10+object.y)].handleMovement(destination)}, 1000);

    //ta funkcja przesuwa figure o kilka pixeli co 0,01 sekundy
    function frame()
    {
        if(xpos == Math.floor(destination/10-1)*65)
        {
            clearInterval(id);
        }else
        {
            xpos += xhop;
            ypos += yhop;
            element.style.bottom = ypos + "px";
            element.style.left = xpos + "px";

        }
    }
}