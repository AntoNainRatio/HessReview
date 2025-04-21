class Queen extends Piece{
    constructor(color){
        super(color,"Q")
    }

    canMove(from,to,board){
        return true
    }
}