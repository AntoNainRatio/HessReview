class Game{
    constructor(){
        this.Board = new Board()
        this.turn = 'w'

        this.whiteKing = null
        this.whitePieces = []

        this.blackKing = null
        this.blackPieces = []

        this.fillPiecesLists()
        this.initKings()

        this.state = 'p'
        this.winner = null
        this.history = []
        this.undone = []
        this.moveId = 0

        this.fullMoveId = 1
        this.halfMoveId = 0

        this.whitesMoves = this.getAllLegalMoves('w')
        this.blackMoves = null
    }

    initGame() {
        this.Board.emptyBoard();
        this.turn = 'w';

        this.whiteKing = null
        this.whitePieces = []

        this.blackKing = null
        this.blackPieces = []

        this.state = 'p'
        this.winner = null
        this.history = []
        this.moveId = 1

        this.whitesMoves = null;
        this.blackMoves = null;
        return this
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

        const attacker = color == 'w' ? this.blackPieces : this.whitePieces
        for(let i = 0; i < attacker.length; i++){
            if (attacker[i].canMove([attacker[i].x,attacker[i].y],king_pos,this.Board)){
                return true
            } 
        }
        return false
    }

    isCheckMate(color){
        return this.isInCheck(color) && this.getAllLegalMoves(color).length == 0
    }

    isPat(color){
        return !this.isCheckMate(color) && this.getAllLegalMoves(color).length == 0
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
        this.moveId += 1;
        if (this.turn == 'w'){
            this.turn = 'b'
            this.blackMoves = this.getAllLegalMoves(this.turn)
        }
        else{
            this.fullMoveId += 1
            this.turn = 'w'
            this.whitesMoves = this.getAllLegalMoves(this.turn)
        }

    }

    undoTurn(){
        this.moveId -=1;
        if (this.turn == 'w'){
            this.fullMoveId -= 1
            this.turn = 'b'
            this.blackMoves = this.getAllLegalMoves(this.turn)
        }
        else{
            this.turn = 'w'
            this.whitesMoves = this.getAllLegalMoves(this.turn)
        }
    }

    initLegalMoves(){
        if (this.turn == 'b'){
            this.blackMoves = this.getAllLegalMoves(this.turn)
        }
        else{
            this.whitesMoves = this.getAllLegalMoves(this.turn)
        }
    }

    verifyRoque(pos1,pos2,color){
        // function to verifiy if rook thos two pos is valid
        // return the move in x coord of the king: diff_x * 2 if true
        //                                         0 otherwise
        const start_x = pos1[0]
        const start_y = pos1[1]
        const end_x = pos2[0]
        const end_y = pos2[1]

        const diff_x = end_x - start_x > 0 ? 1 : -1;
        let curr = start_x + diff_x;
        while (curr != end_x){

            // console.log([curr,start_y])
            if(this.Board.getPiece([curr,start_y]) != null){
                return 0
            }
            if(Math.abs(curr - start_x) <= 2 && this.isInCheck(color)){
                return 0
            }
            curr += diff_x;
        }

        return diff_x*2
    }

    checkForRoques(king,rook1,rook2,moves){
        if(king.isCheck){
            return
        }
        // console.log(king.color)
        if (rook1 != null && king.firstMove && rook1.firstMove){
            if(king.y == rook1.y){
                const pos1 = [king.x,king.y]
                const pos2 = [rook1.x,rook1.y]
                const diff_x = this.verifyRoque(pos1,pos2,king.color)
                if (diff_x != 0){
                    moves.push({piece: king, to: [king.x+diff_x,king.y]})
                }
            }
        }

        if (rook2 != null && king.firstMove && rook2.firstMove){
            if(king.y == rook2.y){
                const pos1 = [king.x,king.y]
                const pos2 = [rook2.x,rook2.y]

                const diff_x = this.verifyRoque(pos1,pos2,king.color)
                if (diff_x != 0){
                    moves.push({piece: king, to: [king.x+diff_x,king.y]})
                }
            }
        }
    }

    checksAfterPromo(){
        const defender = this.turn;
        // console.log(`turn: ${this.turn}`)
        // console.log("nooooooooooooon")
        // if(defender === 'w'){
        //     console.log(this.whitePieces);
        // }
        // else{
        //     console.log(this.blackPieces);
        // }

        if(defender === 'w'){
            this.whitesMoves = this.getAllLegalMoves(this.turn);
        }
        else{
            this.blackMoves = this.getAllLegalMoves(this.turn);
        }
        if (this.isInCheck(defender)){
            // console.log("ouiiiii")
            if(defender === 'w'){
                this.whiteKing.isCheck = true;
            }
            else{
                this.blackKing.isCheck = true;

            }
        }
        if (this.isCheckMate(defender)){
            this.state = 'won'
            this.winner = this.turn == 'w' ? 'b' : 'w'
            console.log(`${this.winner} won !!`)
        }
        if(this.isPat(defender)){
            console.log('Pat !!!')
            this.state = 'pat'
        }
    }

    getAllLegalMoves(color){
        const pieces = color == 'w' ? this.whitePieces : this.blackPieces;
        let rook1 = null
        let rook2 = null
        const res = []
        for (const piece of pieces){
            if (piece instanceof Rook){
                if(rook1 == null){
                    rook1 = piece
                }
                else{
                    rook2 = piece
                }
            }
            const moves = piece.getPossibleMoves(this.Board,this.moveId)
            for (const move of moves){
                if (!this.putKingInCheck(piece,move)){
                    res.push({piece, to: move})
                }
            }
        }
        const king = color == 'w' ? this.whiteKing : this.blackKing
        
        this.checkForRoques(king,rook1,rook2,res)
        
        return res;
    }

    movePiece(start,end){
        var res = new Move(start,end)
        const piece = this.Board.getPiece(start);
        if(piece.color != this.turn){
            return res;
        }
        const dest = this.Board.getPiece(end)
        if (dest != null && piece.color == dest.color){
            return res;
        }
        else if (dest != null){
            res.capture = dest;
        }
        const legalMoves = piece.color == 'w' ? this.whitesMoves : this.blackMoves

        // if the move selected by the turn player is in legalMoves list
        const isLegal = legalMoves.some(
            (m) => m.piece === piece && m.to[0] === end[0] && m.to[1] === end[1]
          );
        if (isLegal){
            // handle first move of pieces that got it
            if (piece instanceof Pawn || piece instanceof Rook || piece instanceof King){
                piece.firstMove = false;
                res.wasFirstMove = true;
            }

            if(piece instanceof Pawn && Math.abs(end[1] - start[1]) == 2){
                piece.canBePEP = this.moveId
            }

            if (piece instanceof Pawn && (end[1] == 0 || end[1] == 7)){
                res.promotion = true;
            }
            let capture = this.Board.getPiece(end)
            
            let diff_x = end[0]-start[0];

            if (capture != null){
                this.deletePieceFromList(capture)
            }

            // handling Prise en passant
            else if (piece instanceof Pawn && Math.abs(diff_x) != 0){
                capture = this.Board.getPiece([end[0],start[1]])
                if(capture != null){
                    this.Board.board[start[1]][end[0]] = null
                    res.capture = capture
                    res.PEPCapture = [end[0],start[1]]
                    this.deletePieceFromList(capture)
                }
                else{
                    console.log("Undefined behavior: PEP capture missing")
                }
            }
            else if (piece instanceof King && Math.abs(diff_x) == 2){
                let fromR = [-1,-1];
                let toR = [-1,-1];

                let dir = diff_x > 0 ? 1: -1

                let curr_x = end[0] + dir;
                while (this.Board.isOnBoard([curr_x,end[1]]) && this.Board.getPiece([curr_x,end[1]]) == null){
                    curr_x += dir;
                }

                fromR[0] = curr_x;
                fromR[1] = end[1];

                const dist_K_R = Math.abs(start[0] - fromR[0])
                if (dist_K_R === 3){
                    res.toStr = "O-O";
                }
                else {
                    res.toStr = "O-O-O";
                }

                toR[0] = end[0]-dir
                toR[1] = end[1]

                // updating info to inform controller that it's a roque move by telling the [from,tw] of the rook
                res.roque = [fromR,toR]

                // TODO
                // res.toStr = 

                // moving rook
                this.Board.board[toR[1]][toR[0]] = this.Board.board[fromR[1]][fromR[0]]
                this.Board.board[fromR[1]][fromR[0]] = null

                // updating piece coordinates
                this.Board.board[toR[1]][toR[0]].x = toR[0]
                this.Board.board[toR[1]][toR[0]].y = toR[1]
            }
            this.Board.move(start,end)
            if (!this.isInCheck(this.turn)){
                this.turn == 'w' ? this.whiteKing.isCheck = false: this.blackKing.isCheck = false
            }
            this.switchTurn()
            if (this.isCheckMate(this.turn)){
                this.state = 'won'
                this.winner = this.turn == 'w' ? 'b' : 'w'
                console.log(`${this.winner} won !!`)
            }
            if(this.isPat(this.turn)){
                console.log('Pat !!!')
                this.state = 'pat'
            }
            if(this.isInCheck(this.turn)){
                this.turn == 'w' ? this.whiteKing.isCheck = true : this.blackKing.isCheck = true
            }
            res.isOk = true;

            if (res.capture === null && !(piece instanceof Pawn)){
                res.halfMoveId = this.halfMoveId;
                this.halfMoveId += 1;
            }
            // console.log('move added to history:')
            // console.log(res)
            this.history.push(res);
            return res
        }
        
        return res
    }

    putPiece(pos,piece){
        const old = this.Board.board[pos[1]][pos[0]]
        if (old !== null){
            piece.x = old.x
            piece.y = old.y
            piece.color = old.color
            this.deletePieceFromList(old)
        }
        if (piece.color == 'w'){
            this.whitePieces.push(piece)
        }
        else{
            this.blackPieces.push(piece)
        }
        this.Board.board[pos[1]][pos[0]] = piece
    }

    canBeSelected(pos){
        const piece = this.Board.getPiece(pos)
        return piece !== null && piece.color === this.turn;
    }

    getMovesOfPiece(pos){
        const res = [];
        const legalMoves = this.turn === "w" ? this.whitesMoves: this.blackMoves;
        const x = pos[0];
        const y = pos[1];
        for(const m of legalMoves){
            if (m.piece.x === x && m.piece.y === y){
                res.push(m.to)
            }
        }
        return res;
    }

    undoMove(){
        //
        // undo le move et return la liste des cases qui ont ete modifie
        //

        const res = [];

        const move = this.history.pop();
        if (move === undefined) {
            return res;
        }

        console.log('move:');
        console.log(move);
        this.Board.move(move.to,move.from);
        res.push(move.from);
        res.push(move.to)

        // handling capture
        const capture = move.capture;
        if (capture !== null){
            this.putPiece([capture.x,capture.y],capture);
            res.push([capture.x,capture.y])
        }

        // handling first moves
        if (move.wasFirstMove){
            const p = this.Board.getPiece(move.from);
            if (p !== null){
                p.firstMove = true;
            }
        }

        // handling roque
        const r = move.roque;
        if (r !== null) {
            const fromR = r[0]
            const toR = r[1]
            this.Board.move(toR,fromR);
            res.push(fromR);
            res.push(toR);
        }

        // handling promotion
        if (move.promotion){
            const pawnColor = this.turn === 'w' ? 'b' : 'w';
            const pawn = new Pawn(pawnColor,move.from[0],move.from[1])
            pawn.firstMove = false;
            this.putPiece(move.from,pawn);
        }

        //handling half-move
        if (move.halfMoveId != null) {
            this.halfMoveId = move.halfMoveId;
        }

        // met le move annule dans la liste des undones
        this.undone.push(move);

        this.undoTurn();

        // renvois la liste a update
        return res;
    }

    redoMove() {
        const move = this.undone.pop();
    }
}