$.fn.snap = function (pos,elem) {
    
    $(window).on('touchmove scroll', function () {   
        
        var window_top = $(window).scrollTop();
        
        if (window_top > pos-48) {
            elem.css({ 'position':'fixed','top':-15 });
        } else {
            var newPos = pos-60;
            elem.css({ 'position':'absolute', 'top': newPos});
        }
    });
    
};

