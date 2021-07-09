let timerStarted=false;
function timerStart()
{
    let theWorld;
    if(!timerStarted)
    {
        timerStarted = true;
        console.log("setting time control to: "+20);
        let element = document.getElementById("timer");
        // ilość czasu w dziesiętnych sekundy
        let timeLeft = 200;
        // The World to zmienna, która zatrzymuje czas, 
        // nazwa jest nawiązaniem do części trzeciej Jojo's Bizzare Adventure
        theWorld = setInterval(timePassing, 100);
        function timePassing()
        {
            if(timeLeft <= 0)
            {
                clearInterval(theWorld);
                placePieces();
            }else
            {
                timeLeft--;
                element.innerHTML = timeLeft/10;
            }
        }
    } else
    {
        clearInterval(theWorld);
        placePieces();
    }
}
let solving = false;
function placePieces()
{
    if(!solving)
    {
        solving = true;
        for(let i=0; i<document.getElementsByClassName('piece').length; i++)// przestanie wyswietlania bierek na planszy
        document.getElementsByClassName('piece')[i].style.display = 'none';
        for(let i=0; i<12; i++)
        {
            let bierka = document.createElement('img');
            let textures = ['P', 'R', 'N', 'B', 'Q', 'K', 'p', 'r', 'n', 'b', 'q', 'k'];
            bierka.src = pieceTexture(textures[i]);
            bierka.onclick = () => {startHolding(textures[i], event);};
            document.getElementById("bierki").appendChild(bierka);
        }
    }
}