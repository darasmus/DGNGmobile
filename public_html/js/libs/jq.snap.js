$.fn.snap = function (pos,elem) {
    
    $(this).scroll(function(e){    	
        if ($(this).scrollTop() > pos) {
            elem.css({ 'position':'fixed','top':0 });
        } else {
            var newPos = pos -20;
            elem.css({ 'position':'absolute', 'top': newPos});
        }
    });
    
};

