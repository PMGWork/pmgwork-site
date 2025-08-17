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