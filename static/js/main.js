//lottie
var animation = lottie.loadAnimation({
    container: document.getElementById('lottie-logo'),path: '/animation/logomotion.json',renderer: 'svg',loop: true,autoplay: true
})

//textsplit
$.fn.letterSpan = function() {
    $(this).each(function() {
        var text = $.trim(this.textContent),
            html = "";

        text.split("").forEach(function(v) {
            html += "<span>" + v + "</span>";
        });

        this.innerHTML = html;
    });
};

//headercolor
if(document.URL.match("works/")) {
    var bg_height = $('.pages-wrapper').innerHeight();
    var scrollheight = bg_height - 200;
} else {
    var bg_height = $('.bg-item').innerHeight();
    var scrollheight = bg_height - 400;
}