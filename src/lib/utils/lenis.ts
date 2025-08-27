import Lenis from 'lenis';

export default function initLenis() {
    if (typeof window === 'undefined') return null;

    const lenis = new Lenis({
        autoRaf: true,
        duration: 0.8,
        smoothWheel: true,
    });
}