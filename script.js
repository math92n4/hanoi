const towerA = document.getElementById('a');
const towerB = document.getElementById('b');
const towerC = document.getElementById('c');

let a = []
let b = []
let c = []

const towerSize = 3;

const disks = []
let colors = ['red','green','blue','purple','black','pink','yellow','orange']

document.addEventListener('DOMContentLoaded', start)

function start() {
    createModel();
    drawInitialCircles();
    solveTower();
}

function drawInitialCircles() {
    let circleWidth = 400;
    let bottom = 0; 

    for(let i = towerSize; i > 0; i--) {
        const circle = document.createElement('div')
        circle.classList.add('circle')
        circle.id = i
        circle.style.width = `${circleWidth}px`
        circle.style.bottom = `${bottom}px`
        circle.style.backgroundColor = randomColor()
        disks.push(circle)
        towerA.appendChild(circle)
        circleWidth -= 30
        bottom += 20
    } 
}

function moveDiskVisual(to, disk) {

    const diskElement = disks.find(d => d.id == disk);
    diskElement.remove()

    let tower;
    let top;

    if(to === a) {
        tower = towerA  
    } else if(to === b) {
        tower = towerB
    } else {
        tower = towerC
    }

    top = tower.lastElementChild

    if(!top) {
        diskElement.style.bottom = '0px'
    } else {
        diskElement.style.bottom = getBottom(top.style.bottom)
    }

    tower.appendChild(diskElement)
}

function getBottom(prevBottom) {
    let bottom = parseFloat(prevBottom)
    bottom += 20;
    return `${bottom}px`
}

function randomColor() {
    const randomColor = Math.floor(Math.random() * colors.length)
    return colors[randomColor];
}


function solveTower() {
    const totalMoves = Math.pow(2, towerSize) - 1
    console.log(totalMoves)

    if(towerSize % 2 === 0) {
        let temp = c
        c = b
        b = temp
    }

    
    for(let i = 1; i <= totalMoves; i++) {
    setTimeout((moveIndex) => {
        
        if(moveIndex % 3 === 1) {
            moveDisk(a, c);
        } else if(moveIndex % 3 === 2) {
            moveDisk(a, b);
        } else if(moveIndex % 3 === 0) {
            moveDisk(b, c);
        }
    }, i * 1000, i);
}
}



function moveDisk(start, end) {

    let disk1 = start.pop()
    let disk2 = end.pop()

    if(!disk1) {
        start.push(disk2)
        moveDiskVisual(start, disk2)

    } else if(!disk2) {
        end.push(disk1)
        moveDiskVisual(end, disk1)
    
    } else if(disk1 > disk2) {
        start.push(disk1)
        start.push(disk2)
        moveDiskVisual(start, disk1)
        moveDiskVisual(start, disk2)


    } else {
        end.push(disk2)
        end.push(disk1)
        moveDiskVisual(end, disk2)
        moveDiskVisual(end, disk1)
    }

    console.log(a, 'a')
    console.log(b, 'b')
    console.log(c, 'c')
}


function createModel() {
    for(let i = towerSize; i > 0; i--) {
        a.push(i)
    }
}







