import { gsap, SplitText, easings } from '../utils/gsap';

export function animateWork() {
    // トップコンテンツ
    const wrapper = document.getElementById("work-wrapper");
    if (!wrapper) return;

    const title = wrapper.querySelector(".title");
    const subtitle = wrapper.querySelector(".subtitle");
    const imgMask = wrapper.querySelector(".work-image");
    const img = imgMask?.querySelector("img");

    if (!title || !subtitle || !imgMask || !img) return;

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
        imgMask,
        {
            y: 300,
            autoAlpha: 0,
            duration: 1.0,
            ease: easings.easeOut
        }
    )
    .from(
        img,
        {
            scale: 1.2,
            autoAlpha: 0,
            duration: 1.2,
            ease: easings.easeOut
        },
        "<"
    )
    .from(
        splitTitle.chars,
        {
            y: 70,
            autoAlpha: 0,
            duration: 0.8,
            stagger: 0.03,
            ease: easings.easeOut,
        },
        "-=0.6"
    )
    .from(
        splitSubtitle.chars,
        {
            y: 30,
            autoAlpha: 0,
            duration: 0.8,
            stagger: 0.01,
            ease: easings.easeOut,
        },
        "-=0.6"
    );

    // 情報ブロック
    const workInfo = document.querySelector("#work-wrapper .work-info");
    if (workInfo) {
        gsap.from(workInfo, {
            scrollTrigger: {
                trigger: workInfo,
                start: "top 85%",
                toggleActions: "play none none none",
                once: true,
            },
            y: 150,
            autoAlpha: 0,
            duration: 1.0,
            ease: easings.easeOut,
        });
    }

    // 画像ブロック群
    const blockImages = document.querySelectorAll("#work-wrapper1 .work-block .block-image");
    blockImages.forEach((mask) => {
        const img = mask.querySelector("img");
        if (!img) return;

        gsap.timeline({
            scrollTrigger: {
                trigger: mask,
                start: "top 85%",
                toggleActions: "play none none none",
                once: true,
            }
        })
        .from(mask, { y: 150, autoAlpha: 0, duration: 1.0, ease: easings.easeOut })
        .from(img, { scale: 1.2, autoAlpha: 0, duration: 1.2, ease: easings.easeOut }, "<");
    });
}
