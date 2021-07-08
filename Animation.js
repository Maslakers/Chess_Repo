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