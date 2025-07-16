class GameController{
    constructor(game,boardRenderer){
        this.game = game;
        this.boardRenderer = boardRenderer;
        this.selected = null;
        this.moves = null;

        this.boardRenderer.setClickHandler(this.onClick.bind(this))
        this.boardRenderer.render();
    }

    async onClick(pos){
        if(this.selected != null){
            if (this.game.canBeSelected([pos.x,pos.y])){
                // undisplay prec piece moves and selection
                this.boardRenderer.clearHighlight(this.selected[0],this.selected[1])
                this.boardRenderer.updateSquare(this.selected)
                this.boardRenderer.resetMoves(this.moves)
                
                // setting new piece moves and highlight
                this.boardRenderer.highlight(pos.x,pos.y)
                this.boardRenderer.updateSquare([pos.x,pos.y])
                this.selected = [pos.x,pos.y]
                const moves = this.game.getMovesOfPiece(this.selected)
                this.boardRenderer.displayMoves(moves);
                this.moves = moves;
            }
            else{
                await this.handleMove(this.selected,[pos.x,pos.y])
                this.selected = null
                this.boardRenderer.resetMoves(this.moves)
            }
        }
        else if(this.game.Board.getPiece([pos.x,pos.y]) != null){
            if (this.game.canBeSelected([pos.x,pos.y])){
                this.boardRenderer.highlight(pos.x,pos.y)
                this.boardRenderer.updateSquare([pos.x,pos.y])
                this.selected = [pos.x,pos.y]
                const moves = this.game.getMovesOfPiece(this.selected)
                this.boardRenderer.displayMoves(moves);
                this.moves = moves;
            }
        }
        else{
            this.selected = null
            this.boardRenderer.resetMoves(this.moves)
        }
    }

    promotionPopUp(color) {
        return new Promise((resolve) => {
          const popup = document.getElementById('promotion')
          popup.classList.remove('hidden')
      
          const buttons = popup.querySelectorAll('button[data-piece]')
          buttons.forEach(button => {

            const pieceName = button.attributes.getNamedItem('data-piece')
            
            const imagePath = 'img/chesspieces/'+color+pieceName.value+'.png'
            button.childNodes[0].src = imagePath

            button.addEventListener('click', function onClick() {
              const choice = this.dataset.piece
              popup.classList.add('hidden')
      
              // Nettoyer les listeners
              buttons.forEach(btn => btn.removeEventListener('click', onClick))
      
              resolve(choice)
            })
          })
        })
    }  

    async handleMove(start,end){
        const info = this.game.movePiece(start,end)
        if (info.isOk){
            this.boardRenderer.updateSquare(info.from)

            if (info.PEPCapture != null){
                this.boardRenderer.updateSquare(info.PEPCapture)
            }

            if (info.roque != null){
                this.boardRenderer.updateSquare(info.roque[0])
                this.boardRenderer.updateSquare(info.roque[1])
            }

            if (info.promotion){
                // get user choice from promotion
                const pieceName = await this.promotionPopUp(info.piece.color)

                let c;
                switch(pieceName){
                    case "Q":
                        c = new Queen('w',-1,-1)
                        break;
                    case "R":
                        c = new Rook('w',-1,-1)
                        break;
                    case "N":
                        c = new Knight('w',-1,-1)
                        break;
                    case "B":
                        c = new Bishop('w',-1,-1)
                        break;
                    default:
                        console.error("Invalid choice on promotion")
                        break;
                }

                this.game.putPiece(end,c)

                this.boardRenderer.updateSquare(info.to)

                // update check for king here
                this.game.checksAfterPromo();
            }

            this.boardRenderer.clearKings(this.game.whiteKing,this.game.blackKing)

            const checkPos = this.game.getCheckedKingPos()
            if (checkPos){
                this.boardRenderer.check(checkPos[0],checkPos[1])
            }
        }
        this.boardRenderer.clearHighlight(this.selected[0],this.selected[1])
        this.boardRenderer.updateSquare(info.to)
    }

    flipBoard() {
        this.boardRenderer.flipBoard();
    }
}