import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import {
    AdjustmentsHorizontalIcon,
    ArrowPathIcon,
    ArrowsPointingInIcon,
    ArrowsRightLeftIcon,
    BoltIcon,
    BriefcaseIcon,
    ChartBarIcon,
    ChevronDoubleRightIcon,
    CircleStackIcon,
    ClipboardDocumentListIcon,
    CloudIcon,
    CodeBracketIcon,
    CommandLineIcon,
    CpuChipIcon,
    CubeIcon,
    CubeTransparentIcon,
    LanguageIcon,
    MinusIcon,
    PlusIcon,
    PresentationChartLineIcon,
    RocketLaunchIcon,
    ServerStackIcon,
    SparklesIcon,
    Squares2X2Icon,
    TableCellsIcon,
    VideoCameraIcon,
} from '@heroicons/react/24/outline';
import { CheckCircleIcon, ClockIcon, LockClosedIcon } from '@heroicons/react/24/solid';

type NodeStatus = 'unlocked' | 'progress' | 'locked';
type IconType = React.ComponentType<{ className?: string }>;

export interface SkillNode {
    id: string;
    icon: string;
    status: string;
    after?: string[];
}

export interface SkillBranch {
    id: string;
    nodes: SkillNode[];
}

const ICONS: Record<string, IconType> = {
    'command-line': CommandLineIcon,
    'table-cells': TableCellsIcon,
    'chart-bar': ChartBarIcon,
    'cpu-chip': CpuChipIcon,
    sparkles: SparklesIcon,
    rocket: RocketLaunchIcon,
    database: CircleStackIcon,
    'arrows-right-left': ArrowsRightLeftIcon,
    squares: Squares2X2Icon,
    bolt: BoltIcon,
    'cube-transparent': CubeTransparentIcon,
    code: CodeBracketIcon,
    server: ServerStackIcon,
    cube: CubeIcon,
    cloud: CloudIcon,
    'arrow-path': ArrowPathIcon,
    adjustments: AdjustmentsHorizontalIcon,
    clipboard: ClipboardDocumentListIcon,
    language: LanguageIcon,
    video: VideoCameraIcon,
    'presentation-chart': PresentationChartLineIcon,
    briefcase: BriefcaseIcon,
};

/* ── Grille ─────────────────────────────────────────────────────────────
 * Une voie par domaine, les compétences s'enchaînant de gauche à droite
 * dans l'ordre de leurs prérequis (`after`).                            */
const CARD_W = 160;
const CARD_H = 54;
const COL_GAP = 48;
const SUB_ROW = 78;
const LANE_GAP = 92;
const ROOT_W = 178;
const ROOT_GAP = 84;
const PADDING = 72;
const TITLE_GAP = 26;

const MIN_SCALE = 0.5;
const MAX_SCALE = 1.8;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const toStatus = (status: string): NodeStatus =>
    status === 'unlocked' || status === 'progress' ? status : 'locked';

const CARD_STYLES: Record<NodeStatus, string> = {
    unlocked: 'border-primary/25 bg-base-100 shadow-sm hover:border-primary/60 hover:shadow-md',
    progress: 'border-accent/60 bg-accent/[0.06] shadow-sm hover:border-accent hover:shadow-md',
    locked: 'border-dashed border-base-300 bg-base-100/60 hover:border-base-content/30',
};

const ICON_STYLES: Record<NodeStatus, string> = {
    unlocked: 'text-primary',
    progress: 'text-accent',
    locked: 'text-base-content/30',
};

const TEXT_STYLES: Record<NodeStatus, string> = {
    unlocked: 'text-base-content',
    progress: 'text-base-content',
    locked: 'text-base-content/40',
};

const EDGE_STROKES: Record<NodeStatus, string> = {
    unlocked: '#94a3b8',
    progress: '#3b82f6',
    locked: '#cbd5e1',
};

const STATUS_ICONS: Record<NodeStatus, IconType> = {
    unlocked: CheckCircleIcon,
    progress: ClockIcon,
    locked: LockClosedIcon,
};

const BADGE_STYLES: Record<NodeStatus, string> = {
    unlocked: 'border-primary/25 bg-primary/5 text-primary',
    progress: 'border-accent/40 bg-accent/10 text-accent',
    locked: 'border-base-300 bg-base-200 text-base-content/50',
};

