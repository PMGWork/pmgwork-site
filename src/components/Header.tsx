import { useEffect, useState } from "react";
import RivePlayer from "./RivePlayer";

const navItems = [
    { href: '/works/', aria: 'works', label: 'Works' },
    { href: '/about/', aria: 'about', label: 'About' },
];

export default function Header() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const targets = ['#bg-item', '#work-wrapper', '#scene'];

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (targets.some(selector => entry.target.matches(selector))) {
                    setIsDark(!entry.isIntersecting);
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
        window.addEventListener('swup:page:view', observe);

        return () => {
            window.removeEventListener('swup:page:view', observe);
            observer.disconnect();
        };
    }, []);

    return (
        <header className="header">
            <a className="range" href="/" aria-label="home">
                <RivePlayer
                    src="/animation/logomotion.riv"
                    id="header-logo"
                    style={isDark ? { filter: "brightness(0.1)" } : undefined}
                />
            </a>
            {(() => {
                const linkStyle = isDark ? { color: '#202020' } : undefined;
                return (
                    <nav aria-label="Primary">
                        <ul>
                            {navItems.map(({ href, aria, label }) => (
                                <li key={href} className="range">
                                    <a href={href} aria-label={aria} style={linkStyle}>{label}</a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                );
            })()}
        </header>
    );
}
