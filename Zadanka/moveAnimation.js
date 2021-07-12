let moving = false;
function moveAnimation(object, destination)
{
    console.log(object.x, object.y, destination)
    moving = true;
    let id=null;
    //suma klatek w animacji
    let hopCount = 100; 
    
    let element = document.getElementById(object.x*10+object.y).firstChild
    document.getElementById(object.x*10+object.y).style.zIndex=10000;

    //matematyka
    let xpos = 2;
    let ypos = 2;
    let xhop = ((Math.floor(destination/10-1)*65) - (object.x-1)*65)/hopCount;
    let yhop = ((((destination%10)-1)*65) - (object.y-1)*65)/hopCount;
    clearInterval(id);
    id = setInterval(frame, 5);

    //kontynuacjia kodu
    setTimeout(() => {pieces[getPieceId(object.x*10+object.y)].move(destination)}, 500);

    //ta funkcja przesuwa figure o kilka pixeli co 0,01 sekundy
    function frame()
    {
        if(xpos >= Math.floor(destination/10-1)*65)
        {
            clearInterval(id);
        }else
        {
            xpos += xhop;
            ypos -= yhop;
            element.style.top = ypos + "px";
            element.style.left = xpos + "px";

        }
    }
}