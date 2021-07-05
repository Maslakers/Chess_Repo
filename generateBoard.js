function generateBoard()
{
    for(let i=0; i<64; i++)
    {
        let Tile = document.createElement('div');
        if(i%2==1 && Math.floor(i/8)%2==0 || i%2==0 && Math.floor(i/8)%2==1 )
        Tile.className = "darkSquare";
        else
        Tile.className = "lightSquare";
        Tile.id=(1+i%8)*10+(8-Math.floor(i/8));
        document.getElementById("board").appendChild(Tile);
    }
}
generateBoard();