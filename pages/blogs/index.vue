<template>
    <div class="blogs">
        <div class="bg-white"></div>
        <div id="butter">
            <div id="bg-item"></div>
            <div class="title-wrapper">
                <h1 class="title ts">Blogs</h1>
                <p class="subtitle ts">雑多</p>
            </div>
            <div class="blogs-wrapper">
                <div class="blogs-article" v-for="blog in blogs" :key="blog.id">
                    <nuxt-link @click.native="bg_add" :to="`/blogs/${blog.id}/`">
                        <div class="article-wrapper scroll view">
                            <div class="blogs-image scroll">
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
                            <div class="blogs-title">
                                <h4>{{ blog.title }}</h4>
                                <div class="blogs-property">
                                    <li>{{ blog.date | dayjs_relative }}</li>
                                    <li>#Tech</li>
                                </div>
                            </div>
                        </div>
                    </nuxt-link>
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
    import common from '~/static/js/common.js';

    export default {
        async asyncData({ $graphcms }) {
            const { blogs } = await $graphcms.request(
                gql`
                    {
                        blogs(orderBy: date_DESC) {
                            id
                            title
                            date
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

            return { blogs };
        },
        head() {
            return {
                title: 'Blogs | ぴくせる',
                name: 'description', content: 'ぴくせる - Motion Graphics Designer',
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

            //Animation
            const options = {
                root: null,
                rootMargin: "-10% 0px",
                threshold: 0
            }
            const scrollio = document.querySelectorAll('.scroll')
            scrollio.forEach((target) => this.onIntersect(target, options))
        }
    }
    </script>