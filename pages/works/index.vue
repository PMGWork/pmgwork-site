<template>
    <div class="works">
        <div class="bg-white"></div>
        <div id="butter">
            <div id="bg-item"></div>
            <div class="title-wrapper">
                <h1 class="title ts">Works</h1>
                <p class="subtitle ts">Motion Graphics ・ Design ・ 3DCG</p>
            </div>
            <div class="works-wrapper">
                <div class="works-article" v-for="work in works" :key="work.slug">
                    <div class="works-image scroll view">
                        <nuxt-link
                            @click.native="bg_add"
                            :to="`/works/${work.slug}/`"
                        >
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
                    <div class="works-title-wrapper">
                        <h3 :style="`background-image: linear-gradient(135deg,${ work.color.hex },${ work.color1.hex });`" class="works-title ts">{{ work.title }}</h3>
                        <p v-if="work.isClient" class="works-subtitle ts">Client Work - {{ work.date | dayjs }}</p>
                        <p v-else class="works-subtitle ts">Personal Work - {{ work.date | dayjs }}</p>
                    </div>
                </div>
            </div>
            <footer class="footer">
                <p class="copyright">© {{year}} Pixel</p>
                <div class="footer-link">
                    <a class="range" href="https://twitter.com/pmgwork" target="_blank" aria-label="twitter" rel="noopener noreferrer">
                        <img class="desvg" src="https://simpleicons.org/icons/twitter.svg">
                    </a>
                    <a class="range" href="https://instagram.com/pmgwork" target="_blank" aria-label="instagram" rel="noopener noreferrer">
                        <img class="desvg" src="https://simpleicons.org/icons/instagram.svg">
                    </a>
                    <a class="range" href="https://youtube.com/pmgwork" target="_blank" aria-label="youtube" rel="noopener noreferrer">
                        <img class="desvg" src="https://simpleicons.org/icons/youtube.svg">
                    </a>
                    <a class="range" href="mailto:mail@pmgwork.com" target="_blank" aria-label="email" rel="noopener noreferrer">
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
    mixins: [common],
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

        //Animation
        const options = {
            root: null,
            rootMargin: "-10% 0px",
            threshold: 0
        }
        const scrollio = document.querySelectorAll('.scroll,.works-title,.works-subtitle')
        scrollio.forEach((target) => this.onIntersect(target, options))
    }
}
</script>