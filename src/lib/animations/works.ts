import { gsap, SplitText, easings } from '../utils/gsap';

export function animateWorks() {
    // タイトルアニメーション
    const works = document.querySelectorAll(".work-card");

    works.forEach((work) => {
        const imgMask = work.querySelector(".card-image");
        const img = imgMask?.querySelector("img");
        const title = work.querySelector(".card-title");
        const subtitle = work.querySelector(".card-subtitle");
        if (!imgMask || !img || !title || !subtitle) return;

        const splitTitle = SplitText.create(title, { type: "chars", tag: "span" });
        const splitSubtitle = SplitText.create(subtitle, { type: "chars", tag: "span" });

        gsap.timeline({
            scrollTrigger: {
                trigger: work,
                start: "top 85%",
                toggleActions: "play none none none",
                once: true,
            }
        })
        .from(
            imgMask,
            { y: 150, autoAlpha: 0, duration: 1.0, ease: easings.easeOut }
        )
        .from(
            img,
            { scale: 1.2, autoAlpha: 0, duration: 1.2, ease: easings.easeOut },
            "<"
        )
        .from(
            title,
            { backgroundSize: "0% 30%", duration: 1.2, ease: easings.easeInOut },
            "<"
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