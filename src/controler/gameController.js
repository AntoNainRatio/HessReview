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
            if(this.game.movePiece(this.selected,[pos.x,pos.y])){
                this.boardRenderer.updateSquare([pos.x,pos.y])
            }
            this.boardRenderer.clearHighlight(this.selected[0],this.selected[1])
            this.boardRenderer.updateSquare(this.selected)
            this.selected = null;
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
}