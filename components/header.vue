<template>
    <div>
        <div id="loading" class="load"></div>
        <div id="background"></div>
        <header class="header">
            <nuxt-link @click.native="bg_remove" to="/"><div id="lottie-logo"></div></nuxt-link>
            <ul>
                <li><nuxt-link @click.native="bg_remove" to="/works/">Works</nuxt-link></li>
                <li><nuxt-link @click.native="bg_remove" to="/shorts/">#Shorts</nuxt-link></li>
                <li><nuxt-link @click.native="bg_remove" to="/about/">About</nuxt-link></li>
            </ul>
        </header>
    </div>
</template>

<script>
export default {
    mounted(){
        //lottie
        lottie.loadAnimation({
            container: document.getElementById('lottie-logo'),path: '/animation/logomotion.json',renderer: 'svg',loop: true,autoplay: true
        })
        //loading
        window.onload = function() {
            document.getElementById("loading").classList.remove('load');
        };
    },
    methods: {
        bg_remove() {
            document.getElementById("background").classList.remove('bg-color');
            document.querySelectorAll("header a,#lottie-logo").forEach(linkCol => {
                linkCol.classList.remove('hd-color');
            });
        }
    }
}
</script>