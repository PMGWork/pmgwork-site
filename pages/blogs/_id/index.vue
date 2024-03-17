<template>
    <div class="blog" v-if="blog">
        <div class="bg-white"></div>
        <div id="butter">
            <div class="header-image">
                    <picture>
                        <source :srcset="blog.thumbnail.webp" type="image/webp">
                        <img
                            :src="blog.thumbnail.url"
                            :width="blog.thumbnail.width"
                            :height="blog.thumbnail.height"
                            :alt="blog.title"
                            loading="lazy"
                            oncontextmenu="return false;"
                            onselectstart="return false;"
                            onmousedown="return false;"
                        >
                    </picture>
                </div>
            <div id="blog-wrapper">
                <div class="blog-title">
                    <h1 class="delay-scroll5 ts">{{ blog.title }}</h1>
                    <div class="delay-scroll6 blog-property">
                        <li>{{ blog.date | dayjs_relative }}</li>
                        <li>#Tech</li>
                    </div>
                </div>
                <div class="blog-body" v-if="blog.body">
                    <div class="delay-scroll6 font" v-html="( blog.body.html )"></div>
                </div>
            </div>

            <div class="blog-share">
                <h2 class="delay-scroll ts">Share!</h2>
                <div class="share-link delay-scroll3">
                    <a class="dl" :href="`https://twitter.com/share?text=${ blog.title }&hashtags=pmgwork&url=https://pmgwork.com/works/${ blog.id }/`" target="_blank" aria-label="twitter" rel="nofollow noopener noreferrer">
                        <div class="twi">
                            <img class="desvg" src="https://simpleicons.org/icons/twitter.svg">
                            <h5>Twitter</h5>
                        </div>
                    </a>
                    <a class="dl" :href="`http://www.facebook.com/share.php?u=https://pmgwork.com/works/${ blog.id }/&t=${ blog.title }`" target="_blank" aria-label="facebook" rel="nofollow noopener noreferrer">
                        <div class="face">
                            <img class="desvg" src="https://simpleicons.org/icons/facebook.svg">
                            <h5>Facebook</h5>
                        </div>
                    </a>
                    <a class="dl" :href="`https://social-plugins.line.me/lineit/share?url=https://pmgwork.com/works/${ blog.id }/`" target="_blank" aria-label="line" rel="nofollow noopener noreferrer">
                        <div class="line">
                            <img class="desvg" src="https://simpleicons.org/icons/line.svg">
                            <h5>LINE</h5>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
    </template>

    <script>
    import { gql } from 'graphql-request';
    import dayjs from "dayjs";

    export default {
        async asyncData({ $graphcms, params }) {
            const { id } = params;

            const { blog } = await $graphcms.request(
                gql`
                    query GetBlog($id: ID) {
                        blog(where: {id: $id}) {
                            title
                            date
                            thumbnail {
                                webp: url(transformation: {document: {output: {format: webp}}})
                                url
                                height
                                width
                            }
                            body {
                                html
                            }
                        }
                    }
                `,
                {
                    id,
                }
            );

            return { blog };
        },
        filters: {
            dayjs: function (date) {
                return dayjs(date).format('YYYY/MM/DD')
            }
        },
        head() {
            return {
                title: `${ this.blog.title } | ぴくせる`,
                meta: [
                    { property: 'og:title', content: `${ this.blog.title } | ぴくせる`},
                    { property: 'og:image', content: `${ this.blog.thumbnail.url }`},
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
            var bg_height = document.getElementById("blog-wrapper").clientHeight;

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
            const scrollio = document.querySelectorAll('.scroll,.delay-scroll,.delay-scroll1,.delay-scroll2,.delay-scroll3,.delay-scroll4,.delay-scroll5,.delay-scroll6')
            scrollio.forEach((target) => this.onIntersect(target, options))

        },
        beforeDestroy(){
            window.removeEventListener('resize', (this.bg_size));
        },
        methods: {
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