
    window.onload = building;

// Kogo kolej (W - white, B - black) 
let sideMove = 'W';
let side_Promotion_Holder;

//castle logic
let Rook_Castle;
let Rook_Castle_tile;
let isCastling = false;
let CastleTiles = ['G1','C1','G8','C8'];

let isThatEnPassent;

//last moved piece
let last_moved_piece;

let attacking_piece = new Array();
//Id pola lub figury na ktora wskazuje gracz
let targetId;

//Czy gracz draguje
let isMoving = false;

//Id figury ktora gracz sie porusza
let pieceId;

//Id pola na ktorym stala / stoi figura ktora gracz sie porusza
let pieceParentId;

//Czy wartosci na poczatku allowDrop() zostaly ustanowione
let isParentIdSettled = false;

//0 - biale, 1 - czarne
//Pion , wieza, skoczek, goniec, hetman, krol
let srcArray = [
    ['data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PHBhdGggZD0iTTIyLjUgOWMtMi4yMSAwLTQgMS43OS00IDQgMCAuODkuMjkgMS43MS43OCAyLjM4QzE3LjMzIDE2LjUgMTYgMTguNTkgMTYgMjFjMCAyLjAzLjk0IDMuODQgMi40MSA1LjAzLTMgMS4wNi03LjQxIDUuNTUtNy40MSAxMy40N2gyM2MwLTcuOTItNC40MS0xMi40MS03LjQxLTEzLjQ3IDEuNDctMS4xOSAyLjQxLTMgMi40MS01LjAzIDAtMi40MS0xLjMzLTQuNS0zLjI4LTUuNjIuNDktLjY3Ljc4LTEuNDkuNzgtMi4zOCAwLTIuMjEtMS43OS00LTQtNHoiIGZpbGw9IiNmZmYiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvc3ZnPg==',
     'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PGcgZmlsbD0iI2ZmZiIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik05IDM5aDI3di0zSDl2M3ptMy0zdi00aDIxdjRIMTJ6bS0xLTIyVjloNHYyaDVWOWg1djJoNVY5aDR2NSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48cGF0aCBkPSJNMzQgMTRsLTMgM0gxNGwtMy0zIi8+PHBhdGggZD0iTTMxIDE3djEyLjVIMTRWMTciIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIi8+PHBhdGggZD0iTTMxIDI5LjVsMS41IDIuNWgtMjBsMS41LTIuNSIvPjxwYXRoIGQ9Ik0xMSAxNGgyMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIvPjwvZz48L3N2Zz4=',
     'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0yMiAxMGMxMC41IDEgMTYuNSA4IDE2IDI5SDE1YzAtOSAxMC02LjUgOC0yMSIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0yNCAxOGMuMzggMi45MS01LjU1IDcuMzctOCA5LTMgMi0yLjgyIDQuMzQtNSA0LTEuMDQyLS45NCAxLjQxLTMuMDQgMC0zLTEgMCAuMTkgMS4yMy0xIDItMSAwLTQuMDAzIDEtNC00IDAtMiA2LTEyIDYtMTJzMS44OS0xLjkgMi0zLjVjLS43My0uOTk0LS41LTItLjUtMyAxLTEgMyAyLjUgMyAyLjVoMnMuNzgtMS45OTIgMi41LTNjMSAwIDEgMyAxIDMiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNOS41IDI1LjVhLjUuNSAwIDEgMS0xIDAgLjUuNSAwIDEgMSAxIDB6bTUuNDMzLTkuNzVhLjUgMS41IDMwIDEgMS0uODY2LS41LjUgMS41IDMwIDEgMSAuODY2LjV6IiBmaWxsPSIjMDAwIi8+PC9nPjwvc3ZnPg==',
     'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxnIGZpbGw9IiNmZmYiIHN0cm9rZS1saW5lY2FwPSJidXR0Ij48cGF0aCBkPSJNOSAzNmMzLjM5LS45NyAxMC4xMS40MyAxMy41LTIgMy4zOSAyLjQzIDEwLjExIDEuMDMgMTMuNSAyIDAgMCAxLjY1LjU0IDMgMi0uNjguOTctMS42NS45OS0zIC41LTMuMzktLjk3LTEwLjExLjQ2LTEzLjUtMS0zLjM5IDEuNDYtMTAuMTEuMDMtMTMuNSAxLTEuMzU0LjQ5LTIuMzIzLjQ3LTMtLjUgMS4zNTQtMS45NCAzLTIgMy0yeiIvPjxwYXRoIGQ9Ik0xNSAzMmMyLjUgMi41IDEyLjUgMi41IDE1IDAgLjUtMS41IDAtMiAwLTIgMC0yLjUtMi41LTQtMi41LTQgNS41LTEuNSA2LTExLjUtNS0xNS41LTExIDQtMTAuNSAxNC01IDE1LjUgMCAwLTIuNSAxLjUtMi41IDQgMCAwLS41LjUgMCAyeiIvPjxwYXRoIGQ9Ik0yNSA4YTIuNSAyLjUgMCAxIDEtNSAwIDIuNSAyLjUgMCAxIDEgNSAweiIvPjwvZz48cGF0aCBkPSJNMTcuNSAyNmgxME0xNSAzMGgxNW0tNy41LTE0LjV2NU0yMCAxOGg1IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIi8+PC9nPjwvc3ZnPg==',
     'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PGcgZmlsbD0iI2ZmZiIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik04IDEyYTIgMiAwIDEgMS00IDAgMiAyIDAgMSAxIDQgMHptMTYuNS00LjVhMiAyIDAgMSAxLTQgMCAyIDIgMCAxIDEgNCAwek00MSAxMmEyIDIgMCAxIDEtNCAwIDIgMiAwIDEgMSA0IDB6TTE2IDguNWEyIDIgMCAxIDEtNCAwIDIgMiAwIDEgMSA0IDB6TTMzIDlhMiAyIDAgMSAxLTQgMCAyIDIgMCAxIDEgNCAweiIvPjxwYXRoIGQ9Ik05IDI2YzguNS0xLjUgMjEtMS41IDI3IDBsMi0xMi03IDExVjExbC01LjUgMTMuNS0zLTE1LTMgMTUtNS41LTE0VjI1TDcgMTRsMiAxMnoiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PHBhdGggZD0iTTkgMjZjMCAyIDEuNSAyIDIuNSA0IDEgMS41IDEgMSAuNSAzLjUtMS41IDEtMS41IDIuNS0xLjUgMi41LTEuNSAxLjUuNSAyLjUuNSAyLjUgNi41IDEgMTYuNSAxIDIzIDAgMCAwIDEuNS0xIDAtMi41IDAgMCAuNS0xLjUtMS0yLjUtLjUtMi41LS41LTIgLjUtMy41IDEtMiAyLjUtMiAyLjUtNC04LjUtMS41LTE4LjUtMS41LTI3IDB6IiBzdHJva2UtbGluZWNhcD0iYnV0dCIvPjxwYXRoIGQ9Ik0xMS41IDMwYzMuNS0xIDE4LjUtMSAyMiAwTTEyIDMzLjVjNi0xIDE1LTEgMjEgMCIgZmlsbD0ibm9uZSIvPjwvZz48L3N2Zz4=',
     'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0yMi41IDExLjYzVjZNMjAgOGg1IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIi8+PHBhdGggZD0iTTIyLjUgMjVzNC41LTcuNSAzLTEwLjVjMCAwLTEtMi41LTMtMi41cy0zIDIuNS0zIDIuNWMtMS41IDMgMyAxMC41IDMgMTAuNSIgZmlsbD0iI2ZmZiIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiLz48cGF0aCBkPSJNMTEuNSAzN2M1LjUgMy41IDE1LjUgMy41IDIxIDB2LTdzOS00LjUgNi0xMC41Yy00LTYuNS0xMy41LTMuNS0xNiA0VjI3di0zLjVjLTMuNS03LjUtMTMtMTAuNS0xNi00LTMgNiA1IDEwIDUgMTBWMzd6IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTExLjUgMzBjNS41LTMgMTUuNS0zIDIxIDBtLTIxIDMuNWM1LjUtMyAxNS41LTMgMjEgMG0tMjEgMy41YzUuNS0zIDE1LjUtMyAyMSAwIi8+PC9nPjwvc3ZnPg=='],
    ['data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PHBhdGggZD0iTTIyLjUgOWMtMi4yMSAwLTQgMS43OS00IDQgMCAuODkuMjkgMS43MS43OCAyLjM4QzE3LjMzIDE2LjUgMTYgMTguNTkgMTYgMjFjMCAyLjAzLjk0IDMuODQgMi40MSA1LjAzLTMgMS4wNi03LjQxIDUuNTUtNy40MSAxMy40N2gyM2MwLTcuOTItNC40MS0xMi40MS03LjQxLTEzLjQ3IDEuNDctMS4xOSAyLjQxLTMgMi40MS01LjAzIDAtMi40MS0xLjMzLTQuNS0zLjI4LTUuNjIuNDktLjY3Ljc4LTEuNDkuNzgtMi4zOCAwLTIuMjEtMS43OS00LTQtNHoiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvc3ZnPg==',
     'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PGcgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik05IDM5aDI3di0zSDl2M3ptMy41LTdsMS41LTIuNWgxN2wxLjUgMi41aC0yMHptLS41IDR2LTRoMjF2NEgxMnoiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PHBhdGggZD0iTTE0IDI5LjV2LTEzaDE3djEzSDE0eiIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiLz48cGF0aCBkPSJNMTQgMTYuNUwxMSAxNGgyM2wtMyAyLjVIMTR6TTExIDE0VjloNHYyaDVWOWg1djJoNVY5aDR2NUgxMXoiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PHBhdGggZD0iTTEyIDM1LjVoMjFtLTIwLTRoMTltLTE4LTJoMTdtLTE3LTEzaDE3TTExIDE0aDIzIiBmaWxsPSJub25lIiBzdHJva2U9IiNlY2VjZWMiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIvPjwvZz48L3N2Zz4=',
     'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0yMiAxMGMxMC41IDEgMTYuNSA4IDE2IDI5SDE1YzAtOSAxMC02LjUgOC0yMSIgZmlsbD0iIzAwMCIvPjxwYXRoIGQ9Ik0yNCAxOGMuMzggMi45MS01LjU1IDcuMzctOCA5LTMgMi0yLjgyIDQuMzQtNSA0LTEuMDQyLS45NCAxLjQxLTMuMDQgMC0zLTEgMCAuMTkgMS4yMy0xIDItMSAwLTQuMDAzIDEtNC00IDAtMiA2LTEyIDYtMTJzMS44OS0xLjkgMi0zLjVjLS43My0uOTk0LS41LTItLjUtMyAxLTEgMyAyLjUgMyAyLjVoMnMuNzgtMS45OTIgMi41LTNjMSAwIDEgMyAxIDMiIGZpbGw9IiMwMDAiLz48cGF0aCBkPSJNOS41IDI1LjVhLjUuNSAwIDEgMS0xIDAgLjUuNSAwIDEgMSAxIDB6bTUuNDMzLTkuNzVhLjUgMS41IDMwIDEgMS0uODY2LS41LjUgMS41IDMwIDEgMSAuODY2LjV6IiBmaWxsPSIjZWNlY2VjIiBzdHJva2U9IiNlY2VjZWMiLz48cGF0aCBkPSJNMjQuNTUgMTAuNGwtLjQ1IDEuNDUuNS4xNWMzLjE1IDEgNS42NSAyLjQ5IDcuOSA2Ljc1UzM1Ljc1IDI5LjA2IDM1LjI1IDM5bC0uMDUuNWgyLjI1bC4wNS0uNWMuNS0xMC4wNi0uODgtMTYuODUtMy4yNS0yMS4zNC0yLjM3LTQuNDktNS43OS02LjY0LTkuMTktNy4xNmwtLjUxLS4xeiIgZmlsbD0iI2VjZWNlYyIgc3Ryb2tlPSJub25lIi8+PC9nPjwvc3ZnPg==',
     'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxnIGZpbGw9IiMwMDAiIHN0cm9rZS1saW5lY2FwPSJidXR0Ij48cGF0aCBkPSJNOSAzNmMzLjM5LS45NyAxMC4xMS40MyAxMy41LTIgMy4zOSAyLjQzIDEwLjExIDEuMDMgMTMuNSAyIDAgMCAxLjY1LjU0IDMgMi0uNjguOTctMS42NS45OS0zIC41LTMuMzktLjk3LTEwLjExLjQ2LTEzLjUtMS0zLjM5IDEuNDYtMTAuMTEuMDMtMTMuNSAxLTEuMzU0LjQ5LTIuMzIzLjQ3LTMtLjUgMS4zNTQtMS45NCAzLTIgMy0yeiIvPjxwYXRoIGQ9Ik0xNSAzMmMyLjUgMi41IDEyLjUgMi41IDE1IDAgLjUtMS41IDAtMiAwLTIgMC0yLjUtMi41LTQtMi41LTQgNS41LTEuNSA2LTExLjUtNS0xNS41LTExIDQtMTAuNSAxNC01IDE1LjUgMCAwLTIuNSAxLjUtMi41IDQgMCAwLS41LjUgMCAyeiIvPjxwYXRoIGQ9Ik0yNSA4YTIuNSAyLjUgMCAxIDEtNSAwIDIuNSAyLjUgMCAxIDEgNSAweiIvPjwvZz48cGF0aCBkPSJNMTcuNSAyNmgxME0xNSAzMGgxNW0tNy41LTE0LjV2NU0yMCAxOGg1IiBzdHJva2U9IiNlY2VjZWMiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiLz48L2c+PC9zdmc+',
     'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PGcgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxnIHN0cm9rZT0ibm9uZSI+PGNpcmNsZSBjeD0iNiIgY3k9IjEyIiByPSIyLjc1Ii8+PGNpcmNsZSBjeD0iMTQiIGN5PSI5IiByPSIyLjc1Ii8+PGNpcmNsZSBjeD0iMjIuNSIgY3k9IjgiIHI9IjIuNzUiLz48Y2lyY2xlIGN4PSIzMSIgY3k9IjkiIHI9IjIuNzUiLz48Y2lyY2xlIGN4PSIzOSIgY3k9IjEyIiByPSIyLjc1Ii8+PC9nPjxwYXRoIGQ9Ik05IDI2YzguNS0xLjUgMjEtMS41IDI3IDBsMi41LTEyLjVMMzEgMjVsLS4zLTE0LjEtNS4yIDEzLjYtMy0xNC41LTMgMTQuNS01LjItMTMuNkwxNCAyNSA2LjUgMTMuNSA5IDI2eiIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48cGF0aCBkPSJNOSAyNmMwIDIgMS41IDIgMi41IDQgMSAxLjUgMSAxIC41IDMuNS0xLjUgMS0xLjUgMi41LTEuNSAyLjUtMS41IDEuNS41IDIuNS41IDIuNSA2LjUgMSAxNi41IDEgMjMgMCAwIDAgMS41LTEgMC0yLjUgMCAwIC41LTEuNS0xLTIuNS0uNS0yLjUtLjUtMiAuNS0zLjUgMS0yIDIuNS0yIDIuNS00LTguNS0xLjUtMTguNS0xLjUtMjcgMHoiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PHBhdGggZD0iTTExIDM4LjVhMzUgMzUgMSAwIDAgMjMgMCIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48cGF0aCBkPSJNMTEgMjlhMzUgMzUgMSAwIDEgMjMgMG0tMjEuNSAyLjVoMjBtLTIxIDNhMzUgMzUgMSAwIDAgMjIgMG0tMjMgM2EzNSAzNSAxIDAgMCAyNCAwIiBmaWxsPSJub25lIiBzdHJva2U9IiNlY2VjZWMiLz48L2c+PC9zdmc+',
     'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0yMi41IDExLjYzVjYiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiLz48cGF0aCBkPSJNMjIuNSAyNXM0LjUtNy41IDMtMTAuNWMwIDAtMS0yLjUtMy0yLjVzLTMgMi41LTMgMi41Yy0xLjUgMyAzIDEwLjUgMyAxMC41IiBmaWxsPSIjMDAwIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIvPjxwYXRoIGQ9Ik0xMS41IDM3YzUuNSAzLjUgMTUuNSAzLjUgMjEgMHYtN3M5LTQuNSA2LTEwLjVjLTQtNi41LTEzLjUtMy41LTE2IDRWMjd2LTMuNWMtMy41LTcuNS0xMy0xMC41LTE2LTQtMyA2IDUgMTAgNSAxMFYzN3oiIGZpbGw9IiMwMDAiLz48cGF0aCBkPSJNMjAgOGg1IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIi8+PHBhdGggZD0iTTMyIDI5LjVzOC41LTQgNi4wMy05LjY1QzM0LjE1IDE0IDI1IDE4IDIyLjUgMjQuNWwuMDEgMi4xLS4wMS0yLjFDMjAgMTggOS45MDYgMTQgNi45OTcgMTkuODVjLTIuNDk3IDUuNjUgNC44NTMgOSA0Ljg1MyA5IiBzdHJva2U9IiNlY2VjZWMiLz48cGF0aCBkPSJNMTEuNSAzMGM1LjUtMyAxNS41LTMgMjEgMG0tMjEgMy41YzUuNS0zIDE1LjUtMyAyMSAwbS0yMSAzLjVjNS41LTMgMTUuNS0zIDIxIDAiIHN0cm9rZT0iI2VjZWNlYyIvPjwvZz48L3N2Zz4=']
]

