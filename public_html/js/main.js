$(document).ready(function()
{
    var _init = false;
    
    $(window).scroll(function () {
        
        if(!_init) {
            $( ".snapper" ).each(function( index ) {
                //define snapper pos
                var _top = $(this).offset().top;
                $(window).snap(_top,$(this));
                
                $(this).css({ 'position':'absolute', 'top': _top});
                console.log(_top);
            });
            _init = true;
        }
        
        var window_top = $(window).scrollTop();
        $('#info').html('WinTop: ' + window_top);

              
    });
    
 }); // document ready

  