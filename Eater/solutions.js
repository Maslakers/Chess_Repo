
function correctSelection(selectedId)
{
    for(let i=0; i < correctFiles.length; i++)
    {
        if(selectedId == correctFiles[i])
        {
            correctFiles.splice(i, 1);
            if(correctFiles.length == 0)
            {
                document.getElementById('beforeCorrect').id = 'nice';
                setTimeout(again, 500);
            }
            return true;
        }
    }
    return false;
}
function again()
{
    if(playing)
    {
        started = false;
        reloding = true;
        loadPuzzle();
    }
}