//Figura ktora gracz dragguje;
let draggedPiece;

//Id pola, na ktorym stoi figura lub nie
let targetParentId;

//Wszystkie Pola
let tileRef;
//Wszystkie figury
let pieceRef
//King Position
let King_Position = new Array(2);
King_Position[0] = 'E1'
King_Position[1] = 'E8'
//Funkcja ta buduje cala szachownice i oznacza ja oraz figury odpowiednimi id oraz klasami
function building() {
    let chessboard = document.getElementById('chessBoard');
    let column = 1;
    let notation = 'A';
    for(let i = 0;i<64;i++) {

        //Tworzenie pol i figur
        let TILE = document.createElement('div');
        let Piece = document.createElement('img');
        TILE.className = 'chessTiles';
        Piece.className = 'Piece';
        Piece.draggable = true;


        //Parametr sprawdzajacy czy gracz juz sie ruszyl tym pionkiem, 0 - nie 1 - tak
        Piece.alt = '0';

        chessboard.append(TILE);
        if(i%8===0 && i!==0){
            column++;
        }
        switch(i%8){
            case 0: notation = 'A'; break;
            case 1: notation = 'B'; break;
            case 2: notation = 'C'; break;
            case 3: notation = 'D'; break;
            case 4: notation = 'E'; break;
            case 5: notation = 'F'; break;
            case 6: notation = 'G'; break;
            case 7: notation = 'H'; break;
        }
        TILE.id = `${notation}${9-column}`

        //Ustawianie figur i kolorow pol na szachownicy
        //kolory
        if(i%2===0 && column%2===1){
            TILE.style.backgroundColor = 'white';
        }else if(i%2===1 && column%2===0) {
            TILE.style.backgroundColor = 'white';
        }

        //kolory
        if(i%2===1 && column%2===1){
            TILE.style.backgroundColor = '#b58863';
        }else if(i%2===0 && column%2===0) {
            TILE.style.backgroundColor = '#b58863';
        }

        //Wieze
        if(i===0&&column===1||i===7&&column===1){
            Piece.src = new URL(srcArray[1][1])
            Piece.id = 'bR' + (i%2+1);
            TILE.append(Piece);
        }else if(i%8===0&&column===8||i%8===7&&column===8){
            Piece.src = new URL(srcArray[0][1])
            Piece.id = 'wR' + (i%2+1);
            TILE.append(Piece);
        }

        //Skoczki
        if(i%8===1&&column===1||i%8===6&&column===1){
            Piece.src = new URL(srcArray[1][2]);
            Piece.id = 'bN' + (i%2+1);
            TILE.append(Piece);
        }else if(i%8===1&&column===8||i%8===6&&column===8){
            Piece.src = new URL(srcArray[0][2]);
            Piece.id = 'wN' + (i%2+1);
            TILE.append(Piece);
        }

        //Gonce
        if(i%8===2&&column===1||i%8===5&&column===1){
            Piece.src = new URL(srcArray[1][3]);
            Piece.id = 'bB' + (i%2+1);
            TILE.append(Piece);
        }else if(i%8===2&&column===8||i%8===5&&column===8){
            Piece.src = new URL(srcArray[0][3]);
            Piece.id = 'wB' + (i%2+1);
            TILE.append(Piece);
        }

        //Hetmany
        if(i%8===3&&column===1){
            Piece.src = new URL(srcArray[1][4]);
            Piece.id = 'bQ' + (i%2+1);
            TILE.append(Piece);
        }else if(i%8===3&&column===8){
            Piece.src = new URL(srcArray[0][4]);
            Piece.id = 'wQ' + (i%2+1);
            TILE.append(Piece);
        }

        //Krole
        if(i%8===4&&column===1){
            Piece.src = new URL(srcArray[1][5]);
            Piece.id = 'bK' + (i%2+1);
            TILE.append(Piece);
        }else if(i%8===4&&column===8){
            Piece.src = new URL(srcArray[0][5])
            Piece.id = 'wK' + (i%2+1);
            TILE.append(Piece);
        }

        //Pionki
        if(column === 2){
            Piece.src = 'Pieces/black_pawn.png';
            Piece.src = new URL(srcArray[1][0])
            Piece.id = 'bP' + (i%8+1);
            TILE.append(Piece)
        }else if(column === 7){
            Piece.id = 'wP' + (i%8+1);
            Piece.src = new URL(srcArray[0][0])
            Piece.classList.add('Pawn');
            TILE.append(Piece)
        }
    }
        //odniesienia do wszystkich elementow z klasy
        tileRef = document.getElementsByClassName('chessTiles');
        pieceRef = document.getElementsByClassName('Piece');

        //Dodawanie zawiadomienia do wszystkich odpowiednich elementow na szachownicy
        for(let j=0;j<64;j++){
            tileRef[j].addEventListener('drop', drop);
            tileRef[j].addEventListener('dragover', allowDrop);
            pieceRef[j%32].addEventListener('dragstart', drag);
            pieceRef[j%32].addEventListener('mouseover', hover_js);
            pieceRef[j%32].addEventListener('mouseleave', hover_leave_js)
        }
}

