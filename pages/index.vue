<template>
    <div class="main">
        <div class="background"></div>
        <div id="scene">
            <div id="layer1" class="layer" data-depth="0.2"></div>
            <div id="layer2" class="layer" data-depth="0.25"></div>
            <div id="layer3" class="layer" data-depth="0.3"></div>
            <div id="layer4" class="layer" data-depth="0.35"></div>
            <div id="layer5" class="layer" data-depth="0.4"></div>
            <div id="layer6" class="layer" data-depth="0.45"></div>
        </div>
        <div id="lottie-item"></div>
        <div class="main-title">
            <h1 class="delay-title">Pixel</h1>
            <h4 class="delay-title1">Motion Graphics Designer</h4>
        </div>
        <div class="main-link">
            <a href="https://twitter.com/pmgwork" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-twitter"></i>
            </a>
            <a href="mailto:mail@pmgwork.com" target="_blank" rel="noopener noreferrer">
                <i class="fas fa-envelope"></i>
            </a>
        </div>
        <div id="butter"></div>
    </div>
</template>

<script>
export default {
    mounted(){
        butter.cancel()

        $('header a').click(function() {
            $(".background").removeClass("bg-color");
        })

        $("header #lottie-logo").css({'opacity':'0'});

        var scene = document.getElementById('scene');
        var parallaxInstance = new Parallax(scene);

        var animation = lottie.loadAnimation({
            container: document.getElementById('lottie-item'),path: '/animation/logomotion.json',renderer: 'svg',loop: true,autoplay: true
        });
        var animation = lottie.loadAnimation({
            container: document.getElementById('layer1'),path: '/animation/shape1.json',renderer: 'svg',autoplay: true
        });
        var animation = lottie.loadAnimation({
            container: document.getElementById('layer2'),path: '/animation/shape2.json',renderer: 'svg',autoplay: true
        });
        var animation = lottie.loadAnimation({
            container: document.getElementById('layer3'),path: '/animation/shape3.json',renderer: 'svg',autoplay: true
        });
        var animation = lottie.loadAnimation({
            container: document.getElementById('layer4'),path: '/animation/shape4.json',renderer: 'svg',autoplay: true
        });
        var animation = lottie.loadAnimation({
            container: document.getElementById('layer5'),path: '/animation/shape5.json',renderer: 'svg',autoplay: true
        });
        var animation = lottie.loadAnimation({
            container: document.getElementById('layer6'),path: '/animation/shape6.json',renderer: 'svg',autoplay: true
        });

        $(".delay-title,.delay-title1").letterSpan();
    }
}
</script>