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
                <div class="pages-heading-wrapper">
                    <h2 class="heading ts">{{ work.title }}</h2>
                    <p v-if="work.isClient" class="subheading ts">Client Work - {{ work.date | dayjs }}</p>
                    <p v-else class="subheading ts">Personal Work - {{ work.date | dayjs }}</p>
                </div>
                <div class="pages-info scroll">
                    <div class="info-item" v-for="item in work.credits" :key="item.title">
                        <h5>{{ item.title }}</h5>
                        <p>{{ item.name }}</p>
                    </div>
                    <a :href="work.link" target="_blank" rel="noopener noreferrer" aria-label="play" class="info-play hover">
                        <h5>Play</h5>
                    </a>
                </div>
            </div>

            <div id="pages-wrapper1">
                <div class="pages-about" v-if="work.body">
                    <h2 class="heading ts">About</h2>
                    <div class="block font" v-html="( work.body.html )"></div>
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
                    <h2 class="heading ts">Share!</h2>
                    <div class="share-link list">
                        <a class="dl hover" :href="`https://twitter.com/share?text=${ work.title }&hashtags=pmgwork&url=https://pmgwork.com/works/${ work.slug }/`" target="_blank" aria-label="twitter" rel="nofollow noopener noreferrer">
                            <div class="twi">
                                <img class="desvg" src="https://simpleicons.org/icons/twitter.svg">
                                <h5>Twitter</h5>
                            </div>
                        </a>
                        <a class="dl hover" :href="`http://www.facebook.com/share.php?u=https://pmgwork.com/works/${ work.slug }/&t=${ work.title }`" target="_blank" aria-label="facebook" rel="nofollow noopener noreferrer">
                            <div class="face">
                                <img class="desvg" src="https://simpleicons.org/icons/facebook.svg">
                                <h5>Facebook</h5>
                            </div>
                        </a>
                        <a class="dl hover" :href="`https://social-plugins.line.me/lineit/share?url=https://pmgwork.com/works/${ work.slug }/`" target="_blank" aria-label="line" rel="nofollow noopener noreferrer">
                            <div class="line">
                                <img class="desvg" src="https://simpleicons.org/icons/line.svg">
                                <h5>LINE</h5>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <nuxt-link class="next-link view" @click.native="bg_add" v-if="work.next" aria-label="next" :to="`/works/${ work.next.slug }/`">
                <div :style="`background-image: linear-gradient(135deg,${ work.next.color.hex },${ work.next.color1.hex });`" class="next">
                    <h5 class="subheading ts">Next Project</h5>
                    <h2 class="next-heading ts">{{ work.next.title }}</h2>
                </div>
            </nuxt-link>
        </div>
    </div>
    </template>

    <script>
    import { gql } from 'graphql-request';
    import common from '~/static/js/common.js';

    export default {
        async asyncData({ $graphcms, params }) {
            const { slug } = params;

            const { work } = await $graphcms.request(
                gql`
                    query GetWork($slug: String) {
                        work(where: { slug: $slug }) {
                            title
                            isClient
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
                            credits {
                                title
                                name
                            }
                            body {
                                html
                            }
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
        mixins: [common],
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

            //background
            this.bg_size();
            window.addEventListener('resize', (this.bg_size));

            //addClass
            const blocks = document.querySelectorAll('.block,.list');
            blocks.forEach(block => {
                Array.from(block.children).forEach(child => child.classList.add('anm'));
            });

            //animation
            const options = {
                root: null,
                rootMargin: "-10% 0px",
                threshold: 0
            }
            const scrollio = document.querySelectorAll('.list,.anm,.scroll,.title,.heading,.subheading,.next-heading')
            scrollio.forEach((target) => this.onIntersect(target, options))
        },
        beforeDestroy(){
            window.removeEventListener('resize', (this.bg_size));
        },
        methods: {
            bg_size() {
                const bg_item = document.getElementById("bg-item1");
                var bg_height = document.getElementById("pages-wrapper").clientHeight;
                bg_item.style.height = bg_height + 'px';
            }
        }
    }
    </script>