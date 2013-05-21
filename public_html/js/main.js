$(document).ready(function()
{
    
    $(window).on('touchmove scroll', function () {
        var window_top = $(window).scrollTop();
        $('#info').html('WinTop: ' + window_top);              
    });
    
 }); // document ready

  