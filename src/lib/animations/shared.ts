import { gsap, SplitText, easings } from '../utils/gsap';

export function animate() {
    // タイトルアニメーション
    const titleWrapper = document.querySelector(".title-wrapper, .main-title-wrapper");
    const title = titleWrapper?.querySelector(".title")
    const subtitle = titleWrapper?.querySelector(".subtitle")

    if (title && subtitle) {
        const splitTitle = new SplitText(title, { type: "chars", tag: "span" });
        const splitSubtitle = new SplitText(subtitle, { type: "chars", tag: "span" });

        gsap.timeline()
        .from(
            splitTitle.chars,
            {
                duration: 0.8,
                y: 100,
                ease: easings.easeOut,
                autoAlpha: 0,
                stagger: 0.06,
            },
            "=0.2"
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
    }

    // 見出しアニメーション
    const headings = document.querySelectorAll(".heading");

    if (headings.length != 0) {
        headings.forEach((heading) => {
            const splitHeading = SplitText.create(heading, { type: "chars", tag: "span" });

            gsap.timeline({
                scrollTrigger: {
                    trigger: heading,
                    start: "top 85%",
                    toggleActions: "play none none none",
                    once: true,
                }
            })
            .from(
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
}