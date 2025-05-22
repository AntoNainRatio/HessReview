function parseFen(input){
    if (input.length === 0){
        return null;
    }
    const res = new Game();
    res.initGame();
    parseBoard(input,res);
    // console.log(b);
    res.Board = b;
    return res;
}

function parsePiece(c,x,y){
    if (c === 'K'){
        return new King('w',x,y);
    }
    else if (c === 'Q'){
        return new Queen('w',x,y);
    }
    else if (c === 'R'){
        return new Rook('w',x,y);
    }
    else if (c === 'B'){
        return new Bishop('w',x,y);
    }
    else if (c === 'N'){
        return new Knight('w',x,y);
    }
    else if (c === 'P'){
        return new Pawn('w',x,y);
    }
    else if (c === 'k'){
        return new King('b',x,y);
    }
    else if (c === 'q'){
        return new Queen('b',x,y);
    }
    else if (c === 'r'){
        return new Rook('b',x,y);
    }
    else if (c === 'b'){
        return new Bishop('b',x,y);
    }
    else if (c === 'n'){
        return new Knight('b',x,y);
    }
    else if (c === 'p'){
        return new Pawn('b',x,y);
    }
    else{
        return null;
    }
}

function parseBoard(input,game){
    let b = new Board();
    b.emptyBoard();
    let x = 0;
    let y = 0;
    for (let i = 0; i < input.length; i++){
        const c = input[i];
        if ('1' <= c && c <= '8'){
            x += (c - '0');
        }
        else if (c === '/'){
            x = 0;
            y += 1;
        }
        else{
            const p = parsePiece(c,x,y);
            if (p === null){
                return null;
            }
            b.putPiece(x,y,p);
            x+=1;
        }

        if (x === 7 && y === 7){
            game.Board = b;
        }
    }
    return null;
}