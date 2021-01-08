<template>
<div class="works">
    <div class="bg-white"></div>
    <div id="butter">
        <div class="bg-item"></div>
        <div class="heading">
            <h1 class="delay-title">Works</h1>
            <p class="delay-title1">Motion Graphics ・ Design ・ 3DCG</p>
        </div>
        <ul class="works-wrapper">
            <li class="works-article" v-for="content in contents" :key="content.id">
                <div class="works-image scroll">
                    <nuxt-link :to="`/works/${content.id}`">
                        <img :src="content.image.url">
                    </nuxt-link>
                </div>
                <div class="works-title">
                    <h3 :style="content.gradation" class="delay-scroll">{{ content.title }}</h3>
                    <p class="delay-scroll1">{{ content.date }}</p>
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
        setTimeout(function(){
            butter.init({
                wrapperId: 'butter',
                wrapperDamper: 0.12,
                cancelOnTouch: true
            })
        },50);

        $("header #lottie-logo").css({'opacity':''});

        //headercolor
        var bg_height = $('.bg-item').innerHeight();
        var scrollheight = bg_height - 400;

        $(window).scroll(function() {
            if($(this).scrollTop() > scrollheight) {
                $("header a").css({'color':'#181818'});
                $("header #lottie-logo").css({'filter':'brightness(0.1)'});
            } else {
                $("header a").css({'color':''});
                $("header #lottie-logo").css({'filter':''});
            }
        });

        //transition
        $('header a').click(function() {
            $(".background").removeClass("bg-color");
        })
        $('.works-article a').click(function() {
            $(".background").addClass("bg-color");
        })

        //Animation
        $(".delay-title").letterSpan();
        $(".delay-title1").letterSpan();
        $(".delay-scroll").letterSpan();
        $(".delay-scroll1").letterSpan();
        $(".delay-scroll2").letterSpan();
        $(".delay-scroll4").letterSpan();

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
    }
}
</script>