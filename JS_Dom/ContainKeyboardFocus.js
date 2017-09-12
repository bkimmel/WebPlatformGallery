function containKeyboardFocus(first, last){
    if(!first.addEventListener || !last.addEventListener){
        throw new Error('arguments must both be EventTarget');
    }
    first.addEventListener('keydown', function(e){
        console.log('keydown first');
        if(e.shiftKey && e.which == 9){
            last.focus();
            //otherwise the default action would occur and move to the next "after" last
            e.preventDefault();
        }
        return true;
    }, true);
    last.addEventListener('keydown', function(e){
        console.log('keydown last');
        if(!e.shiftKey && e.which == 9){
            first.focus();
            e.preventDefault();
        }
        return true;
    }, true);
}

module.exports = containKeyboardFocus;