//Funkcja drop, aktywuje sie gdy uzytkownik upusci figure
function drop(ev) {
    ev.preventDefault();
    if(pieceId[1] === 'K'){
        King_Position[BlackorWhite(sideMove)] = targetParentId;
        if(isCastling && checkValidCastleTiles()){
            document.getElementById(Rook_Castle_tile).append(document.getElementById(Rook_Castle).firstChild);
        }
    }
    if(pieceId[1] === 'P'){
        if(isOnThePromotingSquare()){
            let promote = document.getElementById('promote');
            if(sideMove === 'W'){
                for(let i=1;i<5;i++){
                    promote.children[i-1].src= srcArray[0][i];
                }
            } else {
                for(let i=1;i<5;i++){
                    promote.children[i-1].src = srcArray[1][i];
                }
            }
            promote.style.display = 'block';
            side_Promotion_Holder = sideMove;
            sideMove = ''
        }
    }
    if(isThatEnPassent){
        last_moved_piece.remove()
    }
    if(draggedPiece.alt === '1' || draggedPiece.alt === '2'){draggedPiece.alt = '2'} else {draggedPiece.alt = '1';}
    last_moved_piece = draggedPiece;
    let data = ev.dataTransfer.getData('text');
    if(ev.target.id[0] === 'b' || ev.target.id[0] === 'w'){
        ev.target.remove();
        let parent = document.getElementById(targetParentId);
        parent.append(document.getElementById(data));
    }
    else{
        ev.target.append(document.getElementById(data));
    }
    if(sideMove === 'W'){
            sideMove = 'B';
        }else if(sideMove === 'B'){
            sideMove = 'W';
    }
}

