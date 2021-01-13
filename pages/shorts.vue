<template>
<div class="shorts">
    <div class="bg-white"></div>
    <div id="bg-item"></div>
    <div class="heading">
        <h1 class="delay-title ts">#Shorts</h1>
    </div>
    <div id="butter">
        <div class="shorts-wrapper delay-image">
            <div class="shorts-article" v-for="content in contents" :key="content.id">
                <a :href="content.link" target="_blank" rel="noopener noreferrer">
                    <picture>
                        <source :srcset="`${ content.image.url }?w=560&fm=webp`" media="(max-width: 560px)" type="image/webp">
                        <source :srcset="`${ content.image.url }?fm=webp`" type="image/webp">
                        <img :src="content.image.url">
                    </picture>
                </a>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    async asyncData() {
        const { data } = await axios.get(
            'https://pmgwork.microcms.io/api/v1/shorts?limit=50',
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
        butter.cancel()

        setTimeout(function(){
            butter.init({
                scrollY: false
            })
        }, 200);

        //horizontal scroll

        document.addEventListener('wheel', this.onScroll, { passive: false });

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
    beforeDestroy () {
        document.removeEventListener('wheel', this.onScroll, { passive: false });
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