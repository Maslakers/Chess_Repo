let holdedPieceType = null;
let holding = false;
const onMouseMove = (e) =>{
    element.style.left = e.pageX + 'px';
    element.style.top = e.pageY + 'px';
    }
function startHolding(type) 
{
    if(!holding && !checked)
    {
        holding = true;
        let holdedPiece = document.createElement('img');
        holdedPiece.src = pieceTexture(type);
        holdedPiece.id = 'holdedPiece';
        document.body.appendChild(holdedPiece);
        let element = document.getElementById('holdedPiece');
        const onMouseMove = (e) =>{
        element.style.left = e.pageX + 'px';
        element.style.top = e.pageY + 'px';
        }
        document.addEventListener('mousemove', onMouseMove);
        holdedPieceType=type;
    }
    else
    {
        holding = false;
        document.body.removeChild(document.getElementById('holdedPiece'));
        startHolding(type);
    }
}
function selectFiles(id)
{
    if(holdedPieceType != null)
    {
        let newPiece = document.createElement('img');
        newPiece.src = pieceTexture(holdedPieceType);
        newPiece.classList = "piece placedPiece";

        if(document.getElementById(id).lastChild != null && document.getElementById(id).lastChild.classList == 'piece placedPiece') 
        document.getElementById(id).removeChild(document.getElementById(id).lastChild)
        document.getElementById(id).appendChild(newPiece);
    }
    else 
    {
        if(document.getElementById(id).lastChild != null && document.getElementById(id).lastChild.classList == 'piece placedPiece') 
        document.getElementById(id).removeChild(document.getElementById(id).lastChild)
    }
}
function trashCan()
{
    if(holding)
    {
        holding = false;
        holdedPieceType = null;
        document.body.removeChild(document.getElementById('holdedPiece'));
    }
}