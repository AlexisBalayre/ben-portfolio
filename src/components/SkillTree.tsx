import React, { useMemo, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckBadgeIcon, LockClosedIcon, SparklesIcon } from '@heroicons/react/24/solid';

type NodeStatus = 'unlocked' | 'progress' | 'locked';

export interface SkillNode {
    id: string;
    name: string;
    icon: string;
    status: string;
}

export interface SkillBranch {
    id: string;
    icon: string;
    nodes: SkillNode[];
}

const toStatus = (status: string): NodeStatus =>
    status === 'unlocked' || status === 'progress' ? status : 'locked';

const TILE_STYLES: Record<NodeStatus, string> = {
    unlocked: 'border-amber-300/70 bg-amber-300/10 shadow-[0_0_22px_-8px_rgba(252,211,77,0.9)]',
    progress: 'border-sky-400/70 bg-sky-400/10 shadow-[0_0_22px_-8px_rgba(56,189,248,0.9)]',
    locked: 'border-dashed border-white/20 bg-white/[0.02]',
};

/** Trait qui relie une case à la suivante (rendu dans le `gap` de la liste). */
const CONNECTOR_STYLES: Record<NodeStatus, string> = {
    unlocked: "after:content-[''] after:absolute after:left-full after:top-8 after:h-0.5 after:w-3 after:bg-amber-300/40",
    progress: "after:content-[''] after:absolute after:left-full after:top-8 after:h-0.5 after:w-3 after:bg-sky-400/40",
    locked: "after:content-[''] after:absolute after:left-full after:top-8 after:h-0.5 after:w-3 after:bg-white/10",
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

interface SkillTreeBranchProps {
    branch: SkillBranch;
    selectedId: string | null;
    onSelect: (id: string) => void;
}

const SkillTreeBranch = ({ branch, selectedId, onSelect }: SkillTreeBranchProps) => {
    const { t } = useTranslation('common');
    const unlocked = branch.nodes.filter((node) => toStatus(node.status) === 'unlocked').length;
    const activeNode = branch.nodes.find((node) => node.id === selectedId) ?? null;

    return (
        <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
            {/* Branch header */}
            <div className="mb-5 flex items-center gap-3">
                <span
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-white/15 bg-white/5 text-xl"
                    aria-hidden="true"
                >
                    {branch.icon}
                </span>
                <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold text-white sm:text-base">
                        {t(`skill_tree.branches.${branch.id}.title`)}
                    </h3>
                    <p className="text-xs text-white/50">{t(`skill_tree.branches.${branch.id}.desc`)}</p>
                </div>
                <span className="shrink-0 rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-bold text-amber-200">
                    {t('skill_tree.branch_progress', { unlocked, total: branch.nodes.length })}
                </span>
            </div>

            {/* Advancement tiles */}
            <ul className="flex flex-wrap gap-x-3 gap-y-5">
                {branch.nodes.map((node, index) => {
                    const status = toStatus(node.status);
                    const isSelected = node.id === selectedId;

                    return (
                        <li
                            key={node.id}
                            className={`relative ${
                                index < branch.nodes.length - 1 ? CONNECTOR_STYLES[status] : ''
                            }`}
                        >
                            <button
                                type="button"
                                onClick={() => onSelect(node.id)}
                                aria-pressed={isSelected}
                                aria-label={t('skill_tree.node_aria', {
                                    name: node.name,
                                    status: t(`skill_tree.status.${status}`),
                                })}
                                className="group flex w-[72px] flex-col items-center gap-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:w-[84px]"
                            >
                                <span
                                    className={`grid h-16 w-16 place-items-center rounded-md border-2 text-2xl transition-all duration-200 group-hover:-translate-y-1 ${TILE_STYLES[status]} ${
                                        isSelected ? 'ring-2 ring-white/50 ring-offset-2 ring-offset-secondary' : ''
                                    }`}
                                >
                                    <span
                                        className={status === 'locked' ? 'opacity-30 grayscale' : ''}
                                        aria-hidden="true"
                                    >
                                        {node.icon}
                                    </span>
                                </span>
                                <span
                                    className={`text-center text-[11px] font-medium leading-tight ${
                                        status === 'locked' ? 'text-white/40' : 'text-white/80'
                                    }`}
                                >
                                    {node.name}
                                </span>
                            </button>
                        </li>
                    );
                })}
            </ul>

            {/* Advancement detail */}
            <AnimatePresence initial={false}>
                {activeNode && (
                    <motion.div
                        key={activeNode.id}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="mt-5 flex items-start gap-3 rounded-xl border border-white/15 bg-slate-950/60 p-4"
                    >
                        <span
                            className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-white/15 bg-white/5 text-xl"
                            aria-hidden="true"
                        >
                            {activeNode.icon}
                        </span>
                        <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                                <p className="text-sm font-bold text-white">{activeNode.name}</p>
                                <StatusBadge status={toStatus(activeNode.status)} />
                            </div>
                            <p className="mt-1 text-xs leading-relaxed text-white/60">
                                {t(`skill_tree.nodes.${activeNode.id}`)}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const SkillTree = ({ branches }: { branches: SkillBranch[] }) => {
    const { t } = useTranslation('common');
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const { unlocked, total } = useMemo(() => {
        const nodes = branches.flatMap((branch) => branch.nodes);
        return {
            unlocked: nodes.filter((node) => toStatus(node.status) === 'unlocked').length,
            total: nodes.length,
        };
    }, [branches]);

    const handleSelect = (id: string) => setSelectedId((current) => (current === id ? null : id));

    return (
        <div className="relative">
            {/* Global progress */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-white">
                        {t('skill_tree.progress', { unlocked, total })}
                    </p>
                    <p className="text-xs text-white/50">{t('skill_tree.hint')}</p>
                </div>
                <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full border border-white/10 bg-white/5">
                    <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-200"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${Math.round((unlocked / total) * 100)}%` }}
                        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                        viewport={{ once: true }}
                    />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                    <StatusBadge status="unlocked" />
                    <StatusBadge status="progress" />
                    <StatusBadge status="locked" />
                </div>
            </div>

            {/* Trunk + branches */}
            <div className="mt-6 space-y-6 border-l-2 border-white/10 pl-4 sm:pl-8">
                {branches.map((branch, index) => (
                    <motion.div
                        key={branch.id}
                        className="relative"
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: Math.min(index, 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
                        viewport={{ once: true, margin: '-60px' }}
                    >
                        <span
                            aria-hidden="true"
                            className="absolute top-8 -left-4 h-0.5 w-4 bg-white/10 sm:-left-8 sm:w-8"
                        />
                        <SkillTreeBranch branch={branch} selectedId={selectedId} onSelect={handleSelect} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default SkillTree;
