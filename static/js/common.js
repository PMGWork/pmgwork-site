import dayjs from "dayjs";

export default {
    filters: {
        dayjs: function (date) {
            return dayjs(date).format('YYYY/MM/DD')
        }
    },
    data() {
        return{
            year: dayjs().year(),
            throttledColorChange: null
        }
    },
    mounted(){
        deSVG('.desvg', true);

        //textsplit
        const container = document.getElementsByClassName('ts');
        for(var i = 0; i < container.length; i++) {
            const content = container[i].textContent;
            const text = content.trim();
            let newHtml = "";
            text.split("").forEach(function(v) {
                newHtml += "<span>" + v + "</span>";
            });
            container[i].innerHTML = newHtml
        }

        //mousemove
        let mPos = {
            x: document.documentElement.clientWidth / 2,
            y: document.documentElement.clientHeight / 2
        }

        if(window.matchMedia( "(pointer: fine)" ).matches) {
            document.addEventListener("mousemove", e => {
                mPos.x = e.clientX;
                mPos.y = e.clientY;
            });
        }

        //colorChange
        const stalker = document.getElementById("stalker");

        let bg_height = 99999;
        if(document.getElementById("bg-item")) {
            bg_height = document.getElementById("bg-item").clientHeight;
        } else if(document.getElementById("pages-wrapper")) {
            bg_height = document.getElementById("pages-wrapper").clientHeight;
        }

        const scrollheight = bg_height - 200;
        const links = document.querySelectorAll("header a,#lottie-logo");

        this.throttledColorChange = _.throttle(() => this.colorChange(mPos.y, scrollheight, links, stalker), 300);
        window.addEventListener('scroll', this.throttledColorChange);
        document.addEventListener('mousemove', this.throttledColorChange);

        //hover
        const links_view = document.getElementsByClassName("view");
        const links_stick = document.getElementsByClassName("range");
        const links_hover = document.getElementsByClassName("hover");

        stalker.classList.remove("hover_view");

        this.isHover(links_view, "hover_view");
        this.isHover(links_stick, "hover_stick");
        this.isHover(links_hover, "hover_stick");

        //stick
        const stickLinks = document.getElementsByClassName("range");

        if (window.matchMedia( "(pointer: fine)" ).matches) {
            for(let i = 0; i < stickLinks.length; i++) {
                const link = stickLinks[i];
                let animationId = null;

                link.addEventListener("mouseenter", function() {
                    animationId = requestAnimationFrame(animate);
                });

                link.addEventListener("mouseleave", function() {
                    cancelAnimationFrame(animationId);
                    link.children[0].style.transform = null;
                })

                function animate() {
                    const iPos = {
                        x: link.getBoundingClientRect().left + link.clientWidth/2,
                        y: link.getBoundingClientRect().top + link.clientHeight/2
                    };
                    const cPos = {
                        x: 0.5 * (mPos.x - iPos.x),
                        y: 0.5 * (mPos.y - iPos.y)
                    }
                    link.children[0].style.transform = "translate3d(" + cPos.x + "px," + cPos.y + "px, 0)";
                    animationId = requestAnimationFrame(animate);
                }
            }
        }
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.throttledColorChange);
        document.removeEventListener('mousemove', this.throttledColorChange);
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
        },
        bg_add() {
            setTimeout(() => {
                document.getElementById("background").classList.add('bg-color');
                document.querySelectorAll("header a,#lottie-logo").forEach(linkCol => {
                    linkCol.classList.add('hd-color');
                });
            }, 50);
        },
        isHover(links, className) {
            for(var i = 0; i < links.length; i++) {
                var link = links[i];
                link.addEventListener("mouseover", function(){
                    stalker.classList.add(className);
                });
                link.addEventListener("mouseout", function(){
                    stalker.classList.remove(className);
                });
            };
        },
        colorChange(my, sh, l, s) {
            if(window.scrollY > sh) {
                for(let i = 0; i < l.length; i++) {
                    l[i].classList.add('hd-color');
                }
            } else {
                for(let i = 0; i < l.length; i++) {
                    l[i].classList.remove('hd-color');
                }
            }

            if(window.scrollY + my > sh) {
                s.classList.add('color');
            } else {
                s.classList.remove('color');
            }
        }
    }
}