// create board and render 

function createBoard(layout, grid) {
    console.log("entered")
    const squares = []
    for(let i = 0; i < layout.length; i++) {
        const square = document.createElement('div')
        grid.appendChild(square)
        squares.push(square)
        // add layout to board
        if(layout[i] === 0) {
            squares[i].classList.add('pac-dot')
        } else if(layout[i] === 1) {
            squares[i].classList.add('wall')
        } else if(layout[i] === 2) {
            squares[i].classList.add('ghost-hive')
        } else if(layout[i] === 3) {
            squares[i].classList.add('power-up')
        } else {
            squares[i].classList.add('empty')
        }
    }
    return squares
}

export {createBoard}

