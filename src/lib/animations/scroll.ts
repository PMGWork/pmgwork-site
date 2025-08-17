// スクロールアニメーションを設定
export function setupScrollAnimations(
    targetSelector: string,
    options: IntersectionObserverInit = { root: null, rootMargin: '-10% 0px', threshold: 0 }
): void {
    const observer = new IntersectionObserver((entries, ob) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                ob.unobserve(entry.target);
            }
        });
    }, options);

    document.querySelectorAll(targetSelector).forEach((el) => observer.observe(el));
}

// ブロック要素の子要素にアニメーションクラスを追加
export function addAnimationClasses(): void {
    const blocks = document.querySelectorAll('.block, .list');
    blocks.forEach(block => {
        Array.from(block.children).forEach(child => {
            child.classList.add('anm');
        });
    });
}