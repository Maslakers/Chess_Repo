let timerStarted=false;
let finishedPlacing = false;
let checked = false;
let timeLeft;
function timerStart()
{
    let theWorld;
    if(!timerStarted)
    {
        loadPuzzle();
        timerStarted = true;
        console.log("setting time control to: "+20);
        let element = document.getElementById("timer");
        // ilość czasu w dziesiętnych sekundy
        timeLeft = 200;
        // The World to zmienna, która zatrzymuje czas, 
        // nazwa jest nawiązaniem do części trzeciej Jojo's Bizzare Adventure
        theWorld = setInterval(timePassing, 100);
        function timePassing()
        {
            if(timeLeft <= 0)
            {
                clearInterval(theWorld);
                placePieces();
                finishedPlacing = true;
            }else
            {
                timeLeft--;
                element.innerHTML = timeLeft/10;
            }
        }
        checked = false;
    } else if(!finishedPlacing)
    {
        timeLeft = 1;
        placePieces();
        finishedPlacing = true;
    } else
    {
        check();
        timerStarted = false;
        finishedPlacing = false;
        checked = true;
        solving = false;
        holdedPieceType = null;
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
            bierka.style.height = '65px';
            bierka.style.width = '65px';
            bierka.style.display = 'inline-block';
            bierka.onclick = () => {startHolding(textures[i])};
            document.getElementById("bierki").appendChild(bierka);
        }
        let trashcan = document.createElement('div')
        trashcan.style.backgroundColor = 'red';
        trashcan.style.height = '65px'
        trashcan.style.width = '65px'
        trashcan.style.display = 'inline-block';
        trashcan.onclick = () => {trashCan()};
        trashcan.id = 'trashCan';
        document.getElementById('bierki').appendChild(trashcan);
    }
}