const StatusBadge = ({ status }: { status: NodeStatus }) => {
    const { t } = useTranslation('common');
    const Icon = STATUS_ICONS[status];
    return (
        <span
            className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold ${BADGE_STYLES[status]}`}
        >
            <Icon className="h-3 w-3" aria-hidden="true" />
            {t(`skill_tree.status.${status}`)}
        </span>
    );
};

interface Placed {
    id: string;
    branchId: string;
    icon: string;
    status: NodeStatus;
    after: string[];
    x: number;
    y: number;
}

const SkillTree = ({ branches }: { branches: SkillBranch[] }) => {
    const { t } = useTranslation('common');
    const [hovered, setHovered] = useState<string | null>(null);
    const [selected, setSelected] = useState<string | null>(null);
    const [scale, setScale] = useState(1);

    const viewportRef = useRef<HTMLDivElement>(null);
    const scaleRef = useRef(1);
    const pendingScroll = useRef<{ left: number; top: number } | null>(null);

    const layout = useMemo(() => {
        const placed: Placed[] = [];
        const lanes: { id: string; titleY: number }[] = [];
        const rootX = PADDING + ROOT_W / 2;
        const firstCol = rootX + ROOT_W / 2 + ROOT_GAP + CARD_W / 2;

        // Les voies s'empilent selon leur hauteur réelle : une voie qui
        // bifurque occupe deux rangées et décale les suivantes d'autant.
        let laneTop = PADDING + TITLE_GAP + 14;

        branches.forEach((branch) => {
            // Profondeur = position dans la chaîne de prérequis.
            const depth = new Map<string, number>();
            branch.nodes.forEach((node) => {
                const previous = node.after ?? [];
                depth.set(node.id, previous.length ? Math.max(...previous.map((id) => depth.get(id) ?? 0)) + 1 : 0);
            });

            const byDepth = new Map<number, SkillNode[]>();
            branch.nodes.forEach((node) => {
                const d = depth.get(node.id) ?? 0;
                byDepth.set(d, [...(byDepth.get(d) ?? []), node]);
            });

            const rows = Math.max(...[...byDepth.values()].map((group) => group.length));
            const laneHeight = (rows - 1) * SUB_ROW + CARD_H;
            const laneCentre = laneTop + laneHeight / 2;

            lanes.push({ id: branch.id, titleY: laneTop - TITLE_GAP });

            byDepth.forEach((group, d) => {
                group.forEach((node, index) => {
                    placed.push({
                        id: node.id,
                        branchId: branch.id,
                        icon: node.icon,
                        status: toStatus(node.status),
                        after: node.after ?? [],
                        x: firstCol + d * (CARD_W + COL_GAP),
                        y: laneCentre + (index - (group.length - 1) / 2) * SUB_ROW,
                    });
                });
            });

            laneTop += laneHeight + LANE_GAP;
        });

        const byId = new Map(placed.map((p) => [p.id, p]));
        const width = Math.max(...placed.map((p) => p.x)) + CARD_W / 2 + PADDING;
        const height = laneTop - LANE_GAP + PADDING;
        const root = { x: rootX, y: height / 2 };

        return { placed, lanes, byId, root, width, height, firstCol };
    }, [branches]);

    const { unlocked, total } = useMemo(() => {
        const nodes = branches.flatMap((branch) => branch.nodes);
        return {
            unlocked: nodes.filter((node) => toStatus(node.status) === 'unlocked').length,
            total: nodes.length,
        };
    }, [branches]);

    const scrollTo = useCallback((x: number, y: number, behavior: ScrollBehavior = 'smooth') => {
        const el = viewportRef.current;
        if (!el) return;
        el.scrollTo({
            left: x * scaleRef.current - el.clientWidth / 2,
            top: y * scaleRef.current - el.clientHeight / 2,
            behavior,
        });
    }, []);

    const centre = useCallback(() => {
        scaleRef.current = 1;
        setScale(1);
        pendingScroll.current = null;
        requestAnimationFrame(() => scrollTo(layout.root.x + layout.width / 4, layout.root.y));
    }, [layout, scrollTo]);

    useEffect(() => {
        scrollTo(layout.root.x + 260, layout.root.y, 'auto');
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

    // Déplacement à la souris ; le tactile fait défiler nativement.
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
    const nodeName = (id: string) => t(`skill_tree.nodes.${id}.name`);

    /** Liaison d'un prérequis vers la compétence suivante, avec pointe de flèche. */
    const edge = (from: { x: number; y: number }, to: Placed, fromHalfWidth: number) => {
        const x1 = from.x + fromHalfWidth;
        const x2 = to.x - CARD_W / 2 - 8;
        const mid = x1 + (x2 - x1) / 2;
        return {
            d: `M ${x1} ${from.y} H ${mid} V ${to.y} H ${x2}`,
            arrow: `${x2},${to.y - 5} ${x2},${to.y + 5} ${x2 + 7},${to.y}`,
        };
    };

    return (
        <div className="relative">
            <p className="mb-4 text-sm font-semibold text-base-content/60">
                {t('skill_tree.progress', { unlocked, total })}
            </p>

            <div className="relative">
                <div
                    ref={viewportRef}
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={endDrag}
                    onPointerCancel={endDrag}
                    className="relative h-[420px] cursor-grab overflow-auto overscroll-contain rounded-2xl border border-base-300 bg-base-100 active:cursor-grabbing sm:h-[560px]"
                >
                    <div className="relative" style={{ width: layout.width * scale, height: layout.height * scale }}>
                        <div
                            className="absolute left-0 top-0 origin-top-left"
                            style={{ width: layout.width, height: layout.height, transform: `scale(${scale})` }}
                        >
                            {/* Quadrillage discret */}
                            <div
                                aria-hidden="true"
                                className="absolute inset-0 opacity-[0.55]"
                                style={{
                                    backgroundImage:
                                        'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
                                    backgroundSize: '28px 28px',
                                }}
                            />

                            {/* Liaisons */}
                            <svg
                                className="pointer-events-none absolute inset-0"
                                width={layout.width}
                                height={layout.height}
                                aria-hidden="true"
                            >
                                {layout.placed.map((node) => {
                                    const sources = node.after.length
                                        ? node.after.map((id) => layout.byId.get(id)).filter(Boolean)
                                        : [layout.root];
                                    return sources.map((source, index) => {
                                        const from = source as { x: number; y: number };
                                        const half = node.after.length ? CARD_W / 2 : ROOT_W / 2;
                                        const { d, arrow } = edge(from, node, half);
                                        return (
                                            <g key={`${node.id}-${index}`}>
                                                <path
                                                    d={d}
                                                    fill="none"
                                                    stroke={EDGE_STROKES[node.status]}
                                                    strokeWidth={2}
                                                    strokeDasharray={node.status === 'locked' ? '5 5' : undefined}
                                                />
                                                <polygon points={arrow} fill={EDGE_STROKES[node.status]} />
                                            </g>
                                        );
                                    });
                                })}
                            </svg>

                            {/* Titres de domaine */}
                            {layout.lanes.map((lane) => (
                                <p
                                    key={lane.id}
                                    className="absolute whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.14em] text-base-content/45"
                                    style={{ left: layout.firstCol - CARD_W / 2, top: lane.titleY }}
                                >
                                    {t(`skill_tree.branches.${lane.id}`)}
                                </p>
                            ))}

                            {/* Racine */}
                            <div
                                className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-xl bg-primary px-4 text-base-100 shadow-lg"
                                style={{ left: layout.root.x, top: layout.root.y, width: ROOT_W, height: CARD_H + 6 }}
                            >
                                <ChevronDoubleRightIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
                                <span className="truncate text-sm font-bold">{t('skill_tree.root')}</span>
                            </div>

                            {/* Compétences */}
                            {layout.placed.map((node) => {
                                const Icon = ICONS[node.icon] ?? CubeIcon;
                                const isActive = activeId === node.id;
                                return (
                                    <button
                                        key={node.id}
                                        type="button"
                                        onMouseEnter={() => setHovered(node.id)}
                                        onMouseLeave={() =>
                                            setHovered((current) => (current === node.id ? null : current))
                                        }
                                        onFocus={() => {
                                            setHovered(node.id);
                                            scrollTo(node.x, node.y);
                                        }}
                                        onBlur={() => setHovered((current) => (current === node.id ? null : current))}
                                        onClick={() =>
                                            setSelected((current) => (current === node.id ? null : node.id))
                                        }
                                        aria-pressed={selected === node.id}
                                        aria-label={t('skill_tree.node_aria', {
                                            name: nodeName(node.id),
                                            status: t(`skill_tree.status.${node.status}`),
                                        })}
                                        className={`absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2.5 rounded-xl border px-3 text-left transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                                            CARD_STYLES[node.status]
                                        } ${isActive ? 'ring-2 ring-primary/40' : ''}`}
                                        style={{ left: node.x, top: node.y, width: CARD_W, height: CARD_H }}
                                    >
                                        <Icon
                                            className={`h-5 w-5 shrink-0 ${ICON_STYLES[node.status]}`}
                                            aria-hidden="true"
                                        />
                                        <span
                                            className={`text-[13px] font-semibold leading-tight ${TEXT_STYLES[node.status]}`}
                                        >
                                            {nodeName(node.id)}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Infobulle, hors du calque zoomé pour rester lisible */}
                        {active && (
                            <div
                                className="pointer-events-none absolute z-20 w-[16rem] -translate-x-1/2"
                                style={{
                                    left: active.x * scale,
                                    top: active.y * scale,
                                    transform:
                                        active.y < layout.height * 0.4
                                            ? `translate(-50%, ${(CARD_H / 2) * scale + 12}px)`
                                            : `translate(-50%, calc(-100% - ${(CARD_H / 2) * scale + 12}px))`,
                                }}
                            >
                                <div className="rounded-xl border border-base-300 bg-base-100 p-3 shadow-xl">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <p className="text-sm font-bold text-base-content">{nodeName(active.id)}</p>
                                        <StatusBadge status={active.status} />
                                    </div>
                                    <p className="mt-1 text-xs leading-relaxed text-base-content/60">
                                        {t(`skill_tree.nodes.${active.id}.desc`)}
                                    </p>
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
                            className="grid h-8 w-8 place-items-center rounded-lg border border-base-300 bg-base-100 text-base-content/50 shadow-sm transition-colors hover:bg-base-200 hover:text-base-content"
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
                <span className="text-[11px] text-base-content/50">{t('skill_tree.pan_hint')}</span>
            </div>
        </div>
    );
};

export default SkillTree;
