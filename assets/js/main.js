let map = [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
]
let cpuChoice = randomize(0, map.length - 1)
let btn = document.querySelector("#replay")
let playerOneTurn = true
let tour = 0;
let mapContainer = document.querySelector("#gameContainer")
let messageContainer = document.querySelector("#congrat")
let isPlayable = true
let cpuMode = false
let winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
function displayMap() {
    btn.style.display = "none"
    mapContainer.innerHTML = ""
    map.forEach((row) => {
        let rowContainer = document.createElement('div')
        rowContainer.classList.add('row')
        mapContainer.appendChild(rowContainer)
        row.forEach((cell) => {
            let cellContainer = document.createElement('div')
            cellContainer.addEventListener("click", () => {
                if (isPlayable) {
                    play(cellContainer)
                }
            }, { once: true })
            cellContainer.classList.add("cell")
            rowContainer.appendChild(cellContainer)
        });
    })
}
displayMap()

function play(cell) {
    if (playerOneTurn == true) {
        cell.innerHTML = "X"
    } else {
        cell.classList.add('other')
        cell.innerHTML = "O"
    }
    youWin()
    equalScore()
    playerOneTurn = !playerOneTurn  //Peut aussi s'ecrire://cell.innerHTML = playerOneTurn == true  ? "X" : "O"  
    if (isPlayable && playerOneTurn == false && cpuMode == true) {
        cpuPlay()
    }
}
function youWin(cell) {
    let tabGrid = document.querySelectorAll('.cell')
    for (let i = 0; i < winCondition.length; i++) {
        if (tabGrid[winCondition[i][0]].innerHTML != "") {
            if (tabGrid[winCondition[i][0]].innerHTML == tabGrid[winCondition[i][1]].innerHTML && tabGrid[winCondition[i][1]].innerHTML == tabGrid[winCondition[i][2]].innerHTML) {
                messageContainer.innerHTML = "Gagné Pour le joueur " + tabGrid[winCondition[i][0]].innerHTML;
                endGame()
                return true
            }
        }
    }
    return false
}
function equalScore() {
    for (let i = 0; i < winCondition.length; i++) {
    }
    if (youWin()) {
        return false;
    }
    tour++;
    if (tour === 9) {
        messageContainer.innerHTML = "Match nul";
        endGame();
        return true;
    }
}
function endGame() {
    isPlayable = false
    btn.style.display = "block"
}
function replay() {
    messageContainer.innerHTML = ""
    playerOneTurn = true
    isPlayable = true
    tour = 0;
    displayMap()
}
function cpuPlay(cellContainer) {
    let cells = document.querySelectorAll('.cell')
    while (cells[cpuChoice].innerHTML != "") {
        cpuChoice = randomize(0, cells.length - 1)
    }
    cells[cpuChoice].click()
    youWin()

}
function randomize(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function choiceCpu(cpu) {
    cpuMode = cpu
    replay()
}
