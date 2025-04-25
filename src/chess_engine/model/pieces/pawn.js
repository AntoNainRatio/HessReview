class Pawn extends Piece{
    constructor(color,x,y){
        super(color,"P",x,y)
        this.firstMove = true
        this.canBePEP = -2
        this.fillDirections()
    }

    fillDirections(){
        const dir = this.color == 'w'? 1: -1
        this.directions.push([-1,dir])
        this.directions.push([0,dir])
        this.directions.push([1,dir])
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

    getPossibleMoves(board,turnId){
        let res = []
        for(let i = 0; i < this.directions.length; i++){
            // console.log(this.directions[i])
            const x = this.x + this.directions[i][0]
            const y = this.y + this.directions[i][1]
            // console.log(`x: ${x}, y: ${y}`)
            if (!board.isOnBoard([x,y])){
                continue
            }
            if (this.directions[i][0] != 0){
                const target = board.getPiece([x,y])
                if (target != null && target.color != this.color){
                    res.push([x,y])
                }
                const nextToPawn = board.getPiece([x,this.y])
                if (nextToPawn != null && nextToPawn.color != this.color){
                    if (nextToPawn instanceof Pawn && nextToPawn.canBePEP + 1 == turnId){
                        res.push([x,y])
                    }
                }
            }
            else{
                if (board.getPiece([x,y]) == null){
                    res.push([x,y])
                    if (this.firstMove && board.getPiece([x,y+this.directions[i][1]]) == null){
                        res.push([x,y+this.directions[i][1]])
                    }
                }
            }

        }
        return res
    }
}