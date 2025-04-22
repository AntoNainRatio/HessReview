class King extends Piece{
    constructor(color){
        super(color,"K")
        this.isCheck = false
    }

    canMove(from,to,board){
        return true
    }
}