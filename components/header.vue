<template>
    <div>
        <div id="loading" class="load"></div>
        <div id="background"></div>
        <header class="header">
            <nuxt-link class="range" @click.native="bg_remove" aria-label="home" to="/">
                <div id="lottie-logo"></div>
            </nuxt-link>
            <ul>
                <li class="range"><nuxt-link @click.native="bg_remove" aria-label="works" to="/works/">Works</nuxt-link></li>
                <li class="range"><nuxt-link @click.native="bg_remove" aria-label="about" to="/about/">About</nuxt-link></li>
            </ul>
        </header>
    </div>
</template>

<script>
import lottie from 'lottie-web';

export default {
    mounted(){
        //lottie
        lottie.loadAnimation({
            container: document.getElementById('lottie-logo'),path: '/animation/lm.json',renderer: 'svg',loop: true,autoplay: true
        })

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