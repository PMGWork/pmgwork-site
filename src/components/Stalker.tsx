import { useEffect, useState, useRef } from "react";

export default function Stalker() {
    const [stalkerPosition, setStalkerPosition] = useState({ x: 0, y: 0 });
    const mousePos = useRef({ x: 0, y: 0 });
    const animationRef = useRef<number | null>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY}
        };

        const animate = () => {
            setStalkerPosition(prev => ({
                x: prev.x + (mousePos.current.x - prev.x) * 0.8,
                y: prev.y + (mousePos.current.y - prev.y) * 0.8
            }));
            animationRef.current = requestAnimationFrame(animate);
        }

        window.addEventListener("mousemove", handleMouseMove);
        animate();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return (
        <div>
            <div
                id="stalker"
                className="stalker"
                style={{ transform: `translate3d(${stalkerPosition.x}px, ${stalkerPosition.y}px, 0)` }}
            >
                <div className="stalker-item"></div>
            </div>
        </div>
    );
}