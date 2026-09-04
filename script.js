const boardSize = 3;
const board = document.getElementsByClassName('board')[0];
function createBoard(){
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
        const cell = document.createElement('button');
        cell.classList.add('cell');
        cell.dataset.row = i;
        cell.dataset.col = j;
        board.appendChild(cell);
        cell.textContent = (i * boardSize) + j + 1;
        if(cell.textContent == boardSize * boardSize){
            cell.textContent = '';
        }
        shuffleNumbers();
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

function addFunctionality() {

cells = document.getElementsByClassName('cell');
for (const cell of cells) {
    cell.addEventListener('click', () => {
        // Handle cell click
    });
}
}

const options = document.getElementsByClassName('options')[0];

const size=document.createElement('select');
size.classList.add('size');
options.appendChild(size);

const option1=document.createElement('option');
option1.value='3';
option1.textContent='3x3';
size.appendChild(option1);

const option2=document.createElement('option');
option2.value='4';
option2.textContent='4x4';
size.appendChild(option2);

const option3=document.createElement('option');
option3.value='5';
option3.textContent='5x5';
size.appendChild(option3);

const option4=document.createElement('option');
option4.value='6';
option4.textContent='6x6';
size.appendChild(option4);

const option5=document.createElement('option');
option5.value='7';
option5.textContent='7x7';
size.appendChild(option5);

size.addEventListener('change', () => {
    boardSize = parseInt(size.value);
    deleteBoard();
    //createBoard();
});

const resetButton = document.createElement('button');
resetButton.classList.add('reset-button');
resetButton.textContent = 'Reset Board';
resetButton.addEventListener('click', () => {
    const cells = document.getElementsByClassName('cell');
    for (const cell of cells) {
        cell.textContent = cell.dataset.row * boardSize + parseInt(cell.dataset.col) + 1;
        if(cell.textContent == boardSize * boardSize){
            cell.textContent = '';
        }
        shuffleNumbers();
    }
})
options.appendChild(resetButton);

function shuffleNumbers() {
 
   }