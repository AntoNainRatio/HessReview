class Color{
    

    constructor(name,value){
        this.name = name;
        this.value = value;
    }

    toString(){
        return `Color.${this.name}`
    }
}

const BLACK = new Color('BLACK',0);
const WHITE = new Color('WHITE',1);