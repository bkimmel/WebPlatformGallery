class Rectangle {
  #missing
  constructor(height, width) {
    this.name = 'Rectangle';
    this.area = [height, width];
    this.#missing = Symbol('missing value');
  }
  
  sayName() {
    console.log('Hi, I am a ', this.name + '.');
  }
  get area() {
    return this.height * this.width;
  }
  set area(val) {
    const width = val[1] || this.#missing;
    const height = val[0] || this.#missing;
//     if(width === this.#missing || height === this.#missing){
//       throw new Error('must supply width and height to Rect')
//     }
    if(width === this.#missing || height === this.#missing){
      throw new Error('missing width or height')
    }
    this.width = width;
    this.height = height;
  }
}

class Square extends Rectangle {
  constructor(length) {
    /*
    this.height; //ReferenceError, super needs to be called
    */
     // Here, it calls the parent class' constructor with lengths
     // provided for the Rectangle's width and height
    super(length, length);
    //debugger;
    this.height; //OK, super called
 
    // Note: In derived classes, super() must be called before you
    // can use 'this'. Leaving this out will cause a reference error.
    this.name = 'Square';
  }
  set area(val) {
    if(val instanceof Array){
      if(val.length === 2 && val[0] === val[1]){
        super.area = [val[0],val[1]]
        return;
      }
      else {
        throw new Error('invalid square: Array elements must be equal');
      }
    }
    else if(typeof val === 'number'){
      super.area = [val,val];
      return;
    }
    else {
      throw new Error('invalid square: must provide number or array of size 2');
    }
  }
  get area() {
    return super.area;
  }
}

var rect = new Rectangle(10, 4);
var sq = new Square(4);
sq.area = 5;
console.log(sq.area); //25
try{
  rect.area = 5; //Throw 'missing width'
}
catch(e){
  console.log(e);
}
sq.area = [2,2];
console.log(sq.area); //4
try {
  sq.area = [2,3]; //Throw 'must be equal'
}
catch(e){
  console.log(e);
}
