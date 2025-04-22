class Bishop extends Piece{
    constructor(color){
        super(color,"B")
    }

    canMove(from,to,board){
        const start_x = from[0]
        const start_y = from[1]
        const end_x = to[0]
        const end_y = to[1]

        const diff_x = end_x - start_x;
        const diff_y = end_y - start_y;
        if (diff_x  == 0 || diff_y == 0 || Math.abs(diff_x) != Math.abs(diff_y)){
            return false
        }
        else{
            const dir_x = diff_x > 0 ? 1 : -1
            const dir_y = diff_y > 0 ? 1 : -1
            let curr_x = start_x + dir_x;
            let curr_y = start_y + dir_y;
            while (curr_x != end_x && curr_y != end_x){
                if (board.getPiece([curr_x,curr_y]) != null){
                    return false
                }
                curr_x += dir_x
                curr_y += dir_y
            }
            return true
        }
    }
}