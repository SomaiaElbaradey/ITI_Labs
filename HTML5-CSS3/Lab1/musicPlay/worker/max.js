var max;
$(window).on('load', function () {

    max = $("audio")[0].duration;
    console.log(max);
});

postMessage(max);