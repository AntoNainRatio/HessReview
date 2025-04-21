const squares = document.querySelectorAll(".square")

squares.forEach(s => {
    s.addEventListener('dragstart', dragStart)
    s.addEventListener('dragover', dragOver)
    s.addEventListener('drop', dragDrop)
})

let start
let ele
let turn = 'w'

function idToCoord(id){
    let y = Math.floor(id/8)
    let x = id-(y*8)
    return [x,y]
}

function changeTurn(){
    if (turn == 'w'){
        turn = 'b'
    } else{
        turn = 'w'
    }
}

function dragStart(e){
    start = e.target.parentElement.getAttribute('square-id')
    coords = idToCoord(start)
    console.log(`x: ${coords[0]}, y: ${coords[1]}`)
    ele = e.target
    let startCoord = idToCoord(start)
    let startSquare = board.board[startCoord[1]][startCoord[0]]
    console.log(startSquare)
}

function dragOver(e){
    e.preventDefault()
}

function dragDrop(e){
    e.stopPropagation()
    if (!ele.classList.contains(turn)){
        console.log(`TurnError: It's ${turn} turn.`)
        return
    }
    let startCoord = idToCoord(start)
    let endCoord
    if (e.target.classList.contains("piece")){
        endCoord = idToCoord(e.target.parentElement.getAttribute('square-id'))
        let startSquare = board.board[startCoord[1]][startCoord[0]]
        console.log(startSquare)
        // if(board.board[startCoor][endCoord])
        if (e.target.classList.contains(turn)){
            console.log(`InvalidMove: Can't capture own team piece's.`)
            return
        }
        e.target.parentNode.append(ele)
        e.target.remove()
    }
    else{
        endCoord = idToCoord(e.target.getAttribute('square-id'))
        e.target.append(ele)
    }
    changeTurn()
}