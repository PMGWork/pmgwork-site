<template>
    <div class="blog" v-if="blog">
        <div class="bg-white"></div>
        <div id="butter">
            <div id="header-image">
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
                <div class="blog-title-wrapper">
                    <h1 class="blog-title ts">{{ blog.title }}</h1>
                    <div class="list blog-property">
                        <li>{{ blog.date | dayjs_relative }}</li>
                        <li>#Tech</li>
                    </div>
                </div>
                <div class="blog-body" v-if="blog.body">
                    <div class="block font" v-html="( blog.body.html )"></div>
                </div>
            </div>

            <div class="blog-share">
                <h2 class="delay-scroll ts">Share!</h2>
                <div class="share-link delay-scroll3">
                    <a class="dl hover" :href="`https://twitter.com/share?text=${ blog.title }&hashtags=pmgwork&url=https://pmgwork.com/works/${ blog.id }/`" target="_blank" aria-label="twitter" rel="nofollow noopener noreferrer">
                        <div class="twi">
                            <img class="desvg" src="https://simpleicons.org/icons/twitter.svg">
                            <h5>Twitter</h5>
                        </div>
                    </a>
                    <a class="dl hover" :href="`http://www.facebook.com/share.php?u=https://pmgwork.com/works/${ blog.id }/&t=${ blog.title }`" target="_blank" aria-label="facebook" rel="nofollow noopener noreferrer">
                        <div class="face">
                            <img class="desvg" src="https://simpleicons.org/icons/facebook.svg">
                            <h5>Facebook</h5>
                        </div>
                    </a>
                    <a class="dl hover" :href="`https://social-plugins.line.me/lineit/share?url=https://pmgwork.com/works/${ blog.id }/`" target="_blank" aria-label="line" rel="nofollow noopener noreferrer">
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
    import common from '~/static/js/common.js';

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
        head() {
            return {
                title: `${ this.blog.title } | ぴくせる`,
                meta: [
                    { property: 'og:title', content: `${ this.blog.title } | ぴくせる`},
                    { property: 'og:image', content: `${ this.blog.thumbnail.url }`},
                ],
            }
        },
        mixins: [
            common
        ],
        mounted(){
            //butter
            butter.cancel()

            setTimeout(function(){
                butter.init({
                    scrollY: true
                })
            }, 50);

            //addClass
            const blocks = document.querySelectorAll('.block,.list');
            blocks.forEach(block => {
                Array.from(block.children).forEach(child => child.classList.add('anm'));
            });

            //Animation
            const options = {
                root: null,
                rootMargin: "-10% 0px",
                threshold: 0
            }
            const scrollio = document.querySelectorAll('.blog-title,.list,.anm,.block,.next-heading')
            scrollio.forEach((target) => this.onIntersect(target, options))

        }
    }
    </script>