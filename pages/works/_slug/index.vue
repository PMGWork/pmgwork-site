<template>
<div class="pages" v-if="work">
    <div class="bg-white"></div>
    <div id="butter">
        <div :style="`background-image: linear-gradient(135deg,${ work.color.hex },${ work.color1.hex });`" id="bg-item1"></div>
        <div id="pages-wrapper">
            <div class="pages-image scroll">
                <picture>
                    <source :srcset="work.thumbnail.webp" type="image/webp">
                    <img
                        :src="work.thumbnail.url"
                        :width="work.thumbnail.width"
                        :height="work.thumbnail.height"
                        :alt="work.title"
                        loading="lazy"
                        oncontextmenu="return false;"
                        onselectstart="return false;"
                        onmousedown="return false;"
                    >
                </picture>
            </div>
            <div class="pages-title">
                <h2 class="delay-scroll2 ts">{{ work.title }}</h2>
                <h5 class="delay-scroll4 ts">{{ work.genre }} - {{ work.date }}</h5>
            </div>
            <div class="pages-info scroll">
                <div class="info-item" v-if="work.movie">
                    <h5>Movie</h5>
                    <p>{{ work.movie }}</p>
                </div>
                <div class="info-item" v-if="work.music">
                    <h5>Music</h5>
                    <p>{{ work.music }}</p>
                </div>
                <div class="info-item">
                    <h5>Use Tools</h5>
                    <p>{{ work.tools }}</p>
                </div>
                <a :href="work.link" target="_blank" rel="noopener noreferrer" aria-label="play" class="info-play">
                    <h5>Play</h5>
                </a>
            </div>
        </div>

        <div id="pages-wrapper1">
            <div class="pages-about" v-if="work.body">
                <h2 class="delay-scroll2 ts">About</h2>
                <div class="delay-scroll3 font" v-html="( work.body )"></div>
            </div>
            <div class="pages-block">
                <div class="block-image scroll" v-for="item in work.images" :key="item.url">
                    <picture>
                        <source :srcset="item.webp" type="image/webp">
                        <img
                            :src="item.url"
                            :width="item.width"
                            :height="item.height"
                            alt="image"
                            loading="lazy"
                            oncontextmenu="return false;"
                            onselectstart="return false;"
                            onmousedown="return false;"
                        >
                    </picture>
                </div>
            </div>
            <div class="pages-share">
                <h2 class="delay-scroll ts">Share!</h2>
                <div class="share-link delay-scroll3">
                    <a class="dl" :href="`https://twitter.com/share?text=${ work.title }&hashtags=pmgwork&url=https://pmgwork.com/works/${ work.slug }/`" target="_blank" aria-label="twitter" rel="nofollow noopener noreferrer">
                        <div class="twi">
                            <img class="desvg" src="https://simpleicons.org/icons/twitter.svg">
                            <h5>Twitter</h5>
                        </div>
                    </a>
                    <a class="dl" :href="`http://www.facebook.com/share.php?u=https://pmgwork.com/works/${ work.slug }/&t=${ work.title }`" target="_blank" aria-label="facebook" rel="nofollow noopener noreferrer">
                        <div class="face">
                            <img class="desvg" src="https://simpleicons.org/icons/facebook.svg">
                            <h5>Facebook</h5>
                        </div>
                    </a>
                    <a class="dl" :href="`https://social-plugins.line.me/lineit/share?url=https://pmgwork.com/works/${ work.slug }/`" target="_blank" aria-label="line" rel="nofollow noopener noreferrer">
                        <div class="line">
                            <img class="desvg" src="https://simpleicons.org/icons/line.svg">
                            <h5>LINE</h5>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <nuxt-link class="next-link" @click.native="bg_add" aria-label="next" :to="`/works/${ work.next.slug }/`">
            <div :style="`background-image: linear-gradient(135deg,${ work.next.color.hex },${ work.next.color1.hex });`" class="next">
                <h5 class="delay-scroll4 ts">Next Project</h5>
                <h2 class="delay-scroll ts">{{ work.next.title }}</h2>
            </div>
        </nuxt-link>
    </div>
</div>
</template>

<script>
import { gql } from 'graphql-request';

export default {
    async asyncData({ $graphcms, params }) {
        const { slug } = params;

        const { work } = await $graphcms.request(
            gql`
                query GetWork($slug: String) {
                    work(where: { slug: $slug }) {
                        title
                        genre
                        date
                        link
                        color {
                            hex
                        }
                        color1 {
                            hex
                        }
                        thumbnail {
                            webp: url(
                                transformation: {
                                    document: { output: { format: webp } }
                                }
                            )
                            url
                            height
                            width
                        }
                        movie
                        music
                        tools
                        body
                        images {
                            webp: url(
                                transformation: {
                                    image: { resize: { width: 640, height: 360, fit: clip } }
                                    document: { output: { format: webp } }
                                }
                            )
                            url
                            height
                            width
                        }
                        next {
                            slug
                            title
                            color {
                                hex
                            }
                            color1 {
                                hex
                            }
                        }
                    }
                }
            `,
            {
                slug,
            }
        );

        return { work };
    },
    head() {
        return {
            title: `${ this.work.title } | ぴくせる`,
            meta: [
                { property: 'og:title', content: `${ this.work.title } | ぴくせる`},
                { property: 'og:image', content: `${ this.work.thumbnail.url }`},
            ],
        }
    },
    mounted(){
        //butter
        butter.cancel()

        setTimeout(function(){
            butter.init({
                scrollY: true
            })
        }, 50);

        deSVG('.desvg', true);

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