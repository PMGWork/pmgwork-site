<template>
    <div class="main">
        <div id="scene">
            <canvas id="layer1" class="layer" width="1200" height="1000" depth="0.2"></canvas>
            <canvas id="layer2" class="layer" width="1200" height="1000" depth="0.25"></canvas>
            <canvas id="layer3" class="layer" width="1200" height="1000" depth="0.3"></canvas>
            <canvas id="layer4" class="layer" width="1200" height="1000" depth="0.35"></canvas>
            <canvas id="layer5" class="layer" width="1200" height="1000" depth="0.4"></canvas>
            <canvas id="layer6" class="layer" width="1200" height="1000" depth="0.45"></canvas>
        </div>
        <canvas id="lottie-item" width="800" height="800"></canvas>
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
import * as rive from "@rive-app/canvas";

export default {
    mixins: [
        common
    ],
    mounted(){
        butter.cancel();

        //rive
        for(var i = 0; i < 6; i++) {
            const r = new rive.Rive({
                src: `/animation/${ i + 1 }.riv`,
                canvas: document.getElementById(`layer${ i + 1 }`),
                autoplay: true,
                onLoad: () => {
                    r.resizeDrawingSurfaceToCanvas();
                },
            });
        }

        const r1 = new rive.Rive({
            src: `/animation/logomotion.riv`,
            canvas: document.getElementById(`lottie-item`),
            autoplay: true,
            onLoad: () => {
                r1.resizeDrawingSurfaceToCanvas();
            },
        });

        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        window.addEventListener('resize', () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        });

        document.getElementById("lottie-logo").style.opacity = '0';

        //パララックス実行
        if(window.matchMedia( "(pointer: fine)" ).matches) {
            document.addEventListener("mousemove", (this.parallax), false);
        }
    },
    beforeDestroy() {
        document.getElementById("lottie-logo").style.opacity = null;
        document.removeEventListener('mousemove', (this.parallax), { passive: false });
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
                x: e.clientX,
                y: e.clientY
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