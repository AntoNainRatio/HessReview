function parseFen(input){
    if (input.length === 0){
        return null;
    }
    const res = new Game();
    res.initGame();
    let i = parseBoard(input,res);
    if (i === null){
        return null;
    }
    i = parseTurn(input,i,res);
    i = parseRook(input,i,res);
    //
    return res;
}

function parseRook(input,i,game){
    if (i < input.length && input[i] === '-'){
        //no rook for both players

        return i+1;
    }
    if (i < input.length && input[i] === 'K'){
        const r = game.Board.getPiece([0,0]);
        if (r !== null){
            r.firstMove = true;
        }
        game.Board.board[0][0] = r;
        i+=1;
    }
    if (i < input.length && input[i] === 'Q'){
        const r = game.Board.getPiece([7,0]);
        if (r !== null){
            r.firstMove = true;
        }
        game.Board.board[0][7] = r;
        i += 1;
    }
    if (i < input.length && input[i] === 'k'){
        const r = game.Board.getPiece([0,7]);
        if (r !== null){
            r.firstMove = true;
        }
        game.Board.board[7][0] = r;
        i+=1;
    }
    if (i < input.length && input[i] === 'q'){
        const r = game.Board.getPiece([7,7]);
        if (r !== null){
            r.firstMove = true;
        }
        game.Board.board[7][7] = r;
        i += 1;
    }
    return i;
}

function parseTurn(input,i,game){
    if (i < input.length && input[i] !== ' '){
        return null;
    }
    i += 1;
    if (i < input.length && input[i] === 'w'){
        game.turn = 'w';
    }
    else if (i < input.length && input[i] === 'b'){
        game.turn = 'b';
    }
    else{
        return null;
    }
    game.initLegalMoves();
    i+=1;
    if (i < input.length && input[i] !== ' '){
        return null;
    }
    return i+1;
}

function parsePiece(c,x,y){
    if (c === 'K'){
        const k = new King('w',x,y);
        return k;
    }
    else if (c === 'Q'){
        return new Queen('w',x,y);
    }
    else if (c === 'R'){
        const r = new Rook('w',x,y);
        r.firstMove = false;
        return r;
    }
    else if (c === 'B'){
        return new Bishop('w',x,y);
    }
    else if (c === 'N'){
        return new Knight('w',x,y);
    }
    else if (c === 'P'){
        const p =  new Pawn('w',x,y);
        if (y !== 1){
            p.firstMove = false;
        }
        return p;
    }
    else if (c === 'k'){
        const k = new King('b',x,y);
        return k;
    }
    else if (c === 'q'){
        return new Queen('b',x,y);
    }
    else if (c === 'r'){
        const r = new Rook('b',x,y);
        r.firstMove = false;
        return r;
    }
    else if (c === 'b'){
        return new Bishop('b',x,y);
    }
    else if (c === 'n'){
        return new Knight('b',x,y);
    }
    else if (c === 'p'){
        const p = new Pawn('b',x,y);
        if (y !== 6){
            p.firstMove = false;
        }
        return p;
    }
    else{
        return null;
    }
}

function parseBoard(input,game){
    let b = new Board();
    b.emptyBoard();
    let x = 7;
    let y = 7;
    let i = 0;
    while(input[i] !== ' '){
        const c = input[i];
        if ('1' <= c && c <= '8'){
            x -= (c - '0');
        }
        else if (c === '/'){
            x = 7;
            y -= 1;
        }
        else{
            const p = parsePiece(c,x,y);
            if (p === null){
                return null;
            }
            if (p.color === 'w'){
                if (p instanceof King){
                    game.whiteKing = p;
                }
                game.whitePieces.push(p);
            }
            else{
                if (p instanceof King){
                    game.blackKing = p;
                }
                game.blackPieces.push(p);
            }
            b.putPiece(x,y,p);
            x-=1;
        }
        i++;
    }
    if (x === -1 && y === 0){
        game.Board = b;
        return i;
    }
    return null;
}