'use strict';
$(function(){
    /* Adding event to each a tag and with jquery add offset
      when clicking and getting the right section
    */

    $('#topNav').find('a').click(function(event){
        var $headeHight=$("#fixedNavBar").height();
        var $href = $(this).attr('href');
        var $anchor = $($href).offset();
        window.scrollTo(0,$anchor.top-$headeHight-3);
        event.preventDefault()
    });
});