//Ondragstart, dodatkowo resetuje parametry ciagnietej poprzednio figury 
function drag(ev) {
    ev.dataTransfer.setData('text', ev.target.id);
    isParentIdSettled = false;
    isCastling = false;
    isThatEnPassent = false;
}


//Ondragover, cala logika tego kiedy gracz moze sie poruszyc, czym i gdzie
function allowDrop(ev) {

    targetId = ev.target.id;
    //Ustanawianie parametrow, Id figury, Figury ciagnietej, Id punktu startowego figury
    if(!isParentIdSettled){
        pieceId = ev.target.id;
        draggedPiece = document.getElementById(pieceId);
        pieceParentId = document.getElementById(pieceId).closest('div').id;
        if(pieceId[0].toUpperCase() === sideMove){
            isParentIdSettled = true;
        }
    }

    //Ustanawianie tego na co gracz patrzy (myszka)

    // Test sprawdzajacy czy porusza sie odpowiedni gracz w zaleznosci od tury
    if(draggedPiece.id[0] ==='b' && sideMove === 'B' || draggedPiece.id[0] === 'w' && sideMove === 'W')
    {
        //Parametr id pola na ktorym stoi inna figura lub nie
        targetParentId = document.getElementById(targetId).closest('div').id;

        //Sprawdzanie ktora figura sie gracz porusza
        switch(draggedPiece.id[1]){

            //Czy Pionek
            case 'P': {
                if(draggedPiece.id[0] === 'w') {
                    let enemy = 'b'
                    let side = 1;
                    if(Pawn_move(enemy,side)){
                        ev.preventDefault();
                    }
                } 
                
                else if(draggedPiece.id[0] === 'b') {
                    let side = -1;
                    let enemy = 'w'
                    if(Pawn_move(enemy,side)){
                        ev.preventDefault();
                    }
                }
            }break;

            //Czy krol
            case 'K': {
                if(draggedPiece.id[0] === 'w'){
                    let enemy = 'b'
                    let mypiece = 'w'
                    if(King_move(enemy,mypiece)){
                        ev.preventDefault()
                    }

                }else if(draggedPiece.id[0] === 'b'){
                    let enemy = 'w'
                    let mypiece = 'b'
                    if(King_move(enemy,mypiece)){
                        ev.preventDefault()
                    }
                }
            }break;

            //Czy goniec
            case 'B': {
                    if(draggedPiece.id[0] === 'w'){
                        let enemy = 'b';
                        if(Bishop_move(enemy)){
                            ev.preventDefault()
                        }

                    } else if(draggedPiece.id[0] === 'b'){
                        let enemy = 'w';
                        if(Bishop_move(enemy)){
                            ev.preventDefault()
                        }
                    }

                }break;

            //Czy Wieza
            case 'R': {
                if(draggedPiece.id[0] === 'w'){
                    let enemy = 'b'
                    if(Rook_move(enemy)){
                        ev.preventDefault()
                    }
                }

                else if(draggedPiece.id[0] === 'b'){
                    let enemy = 'w'
                    if(Rook_move(enemy)){
                        ev.preventDefault()
                    }
                }
            }break;


        //Czy Hetman
            case 'Q': {
                if(draggedPiece.id[0] === 'w'){
                    let enemy = 'b'
                    if(Queen_move(enemy)){
                        ev.preventDefault()
                    }
                }
                
                else if(draggedPiece.id[0] === 'b'){
                    let enemy = 'w';
                    if(Queen_move(enemy)){
                        ev.preventDefault()
                    }
                }

            }break;

            //Czy Skoczek
            case 'N': {
                if(draggedPiece.id[0] === 'w'){
                    let mypiece = 'w'
                    let enemy = 'b'
                    if(Knight_move(mypiece,enemy)){
                        ev.preventDefault();
                    }
                }
                else if(draggedPiece.id[0] === 'b'){
                    let mypiece = 'b'
                    let enemy = 'w'
                    if(Knight_move(mypiece,enemy)){
                        ev.preventDefault();
                    } 
                }
            }
        }
        
    }
}

