$(document).ready(function () {
    
$(window).scroll(function () { 
    if($(document).width() <= 576) {
        $(".header").css({
            "top": (0 - $(document).scrollTop() / 2) + "px",
            "opacity": Math.max(1 - $(document).scrollTop() / ($(document).width() * .8), 0)
        });
    }
});

$(window).resize(function () { 
    if($(document).width() > 575) {
        $(".header").css({"top": 0, "opacity" : 1});
    }
});

});