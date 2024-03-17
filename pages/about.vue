<template>
<div class="about">
    <div class="bg-white"></div>
    <div id="butter">
        <div id="bg-item"></div>
        <div class="title-wrapper">
            <h1 class="title ts">About</h1>
            <p class="subtitle ts">自分について</p>
        </div>
        <div class="about-wrapper">
            <div class="about-logo">
                <img src="~/assets/img/newlogo.svg" alt="logo">
            </div>
            <div class="about-title-wrapper">
                <h2 class="about-title ts">ぴくせる</h2>
                <h4 class="about-subtitle ts">Motion Graphics Designer</h4>
            </div>
            <div class="about-content">
                <h2 class="heading ts">Hello!</h2>
                <div class="block font">
                    <p>モーショングラフィックスや3DCGを用いた映像作品を制作しています。</p>
                    <p>映像制作等のご依頼は <a href="mailto:pmgwork.com@gmail.com">pmgwork.com@gmail.com</a> までお願いします。</p>
                </div>
            </div>
            <div class="about-block">
                <div class="about-tools">
                    <h2 class="heading ts">Tools</h2>
                    <ul class="list">
                        <li>AfterEffects</li>
                        <li>Blender</li>
                        <li>Illustrator</li>
                    </ul>
                </div>
                <div class="about-tools">
                    <h2 class="heading ts">Skills</h2>
                    <ul class="list">
                        <li>Motion Graphics</li>
                        <li>3DCG</li>
                        <li>Graphic Design</li>
                        <li>Web Design</li>
                        <li>HTML・CSS</li>
                        <li>Processing</li>
                    </ul>
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
                <a class="range" href="mailto:pmgwork.com@gmail.com" target="_blank" aria-label="email" rel="noopener noreferrer">
                    <img class="desvg" src="https://simpleicons.org/icons/gmail.svg">
                </a>
            </div>
        </footer>
    </div>
</div>
</template>

<script>
import common from '~/static/js/common.js';

export default {
    head()  {
        return {
            title: 'About | ぴくせる',
        }
    },
    mixins: [
        common
    ],
    mounted(){
        //butter
        butter.cancel()

        window.setTimeout(function(){
            butter.init({
                scrollY: true
            })
        }, 50);

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
        const scrollio = document.querySelectorAll('.list,.anm,.about-title,.about-subtitle,.heading,.subheading')
        scrollio.forEach((target) => this.onIntersect(target, options))
    }
}
</script>