class Game{
    constructor(){
        this.Board = new Board()
        this.turn = 'w'
        this.whiteKing = null
        this.whitePieces = []
        this.blackKing = []
        this.blackPieces = []
        this.fillPiecesLists()
        this.initKings()
        this.history = []
    }

    initKings(){
        this.whiteKing = this.whitePieces[6]
        this.blackKing = this.blackPieces[6]
    }

    fillPiecesLists(){
        for(let i = 0; i < 8; i++){
            this.whitePieces.push(this.Board.getPiece([i,0]))
            this.whitePieces.push(this.Board.getPiece([i,1]))
        }

        for(let i = 0; i < 8; i++){
            this.blackPieces.push(this.Board.getPiece([i,7]))
            this.blackPieces.push(this.Board.getPiece([i,6]))
        }
    }

    putKingInCheck(piece,move){
        const save_x = piece.x
        const save_y = piece.y
        const save_capture = this.Board.getPiece(move)

        const res = this.isTurnKingSafe(piece.color)
        
        this.Board.board[save_y][save_x] = piece
        piece.x = save_x;
        piece.y = save_y
        this.Board.board[move[1]][move[1]] = save_capture

        return !res
    }

    isTurnKingSafe(){
        const king_pos = this.turn == 'w' ? [this.whiteKing.x,this.whiteKing.y] : [this.blackKing.x,this.blackKing.y]
        console.log(king_pos)
        const attacker = this.turn == 'w' ? this.blackPieces : this.whitePieces
        for(let i = 0; i < attacker.length; i++){
            if (attacker[i].canMove([attacker[i].x,attacker[i].y],king_pos,this.Board)){
                return false
            }
        }
        return true
    }

    deletePieceFromList(piece){
        const list = piece.color === 'w' ? this.whitePieces : this.blackPieces;
        const i = list.indexOf(piece);
        if (i !== -1) {
            list.splice(i, 1);
        }
      }

    switchTurn(){
        if (this.turn == 'w'){
            this.turn = 'b'
        }
        else{
            this.turn = 'w'
        }
    }

    getAllLegalMoves(color){
        const pieces = color == 'w' ? this.whitePieces : this.blackPieces;
        const res = []
        for (const piece of pieces){
            const moves = piece.getPossibleMoves(this.Board)
            for (const move of moves){
                if (!this.putKingInCheck(piece,move)){
                    res.push({piece, to: move})
                }
            }
        }
        return res;
    }

    movePiece(start,end){
        const piece = this.Board.getPiece(start);
        if(piece.color != this.turn){
            return false
        }
        const dest = this.Board.getPiece(end)
        if (dest != null && piece.color == dest.color){
            return false
        }
        const legalMoves = this.getAllLegalMoves(this.turn) 
        console.log(legalMoves)
        if (piece.canMove(start,end,this.Board)){
            if (piece instanceof Pawn){
                piece.firstMove = false
            }
            const capture = this.Board.getPiece(end)
            if (capture != null){
                this.deletePieceFromList()
            }
            this.Board.move(start,end)
            this.switchTurn()
            return true
        }
        return false
    }
}