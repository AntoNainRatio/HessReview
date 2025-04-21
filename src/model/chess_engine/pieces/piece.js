class Piece{
    constructor(color,char){
        this.color_ = color;
        this.char_ = char;
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
      
}