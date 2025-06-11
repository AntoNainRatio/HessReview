class Bishop extends Piece{
    constructor(color,x,y){
        super(color,"B",x,y)
        this.fillDirections()
    }

    fillDirections(){
        this.directions.push([-1,-1])
        this.directions.push([-1,1])
        this.directions.push([1,-1])
        this.directions.push([1,1])
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
            while (curr_x != end_x && curr_y != end_y){
                if (board.getPiece([curr_x,curr_y]) != null){
                    return false
                }
                curr_x += dir_x
                curr_y += dir_y
            }
            return true
        }
    }

    getPossibleMoves(board){
        let res = []
        for(const dir of this.directions){
            let x = this.x + dir[0];
            let y = this.y + dir[1];
            while (board.isOnBoard([x,y]) && board.getPiece([x,y]) == null){
                res.push([x,y])
                x += dir[0]
                y += dir[1]
            }
            if (board.isOnBoard([x,y]) && board.getPiece([x,y]).color != this.color){
                res.push([x,y])
            }
        }
        return res
    }
}