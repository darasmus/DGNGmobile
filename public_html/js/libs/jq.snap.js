$.fn.snap = function ( pos ) {
    
    $window = $(window);
    $window.scroll(function(e){
    	    	
        if ($window.scrollTop() > pos) {
            $('#snap').css({ 'position':'fixed','top':0 });
        } else {
            $('#snap').css({ 'position':'absolute', 'top':180 });
        }
    });
    
};

