var max;
var val;
$('#range').attr('min', '0');
$(window).on('load', function () {
    max = $("audio")[0].duration;
    min = 0;
    $('#range').attr('max', max)
    $('#range').attr('min', min)
});
function reset() {
    $("audio")[0].load();
    $("audio")[0].pause();
    $("#range").val(0);
}
$('#range').on('input', function () {
    $("audio")[0].currentTime = ($("#range")).val();
});
$('#copyRange').on('input', function () {
    $("audio")[0].currentTime = ($("#copyRange")).val();
});
$("#music1").click(function (e) {
    reset();
    $("#albumImg img")[0].src = "./img/1.jpg";
    $("#albumCap").text($("#music1").text());
    $("#musicAudio source")[0].src = './audio/1/Still.mp3';
})
$("#music2").click(function () {
    reset();
    $("#albumImg img")[0].src = "./img/3.jpg";
    $("#albumCap").text($("#music2").text());
    $("#musicAudio source")[0].src = './audio/Big.mp3';
})
$("#music3").click(function () {
    reset();
    $("#musicAudio source")[0].src = './audio/water.mp3';
    $("#albumImg img")[0].src = "./img/4.jpg";
    $("#albumCap").text($("#music3").text());
})
$("#music4").click(function () {
    reset();
    $("#albumImg img")[0].src = "./img/5.jpg";
    $("#albumCap").text($("#music4").text());
    $("#musicAudio source")[0].src = './audio/total-eclipse.mp3';
})
$("#music5").click(function () {
    reset();
    $("#albumImg img")[0].src = "./img/6.jpg";
    $("#albumCap").text($("#music5").text());
    $("#musicAudio source")[0].src = './audio/promise.mp3';
})
$("#play").click(function () {
    $("audio")[0].play();
    val = setInterval(function () {
        $("#range").val($("audio")[0].currentTime);
        $('#copyRange').val($("audio")[0].currentTime);
    }, 1000);
})
$("#stop").click(function () {
    clearInterval(val);
    reset();
})
$("#pause").click(function () {
    clearInterval(val);
    $("audio")[0].pause();
})
$("#mute").click(function () {
    if ($("audio")[0].muted == true) {
        $("audio")[0].muted = false;
    } else {
        $("audio")[0].muted = true;
    }
})
document.getElementById("musicAudio").addEventListener('durationchange', function(e){
    max = $("audio")[0].duration;
    $('#range').attr('max', max)
    $('#copyRange').attr('max', max)
})
$('#range').on('change', function() {
    $('#copyRange').val($(this).val())
});