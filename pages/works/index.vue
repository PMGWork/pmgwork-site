<template>
    <div class="works">
        <div class="bg-white"></div>
        <div id="butter">
            <div id="bg-item"></div>
            <div class="heading">
                <h1 class="delay-title ts">Works</h1>
                <p class="delay-title1 ts">Motion Graphics ・ Design ・ 3DCG</p>
            </div>
            <div class="works-wrapper">
                <div class="works-article" v-for="work in works" :key="work.slug">
                    <div class="works-image scroll">
                        <nuxt-link @click.native="bg_add" :to="`/works/${work.slug}/`">
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
                        </nuxt-link>
                    </div>
                    <div class="works-title">
                        <h3 :style="`background-image: linear-gradient(135deg,${ work.color.hex },${ work.color1.hex });`" class="delay-scroll ts">{{ work.title }}</h3>
                        <p v-if="work.isClient" class="delay-scroll1 ts">Client Work - {{ work.date | moment }}</p>
                        <p v-else class="delay-scroll1 ts">Personal Work - {{ work.date | moment }}</p>
                    </div>
                </div>
            </div>
            <footer class="footer">
                <p class="copyright">© 2024 Pixel</p>
                <div class="footer-link">
                    <a href="https://twitter.com/pmgwork" target="_blank" aria-label="twitter" rel="noopener noreferrer">
                        <img class="desvg" src="https://simpleicons.org/icons/twitter.svg">
                    </a>
                    <a href="https://instagram.com/pmgwork" target="_blank" aria-label="instagram" rel="noopener noreferrer">
                        <img class="desvg" src="https://simpleicons.org/icons/instagram.svg">
                    </a>
                    <a href="https://youtube.com/pmgwork" target="_blank" aria-label="youtube" rel="noopener noreferrer">
                        <img class="desvg" src="https://simpleicons.org/icons/youtube.svg">
                    </a>
                    <a href="mailto:mail@pmgwork.com" target="_blank" aria-label="email" rel="noopener noreferrer">
                        <img class="desvg" src="https://simpleicons.org/icons/gmail.svg">
                    </a>
                </div>
            </footer>
        </div>
    </div>
    </template>

    <script>
    import { gql } from 'graphql-request';
    import moment from "moment";

    export default {
        async asyncData({ $graphcms }) {
            const { works } = await $graphcms.request(
                gql`
                    {
                        works(orderBy: date_DESC) {
                            slug
                            title
                            isClient
                            date
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
                        }
                    }
                `
            );

            return { works };
        },
        filters: {
            moment: function (date) {
                return moment(date).format('YYYY/MM/DD')
            }
        },
        head() {
            return {
                title: 'Works | ぴくせる',
                name: 'description', content: 'ぴくせる - Motion Graphics Designer',
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