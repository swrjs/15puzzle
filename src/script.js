var boardSize = 3;
const board = document.getElementsByClassName('board')[0];
// board.style.setProperty('---size', boardSize);

function createBoard() {
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const cell = document.createElement('button');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            board.appendChild(cell);
            cell.textContent = (i * boardSize) + j + 1;
            if (cell.textContent == boardSize * boardSize) {
                cell.textContent = '';
            }
            //shuffleNumbers();
        }
    }
}

function deleteBoard() {
    // while (board.firstChild) {
    //     board.removeChild(board.firstChild);
    // }

    const cells = document.getElementsByClassName('cell');
    for (const cell in cells) {
        if (cells.hasOwnProperty(cell)) {
            cells[cell].remove();
        }
    }
}


function addFunctionality() {

    const cells = document.getElementsByClassName('cell');
    for (const cell of cells) {
        
        if (document.getElementsByClassName('mode')[0].value == 'casual') {
            cell.addEventListener('click', () => {
                if (cell.textContent == '') {
                    return;
                }
                const emptyCell = document.querySelector('.cell:empty'); //for text content null
                const emptyRow = parseInt(emptyCell.dataset.row);
                const emptyCol = parseInt(emptyCell.dataset.col);
                const cellRow = parseInt(cell.dataset.row);
                const cellCol = parseInt(cell.dataset.col);


                if (validMove(emptyRow, emptyCol, cellRow, cellCol)) {
                    swap(emptyRow, emptyCol, cellRow, cellCol);
                }
                updateColors();
            });
        }
    }
}

function validMove(emptyRow, emptyCol, cellRow, cellCol) {
    const rowDiff = Math.abs(emptyRow - cellRow);
    const colDiff = Math.abs(emptyCol - cellCol);
    if ((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1)) {
        console.log(`Valid move`);
        return true;
    }
    console.log(`Invalid move`);
    return false;
}
const options = document.getElementsByClassName('options')[0];

const mode = document.createElement('select');
mode.classList.add('mode');
options.appendChild(mode);
mode.addEventListener('change', () => {
    addFunctionality();
});

const casual = document.createElement('option');
casual.value = 'casual';
casual.textContent = 'Casual';
mode.appendChild(casual);

const competitive = document.createElement('option');
competitive.value = 'competitive';
competitive.textContent = 'Competitive';
mode.appendChild(competitive);

const size = document.createElement('select');
size.classList.add('size');
options.appendChild(size);

const option1 = document.createElement('option');
option1.value = '3';
option1.textContent = '3x3';
size.appendChild(option1);

const option2 = document.createElement('option');
option2.value = '4';
option2.textContent = '4x4';
size.appendChild(option2);

const option3 = document.createElement('option');
option3.value = '5';
option3.textContent = '5x5';
size.appendChild(option3);

const option4 = document.createElement('option');
option4.value = '6';
option4.textContent = '6x6';
size.appendChild(option4);

const option5 = document.createElement('option');
option5.value = '7';
option5.textContent = '7x7';
size.appendChild(option5);

size.addEventListener('change', () => {
    boardSize = parseInt(size.value);
    deleteBoard();
    createBoard();
});

const resetButton = document.createElement('button');
resetButton.classList.add('reset-button');
resetButton.textContent = 'Reset Board';
resetButton.addEventListener('click', shuffleNumbers);
options.appendChild(resetButton);

function shuffleNumbers() {
    const cells = document.getElementsByClassName('cell');
    for (let _ = 0; _ < 10; _++) {
        for (const cell of cells) {
            if (cell.textContent == '') {
                moveByRandom(cell);
            }
        }
    }
    updateColors();
}

function updateColors() {
    const cells = document.getElementsByClassName('cell');
    for (const cell of cells) {
        const value = parseInt(cell.textContent);
        if (value) {
            const hue = (value / (boardSize * boardSize)) * 360;
            cell.style.backgroundColor = `hsl(${hue}, 70%, 50%)`;
        }
        else {
            cell.style.backgroundColor = 'white';
        }
    }
}

function moveByRandom(emptyCell) {

    var emptyRow = parseInt(emptyCell.dataset.row);
    var emptyCol = parseInt(emptyCell.dataset.col);
    const directions = [{ row: -1, col: 0 }, { row: 1, col: 0 }, { row: 0, col: -1 }, { row: 0, col: 1 }];

    let cnt = boardSize * boardSize * 5;

    while (cnt) {
        const randomDirection = directions[Math.floor(Math.random() * directions.length)];
        const newRow = emptyRow + randomDirection.row;
        const newCol = emptyCol + randomDirection.col;
        if (newRow >= 0 && newRow < boardSize && newCol >= 0 && newCol < boardSize) {
            swap(emptyRow, emptyCol, newRow, newCol);
            emptyRow = newRow;
            emptyCol = newCol;
            cnt--;
        }
    }
}

function swap(row1, col1, row2, col2) {
    const cell1 = document.querySelector(`.cell[data-row='${row1}'][data-col='${col1}']`);
    const cell2 = document.querySelector(`.cell[data-row='${row2}'][data-col='${col2}']`);
    const temp = cell1.textContent;
    //console.log(`Swapping ${cell1.textContent} and ${cell2.textContent}`);
    cell1.textContent = cell2.textContent;
    cell2.textContent = temp;
    updateColors();
}

//start the game
createBoard();
shuffleNumbers();
// updateColors()
addFunctionality();
