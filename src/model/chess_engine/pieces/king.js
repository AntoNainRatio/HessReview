class King extends Piece{
    constructor(color,x,y){
        super(color,"K",x,y)
        this.isCheck = false
        this.firstMove = true
        this.fillDirections()
    }

    fillDirections(){
        // rook
        this.directions.push([-1,0])
        this.directions.push([1,0])
        this.directions.push([0,-1])
        this.directions.push([0,1])

        // bishop
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
        if (Math.max(Math.abs(diff_x),Math.abs(diff_y)) == 1){
            return true
        }
        return false
    }

    getPossibleMoves(board){
        let res = []
        for(const dir of this.directions){
            const x = this.x + dir[0];
            const y = this.y + dir[1];
            
            if (board.isOnBoard([x,y])){
                const dest_piece = board.getPiece([x,y])
                if (dest_piece == null){
                    res.push([x,y])
                }
                else if(dest_piece.color != this.color){
                    res.push([x,y])
                }
                
            }
        }
        return res
    }
}