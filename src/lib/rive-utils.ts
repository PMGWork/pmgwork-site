// Riveアニメーションを初期化
export async function initializeRiveLayers(): Promise<void> {
    const rive = await import("@rive-app/canvas");

    for (let i = 0; i < 6; i++) {
        const canvas = document.getElementById(`layer${i + 1}`) as HTMLCanvasElement;
        if (canvas) {
            try {
                const riveInstance = new rive.Rive({
                    src: `/animation/${i + 1}.riv`,
                    canvas,
                    autoplay: true,
                    onLoad: () => {
                        riveInstance.resizeDrawingSurfaceToCanvas();
                    },
                    onLoadError: () => {
                        console.warn(`Failed to load layer ${i + 1}`);
                    }
                });
            } catch (error) {
                console.warn(`Error initializing layer ${i + 1}:`, error);
            }
        }
    }
}

// メインロゴアニメーションを初期化
export async function initializeMainLogo(): Promise<void> {
    const rive = await import("@rive-app/canvas");
    const mainLogoCanvas = document.getElementById('main-logo') as HTMLCanvasElement;

    if (mainLogoCanvas) {
        try {
            const riveInstance = new rive.Rive({
                src: '/animation/logomotion.riv',
                canvas: mainLogoCanvas,
                autoplay: true,
                onLoad: () => {
                    riveInstance.resizeDrawingSurfaceToCanvas();
                },
                onLoadError: () => {
                    console.warn('Failed to load main logo animation');
                }
            });
        } catch (error) {
            console.warn('Error initializing main logo:', error);
        }
    }
}
