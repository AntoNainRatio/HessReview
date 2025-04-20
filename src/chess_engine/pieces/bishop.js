class Bishop extends Piece{
    constructor(color){
        super(color,"B")
    }

    canMove(from,to,board){
        return true
    }
}