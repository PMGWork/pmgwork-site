import { useEffect, useRef, useState } from "react";
import RivePlayer from "./RivePlayer";

const navItems = [
    { href: '/works/', aria: 'works', label: 'Works' },
    { href: '/about/', aria: 'about', label: 'About' },
];

export default function Header() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const selectors = '#hero-background, #work-wrapper, #parallax-layers, #next-link';
        const state = new Map<Element, boolean>();

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => state.set(entry.target, entry.isIntersecting));
            const anyVisible = Array.from(state.values()).some(Boolean);
            setIsDark(!anyVisible);
        }, { threshold: 0.1, rootMargin: '-50px 0px' });

        const observe = () => {
            observer.disconnect();
            state.clear();

            const elements = document.querySelectorAll(selectors);
            if (elements.length === 0) setIsDark(true);

            elements.forEach(el => observer.observe(el));
        };

        observe();

        const onPageView = () => observe();
        window.addEventListener('swup:page:view', onPageView);

        return () => {
            window.removeEventListener('swup:page:view', onPageView);
            observer.disconnect();
        };
    }, []);

    return (
        <header className={isDark ? 'is-dark' : undefined}>
            <a className="range" href="/" aria-label="home">
                <RivePlayer
                    src="/animation/logomotion.riv"
                    id="header-logo"
                />
            </a>
            <nav aria-label="Primary">
                <ul>
                    {navItems.map(({ href, aria, label }) => (
                        <li key={href}>
                            <a className="range" href={href} aria-label={aria}>
                                <span>{label}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
