const id = 'gameboard'
const boardElement = document.getElementById(id)
const fen_input = document.getElementById("FEN_input")
const fen_button = document.getElementById("FEN_button")
const fen_error = document.getElementById("FEN_error")

const game = new Game()

const renderer = new BoardRenderer(boardElement,game.Board)

const controller = new GameController(game,renderer);

fen_button.addEventListener("click", () => {
    const input = fen_input.value;
    const newGame = parseFen(input);
    if (newGame === null){
        // fen_input.value = ""
        fen_error.innerHTML = "Invalid FEN";
    }
    else{
        fen_error.innerHTML = "";
        renderer.render()
    }
    // game = parse function
})