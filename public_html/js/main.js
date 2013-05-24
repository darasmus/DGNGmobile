//init
var _curCapSnapIndex = 0;
var _capSnapPos = new Array;
var _capSnapElem = new Array;

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

  