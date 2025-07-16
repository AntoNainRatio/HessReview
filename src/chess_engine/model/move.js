class Move {
    constructor(from,to) {
        this.isOk = false;
        // this.piece = null; probably don't need it
        this.from = from;
        this.to = to;
        this.roque = null;
        this.capture = null;
        this.promotion = null;
        this.wasFirstMove = false;
    }

    toString() {
        return "Move (toString): TODO";
    }
}