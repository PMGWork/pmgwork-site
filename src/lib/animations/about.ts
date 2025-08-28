import { gsap, SplitText, easings } from '../utils/gsap';

export function animateAbout() {
    // タイトルアニメーション
    const aboutTitle = document.querySelectorAll(".about-title-wrapper");

    aboutTitle.forEach((wrapper) => {
        const title = wrapper.querySelector(".about-title");
        const subtitle = wrapper.querySelector(".about-subtitle");
        if (!title || !subtitle) return;

        const splitTitle = SplitText.create(title, { type: "chars", tag: "span" });
        const splitSubtitle = SplitText.create(subtitle, { type: "chars", tag: "span" });

        gsap.timeline({
            scrollTrigger: {
                trigger: wrapper,
                start: "top 85%",
                toggleActions: "play none none none",
                once: true,
            }
        })
        .from(
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