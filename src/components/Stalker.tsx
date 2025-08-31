import { useEffect, useRef, useState } from "react";

// 2D 平面上の座標を表すための単純な型
type Point = { x: number; y: number };

export default function Stalker() {
    const stalkerRef = useRef<HTMLDivElement | null>(null);
    const rafRef = useRef<number | null>(null);
    const mousePos = useRef<Point>({
        x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
        y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
    });
    const stalkerPos = useRef<Point>({
        x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
        y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
    });
    const [visible, setVisible] = useState(true);
    const [mouseMoved, setMouseMoved] = useState(false);

    useEffect(() => {
        // ポインタが「細かい操作に対応（マウス等）」か判定し、非対応なら機能を停止
        const hasFinePointer = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;
        setVisible(hasFinePointer);
        if (!hasFinePointer) return;

        // CSS 変数をドキュメントルートへ設定
        const rootStyle = document.documentElement.style;
        const setVar = (name: string, value: string) => rootStyle.setProperty(name, value);

        // CSS 変数の初期化
        setVar('--mx', `${mousePos.current.x}px`);
        setVar('--my', `${mousePos.current.y}px`);
        setVar('--sx', `${stalkerPos.current.x}px`);
        setVar('--sy', `${stalkerPos.current.y}px`);

        // マウス位置を更新
        const onPointerMove = (e: PointerEvent) => {
            if (!mouseMoved) setMouseMoved(true);
            mousePos.current.x = e.clientX;
            mousePos.current.y = e.clientY;
            setVar('--mx', `${e.clientX}px`);
            setVar('--my', `${e.clientY}px`);
        };

        // requestAnimationFrame によるストーカー位置の追従
        const tick = () => {
            stalkerPos.current.x += (mousePos.current.x - stalkerPos.current.x) * 0.8;
            stalkerPos.current.y += (mousePos.current.y - stalkerPos.current.y) * 0.8;
            setVar('--sx', `${stalkerPos.current.x}px`);
            setVar('--sy', `${stalkerPos.current.y}px`);
            rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);

        // ホバー状態のクラス切替と吸い付き位置の更新
        const stalkerElement = () => stalkerRef.current;
        let activeStickElement: HTMLElement | null = null;

        // 吸い付き対象要素の中心座標を計算・設定
        const updateCenter = (el: HTMLElement | null) => {
            if (!el) return;
            const r = el.getBoundingClientRect();
            const cx = r.left + r.width / 2;
            const cy = r.top + r.height / 2;
            el.style.setProperty('--cx', `${cx}px`);
            el.style.setProperty('--cy', `${cy}px`);
        };

        // ホバー時のクラス付与・吸着処理
        const onPointerOver = (e: PointerEvent) => {
            // ホバー対象要素を取得
            const target = e.target as HTMLElement | null;
            if (!target) return;

            // ホバー対象要素のクラスを取得
            const view = target.closest('.view') as HTMLElement | null;
            const range = target.closest('.range') as HTMLElement | null;
            const linkish = target.closest('a,button') as HTMLElement | null;

            // ストーカー要素を取得
            const stalker = stalkerElement();
            if (!stalker) return;

            // ストーカー要素にクラスを付与
            stalker.classList.toggle('hover_view', !!view);
            stalker.classList.toggle('hover_stick', !!(range || linkish));

            // 吸いつき中心を更新
            if (range && range !== activeStickElement) {
                activeStickElement = range;
                updateCenter(activeStickElement);
            }
        };

        // ホバー解除時のクラス除去・吸着解除
        const onPointerOut = (e: PointerEvent) => {
            // ホバー解除対象要素を取得
            const target = e.target as HTMLElement | null;
            const related = (e.relatedTarget ? (e.relatedTarget as Node) : null);

            // ストーカー要素を取得
            const stalker = stalkerElement();
            if (!stalker) return;

            // .view 要素から離れたら hover_view を解除
            if (target) {
                const leftView = target.closest('.view') as HTMLElement | null;
                if (leftView && (!related || !leftView.contains(related))) {
                    stalker.classList.remove('hover_view');
                }
            }

            // .range 要素から離れたら hover_stick を解除
            if (activeStickElement && target && activeStickElement.contains(target) && (!related || !activeStickElement.contains(related))) {
                stalker.classList.remove('hover_stick');
                activeStickElement = null;
            }
        };

        // レイアウト変化時に吸いつき中心を再計算
        const onScrollOrResize = () => {
            if (activeStickElement) updateCenter(activeStickElement);
        };

        // IntersectionObserver で色を切替
        const colorObserver = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    stalkerElement()?.classList.remove('color');
                } else {
                    stalkerElement()?.classList.add('color');
                }
            }
        }, { threshold: 0.1, rootMargin: '-50px 0px' });

        // 監視対象を最新化
        const observeColorTargets = () => {
            colorObserver.disconnect();
            ['#hero-background', '#work-wrapper', '#parallax-layers'].forEach(sel => {
                const el = document.querySelector(sel);
                if (el) colorObserver.observe(el);
            });
        };
        observeColorTargets();
        window.addEventListener('swup:page:view', observeColorTargets);

        // リスナー登録
        document.addEventListener('pointermove', onPointerMove, { passive: true });
        document.addEventListener('pointerover', onPointerOver);
        document.addEventListener('pointerout', onPointerOut);
        window.addEventListener('scroll', onScrollOrResize, { passive: true });
        window.addEventListener('resize', onScrollOrResize);

        return () => {
            // リスナー解除と後始末
            document.removeEventListener('pointermove', onPointerMove);
            document.removeEventListener('pointerover', onPointerOver);
            document.removeEventListener('pointerout', onPointerOut);
            window.removeEventListener('scroll', onScrollOrResize);
            window.removeEventListener('resize', onScrollOrResize);
            window.removeEventListener('swup:page:view', observeColorTargets);
            colorObserver.disconnect();
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <div>
            <div
                id="stalker"
                ref={stalkerRef}
                className="stalker"
                style={{
                    display: visible ? undefined : 'none',
                    opacity: mouseMoved ? 1 : 0
                }}
            >
                <div className="stalker-item"></div>
            </div>
        </div>
    );
}
