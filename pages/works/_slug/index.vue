<template>
<div class="pages">
    <div class="bg-white"></div>
    <div id="butter">
        <div :style="gradation" id="bg-item1"></div>
        <div id="pages-wrapper">
            <div class="pages-image scroll">
                <picture>
                    <source :srcset="`${ image.url }?fm=webp`" type="image/webp">
                    <img :src="image.url" width="1280" height="720">
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
            <div class="pages-share">
                <h2 class="delay-scroll ts">Share!</h2>
                <div class="share-link delay-scroll3">
                    <a class="dl" :href="`https://twiter.com/share?text=${ title }&hashtags=pmgwork&url=https://pmgwork.com/works/${ id }`" target="_blank" rel="nofollow noopener noreferrer">
                        <div class="twi">
                            <span class="icon-twitter"></span>
                            <h5>Twitter</h5>
                        </div>
                    </a>
                    <a class="dl" :href="`http://www.facebook.com/share.php?u=https://pmgwork.com/works/${ id }&t=${ title }%20%23pmgwork`" target="_blank" rel="nofollow noopener noreferrer">
                        <div class="face">
                            <span class="icon-facebook"></span>
                            <h5>Facebook</h5>
                        </div>
                    </a>
                    <a class="dl" :href="`https://social-plugins.line.me/lineit/share?url=https://pmgwork.com/works/${ id }`" target="_blank" rel="nofollow noopener noreferrer">
                        <div class="line">
                            <span class="icon-line"></span>
                            <h5>LINE</h5>
                        </div>
                    </a>
                </div>
            </div>
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
            meta: [
                { property: 'og:title', content: `${ this.title } | ぴくせる`},
                { property: 'og:image', content: `${ this.image.url }`},
            ],
        }
    },
    mounted(){
        butter.cancel()

        setTimeout(function(){
            butter.init({
                scrollY: true
            })
        }, 500);

        //headercolor
        var bg_height = document.getElementById("pages-wrapper").clientHeight;

        const scrollheight = bg_height - 200;
        const linksCol = document.querySelectorAll("header a,#lottie-logo");

        window.addEventListener('scroll', _.throttle(scroll, 300))
        function scroll(){
            if(window.scrollY > scrollheight) {
                linksCol.forEach(linkCol => {
                    linkCol.classList.add('hd-color');
                });
            } else {
                linksCol.forEach(linkCol => {
                    linkCol.classList.remove('hd-color');
                });
            }
        };

        //background
        this.bg_size();
        window.addEventListener('resize', (this.bg_size));

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
    beforeDestroy(){
        window.removeEventListener('resize', (this.bg_size));
    },
    methods: {
        bg_add() {
            document.getElementById("background").classList.add('bg-color');
        },
        bg_size() {
            const bg_item = document.getElementById("bg-item1");
            var bg_height = document.getElementById("pages-wrapper").clientHeight;
            bg_item.style.height = bg_height + 'px';
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