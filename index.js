/**
* This program is a boilerplate code for the standard tic tac toe game
* Here the “box” represents one placeholder for either a “X” or a “0”
* We have a 2D array to represent the arrangement of X or O is a grid
* 0 -> empty box
* 1 -> box with X
* 2 -> box with O
*
* Below are the tasks which needs to be completed:
* Imagine you are playing with the computer so every alternate move should be done by the computer
* X -> player
* O -> Computer
*
* Winner needs to be decided and has to be flashed
*
* Extra points will be given for approaching the problem more creatively
* 
*/

window.grid = [];
const GRID_LENGTH = 3;
let turn = 'X';

function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    if(grid[colIdx][rowIdx] == 1 || grid[colIdx][rowIdx] == 2) return;
    let newValue = 1;
    grid[colIdx][rowIdx] = newValue;
    turn = 'X';
    renderMainGrid();
    checkForWin();
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

function comMove(){
    const tempArray = [];
    for (let colidx = 0;colidx < GRID_LENGTH; colidx++) {
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            if(grid[colidx][rowidx] == 0){
                tempArray.push([colidx, rowidx])
            }
        }
    }
    let [colIndex, rowIndex] = tempArray[Math.floor(Math.random() * tempArray.length)];
    grid[colIndex][rowIndex] = 2;
    turn = 'O';
    renderMainGrid();
    checkForWin();
}

function checkForWin(){

    let winIdentified = false;

    for(let i=0; i<GRID_LENGTH; i++){ //Checks vertically for the winner
        if(grid[0][i] != 0 && (grid[0][i] == grid[1][i]) && (grid[1][i] == grid[2][i])){
            winIdentified = true;
            break;
        }
    }
    if(!winIdentified){ //Checks horizontally for the winner 
        for(let i=0; i<GRID_LENGTH; i++){
            if(grid[i][0] != 0 && (grid[i][0] == grid[i][1]) && (grid[i][1] == grid[i][2])){
                winIdentified = true;
                break;
            }
        }
    }

    if(!winIdentified){ //Checks diagnolly for the winner
        if(grid[0][0] != 0 && (grid[0][0] == grid[1][1]) && (grid[1][1] == grid[2][2])){
            winIdentified = true;
        } else if(grid[0][2] != 0 && (grid[0][2] == grid[1][1]) && (grid[1][1] == grid[2][0])){
            winIdentified = true;
        }
    }

    if(winIdentified){
        document.getElementById('winner').innerHTML = (turn == 'X' ? 'You' : 'Computer') + ' won the game';
    } else{
        addClickHandlers();
        if(turn == 'X'){
            comMove();
        }
    }
}

initializeGrid();
renderMainGrid();
addClickHandlers();
