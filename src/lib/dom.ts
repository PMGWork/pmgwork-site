// テキストを分割して表示
export function splitTextToSpans(rootSelector: string = '.ts'): void {
    const containers = document.querySelectorAll(rootSelector);
    containers.forEach((container) => {
        const text = container.textContent?.trim() || '';
        if (text) {
            container.innerHTML = text.split('').map((c) => `<span>${c}</span>`).join('');
        }
    });
}

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

// ヘッダーロゴを表示
export function showHeaderLogo(): void {
    const headerLogo = document.getElementById('header-logo');
    if (headerLogo) {
        headerLogo.style.opacity = '1';
        headerLogo.classList.add('hd-color');
    }
}

// ヘッダーロゴを非表示
export function hideHeaderLogo(): void {
    const headerLogo = document.getElementById('header-logo');
    if (headerLogo) {
        headerLogo.style.opacity = '0';
        headerLogo.classList.remove('hd-color');
    }
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