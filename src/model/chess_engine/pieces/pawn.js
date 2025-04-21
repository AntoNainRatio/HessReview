class Pawn extends Piece{
    constructor(color){
        super(color,"P")
    }

    canMove(from,to,board){
        return true
    }
}