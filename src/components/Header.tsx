import { useEffect, useRef, useState } from "react";
import RivePlayer from "./RivePlayer";

const navItems = [
    { href: '/works/', aria: 'works', label: 'Works' },
    { href: '/about/', aria: 'about', label: 'About' },
];

export default function Header() {
    const [isDark, setIsDark] = useState(false);
    const transitionLock = useRef(false);

    useEffect(() => {
        const targets = ['#bg-item', '#work-wrapper', '#scene', '#next-link'];

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (targets.some(selector => entry.target.matches(selector))) {
                    if (!transitionLock.current) {
                        setIsDark(!entry.isIntersecting);
                    }
                }
            });
        }, { threshold: 0.1, rootMargin: '-50px 0px' });

        const observe = () => {
            observer.disconnect();
            targets.forEach(selector => {
                const el = document.querySelector(selector);
                if (el) observer.observe(el);
            });
        };

        observe();

        // 次ページ遷移開始時にヘッダー色を先行反映
        const onVisitStart = (e: Event) => {
            transitionLock.current = true;
            const detail = (e as CustomEvent).detail as { isWork?: boolean } | undefined;
            const nextIsWork = typeof detail?.isWork === 'boolean' ? detail.isWork : document.body.classList.contains('is-work');
            setIsDark(nextIsWork);
        };

        // 差し替え後にオブザーバーを再適用して通常制御に戻す
        const onPageView = () => {
            transitionLock.current = false;
            observe();
        };

        window.addEventListener('swup:visit:start', onVisitStart as EventListener);
        window.addEventListener('swup:page:view', onPageView);

        return () => {
            window.removeEventListener('swup:visit:start', onVisitStart as EventListener);
            window.removeEventListener('swup:page:view', onPageView);
            observer.disconnect();
        };
    }, []);

    return (
        <header className={`header${isDark ? ' is-dark' : ''}`}>
            <a className="range" href="/" aria-label="home">
                <RivePlayer
                    src="/animation/logomotion.riv"
                    id="header-logo"
                />
            </a>
            <nav aria-label="Primary">
                <ul>
                    {navItems.map(({ href, aria, label }) => (
                        <li key={href} className="range">
                            <a href={href} aria-label={aria}>{label}</a>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
