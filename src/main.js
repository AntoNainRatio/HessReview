const game = new Game()

const id = 'gameboard'
const boardElement = document.getElementById(id)

const renderer = new BoardRenderer(boardElement,game.Board)

const controller = new GameController(game,renderer);