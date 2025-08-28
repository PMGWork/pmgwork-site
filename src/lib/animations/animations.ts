import { gsap, SplitText, easings } from './gsap';

// タイトルアニメーション
export function animateTitle() {
    const titleWrapper = document.querySelectorAll(".title-wrapper, .main-title-wrapper");

    titleWrapper.forEach((wrapper) => {
        const title = wrapper.querySelector(".title")
        const subtitle = wrapper.querySelector(".subtitle")
        if (!title || !subtitle) return;

        const splitTitle = new SplitText(title, { type: "chars", tag: "span" });
        const splitSubtitle = new SplitText(subtitle, { type: "chars", tag: "span" });

        const tl = gsap.timeline();

        tl.from(
            splitTitle.chars,
            {
                duration: 0.8,
                y: 100,
                ease: easings.easeOut,
                autoAlpha: 0,
                stagger: 0.06,
            },
            "=0.2"
        );

        if (splitSubtitle) {
            tl.from(
                splitSubtitle.chars,
                {
                    duration: 0.8,
                    y: 50,
                    ease: easings.easeOut,
                    autoAlpha: 0,
                    stagger: 0.01,
                },
                "-=0.6"
            );
        }
    });
}

// 見出しアニメーション
export function animateHeading() {
    const headings = document.querySelectorAll(".heading");

    headings.forEach((heading) => {
        const splitHeading = SplitText.create(heading, { type: "chars", tag: "span" });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: heading,
                start: "top 85%",
                toggleActions: "play none none none",
                once: true,
            }
        });

        tl.from(
            splitHeading.chars,
            {
                duration: 0.8,
                y: 60,
                ease: easings.easeOut,
                autoAlpha: 0,
                stagger: 0.03,
            }
        );
    });
}

// Worksアニメーション
export function animateWorks() {
    const works = document.querySelectorAll(".works-article");

    works.forEach((work) => {
        const title = work.querySelector(".works-title");
        const subtitle = work.querySelector(".works-subtitle");
        if (!title || !subtitle) return;

        const splitTitle = SplitText.create(title, { type: "chars", tag: "span" });
        const splitSubtitle = SplitText.create(subtitle, { type: "chars", tag: "span" });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: work,
                start: "top 85%",
                toggleActions: "play none none none",
                once: true,
            }
        });

        tl.from(
            title,
            { backgroundSize: "0% 30%", duration: 1.2, ease: easings.easeInOut },
        )
        .from(
            splitTitle.chars,
            {
                duration: 0.8,
                y: 50,
                ease: easings.easeOut,
                autoAlpha: 0,
                stagger: 0.03,
            },
            "-=0.9"
        )
        .from(
            splitSubtitle.chars,
            {
                duration: 0.8,
                y: 30,
                ease: easings.easeOut,
                autoAlpha: 0,
                stagger: 0.01,
            },
            "-=0.6"
        );
    });
}

// Aboutアニメーション
export function animateAbout() {
    const aboutTitle = document.querySelectorAll(".about-title-wrapper");

    aboutTitle.forEach((wrapper) => {
        const title = wrapper.querySelector(".about-title");
        const subtitle = wrapper.querySelector(".about-subtitle");
        if (!title || !subtitle) return;

        const splitTitle = SplitText.create(title, { type: "chars", tag: "span" });
        const splitSubtitle = SplitText.create(subtitle, { type: "chars", tag: "span" });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: wrapper,
                start: "top 85%",
                toggleActions: "play none none none",
                once: true,
            }
        });

        tl.from(
            title,
            { backgroundSize: "0% 30%", duration: 1.2, ease: easings.easeInOut },
        )
        .from(
            splitTitle.chars,
            {
                duration: 0.8,
                y: 80,
                ease: easings.easeOut,
                autoAlpha: 0,
                stagger: 0.03,
            },
            "-=0.9"
        )
        .from(
            splitSubtitle.chars,
            {
                duration: 0.8,
                y: 50,
                ease: easings.easeOut,
                autoAlpha: 0,
                stagger: 0.01,
            },
            "-=0.6"
        );
    });
}

// Workアニメーション
export function animateWork() {
    const pageTitles = document.querySelectorAll(".work-title-wrapper");

    pageTitles.forEach((wrapper) => {
        const title = wrapper.querySelector(".title");
        const subtitle = wrapper.querySelector(".subtitle");
        if (!title || !subtitle) return;

        const splitTitle = SplitText.create(title, { type: "chars", tag: "span" });
        const splitSubtitle = SplitText.create(subtitle, { type: "chars", tag: "span" });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: wrapper,
                start: "top 85%",
                toggleActions: "play none none none",
                once: true,
            }
        });

        tl.from(
            splitTitle.chars,
            {
                duration: 0.8,
                y: 70,
                ease: easings.easeOut,
                autoAlpha: 0,
                stagger: 0.03,
            },
            "=0.6"
        )
        .from(
            splitSubtitle.chars,
            {
                duration: 0.8,
                y: 30,
                ease: easings.easeOut,
                autoAlpha: 0,
                stagger: 0.01,
            },
            "-=0.6"
        );
    });
}