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
                <img src="~/assets/img/newlogo.svg">
            </div>
            <div class="about-title">
                <h2 class="delay-scroll ts">ぴくせる</h2>
                <h4 class="delay-scroll1 ts in-view">Motion Graphics Designer</h4>
            </div>
            <div class="about-content">
                <h2 class="delay-scroll2 ts">Hello!</h2>
                <div class="delay-scroll3 font">
                    <p>主にモーショングラフィックスや3DCG、グラフィックデザイン等を制作しています。</p>
                    <p>Zarusoba DesignWorks (@Z_D_W_) 所属</p>
                    <p>映像制作等のご依頼は下記フォーム、もしくはTwitterのDMまでお願いします。</p>
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
                        <li>Xd</li>
                        <li>Vroid</li>
                        <li>Visual Studio Code</li>
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
            <div class="contact">
                <h2 class="delay-scroll2 ts">Contact</h2>
                <client-only>
                <form name="contact" method="POST" data-netlify="true">
                    <p class="required">お名前</p>
                    <input type="text" name="name" autocomplete="name" required>
                    <p>会社名/団体名</p>
                    <input type="text" name="company" autocomplete="organization">
                    <p class="required">メールアドレス</p>
                    <input type="text" name="email" autocomplete="email" placeholder="mail@example.com" required>
                    <p class="required">件名</p>
                    <input type="text" name="subject" required>
                    <p class="required">本文</p>
                    <textarea type="text" name="main" placeholder="ご依頼・ご相談の際は、スケジュールと予算を提示していただけると幸いです。" required></textarea>
                    <p class="contact-button">
                        <button type="submit" name="button" value="送信">送信</button>
                    </p>
                </form>
                </client-only>
            </div>
        </div>
        <footer class="footer">
            <p class="copyright">© 2020 Pixel</p>
            <div class="footer-link">
                <a href="https://twitter.com/pmgwork" target="_blank" rel="noopener noreferrer">
                    <span class="icon-twitter"></span>
                </a>
                <a href="https://instagram.com/pmgwork" target="_blank" rel="noopener noreferrer">
                    <span class="icon-instagram"></span>
                </a>
                <a href="https://youtube.com/pmgwork" target="_blank" rel="noopener noreferrer">
                    <span class="icon-youtube-play"></span>
                </a>
                <a href="mailto:mail@pmgwork.com" target="_blank" rel="noopener noreferrer">
                    <span class="icon-envelope"></span>
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
            butter.init()
        }, 100);

        document.getElementById("lottie-logo").style.opacity = '';

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