function Bishop_move(enemy){
    let CanDiagonal = false;
    let CanMove = false;
    //Wektor Poziomy
    let Vector_Veri = parseInt(targetParentId[0].charCodeAt(0)) - parseInt(pieceParentId[0].charCodeAt(0));

    //Wektor Pionowy
    let Vector_Hori = parseInt(targetParentId[1]) - parseInt(pieceParentId[1]);

    let tileDiagonalRouteId = new Array();

    if( Math.abs(parseInt(targetParentId[1]) - parseInt(pieceParentId[1])) - Math.abs(parseInt(targetParentId[0].charCodeAt(0)) - parseInt(pieceParentId[0].charCodeAt(0))) === 0 && parseInt(targetParentId[1]) - parseInt(pieceParentId[1]) !== 0) {

        for(let i=1;i<=Math.abs(Vector_Hori);i++){

            if(Vector_Veri > 0 && Vector_Hori > 0){
                tileDiagonalRouteId[i-1] = String.fromCharCode(parseInt(pieceParentId[0].charCodeAt(0)) + i) + (parseInt(pieceParentId[1]) + i);
            }
            if(Vector_Veri < 0 && Vector_Hori > 0){
                tileDiagonalRouteId[i-1] = String.fromCharCode(parseInt(pieceParentId[0].charCodeAt(0)) - i) + (parseInt(pieceParentId[1]) + i);
            }
            if(Vector_Veri > 0 && Vector_Hori < 0){
                tileDiagonalRouteId[i-1] = String.fromCharCode(parseInt(pieceParentId[0].charCodeAt(0)) + i) + (parseInt(pieceParentId[1]) - i);
            }
            if(Vector_Veri < 0 && Vector_Hori < 0){
                tileDiagonalRouteId[i-1] = String.fromCharCode(parseInt(pieceParentId[0].charCodeAt(0)) - i) + (parseInt(pieceParentId[1]) - i);
            }
        }
        CanDiagonal = true;
        tileDiagonalRouteId.forEach(element => {
            let tileCheck = document.getElementById(element);
            if(tileCheck.children.length !== 0 ){
                let childrenId = tileCheck.children[0].id.toString();
                if(childrenId[0] === enemy && tileDiagonalRouteId[tileDiagonalRouteId.length-1] === element){} else{
                    CanDiagonal = false;
                }
            }
        })
    }
        if(CanDiagonal){
            CanMove = true;
        }
        if(CanMove && !isKing_GonnabeAttacked(enemy)){
            return true
        } else {
            return false;
        }
}

function Rook_move(enemy){
    let CanVertical = false;
    let CanMove = false;

    let Vector_Veri = parseInt(targetParentId[0].charCodeAt(0)) - parseInt(pieceParentId[0].charCodeAt(0));
    let Vector_Hori = parseInt(targetParentId[1]) - parseInt(pieceParentId[1]);

    let tileVerticalRouteId = new Array();
    if( Math.abs(parseInt(targetParentId[1]) - parseInt(pieceParentId[1])) === 0 && pieceParentId.toString() !== targetParentId.toString() || Math.abs(parseInt(targetParentId[0].charCodeAt(0)) - parseInt(pieceParentId[0].charCodeAt(0))) === 0 && pieceParentId.toString() !== targetParentId.toString()) {

        for(let i=1;i <= Math.abs(Vector_Hori) + Math.abs(Vector_Veri);i++){
            if(Vector_Veri > 0 && Vector_Hori === 0){
                tileVerticalRouteId[i-1] = String.fromCharCode(parseInt(pieceParentId[0].charCodeAt(0)) + i) + (parseInt(pieceParentId[1]));
            }
            if(Vector_Veri < 0 && Vector_Hori === 0){
                tileVerticalRouteId[i-1] = String.fromCharCode(parseInt(pieceParentId[0].charCodeAt(0)) - i) + (parseInt(pieceParentId[1]));
            }
            if(Vector_Veri === 0 && Vector_Hori > 0){
                tileVerticalRouteId[i-1] = String.fromCharCode(parseInt(pieceParentId[0].charCodeAt(0))) + (parseInt(pieceParentId[1]) + i);
            }
            if(Vector_Veri === 0 && Vector_Hori < 0){
                tileVerticalRouteId[i-1] = String.fromCharCode(parseInt(pieceParentId[0].charCodeAt(0))) + (parseInt(pieceParentId[1]) - i);
            }
        }

            CanVertical = true;

            tileVerticalRouteId.forEach(element => {
                let tileCheck = document.getElementById(element);
                if(tileCheck.children.length !== 0 ){
                    let childrenId = tileCheck.children[0].id.toString();
                    if(childrenId[0] === enemy && tileVerticalRouteId[tileVerticalRouteId.length-1] === element){} else{
                        CanVertical = false;
                    }
                }
            })
    }
    if(CanVertical){
        CanMove = true
    }
    if(CanMove && !isKing_GonnabeAttacked(enemy)){
        return true;
    } else {
        return false;
    }
}





function Queen_move(enemy){

    CanMove = false;

    let CanVertical = false;
    let CanDiagonal = false;

    let Vector_Veri = parseInt(targetParentId[0].charCodeAt(0)) - parseInt(pieceParentId[0].charCodeAt(0));
    let Vector_Hori = parseInt(targetParentId[1]) - parseInt(pieceParentId[1]);

    let tileDiagonalRouteId = new Array();
    let tileVerticalRouteId = new Array();

    if( Math.abs(parseInt(targetParentId[1]) - parseInt(pieceParentId[1])) - Math.abs(parseInt(targetParentId[0].charCodeAt(0)) - parseInt(pieceParentId[0].charCodeAt(0))) === 0 && parseInt(targetParentId[1]) - parseInt(pieceParentId[1]) !== 0) {

        for(let i=1;i<=Math.abs(Vector_Hori);i++){

            if(Vector_Veri > 0 && Vector_Hori > 0){
                tileDiagonalRouteId[i-1] = String.fromCharCode(parseInt(pieceParentId[0].charCodeAt(0)) + i) + (parseInt(pieceParentId[1]) + i);
            }
            if(Vector_Veri < 0 && Vector_Hori > 0){
                tileDiagonalRouteId[i-1] = String.fromCharCode(parseInt(pieceParentId[0].charCodeAt(0)) - i) + (parseInt(pieceParentId[1]) + i);
            }
            if(Vector_Veri > 0 && Vector_Hori < 0){
                tileDiagonalRouteId[i-1] = String.fromCharCode(parseInt(pieceParentId[0].charCodeAt(0)) + i) + (parseInt(pieceParentId[1]) - i);
            }
            if(Vector_Veri < 0 && Vector_Hori < 0){
                tileDiagonalRouteId[i-1] = String.fromCharCode(parseInt(pieceParentId[0].charCodeAt(0)) - i) + (parseInt(pieceParentId[1]) - i);
            }
        }
        CanDiagonal = true;
        tileDiagonalRouteId.forEach(element => {
            let tileCheck = document.getElementById(element);
            if(tileCheck.children.length !== 0 ){
                let childrenId = tileCheck.children[0].id.toString();
                if(childrenId[0] === enemy && tileDiagonalRouteId[tileDiagonalRouteId.length-1] === element){} else{
                    CanDiagonal = false;
                }
            }
        })
    }
        if( Math.abs(parseInt(targetParentId[1]) - parseInt(pieceParentId[1])) === 0 && pieceParentId.toString() !== targetParentId.toString() || Math.abs(parseInt(targetParentId[0].charCodeAt(0)) - parseInt(pieceParentId[0].charCodeAt(0))) === 0 && pieceParentId.toString() !== targetParentId.toString()) {
            for(let i=1;i <= Math.abs(Vector_Hori) + Math.abs(Vector_Veri);i++)
                    {
                        if(Vector_Veri > 0 && Vector_Hori === 0){
                            tileVerticalRouteId[i-1] = String.fromCharCode(parseInt(pieceParentId[0].charCodeAt(0)) + i) + (parseInt(pieceParentId[1]));
                        }
                        if(Vector_Veri < 0 && Vector_Hori === 0){
                            tileVerticalRouteId[i-1] = String.fromCharCode(parseInt(pieceParentId[0].charCodeAt(0)) - i) + (parseInt(pieceParentId[1]));
                        }
                        if(Vector_Veri === 0 && Vector_Hori > 0){
                            tileVerticalRouteId[i-1] = String.fromCharCode(parseInt(pieceParentId[0].charCodeAt(0))) + (parseInt(pieceParentId[1]) + i);
                        }
                        if(Vector_Veri === 0 && Vector_Hori < 0){
                            tileVerticalRouteId[i-1] = String.fromCharCode(parseInt(pieceParentId[0].charCodeAt(0))) + (parseInt(pieceParentId[1]) - i);
                        }
                    }

                    CanVertical = true;
                    tileVerticalRouteId.forEach(element => {
                        let tileCheck = document.getElementById(element);
                            if(tileCheck.children.length !== 0 ){
                                let childrenId = tileCheck.children[0].id.toString();
                                if(childrenId[0] === enemy && tileVerticalRouteId[tileVerticalRouteId.length-1] === element){} else{
                                    CanVertical = false;
                                }
                        }
                    })
                }
    if(CanDiagonal || CanVertical){
        CanMove = true;
    }
    if(CanMove && !isKing_GonnabeAttacked(enemy)){
        return true 
    } else {
        return false
    }
}


