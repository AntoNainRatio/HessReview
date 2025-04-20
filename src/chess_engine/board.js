class Board{
    constructor(id){
        this.boardElement = document.getElementById(id);
        this.board = [];
        this.createEmpty();
        this.setUpPieces();
    }

    createEmpty(){
        const height = 8;
        const width = 8;
        const rows='12345678';
        const cols='hgfedcba';
        for(let i = 0; i < height; i++){
            this.board[i] = [];
            for(let j = 0; j < width; j++){
                const square = document.createElement('div')
                square.classList.add('square')
                square.setAttribute('square-id',(i*8+j))
                if ((i + j) % 2 == 0)
                {
                    square.classList.add('white')
                }
                else{
                    square.classList.add('black')
                }
                if (i == 7){
                    const col_id = document.createElement('div')
                    col_id.classList.add('col_id')
                    col_id.classList.add('coord')
                    if (square.classList.contains('white')){
                        col_id.classList.add('blackWrited')
                    }
                    else{
                        col_id.classList.add('whiteWrited')
                    }
                    col_id.innerText = cols[j]
                    square.appendChild(col_id)
                }
                if (j == 0){
                    const row_id = document.createElement('div')
                    row_id.classList.add('row_id')
                    row_id.classList.add('coord')
                    if (square.classList.contains('white')){
                        row_id.classList.add('blackWrited')
                    }
                    else{
                        row_id.classList.add('whiteWrited')
                    }
                    row_id.innerText = rows[i]
                    square.appendChild(row_id)
                }
                this.board[i].push(square)
                this.boardElement.appendChild(square)
            }
        }
    }

    setUpPieces(){
        const pieces = [
            { p : new Rook('w'), position: { x: 0, y: 0 } },
            { p : new Rook('w'), position: { x: 7, y: 0 } },
            { p : new Knight('w'), position: { x: 1, y: 0 } },
            { p : new Knight('w'), position: { x: 6, y: 0 } },
            { p : new Bishop('w'), position: { x: 2, y: 0 } },
            { p : new Bishop('w'), position: { x: 5, y: 0 } },
            { p : new Queen('w'), position: { x: 3, y: 0 } },
            { p : new King('w'), position: { x: 4, y: 0 } },
            { p: new Pawn('w'), position: { x: 0, y: 1 } },
            { p: new Pawn('w'), position: { x: 1, y: 1 } },
            { p: new Pawn('w'), position: { x: 2, y: 1 } },
            { p: new Pawn('w'), position: { x: 3, y: 1 } },
            { p: new Pawn('w'), position: { x: 4, y: 1 } },
            { p: new Pawn('w'), position: { x: 5, y: 1 } },
            { p: new Pawn('w'), position: { x: 6, y: 1 } },
            { p: new Pawn('w'), position: { x: 7, y: 1 } },

            { p : new Rook('b'), position: { x: 0, y: 7 } },
            { p : new Rook('b'), position: { x: 7, y: 7 } },
            { p : new Knight('b'), position: { x: 1, y: 7 } },
            { p : new Knight('b'), position: { x: 6, y: 7 } },
            { p : new Bishop('b'), position: { x: 2, y: 7 } },
            { p : new Bishop('b'), position: { x: 5, y: 7 } },
            { p : new Queen('b'), position: { x: 3, y: 7 } },
            { p : new King('b'), position: { x: 4, y: 7 } },
            { p : new Pawn('b'), position: { x: 0, y: 6 } },
            { p : new Pawn('b'), position: { x: 1, y: 6 } },
            { p : new Pawn('b'), position: { x: 2, y: 6 } },
            { p : new Pawn('b'), position: { x: 3, y: 6 } },
            { p : new Pawn('b'), position: { x: 4, y: 6 } },
            { p : new Pawn('b'), position: { x: 5, y: 6 } },
            { p : new Pawn('b'), position: { x: 6, y: 6 } },
            { p : new Pawn('b'), position: { x: 7, y: 6 } }
        ];

        pieces.forEach(piece => {
                const squareId = piece.position.y * 8 + piece.position.x;
                const square = this.board[piece.position.y][piece.position.x];
                const pieceDiv = document.createElement('div');
                pieceDiv.classList.add(piece.p.constructor.name);
                pieceDiv.style.color = piece.p.color;
                const pieceImg = document.createElement('img')
                const pieceCode = piece.p.color+piece.p.char;
                pieceImg.src = `img/chesspieces/${pieceCode}.png`
                pieceImg.alt = pieceCode;
                pieceImg.classList.add('piece')
                
                square.appendChild(pieceImg)
                square.appendChild(pieceDiv);
            }
        )
    }

}

const board = new Board('gameboard');