//Use Rest params inside an object as a shorthand for Object.assign:
function _examine() {
  var sourceObject = {
    a: 1,
    b: 2,
    c: 3,
  };
  var otherObjectWithSameProperty = {
    b: 'surprise'
  }
  return {
    ...sourceObject,
    ...otherObjectWithSameProperty
  }
}

var c = _examine()
