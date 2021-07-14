let playing = false;
if(localStorage.getItem('record') == null) localStorage.setItem('record', 0)
document.getElementById('localRecord').innerHTML = localStorage.getItem('record');
function timer()
{
if(!playing)
    {
        let timeLeft = 60;
        id = setInterval(time, 1000)
        function time()
        {
            if(timeLeft<=0)
            {
                clearInterval(id);
                let endScreen = document.createElement('div');
                endScreen.id = 'opis';
                endScreen.innerHTML = '<br><br><br><br><br>Koniec czasu! <br><br> Twój wynik: '+ points + 
                ' p. <br><br> Wciśnij przycis Start! aby zagrać ponownie';
                document.getElementById('board').appendChild(endScreen)
                timeLeft = 0;
                playing = false;
                started = false;
                if(localStorage.getItem('record') != null)
                {
                    if(localStorage.getItem('record') < points)
                    localStorage.setItem('record', points);
                }
                else localStorage.setItem('record', 0)
                document.getElementById('localRecord').innerHTML = localStorage.getItem('record');
            }
            else
            {
                timeLeft--;
                document.getElementById('timer').innerHTML = '0 : '+ ((timeLeft < 10)? '0' + timeLeft : timeLeft);
            }
        }
        playing = true;
    }
}