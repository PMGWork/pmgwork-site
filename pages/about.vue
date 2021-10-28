<template>
<div class="about">
    <div class="bg-white"></div>
    <div id="butter">
        <div id="bg-item"></div>
        <div class="heading">
            <h1 class="delay-title ts">About</h1>
            <p class="delay-title1 ts">自分について</p>
        </div>
        <div class="about-wrapper">
            <div class="about-logo">
                <img src="~/assets/img/newlogo.svg" alt="logo">
            </div>
            <div class="about-title">
                <h2 class="delay-scroll ts">ぴくせる</h2>
                <h4 class="delay-scroll1 ts in-view">Motion Graphics Designer</h4>
            </div>
            <div class="about-content">
                <h2 class="delay-scroll2 ts">Hello!</h2>
                <div class="delay-scroll3 font">
                    <p>モーショングラフィックスや3DCGを用いた映像作品を制作しています。</p>
                    <p>映像制作等のご依頼は <a href="mailto:mail@pmgwork.com">mail@pmgwork.com</a> 、もしくは <a href="https://twitter.com/pmgwork" target="_blank" aria-label="twitter" rel="noopener noreferrer">Twitter</a> のDMまでお願いします。</p>
                </div>
            </div>
            <div class="about-block">
                <div class="about-tools">
                    <h2 class="delay-scroll2 ts">Tools</h2>
                    <ul class="delay-scroll3">
                        <li>AfterEffects</li>
                        <li>Blender</li>
                        <li>Illustrator</li>
                        <li>Photoshop</li>
                        <li>Lightroom</li>
                        <li>Xd</li>
                        <li>Substance Painter</li>
                        <li>Vroid</li>
                    </ul>
                </div>
                <div class="about-tools">
                    <h2 class="delay-scroll2 ts">Skills</h2>
                    <ul class="delay-scroll3">
                        <li>Motion Graphics</li>
                        <li>3DCG</li>
                        <li>Graphic Design</li>
                        <li>UI・UX</li>
                        <li>Web Design</li>
                        <li>HTML・CSS</li>
                        <li>JavaScript</li>
                    </ul>
                </div>
            </div>
        </div>
        <footer class="footer">
            <p class="copyright">© 2021 Pixel</p>
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
export default {
    head()  {
        return {
            title: 'About | ぴくせる',
        }
    },
    mounted(){
        //butter
        butter.cancel()

        window.setTimeout(function(){
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
        const scrollio = document.querySelectorAll('.scroll,.delay-scroll,.delay-scroll1,.delay-scroll2,.delay-scroll3')
        scrollio.forEach((target) => this.onIntersect(target, options))
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