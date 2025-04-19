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
            // { type: 'Rook', color: 'white', position: { x: 0, y: 0 } },
            // { type: 'Rook', color: 'white', position: { x: 7, y: 0 } },
            // { type: 'Knight', color: 'white', position: { x: 1, y: 0 } },
            // { type: 'Knight', color: 'white', position: { x: 6, y: 0 } },
            // { type: 'Bishop', color: 'white', position: { x: 2, y: 0 } },
            // { type: 'Bishop', color: 'white', position: { x: 5, y: 0 } },
            // { type: 'Queen', color: 'white', position: { x: 3, y: 0 } },
            // { type: 'King', color: 'white', position: { x: 4, y: 0 } },
            { p: new Pawn(Color.WHITE), position: { x: 0, y: 1 } },
            { p: new Pawn(Color.WHITE), position: { x: 1, y: 1 } },
            { p: new Pawn(Color.WHITE), position: { x: 2, y: 1 } },
            { p: new Pawn(Color.WHITE), position: { x: 3, y: 1 } },
            { p: new Pawn(Color.WHITE), position: { x: 4, y: 1 } },
            { p: new Pawn(Color.WHITE), position: { x: 5, y: 1 } },
            { p: new Pawn(Color.WHITE), position: { x: 6, y: 1 } },
            { p: new Pawn(Color.WHITE), position: { x: 7, y: 1 } },

            // { type: 'Rook', color: 'black', position: { x: 0, y: 7 } },
            // { type: 'Rook', color: 'black', position: { x: 7, y: 7 } },
            // { type: 'Knight', color: 'black', position: { x: 1, y: 7 } },
            // { type: 'Knight', color: 'black', position: { x: 6, y: 7 } },
            // { type: 'Bishop', color: 'black', position: { x: 2, y: 7 } },
            // { type: 'Bishop', color: 'black', position: { x: 5, y: 7 } },
            // { type: 'Queen', color: 'black', position: { x: 3, y: 7 } },
            // { type: 'King', color: 'black', position: { x: 4, y: 7 } },
            { p : new Pawn(Color.BLACK), position: { x: 0, y: 6 } },
            { p : new Pawn(Color.BLACK), position: { x: 1, y: 6 } },
            { p : new Pawn(Color.BLACK), position: { x: 2, y: 6 } },
            { p : new Pawn(Color.BLACK), position: { x: 3, y: 6 } },
            { p : new Pawn(Color.BLACK), position: { x: 4, y: 6 } },
            { p : new Pawn(Color.BLACK), position: { x: 5, y: 6 } },
            { p : new Pawn(Color.BLACK), position: { x: 6, y: 6 } },
            { p : new Pawn(Color.BLACK), position: { x: 7, y: 6 } }
        ];

        pieces.forEach(piece => {
                const squareId = piece.position.y * 8 + piece.position.x;
                const square = this.board[piece.position.y][piece.position.x];
                const pieceDiv = document.createElement('div');
                pieceDiv.classList.add(piece.p.constructor.name);
                pieceDiv.style.color = piece.p.color;
                pieceDiv.innerText = piece.p.char;
                square.appendChild(pieceDiv);
            }
        )
    }

}

const board = new Board('gameboard');