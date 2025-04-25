class Rook extends Piece{
    constructor(color,x,y){
        super(color,"R",x,y)
        this.fillDirections()
        this.firstMove = true
    }

    fillDirections(){
        this.directions.push([-1,0])
        this.directions.push([1,0])
        this.directions.push([0,-1])
        this.directions.push([0,1])

    }

    canMove(from,to,board){
        const start_x = from[0]
        const start_y = from[1]
        const end_x = to[0]
        const end_y = to[1]

        const diff_x = end_x - start_x;
        const diff_y = end_y - start_y;

        if(diff_x != 0 && diff_y != 0){
            return false
        }
        else if (diff_x != 0){
            const dir = diff_x > 0 ? 1 : -1;
            for (let i = start_x + dir; i != end_x; i+=dir){
                if(board.getPiece([i,start_y]) != null){
                    return false
                }
            }
            return true
        }
        else{
            const dir = diff_y > 0 ? 1 : -1;
            for (let i = start_y + dir; i != end_y; i+=dir){
                if(board.getPiece([start_x,i]) != null){
                    return false
                }
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