function Pawn_move(enemy,side){
    let left;
    let right;
    let hasbeendone = false;
    let CanMove=false;
    if(targetId[0] === pieceParentId[0]) {
        if(parseInt(targetId[1])-(1*side) === parseInt(pieceParentId[1])){
            CanMove=true;
        }else if(draggedPiece.alt === '0' && parseInt(targetId[1])-(2*side) === parseInt(pieceParentId[1])){
            if(document.getElementById(pieceParentId[0] + (parseInt(pieceParentId[1]) + side)).firstChild === null)
            CanMove=true;
        }

    } else {
        if(targetId[0] === enemy && pieceParentId[0].charCodeAt(0) +1 === targetParentId[0].charCodeAt(0) && parseInt(pieceParentId[1]) +(1*side) === parseInt(targetParentId[1])  || targetId[0] === enemy && pieceParentId[0].charCodeAt(0) -1 === targetParentId[0].charCodeAt(0) && parseInt(pieceParentId[1]) +(1*side) === parseInt(targetParentId[1])){
            CanMove=true;
        } else  if((parseInt(pieceParentId[1]) + side) === parseInt(targetParentId[1]) && targetId[0] !== 'w' && targetId[0] !== 'b' ){
            if((pieceParentId.charCodeAt(0) - 1) === targetParentId.charCodeAt(0)){
                left = document.getElementById(String.fromCharCode(pieceParentId.charCodeAt(0) - 1) + pieceParentId[1]);
                if(left.firstChild){
                    if(left.firstChild.id[0] === enemy && left.firstChild.id[1] === 'P'){
                        //Only left checking if this child was the last one moving and if its first time
                        if(left.firstChild.alt === '1' && left.firstChild.id === last_moved_piece.id){
                            isThatEnPassent = true;
                            hasbeendone = true;
                            CanMove=true;
                        }
                    }
                }
            } else if((pieceParentId.charCodeAt(0) + 1) === targetParentId.charCodeAt(0)){
                right = document.getElementById(String.fromCharCode(pieceParentId.charCodeAt(0) + 1) + pieceParentId[1]);
                if(right.firstChild){
                    if(right.firstChild.id[0] === enemy && right.firstChild.id[1] === 'P'){
                        //Only right checking if this child was the last one moving and if its first time
                        if(right.firstChild.alt === '1' && right.firstChild.id === last_moved_piece.id){
                            isThatEnPassent = true;
                            hasbeendone = true;
                            CanMove=true;
                        }
                    }
                }
            }
        }
    }
    if(!hasbeendone){
        isThatEnPassent = false;
    }
    if(CanMove  &&  !isKing_GonnabeAttacked(enemy)){
        return true
    }
    else {
        return false
    }
}

function Knight_move(mypiece,enemy){
    let CanMove = false;
    let canMoveOnThat = false;
    let isThereMyPiece = false;

    if(Math.abs(parseInt(targetParentId[1])-parseInt(pieceParentId[1]))===2 && Math.abs((targetParentId[0].charCodeAt(0))-pieceParentId[0].charCodeAt(0))===1)
    canMoveOnThat = true;
    if(Math.abs(parseInt(targetParentId[1])-parseInt(pieceParentId[1]))===1 && Math.abs((targetParentId[0].charCodeAt(0))-pieceParentId[0].charCodeAt(0))===2)
    canMoveOnThat = true;
    if(targetId[0] === mypiece){
        isThereMyPiece = true;
    }

    if(canMoveOnThat && !isThereMyPiece && !isKing_GonnabeAttacked(enemy)){
        CanMove = true;
    }
    return CanMove;
}


function King_move(enemy,mypiece){
    let CanMove = false;
    if(Math.abs(parseInt(targetId[1]) - parseInt(pieceParentId[1])) < 2 && Math.abs(parseInt(targetId[0].charCodeAt(0)) - parseInt(pieceParentId[0].charCodeAt(0))) < 2){
        CanMove = true;
    }else if(Math.abs(parseInt(targetParentId[1]) - parseInt(pieceParentId[1])) < 2 && Math.abs(parseInt(targetParentId[0].charCodeAt(0)) - parseInt(pieceParentId[0].charCodeAt(0))) < 2 && targetId[0] === enemy){
        CanMove= true;
    }



    if(CanMove && !isKing_GonnabeAttacked(enemy) || isThat_a_Castle(enemy))
    {
        return true;
    }

    return false;

}
function isKing_GonnabeAttacked(enemy, test){
    let isGonnabeAttacked = false;
    let Mother_Tile = document.getElementById(pieceParentId)
    let PreviousPlace = draggedPiece;
    let King_actual_Position = King_Position[BlackorWhite(sideMove)];

    if(draggedPiece.id[1] === 'K'){
        King_actual_Position = targetParentId;
    }
    if(test !== undefined){
        King_actual_Position = test
    }
    document.getElementById(targetParentId).append(draggedPiece)

    if(Knight_Tiles(enemy , King_actual_Position)){
        isGonnabeAttacked = true;
    }
    if(Bishop_Tiles(enemy, King_actual_Position)){
        isGonnabeAttacked = true
    }
    if(Pawn_Tiles(enemy, King_actual_Position)){
        isGonnabeAttacked = true
    }
    if(King_Tiles(enemy, King_actual_Position)){
        isGonnabeAttacked = true
    }
    if(Rook_Tiles(enemy, King_actual_Position)){
        isGonnabeAttacked = true
    }
    attacking_piece = new Array();
    Mother_Tile.append(PreviousPlace);

    return isGonnabeAttacked;
}


