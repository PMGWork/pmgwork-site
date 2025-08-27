import { useEffect, useState } from "react";
import RivePlayer from "./RivePlayer";

const layers = [
    { src: "/animation/1.riv", id: "layer1", dataDepth: 0.2 },
    { src: "/animation/2.riv", id: "layer2", dataDepth: 0.25 },
    { src: "/animation/3.riv", id: "layer3", dataDepth: 0.3 },
    { src: "/animation/4.riv", id: "layer4", dataDepth: 0.35 },
    { src: "/animation/5.riv", id: "layer5", dataDepth: 0.4 },
    { src: "/animation/6.riv", id: "layer6", dataDepth: 0.45 }
];

export default function ParallaxLayers() {
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (!window.matchMedia("(pointer: fine)").matches) return;

        const handleMouseMove = (e: MouseEvent) => {
            setOffset({
                x: e.clientX - window.innerWidth / 2,
                y: e.clientY - window.innerHeight / 2
            });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div>
            {layers.map((layer) => {
                const depth = 0.3 * layer.dataDepth;
                return (
                    <RivePlayer
                        key={layer.id}
                        src={layer.src}
                        id={layer.id}
                        className="layer"
                        style={{
                            transform: `translate3d(${offset.x * depth}px, ${offset.y * depth}px, 0)`,
                            transition: "all 0.5s cubic-bezier(.2,.6,.5,1)",
                            height: "1000px",
                            width: "1200px",
                        }}
                    />
                );
            })}
        </div>
    )
}


