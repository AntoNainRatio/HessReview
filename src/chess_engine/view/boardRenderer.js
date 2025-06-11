class BoardRenderer {
  constructor(boardElement, board) {
    this.boardElement = boardElement
    this.board = board
  }

  createPieceImg(coords,squareDiv){
    const piece = this.board.getPiece(coords)
    if (piece) {
      const img = document.createElement('img')
      img.classList.add('piece')
      img.src = piece.getImagePath()
      squareDiv.appendChild(img)
    }
  }

  updateSquare(coords){
    const x = coords[0]
    const y = coords[1]

    // get square representing coords
    const square_id = y * 8 + x;
    const square = this.boardElement.childNodes[square_id];

    const oldPiece = square.querySelector('.piece');

    if (oldPiece){
      square.removeChild(oldPiece)
    }
    const newPiece = this.board.getPiece(coords)
    if (newPiece)
    {
      const img = document.createElement('img')
      img.classList.add('piece')
      img.src = newPiece.getImagePath()
      square.appendChild(img)
    }
    else if(square.classList.contains('check')){ 
      // if no piece in square and contains 'check' -> remove check
      square.classList.remove('check')
    }
  }

  updateAllSquares(){
    const squares = this.boardElement.childNodes;
    // console.log(this.board);
    for(let y = 0; y < 8; y++){
      for(let x = 0; x < 8; x++){
        const square_id = y * 8 + x;
        const square = squares[square_id];
        const oldPiece = square.querySelector('.piece');

        if (oldPiece){
          square.removeChild(oldPiece)
        }
        const newPiece = this.board.getPiece([x,y])
        // console.log(newPiece)
        if (newPiece)
        {
          const img = document.createElement('img')
          img.classList.add('piece')
          img.src = newPiece.getImagePath()
          square.appendChild(img)
        }
        else if(square.classList.contains('check')){ 
          // if no piece in square and contains 'check' -> remove check
          square.classList.remove('check')
        }
      }
    }
  }

  render() {
    const height = 8;
      const width = 8;
      const rows='12345678';
      const cols='hgfedcba';
      for(let i = 0; i < height; i++){
          for(let j = 0; j < width; j++){
              const square = document.createElement('div')

              const piece = this.board.getPiece([j,i])
              if (piece != null){
                const pieceImg = document.createElement('img')
                const pieceCode = piece.color+piece.char;
                pieceImg.src = piece.getImagePath()
                pieceImg.alt = pieceCode;
                pieceImg.classList.add("piece")
                square.appendChild(pieceImg)
              }
          

              square.classList.add('square')
              square.dataset.x = j
              square.dataset.y = i
              square.setAttribute('square-id',(i*8+j))
              if ((i + j) % 2 == 0)
              {
                  square.classList.add('white_square')
              }
              else{
                  square.classList.add('black_square')
              }
              if (i == 7 || i == 0){
                  const col_id = document.createElement('div')
                  col_id.classList.add('col_id')
                  col_id.classList.add('coord')
                  if (square.classList.contains('white_square')){
                      col_id.classList.add('blackWrited')
                  }
                  else{
                      col_id.classList.add('whiteWrited')
                  }
                  if (i == 0){
                    col_id.classList.add("flip_coord")
                  }
                  col_id.innerText = cols[j]
                  square.appendChild(col_id)
              }
              if (j == 0 || j == 7){
                  const row_id = document.createElement('div')
                  row_id.classList.add('row_id')
                  row_id.classList.add('coord')
                  if (square.classList.contains('white_square')){
                      row_id.classList.add('blackWrited')
                  }
                  else{
                      row_id.classList.add('whiteWrited')
                  }
                  if (j == 7){
                    row_id.classList.add("flip_coord")
                  }
                  row_id.innerText = rows[i]
                  square.appendChild(row_id)
              }
              this.boardElement.appendChild(square)
          }
      }
  }

  highlight(x,y){
    const id = y * 8 + x;
    const square = document.querySelector(`[square-id="${id}"]`);
    if (square) {
      square.classList.add('highlight');
    }
  }

  clearHighlight(x,y){
    const id = y * 8 + x;
    const square = document.querySelector(`[square-id="${id}"]`);
    if (square) {
      square.classList.remove('highlight');
    }
  }

  check(x,y){
    const id = y * 8 + x;
    const square = document.querySelector(`[square-id="${id}"]`);
    if (square){
      // console.log("Turn check on")
      square.classList.add('check')
    }
    // console.log([x,y])
    this.updateSquare([x,y])
  }

  uncheck(x,y){
    const id = y * 8 + x;
    const square = document.querySelector(`[square-id="${id}"]`);
    if (square) {
      square.classList.remove('check');
    }
    // console.log([x,y])
    this.updateSquare([x,y])
  }

  clearKings(whiteKing, blackKing){
    // console.log("whiteKing:")
    // console.log(whiteKing)
    this.uncheck(whiteKing.x,whiteKing.y)
    // console.log("blackKing:")
    // console.log(blackKing)
    this.uncheck(blackKing.x,blackKing.y)
  }

  displayMoves(positions){
    for (const pos of positions){
      const id = pos[1] * 8 + pos[0];
      const square = document.querySelector(`[square-id="${id}"]`);
      if (square){
        square.classList.add('possible')
        this.updateSquare(pos)
      }
    }
  }

  resetMoves(positions){
    for (const pos of positions){
      const id = pos[1] * 8 + pos[0];
      const square = document.querySelector(`[square-id="${id}"]`);
      if (square){
        square.classList.remove('possible')
        this.updateSquare(pos)
      }
    }
  }

  setClickHandler(callback){
    this.boardElement.addEventListener('click', (e) => {
      const target = e.target.closest('.square')
      if (!target) return
      const x = parseInt(target.dataset.x)
      const y = parseInt(target.dataset.y)
      callback({ x, y })
    })
  }

  flipCoord(){
    const squares = this.boardElement.childNodes;
    // console.log(this.board);
    for(let y = 0; y < 8; y++){
      for(let x = 0; x < 8; x++){
        const square_id = y * 8 + x;
        const square = squares[square_id];
        const col = square.querySelector('.col_id')
        const row = square.querySelector('.row_id')

        if (row !== null){
          if(row.classList.contains("flip_coord")){
            row.classList.remove("flip_coord");
          }
          else {
            row.classList.add("flip_coord");
          }
        }
        if (col !== null) {
          if(col.classList.contains("flip_coord")){
            col.classList.remove("flip_coord");
          }
          else {
            col.classList.add("flip_coord");
          }
        }
      }
    }
  }

  reverseBoard(){
    const squares = Array.from(this.boardElement.childNodes);
    this.boardElement.innerHTML = '';
    for (let i = squares.length - 1; i >= 0; i--){
      this.boardElement.appendChild(squares[i]);
    }
  }

  flipBoard(){
    this.board.flip = true;
    this.flipCoord();
    this.reverseBoard();
  }
}