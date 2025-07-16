function parseFen(input,isFlipped){
    if (input.length === 0){
        return null;
    }
    const res = new Game();
    res.initGame();
    let i = parseBoard(input,res,isFlipped);
    if (i === null){
        return null;
    }
    i = parseTurn(input,i,res);
    if (i === null){
        return null;
    }
    i = parseRook(input,i,res);
    if (i === null){
        return null;
    }
    i = parsePEP(input,i,res);
    if (i === null){
        return null;
    }
    i = halfMove(input, i, res);
    if (i === null){
        return null;
    }
    i = fullMove(input, i, res);
    if (i === null){
        return null;
    }
    return res;
}

function fullMove(input, i, res) {
    if (i >= input.length){
        return null;
    }
    let num = "";
    while (i < input.length && (input[i] >= '0' && input[i] <= '9')){
        num += input[i]
        i++;
    }
    if (i != input.length){
        return null;
    }
    res.MoveId = parseInt(num);
    return i;
}

function halfMove(input, i ,res) {
    if (i >= input.length){
        return null;
    }
    let num = "";
    while (i < input.length && (input[i] >= '0' && input[i] <= '9')){
        num += input[i]
        i++;
    }
    if (input[i] != ' '){
        return null;
    }
    res.halfMoveId = parseInt(num);
    return i+1;
}

function parsePEP(input,i,game){
    if (i < input.length){
        if (input[i] === '-'){
            return i+2;
        }
        else{
            console.log(input[i])
            const x = 7 - (input[i].charCodeAt(0)-'a'.charCodeAt(0));
            console.log(`x: ${x}`);
            i += 1;
            if (i >= input.length){
                return null;
            }
            console.log(input[i])
            let y = input[i]-'1';
            console.log(`y: ${y}`);
            if (y === 2){
                y = 3;
            }
            else if (y === 5){
                y = 4;
            }
            console.log(`newY: ${y}`);
            console.log(game.Board.board)
            const p = game.Board.getPiece([x,y]);
            console.log(p)
            if (p === null || !(p instanceof Pawn)){
                console.log('ici')
                return null;
            }
            else {
                p.canBePEP = true;
                game.Board.board[y][x] = p;
                return i + 2;
            }
        }
    }
    else {
        return null;
    }
}

function parseRook(input,i,game){
    if (i < input.length && input[i] === '-'){
        //no rook for both players

        return i+2;
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
    return i + 1;
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

function parseBoard(input,game,isFlipped){
    let b = new Board();
    b.flip = isFlipped;
    b.emptyBoard();
    let x = 7;
    let y = 7;
    let startX = 7;
    let xAdder = -1;
    let yAdder = -1;
    if (isFlipped){
        x = 0;
        startX = 0;
        y = 0;
        xAdder = 1;
        yAdder = 1;
    }
    let i = 0;
    while(input[i] !== ' '){
        const c = input[i];
        if ('1' <= c && c <= '8'){
            x += xAdder * (c - '0');
        }
        else if (c === '/'){
            x = startX;
            y += yAdder;
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
            x+=xAdder;
        }
        i++;
    }
    if (!isFlipped && x === -1 && y === 0){
        game.Board = b;
        return i;
    }
    if (isFlipped && x === 8 && y === 7){
        game.Board = b;
        return i;
    }
    return null;
}