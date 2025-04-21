class Board{
    constructor(){
        this.board = []
        this.create()
    }

    createSupPieceList(color){
        // Create Superior piece list
        let res=[]
        res.push(new Rook(color));
        res.push(new Knight(color));
        res.push(new Bishop(color));
        res.push(new King(color));
        res.push(new Queen(color));
        res.push(new Bishop(color));
        res.push(new Knight(color));
        res.push(new Rook(color));
        return res;
    }

    createPawnList(width,color){
        let res=[]
        for(let i = 0; i < width; i++){
            res.push(new Pawn(color))
        }
        return res;
    }

    create(){
        const height = 8;
        const width = 8;

        // White side
        this.board.push(this.createSupPieceList('w'))
        this.board.push(this.createPawnList(width,'w'))

        for(let i = 2; i < height - 2; i++){
            let tmp = []
            for(let j = 0; j < width; j++){
                tmp.push(null)
            }
            this.board.push(tmp)
        }

        // Black side
        this.board.push(this.createPawnList(width,'b'))
        this.board.push(this.createSupPieceList('b'))
    }

    getPiece(coords){
        // coords: [x,y]
        return this.board[coords[1]][coords[0]]
    }

    move(start,end){
        this.board[end[1]][end[[0]]] = this.board[start[1]][start[0]]
        this.board[start[1]][start[0]] = null
    }
}