class Piece{
    constructor(color,char,x,y){
        this.color_ = color;
        this.char_ = char;
        this.x = x;
        this.y = y;
        this.directions = []
    }

    get char(){
        return this.char_;
    }

    get color(){
        return this.color_;
    }

    set color(value){
        this.color_ = value;
    }

    set char(value){
        this.char_ = value;
    }

    canMove(from, to, board){
        throw "canMove() must be implemented in specific piece classes."
    }

    getImagePath(){
        return `img/chesspieces/${this.color}${this.char}.png`
    }
     
    fillDirections(){
        throw "fillDirections() must be implemented in specific piece classes."
    }

    getPossibleMoves(board){
        throw "getPossileMoves() must be implemented in specific piece classes."
    }
}