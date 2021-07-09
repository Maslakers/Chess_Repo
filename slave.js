
window.onload = isAlive

let jedzenie = 10;


function isAlive() {
  let x = setInterval(() => {
        if(jedzenie <= 0){
            die()
            clearInterval(x);
        } else {
            jedzenie -= 1;
            document.getElementById('slave').innerHTML = 'praca praca'
        }
        update()
    }, 500)
}


function die() {
    document.getElementById('slave').innerHTML = 'Niewolnik umarł, bruh'
}

function feed() {
    jedzenie += 1;
    update()
}

function update() {
    document.getElementById('food').value = jedzenie;
}