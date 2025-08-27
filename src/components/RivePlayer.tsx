import { useRive } from "@rive-app/react-canvas";

type RivePlayerProps = {
    src: string;
    id: string;
    className?: string;
    style?: React.CSSProperties;
  };

export default function RivePlayer({
    src,
    id,
    className,
    style,
}: RivePlayerProps) {
    const { RiveComponent } = useRive({
        src: src,
        stateMachines: "State Machine 1",
        autoplay: true,
    });

    return (
        <div id={id} className={className} style={style}>
            <RiveComponent />
        </div>
    );
}