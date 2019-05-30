function Node (key, left, right) {
  this.key = key
  this.left = left
  this.right = right
}

/**
Tree structure looks like:
    a
  b   c
d  e f g
        h
        **/
var j = new Node('j')
var i = new Node('i')
var h = new Node('h', i, j)
var g = new Node('g', undefined, h)
var f = new Node('f')
var e = new Node('e')
var d = new Node('d')
var c = new Node('c', f, g)
var b = new Node('b', d, e)
var a = new Node('a', b, c)

let currentLevel = [];
let clearLevel = null;

async function printNodesByLevel(level, controller) {
  class Controller {
    register(k) {
      return new Promise((res)=>{
        currentLevel.push([k,res]);
        if(!clearLevel) {
          clearLevel = setTimeout(()=>{
            const lvlPrint = currentLevel.reduce((a,v)=>{ a.push(v[0]); return a },[]).join('')
            console.log(lvlPrint); 
            let release = currentLevel.map((v)=>{ return v[1] });
            currentLevel = [];
            clearLevel = null;
            release.forEach(v=>v())
          }, 0)
        }
      })
    }
  }

  if(!controller){
    console.log(level.key)
    level.left && printNodesByLevel(level.left, new Controller())
    level.right && printNodesByLevel(level.right, new Controller())
    return void 0;
  }
  
  await controller.register(level.key)
  level.left && printNodesByLevel(level.left, new Controller())
  level.right && printNodesByLevel(level.right, new Controller())
}

printNodesByLevel(a)
