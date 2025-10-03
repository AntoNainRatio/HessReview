class Move {
    constructor(from,to) {
        this.isOk = false;
        this.from = from;
        this.to = to;
        this.roque = null;
        this.capture = null;
        this.promotion = null;
        this.wasFirstMove = false;
        this.halfMoveId = null;
        this.wasWhiteCheck = false;
        this.wasBlackCheck = false;
    }

    toString() {
        return "Move (toString): TODO";
    }
}