function isThat_a_Castle(enemy){

    let King_positions = new Array();

    if(targetParentId === 'E1' || targetParentId === 'E8'){
        return false
    }
    if(pieceParentId === 'E1' && draggedPiece.alt === '0' || pieceParentId === 'E8' && draggedPiece.alt === '0'){
        King_positions[0] = pieceParentId;
    } else {
        return false;
    }

    if(enemy === 'b'){
        if(targetParentId === 'G1' && document.getElementById(targetParentId).firstChild === null){
            King_positions[2] = 'G1'
            if(document.getElementById('F1').firstChild === null){
                King_positions[1] = 'F1'
                if(document.getElementById('H1').firstChild){
                    if(document.getElementById('H1').firstChild.alt !== '0'){
                        return false;
                    }
                } else {
                    return false;
                }
            }
        } else if(targetParentId === 'C1' && document.getElementById(targetParentId).firstChild === null){
            King_positions[2] = 'C1'
            if(document.getElementById('D1').firstChild === null){
                King_positions[1] = 'D1'
                if(document.getElementById('B1').firstChild){
                    return false;
                }
                if(document.getElementById('A1').firstChild){
                    if(document.getElementById('A1').firstChild.alt !== '0'){
                        return false;
                    }
                } else {
                    return false;
                }
            }
        }
    } else if(enemy === 'w'){
        if(targetParentId === 'G8' && document.getElementById(targetParentId).firstChild === null){
            King_positions[2] = 'G8'
            if(document.getElementById('F8').firstChild === null){
                King_positions[1] = 'F8'
                if(document.getElementById('H8').firstChild){
                    if(document.getElementById('H8').firstChild.alt !== '0'){
                        return false;
                    }
                } else {
                    return false;
                }
            }
        } else if(targetParentId === 'C8' && document.getElementById(targetParentId).firstChild === null){
            King_positions[2] = 'C8'
            if(document.getElementById('D8').firstChild === null){
                King_positions[1] = 'D8'
                if(document.getElementById('B8').firstChild){
                    return false;
                }
                if(document.getElementById('A8').firstChild){
                    if(document.getElementById('A8').firstChild.alt !== '0'){
                        return false;
                    }
                } else {
                    return false;
                }
            }
        }
    }

    for(let i=0;i<3;i++){
        if(King_positions[i] === undefined){
            return false
        }
    }

    if(document.getElementById(targetParentId).firstChild){
        return false;
    }
    for(let i=0;i<3;i++){
        if(isKing_GonnabeAttacked(enemy, King_positions[i])){
            return false;
        }
    }
    switch(targetParentId){
        case 'G1': {Rook_Castle = 'H1'; Rook_Castle_tile = 'F1'; isCastling = true}break;
        case 'C1': {Rook_Castle = 'A1'; Rook_Castle_tile = 'D1'; isCastling = true}break;
        case 'G8': {Rook_Castle = 'H8'; Rook_Castle_tile = 'F8'; isCastling = true}break;
        case 'C8': {Rook_Castle = 'A8'; Rook_Castle_tile = 'D8'; isCastling = true}break;
        default: {isCastling = false}
    }
    return true;
}

function BlackorWhite(side_){
    if(side_ === 'W'){
        return 0
    } else {
        return 1
    }
}


function Knight_Tiles(enemy, King_Tile){
    let Enemy_piece = false;
    let Knight_Array = new Array();
    let piece_check;

    Knight_Array[0] = String.fromCharCode(parseInt(King_Tile.charCodeAt(0)) - 1) + (parseInt(King_Tile[1]) + 2);
    Knight_Array[1] = String.fromCharCode(parseInt(King_Tile.charCodeAt(0)) + 1) + (parseInt(King_Tile[1]) + 2);
    Knight_Array[2] = String.fromCharCode(parseInt(King_Tile.charCodeAt(0)) + 2) + (parseInt(King_Tile[1]) + 1);
    Knight_Array[3] = String.fromCharCode(parseInt(King_Tile.charCodeAt(0)) + 2) + (parseInt(King_Tile[1]) - 1);
    Knight_Array[4] = String.fromCharCode(parseInt(King_Tile.charCodeAt(0)) + 1) + (parseInt(King_Tile[1]) - 2);
    Knight_Array[5] = String.fromCharCode(parseInt(King_Tile.charCodeAt(0)) - 1) + (parseInt(King_Tile[1]) - 2);
    Knight_Array[6] = String.fromCharCode(parseInt(King_Tile.charCodeAt(0)) - 2) + (parseInt(King_Tile[1]) - 1);
    Knight_Array[7] = String.fromCharCode(parseInt(King_Tile.charCodeAt(0)) - 2) + (parseInt(King_Tile[1]) + 1);
    
    for(let i =0;i<8;i++){
        if(Knight_Array[i][1] >0 && Knight_Array[i][1] < 9 && Knight_Array[i].charCodeAt(0) > 65 && Knight_Array[i].charCodeAt(0) < 73 && !Knight_Array[i][2]){
            piece_check = document.getElementById(Knight_Array[i].toString()).children[0]
            if(piece_check){
                if(piece_check.id[0] === enemy && piece_check.id[1] === 'N'){
                    Enemy_piece = true;
                    attacking_piece[attacking_piece.length] = Knight_Array[i]
                }
            }
        }
    }
    if(attacking_piece.length<2 && attacking_piece.length>0){
        if(Enemy_piece && attacking_piece[0] === targetParentId){
            Enemy_piece = false;
        } 
    }
    return Enemy_piece;
}

function Bishop_Tiles(enemy, King_Tile){
    let Enemy_piece = false;
    let tracking_tile = King_Tile;
    let Bishop_Array_left_down = new Array();
    let Bishop_Array_left_up = new Array();
    let Bishop_Array_right_up = new Array();
    let Bishop_Array_right_down = new Array();
    let Bishop_Array = [Bishop_Array_left_down,Bishop_Array_left_up,Bishop_Array_right_up,Bishop_Array_right_down]
    let number_holder;
    let tile_children;
    let i = 1;

    
    while(parseInt(tracking_tile[1]) - i >= 1 && parseInt(tracking_tile.charCodeAt(0)) - i >= 'A'.charCodeAt(0)){
        Bishop_Array_left_down[i - 1] = String.fromCharCode(tracking_tile.charCodeAt(0) - i) + (parseInt(tracking_tile[1]) - i);
        i++;
    }
    i = 1;
    while(parseInt(tracking_tile[1]) + i <=8 && parseInt(tracking_tile.charCodeAt(0)) - i >= 'A'.charCodeAt(0)){
        Bishop_Array_left_up[i - 1] = String.fromCharCode(tracking_tile.charCodeAt(0) - i) + (parseInt(tracking_tile[1]) + i);
        i++;
    }
    i = 1
    while(parseInt(tracking_tile[1]) + i <=8 && parseInt(tracking_tile.charCodeAt(0)) + i <= 'H'.charCodeAt(0)){
        Bishop_Array_right_up[i - 1] = String.fromCharCode(tracking_tile.charCodeAt(0) + i) + (parseInt(tracking_tile[1]) + i);
        i++;
    }
    i = 1
    while(parseInt(tracking_tile[1]) - i >= 1 && parseInt(tracking_tile.charCodeAt(0)) + i <= 'H'.charCodeAt(0)){
        Bishop_Array_right_down[i - 1] = String.fromCharCode(tracking_tile.charCodeAt(0) + i) + (parseInt(tracking_tile[1]) - i);
        i++;
    }
    for(let j=0;j<Bishop_Array.length;j++){
        for(let i=0;i<Bishop_Array[j].length;i++){
            if(document.getElementById(Bishop_Array[j][i]).children[0]){
                if(document.getElementById(Bishop_Array[j][i]).children[0].id[1] === 'B' && document.getElementById(Bishop_Array[j][i]).children[0].id[0] === enemy || document.getElementById(Bishop_Array[j][i]).children[0].id[1] === 'Q' && document.getElementById(Bishop_Array[j][i]).children[0].id[0] === enemy){
                    number_holder = i;
                    Enemy_piece = true;
                    while(number_holder >= 0){
                        if(document.getElementById(Bishop_Array[j][number_holder]).children[0]){
                            tile_children = document.getElementById(Bishop_Array[j][number_holder]).children[0];
                            if(tile_children.id[0] === sideMove.toLowerCase() && tile_children.id[1] !== 'K' || tile_children.id[0] === enemy && tile_children.id[1] !== 'Q' && tile_children.id[1] !== 'B')
                                Enemy_piece = false
                            }
                        number_holder--;
                    }
                    if(Enemy_piece){
                        attacking_piece[attacking_piece.length] = Bishop_Array[j][i];
                    } 
                }
            }
        }
    }
    if(attacking_piece.length<2 && attacking_piece.length>0){
        if(Enemy_piece && attacking_piece[0] === targetParentId){
            Enemy_piece = false;
        } 
    }
    return Enemy_piece;
}

