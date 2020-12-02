$('.tab').click(function () {
    $('.tab').removeClass("selected");
    $('#msg').css("padding", "15px");
    var selectedTab = $(this).attr("class");
    if (selectedTab == "tab One") {
        $('#msg').text("tab One");
        $(this).toggleClass("selected");
    }
    else if (selectedTab == "tab Two") {
        $('#msg').text("tab Two");
        $(this).toggleClass("selected");
    }
    else if (selectedTab == "tab Three") {
        $('#msg').text("tab Three");
        $(this).toggleClass("selected");
    }
    else if (selectedTab == "tab Four") {
        $('#msg').text("tab Four");
        $(this).toggleClass("selected");
    }
})