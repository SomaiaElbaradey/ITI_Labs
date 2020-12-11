$("#start").click(function () {
    $("div").animate({
        "left": $(window).innerWidth() - $("div").width(),
    }, 3500);
})
$("#stop").click(function () {
    $("div").stop();
})