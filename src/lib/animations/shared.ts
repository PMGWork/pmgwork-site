import { gsap, SplitText, easings } from '../utils/gsap';

export function animate() {
    // タイトルアニメーション
    const titleWrapper = document.querySelector(".title-wrapper, .main-title-wrapper");
    const title = titleWrapper?.querySelector(".title")
    const subtitle = titleWrapper?.querySelector(".subtitle")

    if (title && subtitle) {
        const splitTitle = SplitText.create(title, { type: "chars", tag: "span" });
        const splitSubtitle = SplitText.create(subtitle, { type: "chars", tag: "span" });

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

    // リスト（.list）とブロック（.block）の子要素をスクロールで出現
    const lists = document.querySelectorAll(".list");
    lists.forEach((list) => {
        const children = Array.from(list.children) as HTMLElement[];
        if (children.length === 0) return;

        gsap.from(children, {
            scrollTrigger: {
                trigger: list,
                start: "top 85%",
                toggleActions: "play none none none",
                once: true,
            },
            duration: 0.8,
            y: 50,
            autoAlpha: 0,
            ease: easings.easeOut,
            stagger: 0.08,
        });
    });

    const blocks = document.querySelectorAll(".block");
    blocks.forEach((block) => {
        const children = Array.from(block.children) as HTMLElement[];
        if (children.length === 0) return;

        gsap.from(children, {
            scrollTrigger: {
                trigger: block,
                start: "top 85%",
                toggleActions: "play none none none",
                once: true,
            },
            duration: 0.8,
            y: 50,
            autoAlpha: 0,
            ease: easings.easeOut,
            stagger: 0.08,
        });
    });

    // 単発のスクロール要素（.scroll）
    const scrollElems = document.querySelectorAll(".scroll");
    scrollElems.forEach((el) => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none",
                once: true,
            },
            duration: 0.8,
            y: 50,
            autoAlpha: 0,
            ease: easings.easeOut,
        });
    });
}
