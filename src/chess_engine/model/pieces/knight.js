class Knight extends Piece{
    constructor(color,x,y){
        const c = color === 'w' ? "N" : 'n';
        super(color,c,x,y)
        this.fillDirections()
    }

    fillDirections(){
        this.directions.push([-2,1])
        this.directions.push([-2,-1])
        this.directions.push([2,1])
        this.directions.push([2,-1])

        this.directions.push([-1,2])
        this.directions.push([-1,-2])
        this.directions.push([1,2])
        this.directions.push([1,-2])
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

    getPossibleMoves(board){
        let res = []
        for (const dir of this.directions){
            const x = this.x + dir[0];
            const y = this.y + dir[1];
            
            if (board.isOnBoard([x,y])){
                //console.log(`x: ${x}, y: ${y}`)
                const onTarget = board.getPiece([x,y])
                //console.log("onTarget:")
                //console.log(onTarget)
                if (onTarget == null){
                    res.push([x,y])
                    //console.log(`x: ${x}, y: ${y}`)
                }
                else if(onTarget.color != this.color){
                    res.push([x,y])
                    //console.log(`x: ${x}, y: ${y}`)
                }
                else{
                    // console.log("impossible:")
                    // console.log(`x: ${x}, y: ${y}`)
                }
            }
        }
        return res
    }
}