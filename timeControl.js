let timerStarted = false;
function timeControl(minutesPerPlayer)
{
    if(!timerStarted)
    {
        timerStarted = true;
        console.log("setting time control to: "+minutesPerPlayer)
        let whiteSeconds = minutesPerPlayer*600;
        let blackSeconds = minutesPerPlayer*600;
        let whiteTimer = document.getElementById('timer2');
        let blackTimer = document.getElementById('timer1');
        whiteTimer.innerHTML = Math.floor(whiteSeconds/600)+' : '+'00';
        blackTimer.innerHTML = Math.floor(blackSeconds/600)+' : '+'00';
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
                    whiteTimer.innerHTML = Math.floor(whiteSeconds/600)+' : '+
                    ((whiteSeconds%600 > 100)? whiteSeconds%600/10 : '0'+whiteSeconds%600/10);
                }else
                {
                    blackSeconds -= 1;
                    blackTimer.innerHTML = Math.floor(blackSeconds/600)+' : '+ 
                    ((blackSeconds%600 > 100)? blackSeconds%600/10 : '0'+blackSeconds%600/10);
                }
            }
        }
    }
}

function play(time)
{
    localStorage.setItem('time', time); 
    window.location.href='index.html';
}