function check()
{
    let pointcount=0;
    for(let i=0; i<64; i++)
    {
        let id = Math.floor((i)/8+1)*10 + (i%8)+1;
        let file = document.getElementById(id);
        if(file.firstChild == null) continue;
        if(file.childElementCount == 2 && file.firstChild.src == file.lastChild.src) 
        {
            file.firstChild.classList = 'piece selectedPiece';
            pointcount++;
        }
        else if(file.firstChild.classList != 'piece placedPiece') file.firstChild.classList = 'piece incorrectPiece'
    }
    document.getElementById('points2').innerHTML = '+' + pointcount;
    document.getElementById('points1').innerHTML = pointcount + 
    parseInt(document.getElementById('points1').innerHTML);

    for(let i=0; i<document.getElementsByClassName('piece').length; i++)
        document.getElementsByClassName('piece')[i].style.display = 'block';
    holding = false;
    while(0 < document.getElementsByClassName('placedPiece').length)
    {
        document.getElementsByClassName('placedPiece')[0].parentElement.removeChild
        (document.getElementsByClassName('placedPiece')[0]);
    }
    if(document.getElementById('holdedPiece') != null) document.body.removeChild(document.getElementById('holdedPiece'));
}