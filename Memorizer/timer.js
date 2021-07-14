let timerStarted=false;
let finishedPlacing = false;
let checked = false;
let timeLeft;
let openNextPuzzle = false;
let tryAgain = false;

if(localStorage.getItem('memrecord') == null) localStorage.setItem('memrecord', 0)
document.getElementById('localRecord').innerHTML = localStorage.getItem('memrecord');
function timerStart()
{
    let theWorld;
    if(!timerStarted)
    {
        loadPuzzle();
        timerStarted = true;
        let element = document.getElementById("timer");
        // ilość czasu w dziesiętnych sekundy
        timeLeft = 600;
        // The World to zmienna, która zatrzymuje czas, 
        // nazwa jest nawiązaniem do części trzeciej Jojo's Bizzare Adventure
        theWorld = setInterval(timePassing, 100);
        function timePassing()
        {
            if(timeLeft <= 0)
            {
                clearInterval(theWorld);
                let endScreen = document.createElement('div');
                endScreen.id = 'opis';
                endScreen.innerHTML = '<br><br><br><br><br>Koniec czasu! <br><br> Twój wynik: '+ totalPoints + 
                ' p. <br><br> Wciśnij przycis Start! aby zagrać ponownie';
                document.getElementById('board').appendChild(endScreen)
                timeLeft = 0;
                if(localStorage.getItem('memrecord') != null)
                {
                    if(localStorage.getItem('memrecord') < totalPoints)
                    localStorage.setItem('memrecord', totalPoints);
                }
                else localStorage.setItem('memrecord', 0)
                document.getElementById('localRecord').innerHTML = localStorage.getItem('memrecord');
                totalPoints = 0;
                document.getElementById('points1').innerHTML = 0;
                tryAgain = true;
            }else
            {
                timeLeft--;
                element.innerHTML = timeLeft/10;
            }
        }
        checked = false;
    } else if(!finishedPlacing)
    {
        placePieces();
        finishedPlacing = true;
    } else if(!openNextPuzzle)
    {
        document.getElementById('panel').removeChild(document.getElementById('bierki'))
        let bierki = document.createElement('div')
        bierki.id = 'bierki'
        document.getElementById('panel').appendChild(bierki)
        check();
        checked = true;
        solving = false;
        holdedPieceType = null;
        openNextPuzzle = true;
    } else
    {
        openNextPuzzle = false;
        finishedPlacing = false;
        if(tryAgain)
        {
            tryAgain = false;
            timerStarted = false;
            finishedPlacing = false;
            timerStart();
        } else
        loadPuzzle()
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