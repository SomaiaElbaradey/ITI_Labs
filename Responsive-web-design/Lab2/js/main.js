//adjust slider height
$(function(){
    'use strict';
    var winH   = $(window).height(),
        upH    = $('.upper-bar').innerHeight(),
        navh   = $('.navbar').innerHeight()
    $('.slider , .carousel-item' ).height(1000 - (upH + navh));
    
});

//featured imgs
$('.featured-work ul li').on('click' ,function (){
    $(this).addClass('active').siblings().removeClass('active');
    console.log($(this).data('class'));
    if($(this).data('class')==='all') {
        $('.shuffle-image .col-sm').css('opacity', 1);
       }else {
        $('.shuffle-image .col-sm').css('opacity', .4);
        $($(this).data('class')).parent().css('opacity', 1);
       }
   })