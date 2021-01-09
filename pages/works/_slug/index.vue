<template>
    <div class="pages">
        <div class="bg-white"></div>
        <div id="butter">
            <div :style="gradation" id="bg-item1"></div>
            <div id="pages-wrapper">
                <div class="pages-image scroll">
                    <picture>
                        <source :srcset="`${ image.url }?fm=webp`" type="image/webp">
                        <img :src="image.url">
                    </picture>
                </div>
                <div class="pages-title">
                    <h2 class="delay-scroll2 ts">{{ title }}</h2>
                    <h5 class="delay-scroll4 ts">{{ date }}</h5>
                </div>
                <div class="pages-info scroll">
                    <div class="info-item" v-if="movie">
                        <h5>Movie</h5>
                        <p>{{ movie }}</p>
                    </div>
                    <div class="info-item" v-if="music">
                        <h5>Music</h5>
                        <p>{{ music }}</p>
                    </div>
                    <div class="info-item">
                        <h5>Use Tools</h5>
                        <p>{{ tools }}</p>
                    </div>
                    <a :href="link" target="_blank" rel="noopener noreferrer" class="info-play">
                        <h5>Play</h5>
                    </a>
                </div>
            </div>

            <div id="pages-wrapper1">
                <div class="pages-about" v-if="body">
                    <h2 class="delay-scroll2 ts">About</h2>
                    <div class="delay-scroll3 font" v-html="( body )"></div>
                </div>
                <div class="pages-block" v-html="( bodyimage )"></div>
            </div>
            <nuxt-link class="next-link" @click.native="bg_add" :to="`/works/${works.id}`">
                <div :style="works.gradation" class="next">
                    <h5 class="delay-scroll4 ts">Next Project</h5>
                    <h2 class="delay-scroll ts">{{ works.title }}</h2>
                </div>
            </nuxt-link>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    async asyncData({ params }) {
        const { data } = await axios.get(
            `https://pmgwork.microcms.io/api/v1/works/${params.slug}?depth=1`,
            {
                headers: { 'X-API-KEY': '8d729177-1247-4c07-b1b4-b2ccd3bd4e66' }
            }
        )
        return data
    },
    head() {
        return {
            title: `${ this.title } | ぴくせる`,
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
        const bg_height = document.getElementById("pages-wrapper").clientHeight;
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

        //background
        const bg_item = document.getElementById("bg-item1");
        bg_item.style.height = bg_height + 'px';

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
        const scrollio = document.querySelectorAll('.scroll,.delay-scroll,.delay-scroll1,.delay-scroll2,.delay-scroll3,.delay-scroll4')
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