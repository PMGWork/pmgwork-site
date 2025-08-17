// パララックス効果を設定
export function setupParallax(): ((e: Event) => void) | null {
    if (!window.matchMedia("(pointer: fine)").matches) {
        return null;
    }

    const parallaxHandler = (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const layers = document.getElementsByClassName("layer");

        // マウス位置とウィンドウ中央からのオフセットを計算
        const centerOffset = {
            x: mouseEvent.clientX - document.body.clientWidth / 2,
            y: mouseEvent.clientY - document.body.clientHeight / 2
        };

        // 各レイヤーにパララックス効果を適用
        Array.from(layers).forEach((layer: Element) => {
            const htmlLayer = layer as HTMLElement;
            const depth = parseFloat(htmlLayer.getAttribute("data-depth") || "0");
            const offset = 0.3 * depth;

            htmlLayer.style.transition = "all 0.5s cubic-bezier(.2,.6,.5,1)";
            htmlLayer.style.transform =
                `translate3d(${offset * -centerOffset.x}px, ${offset * -centerOffset.y}px, 0)`;
        });
    };

    document.addEventListener("mousemove", parallaxHandler);
    return parallaxHandler;
}
