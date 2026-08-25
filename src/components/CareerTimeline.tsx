import React, { Fragment, useMemo, useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

type Track = 'formation' | 'experiences';

interface ExchangeEntry {
    id: string;
    logo: string;
    period: string;
    flag?: string;
}

export interface CareerEntry {
    id: string;
    logo: string;
    period: string;
    start?: string;
    /** Échanges menés *pendant* ce cursus — affichés en sous-branche. */
    exchanges?: ExchangeEntry[];
    /** Cursus dans lequel ce stage s'inscrit. */
    integratedIn?: string;
}

interface Item {
    entry: CareerEntry;
    track: Track;
}

const renderHtmlText = (text: string) => {
    const parts = text.split(/<br\s*\/?>/gi);
    return parts.map((part, i) => (
        <Fragment key={i}>
            {part}
            {i < parts.length - 1 && <br />}
        </Fragment>
    ));
};

const TRACK_CHIP: Record<Track, string> = {
    formation: 'border-primary/25 bg-primary/10 text-primary',
    experiences: 'border-emerald-600/25 bg-emerald-50 text-emerald-700',
};

const DOT_RING: Record<Track, string> = {
    formation: 'ring-primary/25',
    experiences: 'ring-emerald-600/25',
};

const CareerItem = ({ entry, track, index }: Item & { index: number }) => {
    const { t } = useTranslation('common');
    const [expanded, setExpanded] = useState(false);
    const exchanges = entry.exchanges ?? [];
    const isFormation = track === 'formation';

    return (
        <motion.li
            initial={{ opacity: 0, x: isFormation ? -28 : 28, scale: 0.98 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: Math.min(index, 5) * 0.06, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: '-60px' }}
            className="relative mb-10 pl-16 md:grid md:grid-cols-2 md:gap-x-14 md:pl-0"
        >
            {/* Pastille sur l'axe */}
            <span
                className={`absolute left-5 top-3 z-10 -translate-x-1/2 rounded-full bg-base-100 ring-4 md:left-1/2 ${DOT_RING[track]}`}
            >
                <Image
                    className="rounded-full object-cover shadow-md"
                    src={`/assets/images/${entry.logo}`}
                    alt={t(`${track}.${entry.id}.title`)}
                    width={44}
                    height={44}
                />
            </span>

            <div className={isFormation ? 'md:col-start-1' : 'md:col-start-2'}>
                <motion.div
                    whileHover={{ scale: 1.012 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="rounded-xl border border-base-200 bg-base-100 p-4 shadow-lg transition-shadow duration-300 hover:shadow-2xl sm:p-6"
                >
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span
                            className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${TRACK_CHIP[track]}`}
                        >
                            {t(isFormation ? 'journey.track_formation' : 'journey.track_experience')}
                        </span>
                        {entry.integratedIn && (
                            <span className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                                {t('timeline.integrated')}
                            </span>
                        )}
                    </div>

                    <div className="mb-4 flex flex-col items-start justify-between sm:flex-row sm:items-center">
                        <h3 className="text-base font-bold text-base-content sm:text-xl">
                            {t(`${track}.${entry.id}.title`)}
                        </h3>
                        <span className="mt-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary sm:mt-0 sm:ml-3 sm:shrink-0">
                            {t(`${track}.${entry.id}.period`)}
                        </span>
                    </div>

                    {/* Sous-branche : échanges effectués pendant ce cursus */}
                    {exchanges.length > 0 && (
                        <div className="mb-4">
                            <div className="mb-2 flex items-center gap-1.5">
                                <GlobeAltIcon className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                                <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                                    {t('timeline.exchange_label')}
                                </span>
                            </div>
                            <ul className="space-y-3 border-l-2 border-dashed border-primary/30 pl-5">
                                {exchanges.map((exchange) => (
                                    <li key={exchange.id} className="relative">
                                        <span
                                            aria-hidden="true"
                                            className="absolute -left-[1.55rem] top-5 h-2.5 w-2.5 rounded-full bg-primary/50 ring-4 ring-base-100"
                                        />
                                        <div className="flex items-start gap-3 rounded-lg border border-primary/15 bg-primary/5 p-3">
                                            <Image
                                                className="shrink-0 rounded-full object-cover"
                                                src={`/assets/images/${exchange.logo}`}
                                                alt={t(`formation.${exchange.id}.title`)}
                                                width={36}
                                                height={36}
                                            />
                                            <div className="min-w-0 flex-1">
                                                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                                                    <p className="text-sm font-semibold text-base-content">
                                                        {exchange.flag && (
                                                            <span className="mr-1.5" aria-hidden="true">
                                                                {exchange.flag}
                                                            </span>
                                                        )}
                                                        {t(`formation.${exchange.id}.title`)}
                                                    </p>
                                                    <span className="whitespace-nowrap text-[11px] font-semibold text-primary">
                                                        {t(`formation.${exchange.id}.period`)}
                                                    </span>
                                                </div>
                                                <p className="mt-1 text-xs leading-relaxed text-base-content/70">
                                                    {t(`formation.${exchange.id}.summary`)}
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <AnimatePresence>
                        {expanded && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <div className="mb-4 rounded-lg border-l-4 border-primary bg-base-200/50 p-4 text-sm text-base-content/70">
                                    {renderHtmlText(t(`${track}.${entry.id}.description`))}
                                </div>
                                {exchanges.map((exchange) => (
                                    <div
                                        key={exchange.id}
                                        className="mb-4 rounded-lg border-l-4 border-primary/40 bg-base-200/50 p-4 text-sm text-base-content/70"
                                    >
                                        <p className="mb-1 font-semibold text-base-content">
                                            {t(`formation.${exchange.id}.title`)}
                                        </p>
                                        {renderHtmlText(t(`formation.${exchange.id}.description`))}
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button
                        onClick={() => setExpanded(!expanded)}
                        aria-expanded={expanded}
                        className="flex items-center text-sm font-medium text-primary transition-colors hover:text-primary-focus"
                    >
                        {expanded ? t('timeline.show_less') : t('timeline.read_more')}
                        <svg
                            className={`ml-1 h-4 w-4 transform transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </motion.div>
            </div>
        </motion.li>
    );
};

interface CareerTimelineProps {
    education: CareerEntry[];
    experiences: CareerEntry[];
}

const CareerTimeline = ({ education, experiences }: CareerTimelineProps) => {
    const items = useMemo<Item[]>(() => {
        const merged: Item[] = [
            ...education.map((entry) => ({ entry, track: 'formation' as Track })),
            ...experiences.map((entry) => ({ entry, track: 'experiences' as Track })),
        ];
        // Du plus récent au plus ancien ; une entrée sans date passe en dernier.
        return merged.sort((a, b) => (b.entry.start ?? '').localeCompare(a.entry.start ?? ''));
    }, [education, experiences]);

    return (
        <ol className="relative mt-10">
            {/* Axe central */}
            <motion.span
                className="absolute bottom-0 left-5 top-0 w-0.5 -translate-x-1/2 bg-primary/20 md:left-1/2"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                style={{ transformOrigin: 'top' }}
            />
            {items.map((item, index) => (
                <CareerItem key={item.entry.id} entry={item.entry} track={item.track} index={index} />
            ))}
        </ol>
    );
};

export default CareerTimeline;
