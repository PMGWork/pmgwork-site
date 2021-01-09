<template>
<div class="works">
    <div class="bg-white"></div>
    <div id="butter">
        <div id="bg-item"></div>
        <div class="heading">
            <h1 class="delay-title ts">Works</h1>
            <p class="delay-title1 ts">Motion Graphics ・ Design ・ 3DCG</p>
        </div>
        <ul class="works-wrapper">
            <li class="works-article" v-for="content in contents" :key="content.id">
                <div class="works-image scroll">
                    <nuxt-link @click.native="bg_add" :to="`/works/${content.id}`">
                        <img :src="content.image.url">
                    </nuxt-link>
                </div>
                <div class="works-title">
                    <h3 :style="content.gradation" class="delay-scroll ts">{{ content.title }}</h3>
                    <p class="delay-scroll1 ts">{{ content.date }}</p>
                </div>
            </li>
        </ul>
        <footer class="footer">
            <p class="copyright">© 2020 Pixel</p>
            <div class="footer-link">
                <a href="https://twitter.com/pmgwork" target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-twitter"></i>
                </a>
                <a href="https://instagram.com/pmgwork" target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-instagram"></i>
                </a>
                <a href="https://youtube.com/pmgwork" target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-youtube"></i>
                </a>
                <a href="mailto:mail@pmgwork.com" target="_blank" rel="noopener noreferrer">
                    <i class="fas fa-envelope"></i>
                </a>
            </div>
        </footer>
    </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    async asyncData() {
        const { data } = await axios.get(
            'https://pmgwork.microcms.io/api/v1/works?limit=50',
            {
                headers: { 'X-API-KEY': '8d729177-1247-4c07-b1b4-b2ccd3bd4e66' }
            }
        )
        return data
    },
    head() {
        return {
            title: 'Works | ぴくせる',
        }
    },
    mounted(){
        //butter
        butter.cancel()
        window.setTimeout(function(){
            butter.init({
                wrapperId: 'butter',
                wrapperDamper: 0.12,
                cancelOnTouch: true
            })
        }, 50);

        document.getElementById("lottie-logo").style.opacity = '';

        //headercolor
        const bg_height = document.getElementById("bg-item").clientHeight;
        const scrollheight = bg_height - 200;
        const linksCol = document.querySelectorAll("header a");
        const logoCol = document.getElementById("lottie-logo");

        window.addEventListener('scroll', _.throttle(scroll, 200))
        function scroll(){
            if(window.scrollY > scrollheight) {
                linksCol.forEach(linkCol => {
                    linkCol.style.color = '#181818';
                });
                logoCol.style.filter = 'brightness(0.1)';

            } else {
                linksCol.forEach(linkCol => {
                    linkCol.style.color = '#ffffff';
                });
                logoCol.style.filter = 'brightness(1)';
            }
        };

        //textsplit
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

        //Animation
        const options = {
            root: null,
            rootMargin: "-10% 0px",
            threshold: 0
        }
        const scrollio = document.querySelectorAll('.scroll,.delay-scroll,.delay-scroll1')
        scrollio.forEach((target) => this.onIntersect(target, options))
    },
    methods: {
        bg_add() {
            document.getElementById("background").classList.add('bg-color');
        },
        onIntersect(target, options = {}) {
            const observer = new IntersectionObserver(this.addShowClass, options)
            observer.observe(target)
        },
        addShowClass(entries) {
            for(const e of entries) {
                if (e.isIntersecting) {
                    e.target.classList.add("in-view")
                }
            }
        }
    }
}
</script>