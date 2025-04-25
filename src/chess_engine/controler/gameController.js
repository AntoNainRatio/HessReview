class GameController{
    constructor(game,boardRenderer){
        this.game = game;
        this.boardRenderer = boardRenderer;
        this.selected = null;

        this.boardRenderer.setClickHandler(this.onClick.bind(this))

        this.boardRenderer.render();
    }

    onClick(pos){
        if(this.selected != null){
            this.handleMove(this.selected,[pos.x,pos.y])
        }
        else if(this.game.Board.getPiece([pos.x,pos.y]) != null){
            this.boardRenderer.highlight(pos.x,pos.y)
            this.boardRenderer.updateSquare([pos.x,pos.y])
            this.selected = [pos.x,pos.y]
        }
        else{
            this.selected = null
        }
    }

    promotionPopUp() {
        return new Promise((resolve) => {
          const popup = document.getElementById('promotion')
          popup.classList.remove('hidden')
      
          const buttons = popup.querySelectorAll('button[data-piece]')
          buttons.forEach(button => {
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
                console.log("Promotion detected !")

                const pieceName = await this.promotionPopUp()

                let c;
                switch(pieceName){
                    case "queen":
                        c = new Queen('w',-1,-1)
                        break;
                    case "rook":
                        c = new Rook('w',-1,-1)
                        break;
                    case "knight":
                        c = new Knight('w',-1,-1)
                        break;
                    case "bishop":
                        c = new Bishop('w',-1,-1)
                        break;
                    default:
                        console.error("Invalid choice on promotion")
                        break;
                }

                this.game.putPiece(end,c)

                this.boardRenderer.updateSquare(info.to)
            }

            this.boardRenderer.clearKings(this.game.whiteKing,this.game.blackKing)

            const checkPos = this.game.getCheckedKingPos()
            if (checkPos){
                this.boardRenderer.check(checkPos[0],checkPos[1])
            }
        }
        this.boardRenderer.clearHighlight(this.selected[0],this.selected[1])
        this.boardRenderer.updateSquare(info.to)
        
        this.selected = null;
    }
}