$(document).ready(function()
{
    
    //toggle menu...
    $('#openmenu, .menulink').on('click', function() {
        $('#mainmenu').slideToggle('fast', function() {
            // Animation complete.
        });
    });
    
    
    $(window).on('touchmove scroll', function () {
        var window_top = $(window).scrollTop();
        $('#info').html('WinTop: ' + window_top);              
    });
    
 }); // document ready

  