class Knight extends Piece{
    constructor(color){
        super(color,"N")
    }

    canMove(from,to,board){
        return true
    }
}