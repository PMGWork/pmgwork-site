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
            <h1 class="delay-title ts">Pixel</h1>
            <h4 class="delay-title1 ts">Motion Graphics Designer</h4>
        </div>
        <div class="main-link">
            <a href="https://twitter.com/pmgwork" target="_blank" rel="noopener noreferrer">
                <img class="desvg" src="https://simpleicons.org/icons/twitter.svg">
            </a>
            <a href="https://instagram.com/pmgwork" target="_blank" rel="noopener noreferrer">
                <img class="desvg" src="https://simpleicons.org/icons/instagram.svg">
            </a>
            <a href="https://youtube.com/pmgwork" target="_blank" rel="noopener noreferrer">
                <img class="desvg" src="https://simpleicons.org/icons/youtube.svg">
            </a>
            <a href="mailto:mail@pmgwork.com" target="_blank" rel="noopener noreferrer">
                <img class="desvg" src="https://simpleicons.org/icons/gmail.svg">
            </a>
        </div>
        <div id="butter"></div>
    </div>
</template>

<script>
export default {
    mounted(){
        butter.cancel()

        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        window.addEventListener('resize', () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        });

        document.getElementById("lottie-logo").style.opacity = '0';

        deSVG('.desvg', true);

        const scene = document.getElementById('scene');
        const parallaxInstance = new Parallax(scene);

        lottie.loadAnimation({
            container: document.getElementById('lottie-item'),path: '/animation/logomotion.json',renderer: 'svg',loop: true,autoplay: true
        });
        lottie.loadAnimation({
            container: document.getElementById('layer1'),path: '/animation/shape1.json',renderer: 'svg',autoplay: true
        });
        lottie.loadAnimation({
            container: document.getElementById('layer2'),path: '/animation/shape2.json',renderer: 'svg',autoplay: true
        });
        lottie.loadAnimation({
            container: document.getElementById('layer3'),path: '/animation/shape3.json',renderer: 'svg',autoplay: true
        });
        lottie.loadAnimation({
            container: document.getElementById('layer4'),path: '/animation/shape4.json',renderer: 'svg',autoplay: true
        });
        lottie.loadAnimation({
            container: document.getElementById('layer5'),path: '/animation/shape5.json',renderer: 'svg',autoplay: true
        });
        lottie.loadAnimation({
            container: document.getElementById('layer6'),path: '/animation/shape6.json',renderer: 'svg',autoplay: true
        });

        const container = document.querySelectorAll('.ts');
        container.forEach(item => {
            const content = item.textContent;
            const text = content.trim();
            let newHtml = "";
            text.split("").forEach(function(v) {
                newHtml += "<span>" + v + "</span>";
            });
            item.innerHTML = newHtml
        });
    },
    beforeDestroy() {
        document.getElementById("lottie-logo").style.opacity = '';
    }
}
</script>