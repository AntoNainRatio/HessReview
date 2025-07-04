const id = 'gameboard'
const boardElement = document.getElementById(id)
const fen_input = document.getElementById("FEN_input")
const fen_button = document.getElementById("FEN_button")
const fen_error = document.getElementById("FEN_error")
const flip_button = document.getElementById("flip_button")

let game = new Game()

const renderer = new BoardRenderer(boardElement,game.Board)

const controller = new GameController(game,renderer);

fen_button.addEventListener("click", () => {
    const input = fen_input.value;
    game = parseFen(input);
    if (game === null){
        // fen_input.value = ""
        fen_error.innerHTML = "Invalid FEN";
    }
    else{
        fen_error.innerHTML = "";
        renderer.board = game.Board;
        controller.game = game;
        renderer.updateAllSquares();
    }
    // game = parse function
})

flip_button.addEventListener("click", () => {
    renderer.flipBoard()
})


document.onkeydown = function (e) {
    if (e.keyCode === 37){
        console.log("Backward !");
    }
    else if (e.keyCode === 39){
        console.log("Forward !")
    }
}