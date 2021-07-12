
let Array_of_Documents = ['main','czas','zadanka','autorzy','eater']

function hover_js(ev){
    let target_tile;
    target_tile = document.getElementById(ev.target.id);
    if(ev.target.id[0].toUpperCase() === sideMove){
        target_tile.style.border = '0.12rem solid yellow';
        target_tile.style.width = '2.8rem';
        target_tile.style.height = '2.8rem';
    } else {
        target_tile.style.border = '0.12rem solid red';
        target_tile.style.width = '2.8rem';
        target_tile.style.height = '2.8rem';
    }
}

function hover_leave_js(ev){
    let target_tile;
    target_tile = document.getElementById(ev.target.id);
    target_tile.style.border = 'none';
    target_tile.style.width = '3rem';
    target_tile.style.height = '3rem';
}

function Zamiana(){
    let i = 0;
    let protoplasta = document.getElementById('main')
    let zamiennik = document.getElementById('ukryty_przycisk');
    zamiennik.style.display = 'inline-block'
    protoplasta.style.display = 'none'
    let x = setInterval(()=>{
        if(i === 1){
            protoplasta.style.display = 'block'
            zamiennik.style.display = 'none'
            clearInterval(x);
        }else {
            i++;
        }
    },300)
}

function ChangeofDocument(whatWasClicked){
    for(let i=0;i<5;i++){
        if(document.getElementById(Array_of_Documents[i]).style.display !== 'none'){
            document.getElementById(Array_of_Documents[i]).style.display = 'none'
        }
    }
    document.getElementById(Array_of_Documents[whatWasClicked-1]).style.display = 'block';
}
