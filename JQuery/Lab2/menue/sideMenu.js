$(document).ready(function () {
    $("#myDiv").css('height', $(window).innerHeight())
    $("#myDiv").hover(
        function () {
            $("#myDiv").animate({
                width: 170
            });
            $("#accordion").css("display", "block");
        },
        function () {
            $("#accordion").css("display", "none");
            $("#myDiv").animate({
                width: 40
            });
        }
    );
    $("#accordion").accordion({
        active: 0
    });
});