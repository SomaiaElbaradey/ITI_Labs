var imgs = [' ', 'img/1.png', 'img/2.png', 'img/3.png', 'img/4.png', 'img/5.png'];
var i;
var opened = 0;
$('.img').click(function (event) {
    img = $(this).attr('src');
    i = parseInt($(this).attr('value'));
    $("#slideShow").css("display", "block");
    $("#content").css("display", "block");
    $("#slideImg").attr("src", img);
    $("#lArrow").attr("src", "img/7.png");
    $("#rArrow").attr("src", "img/6.png");
    $(".img").css("opacity", "0.3");
    event.stopPropagation();
    $('html').click(function (e) {
        if (!$(e.target).hasClass('content')) {
            console.log("here");
            $("#content").css("display", "none");
            $(".img").css("opacity", "1");
            $(".img").hover(function () {
                $(this).css("opacity", "0.6");
            });
        }
    });
});
$('#rArrow').click(function () {
    i += 1;
    if (i > 5) {
        i = 1;
    }
    $("#slideImg").attr("src", imgs[i]);
});
$('#lArrow').click(function () {
    i -= 1;
    if (i < 1) {
        i = 5;
    }
    $("#slideImg").attr("src", imgs[i]);
});