let timerStarted = false;
let minutesPerPlayer = 3;
function timeControl(minutesPerPlayer)
{
    if(!timerStarted)
    {
        timerStarted = true;
        console.log("setting time control to: "+minutesPerPlayer)
        let whiteSeconds = minutesPerPlayer*600;
        let blackSeconds = minutesPerPlayer*600;
        let percentage_white;
        let percentage_black;
        let Timers = document.getElementsByClassName('progress-bar');

        // whiteTimer.innerHTML = Math.floor(whiteSeconds/600)+' : '+
        // ((whiteSeconds%600 > 100)? whiteSeconds%600/10 : '0'+whiteSeconds%600/10);
        // blackTimer.innerHTML = Math.floor(blackSeconds/600)+' : '+ 
        // ((blackSeconds%600 > 100)? blackSeconds%600/10 : '0'+blackSeconds%600/10);

        percentage_white = Math.floor((whiteSeconds * 100) / (minutesPerPlayer*600));
        percentage_black = Math.floor((blackSeconds * 100) / (minutesPerPlayer*600));
        Timers[0].style.width = percentage_white + '%';


        Timers[1].style.width = percentage_white + '%';


        // The World to zmienna, która zatrzymuje czas, 
        // nazwa jest nawiązaniem do części trzeciej Jojo's Bizzare Adventure
        let theWorld = setInterval(timePassing, 100);
        function timePassing()
        {
            if(whiteSeconds == 0 || blackSeconds == 0)
            {
                console.log(blackSeconds)
                console.log(whiteSeconds)
                clearInterval(theWorld);
            }else
            {
                if(sideMove === 'W')
                {
                    whiteSeconds -= 1;
                    percentage_white = Math.floor((whiteSeconds * 100) / (minutesPerPlayer*600));
                    Timers[0].style.width = percentage_white + '%';
                    // whiteTimer.innerHTML = Math.floor(whiteSeconds/600)+' : '+
                    // ((whiteSeconds%600 > 100)? whiteSeconds%600/10 : '0'+whiteSeconds%600/10);
                }else
                {
                    blackSeconds -= 1;
                    percentage_black = Math.floor((blackSeconds*100) / (minutesPerPlayer*600));
                    Timers[1].style.width = percentage_black + '%';
                    // blackTimer.innerHTML = Math.floor(blackSeconds/600)+' : '+ 
                    // ((blackSeconds%600 > 100)? blackSeconds%600/10 : '0'+blackSeconds%600/10);
                }
            }
        }
    }
}
function play(time)
{
    localStorage.setItem('time', time); 
    window.location.href='Graj/index.html';
}
function notStandard(){
    let chosenTime;
    chosenTime = parseFloat(prompt());
    if(chosenTime > 0 && chosenTime <= 180 && typeof chosenTime === "number"){
        play(chosenTime);
    }
}