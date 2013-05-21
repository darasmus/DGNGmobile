$.fn.snap = function (pos,elem) {
    
    $(this).scroll(function(e){    	
        if ($(this).scrollTop() > pos) {
            elem.css({ 'position':'fixed','top':0 });
        } else {
            var newPos = pos;
            elem.css({ 'position':'relative', 'top': newPos});
        }
    });
    
};

