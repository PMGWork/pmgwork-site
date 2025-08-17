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