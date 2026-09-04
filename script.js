var boardSize = 3;
const board = document.getElementsByClassName('board')[0];
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
                cell.textContent = ' ';
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
    cells.forEach(cell => {
        cell.remove();
    });
}

createBoard();
shuffleNumbers();

function addFunctionality() {

    const cells = document.getElementsByClassName('cell');
    for (const cell of cells) {
        cell.addEventListener('click', () => {
            // Handle cell click
        });
    }
}

const options = document.getElementsByClassName('options')[0];

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
// resetButton.addEventListener('click', () => {
//     // const cells = document.getElementsByClassName('cell');
//     // for (const cell of cells) {
//     //     cell.textContent = cell.dataset.row * boardSize + parseInt(cell.dataset.col) + 1;
//     //     if (cell.textContent == boardSize * boardSize) {
//     //         cell.textContent = ' ';
//     //     }
//         shuffleNumbers();
//     // }
// })
options.appendChild(resetButton);

function shuffleNumbers() {
    const cells = document.getElementsByClassName('cell');
    for (let _ = 0; _ < 10; _++) {
        for (const cell of cells) {
            if (cell.textContent == ' ') {
                moveByRandom(cell);
            }
        }
    }
}

function moveByRandom(emptyCell) {
    var emptyRow = parseInt(emptyCell.dataset.row);
    var emptyCol = parseInt(emptyCell.dataset.col);
    const directions = [{ row: -1, col: 0 }, { row: 1, col: 0 }, { row: 0, col: -1 }, { row: 0, col: 1 }];

    let cnt=boardSize * boardSize*5 ;

    while (cnt) 
        {
        const randomDirection = directions[Math.floor(Math.random() * directions.length)];
        const newRow = emptyRow + randomDirection.row;
        const newCol = emptyCol + randomDirection.col;
        if(newRow >= 0 && newRow < boardSize && newCol >= 0 && newCol < boardSize) {
            swap(emptyRow, emptyCol, newRow, newCol);
            emptyRow= newRow;
            emptyCol = newCol;
            cnt--;
        }
    }
}

function swap(row1, col1, row2, col2) {
    const cell1 = document.querySelector(`.cell[data-row='${row1}'][data-col='${col1}']`);
    const cell2 = document.querySelector(`.cell[data-row='${row2}'][data-col='${col2}']`);
    const temp = cell1.textContent;
    console.log(`Swapping ${cell1.textContent} and ${cell2.textContent}`);
    cell1.textContent = cell2.textContent;
    cell2.textContent = temp;
}