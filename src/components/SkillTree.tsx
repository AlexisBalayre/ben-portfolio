import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import {
    ArrowsPointingInIcon,
    CheckBadgeIcon,
    LockClosedIcon,
    MinusIcon,
    PlusIcon,
    SparklesIcon,
} from '@heroicons/react/24/solid';

type NodeStatus = 'unlocked' | 'progress' | 'locked';

export interface SkillNode {
    id: string;
    icon: string;
    status: string;
}

export interface SkillBranch {
    id: string;
    icon: string;
    nodes: SkillNode[];
}

export interface SkillTreeData {
    branches: SkillBranch[];
    links: { from: string; to: string }[];
}

/* ── Grille ──────────────────────────────────────────────────────────────
 * Chaque domaine part de la racine vers la gauche ou la droite ; ses
 * compétences se répartissent en quinconce sur deux colonnes.            */
const COL = 104;
const ROW = 80;
const HUB_COL = 1.9;
const NODE_COL = 3.4;
const NODE_STAGGER = 1.1;
const NODE_ROW_STEP = 0.6;
const PADDING = 90;

const ROOT_SIZE = 64;
const HUB_SIZE = 56;
const NODE_SIZE = 48;

/** Placement des domaines autour de la racine : côté et hauteur. */
const BRANCH_ANCHORS = [
    { side: 1, row: -3.6 },
    { side: 1, row: 0 },
    { side: 1, row: 3.6 },
    { side: -1, row: -1.9 },
    { side: -1, row: 1.9 },
];

const MIN_SCALE = 0.5;
const MAX_SCALE = 1.8;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const toStatus = (status: string): NodeStatus =>
    status === 'unlocked' || status === 'progress' ? status : 'locked';

const TILE_STYLES: Record<NodeStatus, string> = {
    unlocked: 'border-amber-300/80 bg-amber-300/10 shadow-[0_0_20px_-6px_rgba(252,211,77,0.9)]',
    progress: 'border-sky-400/80 bg-sky-400/10 shadow-[0_0_20px_-6px_rgba(56,189,248,0.9)]',
    locked: 'border-dashed border-white/25 bg-white/[0.02]',
};

const STROKES: Record<NodeStatus, string> = {
    unlocked: 'rgba(252,211,77,0.5)',
    progress: 'rgba(56,189,248,0.5)',
    locked: 'rgba(255,255,255,0.14)',
};

const BADGE_STYLES: Record<NodeStatus, string> = {
    unlocked: 'border-amber-300/40 bg-amber-300/10 text-amber-200',
    progress: 'border-sky-400/40 bg-sky-400/10 text-sky-200',
    locked: 'border-white/20 bg-white/5 text-white/50',
};

const StatusIcon = ({ status, className }: { status: NodeStatus; className: string }) => {
    if (status === 'unlocked') return <CheckBadgeIcon className={className} aria-hidden="true" />;
    if (status === 'progress') return <SparklesIcon className={className} aria-hidden="true" />;
    return <LockClosedIcon className={className} aria-hidden="true" />;
};

