<template>
<div class="shorts">
    <div class="bg-white"></div>
    <div id="bg-item"></div>
    <div class="heading">
        <h1 class="delay-title ts">#Shorts</h1>
    </div>
    <div id="butter">
        <div class="shorts-wrapper delay-image">
            <div class="shorts-article" v-for="short in shorts" :key="short.id">
                <div class="shorts-image">
                    <a :href="short.link" target="_blank" rel="noopener noreferrer">
                        <video v-if="short.video"
                            :src="short.video.url"
                            height="540"
                            autoplay loop muted playsinline
                            oncontextmenu="return false;"
                            onselectstart="return false;"
                            onmousedown="return false;"
                        >
                        </video>
                        <picture v-if="short.image">
                            <source :srcset="short.image.webp" type="image/webp">
                            <img
                                :src="short.image.url"
                                :width="short.image.width"
                                :height="short.image.height"
                                alt="video"
                                loading="lazy"
                                oncontextmenu="return false;"
                                onselectstart="return false;"
                                onmousedown="return false;"
                            >
                        </picture>
                    </a>
                </div>
                <h3>{{ short.title }}</h3>
            </div>
        </div>
    </div>
    <div id="scrollbar-hrz"></div>
    <div id="scrollbar-hrz1"></div>
</div>
</template>

<script>
import { gql } from 'graphql-request';

export default {
    async asyncData({ $graphcms }) {
        const { shorts } = await $graphcms.request(
            gql`
                {
                    shorts(orderBy: date_DESC) {
                        title
                        video {
                            url
                        }
                        image {
                            webp: url(
                                transformation: {
                                    image: { resize: { width: 960, height: 540, fit: clip } }
                                    document: { output: { format: webp } }
                                }
                            )
                            url
                            height
                            width
                        }
                        link
                    }
                }
            `
        );

        return { shorts };
    },
    head() {
        return {
            title: '#Shorts | ぴくせる',
        }
    },
    mounted(){
        butter.cancel()

        var _ua = (function(u){
            return {
                Tablet:(u.indexOf("windows") != -1 && u.indexOf("touch") != -1 && u.indexOf("tablet pc") == -1)
                    || u.indexOf("ipad") != -1
                    || (u.indexOf("android") != -1 && u.indexOf("mobile") == -1)
                    || (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1)
                    || u.indexOf("kindle") != -1
                    || u.indexOf("silk") != -1
                    || u.indexOf("playbook") != -1,
                Mobile:(u.indexOf("windows") != -1 && u.indexOf("phone") != -1)
                    || u.indexOf("iphone") != -1
                    || u.indexOf("ipod") != -1
                    || (u.indexOf("android") != -1 && u.indexOf("mobile") != -1)
                    || (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1)
                    || u.indexOf("blackberry") != -1
            }
        })(window.navigator.userAgent.toLowerCase());

        const windowWidth = window.innerWidth
        if (windowWidth > 960) {
            if(!_ua.Mobile&&!_ua.Tablet){
                document.addEventListener('wheel', this.onScroll, { passive: false });
                setTimeout(function(){
                    butter.init({
                        scrollY: false
                    })
                }, 50);
            } else {
                document.querySelector(".shorts-wrapper").style.overflowX = 'scroll';
            }
        }

        //headercolor
        const bg_height = document.getElementById("bg-item").clientHeight;
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

        //scrollbar
        window.addEventListener('scroll', this.scrollbar)

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
    },
    beforeDestroy () {
        document.removeEventListener('wheel', this.onScroll, { passive: false });
        window.removeEventListener('scroll', this.scrollbar)
    },
    methods: {
        bg_add() {
            document.getElementById("background").classList.add('bg-color');
        },
        onScroll(e) {
            let delta = ((e.deltaY || -e.wheelDelta || e.detail) >> 20) || 1;
            delta = delta * (-100);
            document.documentElement.scrollLeft -= delta;
            // safari needs also this
            document.body.scrollLeft -= delta;
            e.preventDefault();
        },
        scrollbar() {
            const scrollWidth = document.documentElement.scrollWidth;
            const scrollPosition = window.scrollX;
            const scrollbarScale = window.scrollX / (document.body.scrollWidth - window.innerWidth);
            const scrollbar_hrz = document.getElementById("scrollbar-hrz").style.transform = 'scaleX(' + scrollbarScale + ')';
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