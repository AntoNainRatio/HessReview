class Pawn extends Piece{
    constructor(color){
        super(color,"P")
        this.firstMove = true
    }

    canMove(from,to,board){
        const dir = this.color == 'w'? 1: -1
        const start_x = from[0]
        const start_y = from[1]
        const end_x = to[0]
        const end_y = to[1]
        if (end_y - start_y == dir * 1){
            if(end_x == start_x){
                return board.getPiece(to) == null
            }
            else if (Math.abs(end_x - start_x) == 1){
                return board.getPiece(to) != null
            } 
            else{
                return false
            }
        }
        else if (end_y - start_y == dir * 2){
            if (!this.firstMove){
                return false
            }
            if (end_x == start_x){
                return board.getPiece(to) == null
            }
            else {
                return false
            }
        }
        else{
            return false
        }
    }
}