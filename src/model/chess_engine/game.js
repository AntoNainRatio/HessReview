class Game{
    constructor(){
        this.Board = new Board()
        this.turn = 'w'
        this.history = []
    }

    switchTurn(){
        if (this.turn == 'w'){
            this.turn = 'b'
        }
        else{
            this.turn = 'w'
        }
    }

    movePiece(start,end){
        const piece = this.Board.getPiece(start);
        if(piece.color != this.turn){
            return false
        }
        const dest = this.Board.getPiece(end)
        if (dest != null && piece.color == dest.color){
            return false
        }
        if (piece.canMove(start,end,this.Board)){
            if (piece instanceof Pawn){
                piece.firstMove = false
            }
            this.Board.move(start,end)
            this.switchTurn()
            return true
        }
        return false
    }
}