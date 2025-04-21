class Rook extends Piece{
    constructor(color){
        super(color,"R")
    }

    canMove(from,to,board){
        return true
    }
}