    
    var lastScrollTop = 0;
    
    //$(window).bind('touchmove',function(e) {
    $(window).on('touchmove scroll', function (e) {   
        
        var _windowTop = $(window).scrollTop();
        
        $('#info').html(_windowTop);
        
        var _pos = _capSnapPos[_curCapSnapIndex];
        var _offset = 48;
        var _offsetTop = _offset +21;
        var _cur = _capSnapElem[_curCapSnapIndex];
        var _move = true;
        
        if (_windowTop > lastScrollTop){

            var _nextPos = _curCapSnapIndex + 1;
            var _curNextPos = _capSnapPos[_nextPos];
            var _curNext = _capSnapElem[_nextPos];
        
            if( (_windowTop + _offsetTop >= _curNextPos) && (_windowTop + _offset < _curNextPos) ) {
                
                var _topPos = _curNextPos-85;
                var _bottomPos = _curNextPos-60;
                
                _cur.css({ 'position':'absolute', 'top': _topPos});
                _curNext.css({ 'position':'absolute', 'top': _bottomPos});
            
                _move = false;
        
                console.log('between: ' + _topPos + " / " + _bottomPos);
                
            } else if (_windowTop + _offset >= _curNextPos) {
                _curCapSnapIndex = _nextPos;
                _move = true;
            }
        
        } else {
            
            var _lastPos = _curCapSnapIndex - 1;   
            var _curLastPos = _capSnapPos[_lastPos];
            var _curLast = _capSnapElem[_lastPos];
            
            if( (_windowTop <= _pos - _offset) && (_windowTop >= _pos - _offsetTop)  ) {
                
                var _topPos = _pos-60;
                var _bottomPos = _pos-85;
                
                _cur.css({ 'position':'absolute', 'top': _topPos});
                _curLast.css({ 'position':'absolute', 'top': _bottomPos});
            
                _move = false;
                
            } else if( _windowTop + _offsetTop <= _pos ) {
                _curCapSnapIndex = _lastPos;
            }
        }
        
        lastScrollTop = _windowTop;  
        
        if(_move === true) {
            $.each(_capSnapElem, function(index, value) {
                if(index == _curCapSnapIndex) {
                    value.css({ 'position':'fixed','top':-15 });
                } else {
                    var newPos = _capSnapPos[index]-60;
                    value.css({ 'position':'absolute', 'top': newPos});
                }
            });
        }
        
    });




