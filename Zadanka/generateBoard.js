function generateBoard()
{
    for(let i=0; i<64; i++)
    {
        let Tile = document.createElement('div');

        //podział pól na ciemne i jasne
        if(i%2==1 && Math.floor(i/8)%2==0 || i%2==0 && Math.floor(i/8)%2==1 )
        Tile.className = "darkSquare";
        else
        Tile.className = "lightSquare";

        //nadawanie id polom: liczba 2-cyfrowa, gdzie pierwsza cyfra jest koordynatem x pola a druga y.
        Tile.id=(1+i%8)*10+(8-Math.floor(i/8));

        Tile.onclick = () => {selectFiles(Tile.id);};
        document.getElementById("board").appendChild(Tile);
    }
}
generateBoard();