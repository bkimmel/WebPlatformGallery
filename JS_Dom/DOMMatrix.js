(function doThings() {
    //3D MATRIX:
    // m11, m21, m31, m41
    // m12, m22, m32, m42
    // m13, m23, m33, m43
    // m14, m24, m34, m44   

    //Any point transformed by this should stay the same
    const identityMatrix = new DOMMatrix([
         1, 0, 0, 0,
         0, 1, 0, 0, 
         0, 0, 1, 0,
         0, 0, 0, 1,
    ]);
    const randomPoints = [Math.floor(Math.random() * 20), Math.floor(Math.random() * 20), 0];
    const testDOMPoint = (new DOMPointReadOnly(...randomPoints));
    const oneOnePoint = new DOMPointReadOnly(1,1,0);

    const identityTestPoint = testDOMPoint.matrixTransform(identityMatrix);
    
    //After transform, point remains the same
    console.assert(identityTestPoint.x === randomPoints[0] && identityTestPoint.y === randomPoints[1]);

    //Any point transformed by this should move by 2 along the x and y axes
    const translationByTwoMatrix = new DOMMatrix([
         1, 0, 0, 0, //COLUMN MAJOR ORDER: m11,m12,m13,m14 .. this thew me off
         0, 1, 0, 0, 
         0, 0, 1, 0,
         2, 2, 0, 1,
    ]);
    
    const translationTestPoint = testDOMPoint.matrixTransform(translationByTwoMatrix);
    console.assert(translationTestPoint.x === randomPoints[0] + 2 && translationTestPoint.y === randomPoints[1] + 2);
    
    const rotatedPoint = oneOnePoint.matrixTransform(new DOMMatrix('rotate(45deg)')); //can also use shorthand
    console.assert(rotatedPoint.y - Math.sqrt(2) < Number.EPSILON, 'By Pythag theorem 1^2 + 1^2 = x^2');
    
    //by hand: rotation matrix is
    // cosθ -sinθ
    // sinθ  cosθ

    const rotationBy45Matrix = new DOMMatrix([
         Math.cos(Math.PI / 4),  Math.sin(Math.PI / 4), 0, 0,
         -Math.sin(Math.PI / 4),  Math.cos(Math.PI / 4), 0, 0, 
         0, 0, 1, 0,
         0, 0, 0, 1,
    ]);
    
    (()=>{
        const {x,y} = rotationBy45Matrix.transformPoint(oneOnePoint);
        console.assert(x < Number.EPSILON && y - Math.SQRT2 < Number.EPSILON, 'Can also "transformPoint" from matrix');
    })()
    
    //Shift system to 1,1, rotate 45% around 1,1 shift back to 0, 0
    //This results in the system being rotated "around" 1,1 by 45deg so 1,1 stays the same
    const simpleCumulativeTransformMatrix = (new DOMMatrix('translate(1px, 1px)')).multiplySelf(rotationBy45Matrix).multiplySelf(new DOMMatrix('translate(-1px, -1px)'));
    (()=>{
        const {x,y} = simpleCumulativeTransformMatrix.transformPoint(oneOnePoint);
        console.assert(x - 1 < Number.EPSILON && y - 1 < Number.EPSILON, 'Shifting origin to point and rotating is 0 movement');
    })()


    
    
    console.info('fin');
})();