const StatusBadge = ({ status }: { status: NodeStatus }) => {
    const { t } = useTranslation('common');
    return (
        <span
            className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold ${BADGE_STYLES[status]}`}
        >
            <StatusIcon status={status} className="h-3 w-3" />
            {t(`skill_tree.status.${status}`)}
        </span>
    );
};

interface Placed {
    id: string;
    kind: 'hub' | 'node';
    branchId: string;
    icon: string;
    status: NodeStatus;
    x: number;
    y: number;
    size: number;
}

/** Liaison orthogonale parent → enfant, terminée par une pointe de flèche. */
const orthogonalPath = (from: Placed | { x: number; y: number; size: number }, to: Placed) => {
    const dir = Math.sign(to.x - from.x) || 1;
    const x1 = from.x + dir * (from.size / 2);
    const x2 = to.x - dir * (to.size / 2 + 8);
    const mid = x1 + (x2 - x1) / 2;
    return {
        d: `M ${x1} ${from.y} H ${mid} V ${to.y} H ${x2}`,
        arrow: `${x2},${to.y - 5} ${x2},${to.y + 5} ${x2 + dir * 7},${to.y}`,
    };
};

const SkillTree = ({ data }: { data: SkillTreeData }) => {
    const { t } = useTranslation('common');
    const [selected, setSelected] = useState<string | null>(null);
    const [hovered, setHovered] = useState<string | null>(null);
    const [scale, setScale] = useState(1);

    const viewportRef = useRef<HTMLDivElement>(null);
    const scaleRef = useRef(1);
    const pendingScroll = useRef<{ left: number; top: number } | null>(null);

    const layout = useMemo(() => {
        const raw: Placed[] = [];

        data.branches.forEach((branch, index) => {
            const anchor = BRANCH_ANCHORS[index % BRANCH_ANCHORS.length];
            raw.push({
                id: branch.id,
                kind: 'hub',
                branchId: branch.id,
                icon: branch.icon,
                status: 'unlocked',
                x: anchor.side * HUB_COL * COL,
                y: anchor.row * ROW,
                size: HUB_SIZE,
            });

            branch.nodes.forEach((node, k) => {
                raw.push({
                    id: node.id,
                    kind: 'node',
                    branchId: branch.id,
                    icon: node.icon,
                    status: toStatus(node.status),
                    x: anchor.side * (NODE_COL + (k % 2) * NODE_STAGGER) * COL,
                    y: (anchor.row + (k - (branch.nodes.length - 1) / 2) * NODE_ROW_STEP) * ROW,
                    size: NODE_SIZE,
                });
            });
        });

        const xs = [0, ...raw.map((p) => p.x)];
        const ys = [0, ...raw.map((p) => p.y)];
        const minX = Math.min(...xs);
        const minY = Math.min(...ys);
        const width = Math.max(...xs) - minX + PADDING * 2;
        const height = Math.max(...ys) - minY + PADDING * 2;

        const placed = raw.map((p) => ({ ...p, x: p.x - minX + PADDING, y: p.y - minY + PADDING }));
        const root = { x: -minX + PADDING, y: -minY + PADDING, size: ROOT_SIZE };
        const byId = new Map(placed.map((p) => [p.id, p]));

        return { width, height, root, placed, byId };
    }, [data]);

    const { unlocked, total } = useMemo(() => {
        const nodes = data.branches.flatMap((branch) => branch.nodes);
        return {
            unlocked: nodes.filter((node) => toStatus(node.status) === 'unlocked').length,
            total: nodes.length,
        };
    }, [data]);

    const related = useMemo(() => {
        const map = new Map<string, string[]>();
        data.links.forEach(({ from, to }) => {
            map.set(from, [...(map.get(from) ?? []), to]);
            map.set(to, [...(map.get(to) ?? []), from]);
        });
        return map;
    }, [data]);

    const scrollTo = useCallback(
        (x: number, y: number, behavior: ScrollBehavior = 'smooth') => {
            const el = viewportRef.current;
            if (!el) return;
            el.scrollTo({
                left: x * scaleRef.current - el.clientWidth / 2,
                top: y * scaleRef.current - el.clientHeight / 2,
                behavior,
            });
        },
        [],
    );

    const centre = useCallback(() => {
        scaleRef.current = 1;
        setScale(1);
        pendingScroll.current = null;
        requestAnimationFrame(() => scrollTo(layout.root.x, layout.root.y));
    }, [layout, scrollTo]);

    // Cadrage initial sur la racine.
    useEffect(() => {
        scrollTo(layout.root.x, layout.root.y, 'auto');
    }, [layout, scrollTo]);

    // Zoom à la molette, centré sur le curseur.
    useEffect(() => {
        const el = viewportRef.current;
        if (!el) return;

        const onWheel = (event: WheelEvent) => {
            event.preventDefault();
            const rect = el.getBoundingClientRect();
            const pointerX = event.clientX - rect.left;
            const pointerY = event.clientY - rect.top;
            const previous = scaleRef.current;
            const next = clamp(previous * (event.deltaY < 0 ? 1.12 : 1 / 1.12), MIN_SCALE, MAX_SCALE);
            if (next === previous) return;

            const ratio = next / previous;
            pendingScroll.current = {
                left: (el.scrollLeft + pointerX) * ratio - pointerX,
                top: (el.scrollTop + pointerY) * ratio - pointerY,
            };
            scaleRef.current = next;
            setScale(next);
        };

        el.addEventListener('wheel', onWheel, { passive: false });
        return () => el.removeEventListener('wheel', onWheel);
    }, []);

    useLayoutEffect(() => {
        const el = viewportRef.current;
        if (!el || !pendingScroll.current) return;
        el.scrollLeft = pendingScroll.current.left;
        el.scrollTop = pendingScroll.current.top;
        pendingScroll.current = null;
    }, [scale]);

    const zoomBy = (factor: number) => {
        const el = viewportRef.current;
        const previous = scaleRef.current;
        const next = clamp(previous * factor, MIN_SCALE, MAX_SCALE);
        if (next === previous || !el) return;
        const ratio = next / previous;
        pendingScroll.current = {
            left: (el.scrollLeft + el.clientWidth / 2) * ratio - el.clientWidth / 2,
            top: (el.scrollTop + el.clientHeight / 2) * ratio - el.clientHeight / 2,
        };
        scaleRef.current = next;
        setScale(next);
    };

    // Déplacement à la souris ; la molette zoome, le tactile fait défiler nativement.
    const drag = useRef<{ x: number; y: number; left: number; top: number } | null>(null);

    const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
        const el = viewportRef.current;
        if (!el || event.pointerType !== 'mouse') return;
        if ((event.target as HTMLElement).closest('button')) return;
        drag.current = { x: event.clientX, y: event.clientY, left: el.scrollLeft, top: el.scrollTop };
        el.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
        const el = viewportRef.current;
        if (!el || !drag.current) return;
        el.scrollLeft = drag.current.left - (event.clientX - drag.current.x);
        el.scrollTop = drag.current.top - (event.clientY - drag.current.y);
    };

    const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
        const el = viewportRef.current;
        if (el?.hasPointerCapture(event.pointerId)) el.releasePointerCapture(event.pointerId);
        drag.current = null;
    };

    const activeId = hovered ?? selected;
    const active = activeId ? layout.byId.get(activeId) : undefined;
    const activeRelated = activeId ? (related.get(activeId) ?? []) : [];
    const nodeName = (id: string) => t(`skill_tree.nodes.${id}.name`);

    const tileProps = (tile: Placed) => ({
        onMouseEnter: () => setHovered(tile.id),
        onMouseLeave: () => setHovered((current) => (current === tile.id ? null : current)),
        onFocus: () => {
            setHovered(tile.id);
            scrollTo(tile.x, tile.y);
        },
        onBlur: () => setHovered((current) => (current === tile.id ? null : current)),
        onClick: () => setSelected((current) => (current === tile.id ? null : tile.id)),
    });

    return (
        <div className="relative">
            {/* Racine */}
            <div className="mb-4 flex items-center gap-4">
                <span
                    className="grid h-14 w-14 shrink-0 place-items-center rounded-xl border-2 border-amber-300/70 bg-amber-300/10 text-2xl shadow-[0_0_30px_-8px_rgba(252,211,77,0.9)]"
                    aria-hidden="true"
                >
                    ⭐
                </span>
                <div className="min-w-0 flex-1">
                    <p className="text-base font-bold text-white">{t('skill_tree.root')}</p>
                    <p className="mt-0.5 text-sm text-white/60">
                        {t('skill_tree.progress', { unlocked, total })}
                    </p>
                    <div className="mt-2 h-2 w-full max-w-sm overflow-hidden rounded-full border border-white/10 bg-white/5">
                        <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-200"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${Math.round((unlocked / total) * 100)}%` }}
                            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                            viewport={{ once: true }}
                        />
                    </div>
                </div>
            </div>

            {/* Fenêtre d'exploration */}
            <div className="relative">
                <div
                    ref={viewportRef}
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={endDrag}
                    onPointerCancel={endDrag}
                    className="relative h-[420px] cursor-grab overflow-auto overscroll-contain rounded-2xl border border-white/10 bg-slate-950/50 active:cursor-grabbing sm:h-[560px]"
                >
                    <div
                        className="relative"
                        style={{ width: layout.width * scale, height: layout.height * scale }}
                    >
                        <div
                            className="absolute left-0 top-0 origin-top-left"
                            style={{ width: layout.width, height: layout.height, transform: `scale(${scale})` }}
                        >
                            {/* Liaisons */}
                            <svg
                                className="pointer-events-none absolute inset-0"
                                width={layout.width}
                                height={layout.height}
                                aria-hidden="true"
                            >
                                {layout.placed
                                    .filter((tile) => tile.kind === 'hub')
                                    .map((hub) => {
                                        const { d, arrow } = orthogonalPath(layout.root, hub);
                                        return (
                                            <g key={`root-${hub.id}`}>
                                                <path d={d} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth={2} />
                                                <polygon points={arrow} fill="rgba(255,255,255,0.35)" />
                                            </g>
                                        );
                                    })}

                                {layout.placed
                                    .filter((tile) => tile.kind === 'node')
                                    .map((node) => {
                                        const hub = layout.byId.get(node.branchId);
                                        if (!hub) return null;
                                        const { d, arrow } = orthogonalPath(hub, node);
                                        return (
                                            <g key={`hub-${node.id}`}>
                                                <path d={d} fill="none" stroke={STROKES[node.status]} strokeWidth={2} />
                                                <polygon points={arrow} fill={STROKES[node.status]} />
                                            </g>
                                        );
                                    })}

                                {data.links.map((link) => {
                                    const a = layout.byId.get(link.from);
                                    const b = layout.byId.get(link.to);
                                    if (!a || !b) return null;
                                    const on = activeId === link.from || activeId === link.to;
                                    const cx = (a.x + b.x) / 2 + (layout.root.x - (a.x + b.x) / 2) * 0.5;
                                    const cy = (a.y + b.y) / 2 + (layout.root.y - (a.y + b.y) / 2) * 0.5;
                                    return (
                                        <path
                                            key={`${link.from}-${link.to}`}
                                            d={`M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`}
                                            fill="none"
                                            stroke={on ? 'rgba(252,211,77,0.85)' : 'rgba(148,163,184,0.3)'}
                                            strokeWidth={on ? 2 : 1.5}
                                            strokeDasharray="4 6"
                                        />
                                    );
                                })}
                            </svg>

                            {/* Racine sur le plan */}
                            <span
                                className="absolute grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-xl border-2 border-amber-300/80 bg-amber-300/15 text-2xl shadow-[0_0_30px_-6px_rgba(252,211,77,0.9)]"
                                style={{
                                    left: layout.root.x,
                                    top: layout.root.y,
                                    width: ROOT_SIZE,
                                    height: ROOT_SIZE,
                                }}
                                aria-hidden="true"
                            >
                                ⭐
                            </span>

                            {/* Cases */}
                            {layout.placed.map((tile) => {
                                const isActive = activeId === tile.id;
                                const isLinked = activeRelated.includes(tile.id);
                                const label =
                                    tile.kind === 'hub'
                                        ? t(`skill_tree.branches.${tile.id}.title`)
                                        : nodeName(tile.id);
                                return (
                                    <button
                                        key={tile.id}
                                        type="button"
                                        {...tileProps(tile)}
                                        aria-pressed={selected === tile.id}
                                        aria-label={
                                            tile.kind === 'hub'
                                                ? label
                                                : t('skill_tree.node_aria', {
                                                      name: label,
                                                      status: t(`skill_tree.status.${tile.status}`),
                                                  })
                                        }
                                        className={`absolute grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-md border-2 transition-transform duration-150 hover:scale-110 focus:outline-none ${
                                            tile.kind === 'hub'
                                                ? 'border-white/45 bg-white/[0.08] text-xl'
                                                : `${TILE_STYLES[tile.status]} text-lg`
                                        } ${isActive ? 'scale-110 ring-2 ring-white/70' : ''} ${
                                            isLinked ? 'ring-2 ring-amber-300/70' : ''
                                        }`}
                                        style={{
                                            left: tile.x,
                                            top: tile.y,
                                            width: tile.size,
                                            height: tile.size,
                                        }}
                                    >
                                        <span
                                            className={
                                                tile.kind === 'node' && tile.status === 'locked'
                                                    ? 'opacity-30 grayscale'
                                                    : ''
                                            }
                                            aria-hidden="true"
                                        >
                                            {tile.icon}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Infobulle : hors du calque zoomé, pour rester lisible à toute échelle */}
                        {active && (
                            <div
                                className="pointer-events-none absolute z-20 w-[15rem] -translate-x-1/2"
                                style={{
                                    left: active.x * scale,
                                    top: active.y * scale,
                                    transform:
                                        active.y < layout.height * 0.4
                                            ? `translate(-50%, ${(active.size / 2) * scale + 10}px)`
                                            : `translate(-50%, calc(-100% - ${(active.size / 2) * scale + 10}px))`,
                                }}
                            >
                                <div className="rounded-lg border border-white/20 bg-slate-950/95 p-3 shadow-xl">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <p className="text-sm font-bold text-white">
                                            {active.kind === 'hub'
                                                ? t(`skill_tree.branches.${active.id}.title`)
                                                : nodeName(active.id)}
                                        </p>
                                        {active.kind === 'node' && <StatusBadge status={active.status} />}
                                    </div>
                                    <p className="mt-1 text-xs leading-relaxed text-white/60">
                                        {active.kind === 'hub'
                                            ? t(`skill_tree.branches.${active.id}.desc`)
                                            : t(`skill_tree.nodes.${active.id}.desc`)}
                                    </p>
                                    {activeRelated.length > 0 && (
                                        <p className="mt-2 text-[11px] text-white/50">
                                            <span className="font-semibold uppercase tracking-wider text-amber-200/70">
                                                {t('skill_tree.related')}
                                            </span>{' '}
                                            {activeRelated.map((id) => nodeName(id)).join(' · ')}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Commandes */}
                <div className="absolute right-3 top-3 flex flex-col gap-1.5">
                    {[
                        { label: t('skill_tree.zoom_in'), icon: PlusIcon, onClick: () => zoomBy(1.2) },
                        { label: t('skill_tree.zoom_out'), icon: MinusIcon, onClick: () => zoomBy(1 / 1.2) },
                        { label: t('skill_tree.recenter'), icon: ArrowsPointingInIcon, onClick: centre },
                    ].map(({ label, icon: Icon, onClick }) => (
                        <button
                            key={label}
                            type="button"
                            onClick={onClick}
                            aria-label={label}
                            title={label}
                            className="grid h-8 w-8 place-items-center rounded-md border border-white/20 bg-slate-900/80 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                        >
                            <Icon className="h-4 w-4" aria-hidden="true" />
                        </button>
                    ))}
                </div>
            </div>

            {/* Légende */}
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                <StatusBadge status="unlocked" />
                <StatusBadge status="progress" />
                <StatusBadge status="locked" />
                <span className="inline-flex items-center gap-1.5 text-[11px] text-white/50">
                    <span
                        aria-hidden="true"
                        className="inline-block h-px w-6 border-t border-dashed border-slate-400"
                    />
                    {t('skill_tree.legend_link')}
                </span>
                <span className="text-[11px] text-white/50">{t('skill_tree.pan_hint')}</span>
            </div>
        </div>
    );
};

export default SkillTree;
