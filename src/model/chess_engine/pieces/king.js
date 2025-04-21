class King extends Piece{
    constructor(color){
        super(color,"K")
    }

    canMove(from,to,board){
        return true
    }
}