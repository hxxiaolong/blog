/**
 * Created by Administrator on 2016/5/15.
 */
$(function () {
    $("#footer>h2").mouseenter(function () {
        $("#footer>h2 img").stop(false,true).fadeOut().fadeIn(1000);
    });
    $("#footer>h2").mouseleave(function () {
        $("#footer>h2 img").stop(false,true);
    });
});