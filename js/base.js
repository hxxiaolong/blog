$(function(){
    $('.indexQR').click(function(){
        showQR('index');
    });
    $('.newsQR').click(function(){
        showQR('news');
    });
    $('.weatherQR').click(function(){
        showQR('weather');
    });
    var showQR = function(qrname){
        $('.qr .qrArea').css({
            backgroundImage:'url("./images/'+qrname+'.png")'
        });
        $('.qr').fadeIn();
    };
    $(window).resize(function(){
        $('.qr .qrArea').css({
            top:($(window).height()-$('.qr .qrArea').height())/2,
            left:($(window).width()-$('.qr .qrArea').width())/2
        });
        $('.qr .close').css({
            left:($(window).width()-$('.qr .close').width())/2
        }).click(function(){
            $('.qr .qrArea').css({
                backgroundImage:'none',
                backgroundColor:'#fff',
            });
            $('.qr').fadeOut(300);
        });
    });
    $(window).resize();
    $(".scroll").click(function(event){
        event.preventDefault();
        $('html,body').animate({scrollTop:$(this.hash).offset().top},1000);
    });

    $('#activator').click(function(){$('#box').animate({'top':'0px'},900);});
    $('#boxclose').click(function(){
        $('#box').animate({'top':'-1000px'},900);
        $(".toggle_container").hide();
    });
    $(".trigger").click(function(){
        $(this).toggleClass("active").next().slideToggle("slow");
        return false; //Prevent the browser jump to the link anchor
    });

    $("#slider3").responsiveSlides({
        auto: true,
        pager: false,
        nav: true,
        speed: 500,
        namespace: "callbacks",
        before: function () {
            $('.events').append("<li>before event fired.</li>");
        },
        after: function () {
            $('.events').append("<li>after event fired.</li>");
        }
    });


    var colors = ['#6ed4c0', '#ffffff'];
    var percent = [90,90,90,90,90,90,80,80,80,80];
    for (var i = 1; i <= $('.skills-grid').length; i++) {
        var child = document.getElementById('circles-' + i),
            percentage = percent[i-1];

        Circles.create({
            id:         'circles-' + i,
            percentage: percentage,
            radius:     80,
            width:      10,
            number:   	percentage / 1,
            text:       '%',
            colors:     colors
        });
    }

});
