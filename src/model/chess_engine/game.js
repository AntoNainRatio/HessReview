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

    getCheckedKingPos(){
        if(this.blackKing.isCheck){
            return [this.blackKing.x,this.blackKing.y]
        }
        if (this.whiteKing.isCheck){
            return [this.whiteKing.x,this.whiteKing.y]
        }
    }

    putKingInCheck(piece,move){
       
        // save current board state and pieces
        const save_x = piece.x
        const save_y = piece.y

        const save_capture = this.Board.getPiece(move)

        this.Board.board[move[1]][move[0]] = piece
        this.Board.board[save_y][save_x] = null

        piece.x = move[0]
        piece.y = move[1]

        // deleting potential capture from its pieceList
        if(save_capture != null){
            this.deletePieceFromList(save_capture)
        }

        // get answer
        const res = this.isInCheck(piece.color)
        
        // putting back potential capture
        if (save_capture != null){
            this.addPieceFromList(save_capture)
        }

        // Undo modification on board and piece
        this.Board.board[save_y][save_x] = piece

        piece.x = save_x;
        piece.y = save_y;

        this.Board.board[move[1]][move[0]] = save_capture

        return res
    }

    isInCheck(color){
        const king = color == 'w' ? this.whiteKing : this.blackKing
        const king_pos = [king.x,king.y]

        // console.log(king_pos)
        const attacker = color == 'w' ? this.blackPieces : this.whitePieces
        for(let i = 0; i < attacker.length; i++){
            if (attacker[i].canMove([attacker[i].x,attacker[i].y],king_pos,this.Board)){
                // console.log("attacker :")
                // console.log(attacker[i])
                return true
            } 
        }
        return false
    }

    isCheckMate(color,legalMoves){
        return this.isInCheck(color) && legalMoves.length == 0
    }

    deletePieceFromList(piece){
        const list = piece.color === 'w' ? this.whitePieces : this.blackPieces;
        const i = list.indexOf(piece);
        if (i !== -1) {
            list.splice(i, 1);
        }
      }

    addPieceFromList(piece){
        const list = piece.color === 'w' ? this.whitePieces : this.blackPieces;
        list.push(piece)
      }

    switchTurn(){
        if (this.turn == 'w'){
            this.turn = 'b'
        }
        else{
            this.turn = 'w'
        }

        // console.log(`${this.turn} turn`)
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
        if(this.isInCheck(this.turn)){
            this.turn == 'w' ? this.whiteKing.isCheck = true : this.blackKing.isCheck = true
        }
        // console.log(legalMoves.length)
        const isLegal = legalMoves.some(
            (m) => m.piece === piece && m.to[0] === end[0] && m.to[1] === end[1]
          );
        if (isLegal){
            if (piece instanceof Pawn){
                piece.firstMove = false
            }
            const capture = this.Board.getPiece(end)
            if (capture != null){
                this.deletePieceFromList(capture)
            }
            this.Board.move(start,end)
            if (!this.isInCheck(this.turn)){
                this.turn == 'w' ? this.whiteKing.isCheck = false: this.blackKing.isCheck = false
            }
            this.switchTurn()
            if (this.isInCheck(this.turn)){
                this.turn == 'w' ? this.whiteKing.isCheck = true : this.blackKing.isCheck = true
            }
            return true
        }
        
        return false
    }
}