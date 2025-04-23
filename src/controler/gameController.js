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

    handleMove(start,end){
        const isMoveOk = this.game.movePiece(start,end)
        if (isMoveOk){
            this.boardRenderer.updateSquare(end)
            
            // console.log(this.game.whiteKing)
            // console.log(this.game.blackKing)
            this.boardRenderer.clearKings(this.game.whiteKing,this.game.blackKing)
            const checkPos = this.game.getCheckedKingPos()
            if (checkPos){
                this.boardRenderer.check(checkPos[0],checkPos[1])
            }
        }
        this.boardRenderer.clearHighlight(this.selected[0],this.selected[1])
        this.boardRenderer.updateSquare(this.selected)
        this.selected = null;
    }
}