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
    
    console.info('fin');
})();
