'use strict';
$(function(){
    var imageWidth =$(".slide").width();
    var currentImage=1;
    var countImages;
    var $slidesContainer;
    var $slides;
    //Adding a click event and sending to function when user clicks on the left arrow
    $("#left").on("click",sliderLeft);
    //Adding a click event and sending to function when user clicks on the left arrow
    $("#right").on("click",sliderRight);
    //Adding a click event and sending to function when user clicks on the image
    $(".slide").on("click",slider);
    countImages=$(".slide").length;
    $slidesContainer=$(".slides");
    $(".panels").on("click",changePanel);

    /*
        This function sliderLeft() , deals with user
        clicking the left arrow and margin the images left
     */
    function sliderLeft(){
        $slidesContainer.animate({"margin-left":"-="+imageWidth},1000,
        function(){
            currentImage++;
            if (currentImage>countImages){
                currentImage=1;
                $slidesContainer.animate({"margin-left":"0"},0)
            }
        });
    }
    /*
        This function sliderRight() , deals with user
        clicking the right arrow and margin the images right
     */
    function sliderRight(){
        $slidesContainer.animate({"margin-left":"+="+imageWidth},1000,
            function(){
            currentImage--;
            if (currentImage <= 0 ){
                currentImage=countImages;
                $slidesContainer.animate({"margin-left":"-="+(imageWidth*(countImages))},0)
            }
        });

    }
    /*
        This function slider() , deals with user
        clicking the image getting the information and sending to sliderLeft function
     */
    function slider(){
        currentImage=$(this).attr("rel");
        sliderLeft();
    }
    /*
        This function changePanel() , changes the panels according
        to the user click. (switching the active class)
     */
    function changePanel(){
        var nextActive=$(this).closest("li").attr("rel");
        $(".panel").removeClass("active");
        $("#"+nextActive).addClass("active");

    }
});

