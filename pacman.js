document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid')
    const scoreDisp = document.getElementById('score')
    const width = 28 // total of 784 squares (28 x 28)
    let score = 0

    const layout = [
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,2,2,2,2,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ]
    
    // Legend for layout
    // 0 -> pac-dot
    // 1 -> wall
    // 2 -> ghost-hive
    // 3 -> power-ups
    // 4 -> empty 
    
    const squares = []
    
    // create board and render
    function createBoard() {
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
    }
    createBoard()



    // starting position of pac-man
    let pacmanCurrentIndex = 490
    squares[pacmanCurrentIndex].classList.add('pac-man')

    // what happens when pacman eats a pac-dot 
    const eatsPacDot=() => {
        if(squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
            // increment the score after eating the pac-dot 
            score++
            scoreDisp.innerHTML = score
            // replace the pac-dot with an empty block
            squares[pacmanCurrentIndex].classList.remove('pac-dot')
            squares[pacmanCurrentIndex].classList.add('empty')
        }
    }

    // function for handling eating the power-up 
    function eatsPowerUp() {
        if(squares[pacmanCurrentIndex].classList.contains('power-up')) {
            // increment score by 10 bc it's a power up and reset score on screen
            score += 10 
            scoreDisp.innerHTML = score

            // turn all the ghosts on the board into scared ghosts for 10 sec, then unscare them
            ghosts.forEach(ghost => ghost.isScared = true)
            setTimeout(unScareGhosts, 10000)

            // turn the power-up into an empty block 
            squares[pacmanCurrentIndex].classList.remove('power-up')
            squares[pacmanCurrentIndex].classList.add('empty')
        }
    }

    //move pac-man
    function movePacman(e) {
        squares[pacmanCurrentIndex].classList.remove('pac-man')
        switch(e.keyCode) {
            case 37:
                if(pacmanCurrentIndex % width != 0 && 
                    !squares[pacmanCurrentIndex-1].classList.contains('wall') &&
                    !squares[pacmanCurrentIndex-1].classList.contains('ghost-hive')) 
                    pacmanCurrentIndex -= 1
                
                // check if pacman is in the left tunnel
                if(pacmanCurrentIndex - 1 === 363) {
                    pacmanCurrentIndex = 391
                }
                break
            case 38:
                if(pacmanCurrentIndex - width >= 0 && 
                    !squares[pacmanCurrentIndex-width].classList.contains('wall') &&
                    !squares[pacmanCurrentIndex-1].classList.contains('ghost-hive'))
                    pacmanCurrentIndex -= width
                break
            case 39:
                if(pacmanCurrentIndex % width + 1 < width && 
                    !squares[pacmanCurrentIndex+1].classList.contains('wall') &&
                    !squares[pacmanCurrentIndex+1].classList.contains('ghost-hive')) 
                    pacmanCurrentIndex += 1
                
                 // check if pacman is in the right tunnel
                 if(pacmanCurrentIndex + 1 === 392) {
                    pacmanCurrentIndex = 364
                }
                break 
            case 40:
                if((pacmanCurrentIndex + width) / width < width && 
                !squares[pacmanCurrentIndex+width].classList.contains('wall') &&
                !squares[pacmanCurrentIndex+width].classList.contains('ghost-hive')) 
                pacmanCurrentIndex += width
                break
        }
        squares[pacmanCurrentIndex].classList.add('pac-man')
        eatsPacDot()
        eatsPowerUp()
        gameOver() 
        win() 
    }

    document.addEventListener('keyup', movePacman)



    // function to turn ghosts into scared ghosts
    function unScareGhosts(){
        ghosts.forEach(ghost => ghost.isScared = false)
    }


    // create our Ghost template 
    class Ghost {
        constructor(className, startIndex, speed) {
            this.className = className
            this.startIndex = startIndex
            this.speed = speed
            this.currentIndex = startIndex
            this.timerId = NaN
            this.isScared = false
        }
    }

    const ghosts = [
        new Ghost('blinky', 348, 250),
        new Ghost('pinky', 376, 400),
        new Ghost('inky', 351, 300),
        new Ghost('clyde', 379, 500)
    ]

    // add the ghosts onto the grid 
    ghosts.forEach(ghost => {
        squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
        // squares[ghost.currentIndex].classList.add('ghost')
    });

    // move the ghosts randomly around the grid 
    ghosts.forEach(ghost => moveGhost(ghost))

    // function to actually move the ghosts
    function moveGhost(ghost) {
        // different directions the ghost move (left, right, up, down)
        const directions = [-1, 1, width, -width]

        // calculating the random direction for the ghost to move 
        let direction= directions[Math.floor(Math.random() * directions.length)]

        ghost.timerId = setInterval(function() {
            // if the next square the ghost is going to doesn't have a wall or another ghost, you can go there 
            if(!squares[ghost.currentIndex + direction].classList.contains("wall") && 
            !squares[ghost.currentIndex + direction].classList.contains("ghost")) {
                // remove all ghost related classes
                squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
                // update the current index of ghost with the new direction 
                ghost.currentIndex += direction
                // redraw the ghost with updated index
                squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
            }
            // otherwise find a new direction 
            else {
                // recalculate the direction
                direction = directions[Math.floor(Math.random() * directions.length)]
            }

            // if the ghost is scared 
            if(ghost.isScared) {
                squares[ghost.currentIndex].classList.add('scared-ghost')
            }

            // if the ghost is scared and pacman has eaten it
            if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')) {
                // increment score by 100 and reset it on screen
                score += 100
                scoreDisp.innerHTML = score
                // remove all ghost related classes 
                squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
                // move the ghost back into the ghost hive
                ghost.currentIndex = ghost.startIndex 
                squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
            } 

            gameOver() 
        }, ghost.speed)
    }

    // check for game over 
    function gameOver() {
        // if the ghost is NOT scared and pacman has touched it 
        if(squares[pacmanCurrentIndex].classList.contains('ghost') &&
        !squares[pacmanCurrentIndex].classList.contains('scared-ghost')) {
            // stop all the ghosts from moving 
            ghosts.forEach(ghost => clearInterval(ghost.timerId))
            document.removeEventListener('keyup', movePacman)
            scoreDisp.innerHTML='Game Over!'
        }
    }

    // check for a win
    function win() {
        if(score >= 274) {
            ghosts.forEach(ghost => clearInterval(ghost.timerId))
            document.removeEventListener('keyup', movePacman)
            scoreDisp.innerHTML="You Win!"
        }
    }

})