function Pawn_Tiles(enemy, King_Tile){
    let Enemy_piece = false;
    let tracking_tile = King_Tile;
    let Pos_Array = new Array(2);
    let sideScale; 
    if(enemy === 'w'){
        sideScale = -1;
    } else {
        sideScale = 1
    }

    Pos_Array[0] = String.fromCharCode(tracking_tile.charCodeAt(0) + 1) + (parseInt(tracking_tile[1]) + (sideScale));
    Pos_Array[1] = String.fromCharCode(tracking_tile.charCodeAt(0) - 1) + (parseInt(tracking_tile[1]) + (sideScale));

    for(let i=0;i<Pos_Array.length;i++){
        if(document.getElementById(Pos_Array[i]) !== null){
            if(document.getElementById(Pos_Array[i]).firstChild !== null){
                if(document.getElementById(Pos_Array[i]).firstChild.id[1] === 'P' && document.getElementById(Pos_Array[i]).firstChild.id[0] === enemy){
                    Enemy_piece = true;
                    attacking_piece[attacking_piece.length] = Pos_Array[i];
                }
            }
        }
    }
    if(attacking_piece.length<2 && attacking_piece.length>0){
        if(Enemy_piece && attacking_piece[0] === targetParentId){
            Enemy_piece = false;
        } 
    }
    return Enemy_piece;
}

function Rook_Tiles(enemy, King_Tile){
    let Enemy_piece = false;
    let tracking_tile = King_Tile;
    let Rook_Array_left = new Array();
    let Rook_Array_up = new Array();
    let Rook_Array_right = new Array();
    let Rook_Array_down = new Array();
    let Rook_Array = [Rook_Array_left,Rook_Array_up,Rook_Array_right,Rook_Array_down]
    let number_holder;
    let tile_children;


    let i = 1;   
    while(parseInt(tracking_tile.charCodeAt(0)) - i >= 'A'.charCodeAt(0)){
        Rook_Array_left[i - 1] = String.fromCharCode(tracking_tile.charCodeAt(0) - i)+ tracking_tile[1];
        i++;
    }
    i = 1;
    while(parseInt(tracking_tile[1]) + i <=8){
        Rook_Array_up[i - 1] = tracking_tile[0] + (parseInt(tracking_tile[1]) + i);
        i++;
    }
    i = 1
    while(parseInt(tracking_tile.charCodeAt(0)) + i <= 'H'.charCodeAt(0)){
        Rook_Array_right[i - 1] = String.fromCharCode(tracking_tile.charCodeAt(0) + i) + tracking_tile[1];
        i++;
    }
    i = 1
    while(parseInt(tracking_tile[1]) - i >= 1){
        Rook_Array_down[i - 1] = tracking_tile[0] + (parseInt(tracking_tile[1]) - i);
        i++;
    }
    for(let j=0;j<Rook_Array.length;j++){
        for(let i=0;i<Rook_Array[j].length;i++){
            if(document.getElementById(Rook_Array[j][i]).children[0]){
                if(document.getElementById(Rook_Array[j][i]).children[0].id[1] === 'R' && document.getElementById(Rook_Array[j][i]).children[0].id[0] === enemy || document.getElementById(Rook_Array[j][i]).children[0].id[1] === 'Q' && document.getElementById(Rook_Array[j][i]).children[0].id[0] === enemy){
                    number_holder = i;
                    Enemy_piece = true;
                    while(number_holder >= 0){
                        if(document.getElementById(Rook_Array[j][number_holder]).children[0]){
                            tile_children = document.getElementById(Rook_Array[j][number_holder]).children[0];
                            if(tile_children.id[0] === sideMove.toLowerCase() && tile_children.id[1] !== 'K' || tile_children.id[0] === enemy && tile_children.id[1] !== 'Q' && tile_children.id[1] !== 'R')
                                Enemy_piece = false
                            }
                        number_holder--;
                    }
                    if(Enemy_piece){
                        attacking_piece[attacking_piece.length] = Rook_Array[j][i];
                    } 
                }
            }
        }
    }
    if(attacking_piece.length<2 && attacking_piece.length>0){
        if(Enemy_piece && attacking_piece[0] === targetParentId){
            Enemy_piece = false;
        } 
    }
    return Enemy_piece;
}

function King_Tiles(enemy, King_Tile){
    let Enemy_piece = false;
    let King_Tiles_Array = new Array();
    let tile_children;
    let tracking_tile = King_Tile

    for(let i=0;i<64;i++){
        if(Math.abs(parseInt(tileRef[i].id[1]) - parseInt(tracking_tile[1])) < 2 && Math.abs(parseInt(tileRef[i].id[0].charCodeAt(0)) - parseInt(tracking_tile[0].charCodeAt(0))) < 2){
            if(tracking_tile !== tileRef[i].id){
                King_Tiles_Array[King_Tiles_Array.length] = tileRef[i].id;
            }
        }
    }
    for(j=0;j<King_Tiles_Array.length;j++){
        if(document.getElementById(King_Tiles_Array[j]).firstChild){
            tile_children = document.getElementById(King_Tiles_Array[j]).firstChild;
            if(tile_children.id[0] === enemy && tile_children.id[1] === 'K'){
                Enemy_piece = true;
            }
        }
    }

    return Enemy_piece
}

function checkValidCastleTiles() {
    for(let i=0;i<CastleTiles.length;i++){
        if(targetParentId.toString() === CastleTiles[i]){
            return true
        }
    }
    return false;
}

function isOnThePromotingSquare() {
    if(draggedPiece.id[0] === 'w'){
        if(targetParentId[1] === '8'){
            return true;
        }
    } else {
        if(targetParentId[1] === '1'){
            return true;
        }
    }
    return false;
}

function promotionChosen(option) {
    let index;
    if(side_Promotion_Holder === 'W'){
        index = 0;
    } else {
        index = 1;
    }

    switch(option){
        case 1:{
            last_moved_piece.src = new URL(srcArray[index][1])
            last_moved_piece.id = side_Promotion_Holder.toLowerCase() + 'R' + (last_moved_piece.id[2] + 1)
        }break;
        case 2:{
            last_moved_piece.src = new URL(srcArray[index][2])
            last_moved_piece.id = side_Promotion_Holder.toLowerCase() + 'N' + (last_moved_piece.id[2] + 1)
        }break;
        case 3:{
            last_moved_piece.src = new URL(srcArray[index][3])
            last_moved_piece.id = side_Promotion_Holder.toLowerCase() + 'B' + (last_moved_piece.id[2] + 1)
        }break;
        case 4:{
            last_moved_piece.src = new URL(srcArray[index][4])
            last_moved_piece.id = side_Promotion_Holder.toLowerCase() + 'Q' + (last_moved_piece.id[2] + 1)
        }break;
    }

    let promote = document.getElementById('promote');
    promote.style.display = 'none';
    if(side_Promotion_Holder === 'W'){
        sideMove = 'B'
    } else {
        sideMove = 'W'
    }
}