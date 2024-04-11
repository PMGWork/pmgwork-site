<template>
    <div>
        <div id="loading" class="load"></div>
        <div id="background"></div>
        <header class="header">
            <nuxt-link class="range" @click.native="bg_remove" aria-label="home" to="/">
                <canvas id="lottie-logo" width="400" height="400"></canvas>
            </nuxt-link>
            <ul>
                <li class="range"><nuxt-link @click.native="bg_remove" aria-label="works" to="/works/">Works</nuxt-link></li>
                <li class="range"><nuxt-link @click.native="bg_remove" aria-label="about" to="/about/">About</nuxt-link></li>
            </ul>
        </header>
    </div>
</template>

<script>
import * as rive from "@rive-app/canvas";

export default {
    mounted(){
        //rive
        const r = new rive.Rive({
            src: `/animation/logomotion.riv`,
            canvas: document.getElementById(`lottie-logo`),
            autoplay: true,
            onLoad: () => {
                r.resizeDrawingSurfaceToCanvas();
            },
        });

        //loading
        window.onload = function() {
            document.getElementById("loading").classList.remove('load');
        };
    },
    methods: {
        bg_remove() {
            setTimeout(() => {
                document.getElementById("background").classList.remove('bg-color');
                document.getElementById("stalker").classList.remove('color');
                document.querySelectorAll("header a,#lottie-logo").forEach(linkCol => {
                    linkCol.classList.remove('hd-color');
                });
            }, 50);
        }
    }
}
</script>