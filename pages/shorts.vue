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
                <div class="shorts-image">
                    <a :href="content.link" target="_blank" rel="noopener noreferrer">
                        <picture>
                            <source :srcset="`${ content.image.url }?w=560&fm=webp`" media="(max-width: 560px)" type="image/webp">
                            <source :srcset="`${ content.image.url }?fm=webp`" type="image/webp">
                            <img :src="content.image.url">
                        </picture>
                    </a>
                </div>
                <h3>{{ content.title }}</h3>
            </div>
        </div>
    </div>
    <div id="scrollbar-hrz"></div>
    <div id="scrollbar-hrz1"></div>
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

        if(!_ua.Mobile&&!_ua.Tablet){
            setTimeout(function(){
                butter.init({
                    scrollY: false
                })
            }, 200);
        } else {
            document.querySelector(".shorts-wrapper").style.overflowX = 'scroll';
        }

        //horizontal scroll
        document.addEventListener('wheel', this.onScroll, { passive: false });

        //scrollbar

        const scrollWidth = document.documentElement.scrollWidth;
        window.addEventListener('scroll', function(){
            const scrollPosition = window.scrollX;
            const scrollbarScale = window.scrollX / (document.body.scrollWidth - window.innerWidth);
            const scrollbar_hrz = document.getElementById("scrollbar-hrz").style.transform = 'scaleX(' + scrollbarScale + ')';
        })

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