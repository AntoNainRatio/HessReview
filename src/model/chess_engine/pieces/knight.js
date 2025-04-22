class Knight extends Piece{
    constructor(color){
        super(color,"N")
    }

    canMove(from,to,board){
        const start_x = from[0]
        const start_y = from[1]
        const end_x = to[0]
        const end_y = to[1]

        const diff_x = end_x - start_x;
        const diff_y = end_y - start_y;

        if (Math.abs(diff_x) == 1){
            return Math.abs(diff_y) == 2
        }
        else if (Math.abs(diff_x) == 2){
            return Math.abs(diff_y) == 1
        }
        return false
    }
}