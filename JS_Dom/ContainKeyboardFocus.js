function KeyboardFocus(first, last){
	var _firsthandler = function(e){
		//console.log('keydown first');
		if(e.shiftKey && e.which == 9){
			last.focus();
			//otherwise the default action would occur and move to the next "after" last
			e.preventDefault();
		}
		return true;
	};
	var _secondhandler = function(e){
		//console.log('keydown last');
		if(!e.shiftKey && e.which == 9){
			first.focus();
			e.preventDefault();
		}
		return true;
	};

	function addFocus(){
		if(!first.addEventListener || !last.addEventListener){
			throw new Error('arguments must both be EventTarget');
		}
		first.addEventListener('keydown', _firsthandler, true);
		last.addEventListener('keydown', _secondhandler, true);
	}

	function removeFocus(){
		if(!first.removeEventListener || !last.removeEventListener){
			throw new Error('arguments must both be EventTarget');
		}
		first.removeEventListener('keydown', _firsthandler, true);
		last.removeEventListener('keydown', _secondhandler, true);
	}

	return {
		addFocus: addFocus,
		removeFocus: removeFocus
	}
}
