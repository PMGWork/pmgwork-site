<template>
    <div class="pages">
        <div class="bg-white"></div>
        <div id="butter">
            <div :style="gradation" class="bg-item1"></div>
            <div class="pages-wrapper">
                <div class="pages-image scroll">
                    <img :src="image.url">
                </div>
                <div class="pages-title">
                    <h2 class="delay-scroll2">{{ title }}</h2>
                    <h5 class="delay-scroll4">{{ date }}</h5>
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

            <div class="pages-wrapper1">
                <div class="pages-about" v-if="body">
                    <h2 class="delay-scroll2">About</h2>
                    <div class="delay-scroll3 font" v-html="( body )"></div>
                </div>
                <div class="pages-block" v-html="( bodyimage )"></div>
            </div>
            <nuxt-link class="next-link" :to="`/works/${works.id}`">
                <div :style="works.gradation" class="next">
                    <h5 class="delay-scroll4">Next Project</h5>
                    <h2 class="delay-scroll">{{ works.title }}</h2>
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
        setTimeout(function(){
            butter.init({
                wrapperId: 'butter',
                wrapperDamper: 0.12,
                cancelOnTouch: true
            })

            $("header #lottie-logo").css({'opacity':''});

            //background
            var bg_height = $('.pages-wrapper').innerHeight();
            $('.bg-item1').css('height', bg_height + 'px');
            $(window).on("resize", function() {
                $('.bg-item1').css('height', bg_height + 'px');
            });

            //headercolor
            var bg_height = $('.pages-wrapper').innerHeight();
            var scrollheight = bg_height - 200;

            $(window).scroll(function() {
                if($(this).scrollTop() > scrollheight) {
                    $("header a").css({'color':'#181818'});
                    $("header #lottie-logo").css({'filter':'brightness(0.1)'});
                } else {
                    $("header a").css({'color':''});
                    $("header #lottie-logo").css({'filter':''});
                }
            });
        },50);

        //transition
        $('header a').click(function() {
            $(".background").removeClass("bg-color");
        })
        $('.next-link').click(function() {
            $(".background").addClass("bg-color");
        })

        //Animation
        $(".delay-title").letterSpan();
        $(".delay-title1").letterSpan();
        $(".delay-scroll").letterSpan();
        $(".delay-scroll1").letterSpan();
        $(".delay-scroll2").letterSpan();
        $(".delay-scroll4").letterSpan();

        setTimeout(function(){
            var observeTargets = document.querySelectorAll('.scroll,.delay-scroll,.delay-scroll1,.delay-scroll2,.delay-scroll3,.delay-scroll4,.delay-title,.delay-title1');

            var options = {
                root: null,
                rootMargin: "-10% 0px",
                threshold: 0
            };

            var observer = new IntersectionObserver(observeCallback, options);

            $(observeTargets).each(function (index,observeTarget) {
                observer.observe(observeTarget);
            });

            function observeCallback(entries) {
                $(entries).each(function (index,entry) {
                    if (entry.isIntersecting)
                        {
                        $(entry.target).addClass('in-view');
                    }
                })
            }
        },50);
    }
}
</script>