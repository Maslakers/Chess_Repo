let count=0;
function startHolding(type) 
{
    let holdedPiece = document.createElement('img');
    holdedPiece.src = pieceTexture(type);
    holdedPiece.id = 'holdedPiece';
    document.body.appendChild(holdedPiece);
    let stopFollowing = setInterval(followCursor, 50)
    function followCursor()
    {
        if(count >=1000)
        {
            clearInterval(stopFollowing);
        }
        else
        {
            document.addEventListener('mousemove', (e) => {
            count++;
            document.getElementById('holdedPiece').style.top = e.clientY + 'px';
            document.getElementById('holdedPiece').style.left = e.clientX + 'px';
            });
        }
    }
}