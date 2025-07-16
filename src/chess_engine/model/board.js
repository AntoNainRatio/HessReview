class Board{
    constructor(){
        this.board = []
        this.create()
    }

    createSupPieceList(color,y){
        // Create Superior piece list
        let res=[]
        res.push(new Rook(color,0,y));
        res.push(new Knight(color,1,y));
        res.push(new Bishop(color,2,y));
        res.push(new King(color,3,y));
        res.push(new Queen(color,4,y));
        res.push(new Bishop(color,5,y));
        res.push(new Knight(color,6,y));
        res.push(new Rook(color,7,y));
        return res;
    }

    createPawnList(width,color,y){
        let res=[]
        for(let i = 0; i < width; i++){
            res.push(new Pawn(color,i,y))
        }
        return res;
    }

    emptyBoard() {
        const height = 8;
        const width = 8;
        this.board = [];
        for(let i = 0; i < height; i++){
            let tmp = []
            for(let j = 0; j < width; j++){
                tmp.push(null)
            }
            this.board.push(tmp)
        }
    }

    create(){
        const height = 8;
        const width = 8;

        // White side
        this.board.push(this.createSupPieceList('w',0))
        this.board.push(this.createPawnList(width,'w',1))

        for(let i = 2; i < height - 2; i++){
            let tmp = []
            for(let j = 0; j < width; j++){
                tmp.push(null)
            }
            this.board.push(tmp)
        }

        // Black side
        this.board.push(this.createPawnList(width,'b',6))
        this.board.push(this.createSupPieceList('b',7))
    }

    getPiece(coords){
        // coords: [x,y]
        return this.board[coords[1]][coords[0]]
    }

    putPiece(x,y,p){
        this.board[y][x] = p;
    }

    move(start,end){
        this.board[end[1]][end[[0]]] = this.board[start[1]][start[0]]
        const p = this.getPiece(end);
        if (p != null){
            p.x = end[0]
            p.y = end[1]
        }
        this.board[start[1]][start[0]] = null
    }

    isOnBoard(pos){
        const x = pos[0]
        const y = pos[1]
        if (x < 0 || x >= 8){
            return false
        }
        if (y < 0 || y >= 8){
            return false
        }
        return true
    }

    dump(){
        for (let i = 0; i < 8; i++){
            for (let j = 0; j < 8; j++){
                if (this.board[i][j] == null){
                    console.log(` `)
                }else{
                    console.log(`${this.board[i][j].char}`)
                }
            
            }
        }
    }
}