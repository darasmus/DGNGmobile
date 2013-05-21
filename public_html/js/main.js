$(document).ready(function()
{
    var _init = false;
    
    $(window).on('touchmove scroll', function () {
        var window_top = $(window).scrollTop();
        $('#info').html('WinTop: ' + window_top);              
    });
    
 }); // document ready

  