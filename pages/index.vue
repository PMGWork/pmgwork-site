<template>
    <div class="main">
        <div id="scene">
            <div id="layer1" class="layer" depth="0.2"></div>
            <div id="layer2" class="layer" depth="0.25"></div>
            <div id="layer3" class="layer" depth="0.3"></div>
            <div id="layer4" class="layer" depth="0.35"></div>
            <div id="layer5" class="layer" depth="0.4"></div>
            <div id="layer6" class="layer" depth="0.45"></div>
        </div>
        <div id="lottie-item"></div>
        <div class="main-title-wrapper">
            <h1 class="main-title ts">Pixel</h1>
            <h4 class="main-subtitle ts">Motion Graphics Designer</h4>
        </div>
        <div class="main-link">
            <a class="range" href="https://twitter.com/pmgwork" target="_blank" aria-label="twitter" rel="noopener noreferrer">
                <img class="desvg" src="https://simpleicons.org/icons/twitter.svg">
            </a>
            <a class="range" href="https://instagram.com/pmgwork" target="_blank" aria-label="instagram" rel="noopener noreferrer">
                <img class="desvg" src="https://simpleicons.org/icons/instagram.svg">
            </a>
            <a class="range" href="https://youtube.com/pmgwork" target="_blank" aria-label="youtube" rel="noopener noreferrer">
                <img class="desvg" src="https://simpleicons.org/icons/youtube.svg">
            </a>
            <a class="range" href="mailto:mail@pmgwork.com" target="_blank" aria-label="email" rel="noopener noreferrer">
                <img class="desvg" src="https://simpleicons.org/icons/gmail.svg">
            </a>
        </div>
        <div id="butter"></div>
    </div>
</template>

<script>
import common from '~/static/js/common.js';

export default {
    mixins: [
        common
    ],
    mounted(){
        butter.cancel();

        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        window.addEventListener('resize', () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        });

        document.getElementById("lottie-logo").style.opacity = '0';

        lottie.loadAnimation({
            container: document.getElementById('lottie-item'),path: '/animation/logomotion.json',renderer: 'svg',loop: true,autoplay: true
        });
        lottie.loadAnimation({
            container: document.getElementById('layer1'),path: '/animation/shape1.json',renderer: 'svg',loop: false,autoplay: true
        });
        lottie.loadAnimation({
            container: document.getElementById('layer2'),path: '/animation/shape2.json',renderer: 'svg',loop: false,autoplay: true
        });
        lottie.loadAnimation({
            container: document.getElementById('layer3'),path: '/animation/shape3.json',renderer: 'svg',loop: false,autoplay: true
        });
        lottie.loadAnimation({
            container: document.getElementById('layer4'),path: '/animation/shape4.json',renderer: 'svg',loop: false,autoplay: true
        });
        lottie.loadAnimation({
            container: document.getElementById('layer5'),path: '/animation/shape5.json',renderer: 'svg',loop: false,autoplay: true
        });
        lottie.loadAnimation({
            container: document.getElementById('layer6'),path: '/animation/shape6.json',renderer: 'svg',loop: false,autoplay: true
        });

        //パララックス実行
        if(window.matchMedia( "(pointer: fine)" ).matches) {
            document.addEventListener("mousemove", (this.parallax), false);
        } else {
            window.addEventListener("deviceorientation", (this.parallax), false);
        }
    },
    beforeDestroy() {
        document.getElementById("lottie-logo").style.opacity = null;
        document.removeEventListener('mousemove', (this.parallax), { passive: false });
        window.removeEventListener('deviceorientation', (this.parallax), { passive: false });
    },
    methods: {
        parallax(e) {
            let layers = document.getElementsByClassName("layer");
            const depth = 0.3;
            for(var i = 0; i < layers.length; i++) {
                layers[i].style.transition = "all " + .5 + "s cubic-bezier(.2,.6,.5,1)";
            }

            //マウス位置、ウィンドウ位置
            let mPos = {
                x: 0,
                y: 0
            }

            if(window.matchMedia( "(pointer: fine)" ).matches) {
                mPos = {
                    x: e.clientX,
                    y: e.clientY
                }
            } else {
                mPos = {
                    x: e.gamma,
                    y: e.beta
                }
            }
            let wPos = {
                x: document.body.clientWidth,
                y: document.body.clientHeight
            }

            //コンテンツ位置
            let parallax = {
                x: mPos.x - wPos.x / 2.0,
                y: mPos.y - wPos.y / 2.0
            }

            //コンテンツを移動
            for(var i = 0; i < layers.length; i++) {
                let d = depth * layers[i].getAttribute("depth");
                layers[i].style.transform =
                    "translate3d(" + d * -parallax.x + "px," + d * -parallax.y + "px, 0)";

            }
        }
    }
}
</script>