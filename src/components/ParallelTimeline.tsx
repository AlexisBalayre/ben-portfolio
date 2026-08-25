import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { motion, AnimatePresence } from 'framer-motion';

/** Préfixe de traduction : les libellés viennent toujours des locales. */
type Prefix = 'formation' | 'experiences';

interface RawExchange {
    id: string;
    start?: string;
    end?: string;
    flag?: string;
    nature?: string;
}

export interface JourneyEntry {
    id: string;
    start?: string;
    end?: string;
    ongoing?: boolean;
    /** Nature affichée en surtitre de la barre — clé de `journey.nature.*`. */
    nature?: string;
    /** Identifiant du cursus dans lequel ce stage s'inscrit — il est alors rattaché à la voie Formation. */
    integratedIn?: string;
    exchanges?: RawExchange[];
}

interface Bar {
    id: string;
    prefix: Prefix;
    kind: 'cursus' | 'exchange' | 'job';
    nature: string;
    start: number;
    end: number;
    ongoing: boolean;
    flag?: string;
    /** Pour un échange : l'identifiant du cursus qui le contient. */
    parentId?: string;
}

/** "2024-09" → nombre de mois absolus. Les bornes `end` sont exclusives. */
const toMonths = (value: string) => {
    const [year, month] = value.split('-').map(Number);
    return year * 12 + (month - 1);
};

const BAR_STYLES: Record<Bar['kind'], string> = {
    cursus: 'border-primary/40 bg-primary/10 text-primary hover:bg-primary/20',
    exchange: 'border-amber-500/60 bg-amber-100 text-amber-900 hover:bg-amber-200',
    job: 'border-emerald-600/40 bg-emerald-50 text-emerald-800 hover:bg-emerald-100',
};

/** Empile les barres qui se chevauchent sur des lignes distinctes. */
const packLanes = (bars: Bar[]): Bar[][] => {
    const lanes: Bar[][] = [];
    [...bars]
        .sort((a, b) => a.start - b.start)
        .forEach((bar) => {
            const lane = lanes.find((candidate) => candidate[candidate.length - 1].end <= bar.start);
            if (lane) lane.push(bar);
            else lanes.push([bar]);
        });
    return lanes;
};

const isDated = (entry: JourneyEntry) => Boolean(entry.start && entry.end);

interface ParallelTimelineProps {
    education: JourneyEntry[];
    experiences: JourneyEntry[];
}

const ParallelTimeline = ({ education, experiences }: ParallelTimelineProps) => {
    const { t } = useTranslation('common');
    const [selected, setSelected] = useState<Bar | null>(null);
    // Calculé après le montage : le rendu statique ne doit pas dépendre de la date.
    const [todayMonth, setTodayMonth] = useState<number | null>(null);

    useEffect(() => {
        const now = new Date();
        setTodayMonth(now.getFullYear() * 12 + now.getMonth());
    }, []);

    const { tracks, ticks, axisStart, span } = useMemo(() => {
        const cursus: Bar[] = [];
        const exchanges: Bar[] = [];

        education.filter(isDated).forEach((entry) => {
            cursus.push({
                id: entry.id,
                prefix: 'formation',
                kind: 'cursus',
                nature: entry.nature ?? 'cursus',
                start: toMonths(entry.start as string),
                end: toMonths(entry.end as string),
                ongoing: Boolean(entry.ongoing),
            });
            entry.exchanges?.forEach((exchange) => {
                if (!exchange.start || !exchange.end) return;
                exchanges.push({
                    id: exchange.id,
                    prefix: 'formation',
                    kind: 'exchange',
                    nature: exchange.nature ?? 'exchange',
                    start: toMonths(exchange.start),
                    end: toMonths(exchange.end),
                    ongoing: false,
                    flag: exchange.flag,
                    parentId: entry.id,
                });
            });
        });

        const toJob = (entry: JourneyEntry): Bar => ({
            id: entry.id,
            prefix: 'experiences',
            kind: 'job',
            nature: entry.nature ?? (entry.integratedIn ? 'internship' : 'job'),
            start: toMonths(entry.start as string),
            end: toMonths(entry.end as string),
            ongoing: Boolean(entry.ongoing),
        });

        const dated = experiences.filter(isDated);
        const internships = dated.filter((entry) => entry.integratedIn).map(toJob);
        const jobs = dated.filter((entry) => !entry.integratedIn).map(toJob);

        const all = [...cursus, ...exchanges, ...internships, ...jobs];
        const start = Math.min(...all.map((bar) => bar.start)) - 1;
        const end = Math.max(...all.map((bar) => bar.end)) + 1;

        const years: number[] = [];
        for (let year = Math.ceil(start / 12); year * 12 <= end; year += 1) {
            if (year * 12 >= start) years.push(year);
        }

        return {
            axisStart: start,
            span: Math.max(end - start, 1),
            ticks: years,
            tracks: [
                {
                    key: 'formation',
                    label: 'journey.track_formation',
                    groups: [
                        { key: 'cursus', label: null, lanes: packLanes(cursus), overlays: exchanges },
                        {
                            key: 'internships',
                            label: 'journey.track_internship',
                            lanes: packLanes(internships),
                            overlays: [] as Bar[],
                        },
                    ],
                },
                {
                    key: 'experiences',
                    label: 'journey.track_experience',
                    groups: [
                        { key: 'jobs', label: null, lanes: packLanes(jobs), overlays: [] as Bar[] },
                    ],
                },
            ],
        };
    }, [education, experiences]);

    const left = (month: number) => ((month - axisStart) / span) * 100;
    const todayLeft = todayMonth !== null ? left(todayMonth) : null;
    const showToday = todayLeft !== null && todayLeft >= 0 && todayLeft <= 100;

    const renderBar = (bar: Bar) => {
        const isSelected = selected?.id === bar.id;
        return (
            <button
                key={bar.id}
                type="button"
                onClick={() => setSelected((current) => (current?.id === bar.id ? null : bar))}
                aria-pressed={isSelected}
                title={t(`${bar.prefix}.${bar.id}.title`)}
                className={`absolute inset-y-0 flex items-center gap-1 overflow-hidden rounded-md border px-1.5 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    BAR_STYLES[bar.kind]
                } ${bar.kind === 'exchange' ? 'z-10 shadow-sm' : ''} ${
                    isSelected ? 'ring-2 ring-primary ring-offset-1' : ''
                }`}
                style={{ left: `${left(bar.start)}%`, width: `${left(bar.end) - left(bar.start)}%` }}
            >
                <span className="flex min-w-0 flex-col items-start leading-tight">
                    <span className="max-w-full truncate text-[8px] font-bold uppercase tracking-wider opacity-60">
                        {t(`journey.nature.${bar.nature}`)}
                    </span>
                    <span className="max-w-full truncate text-[10px] font-semibold">
                        {t(`${bar.prefix}.${bar.id}.short`)}
                    </span>
                </span>
                {bar.ongoing && (
                    <>
                        {/* Dégradé de fuite : l'activité se poursuit au-delà de la frise. */}
                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-r from-transparent to-base-100"
                        />
                        <span className="relative z-[1] ml-auto shrink-0 text-[11px] opacity-70" aria-hidden="true">
                            →
                        </span>
                    </>
                )}
            </button>
        );
    };

    return (
        <div>
            {/* Légende */}
            <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-base-content/60">
                <span className="flex items-center gap-2">
                    <span className="h-3 w-6 rounded border border-primary/40 bg-primary/10" aria-hidden="true" />
                    {t('journey.legend_formation')}
                </span>
                <span className="flex items-center gap-2">
                    <span className="h-3 w-6 rounded border border-amber-500/60 bg-amber-100" aria-hidden="true" />
                    {t('journey.legend_exchange')}
                </span>
                <span className="flex items-center gap-2">
                    <span className="h-3 w-6 rounded border border-emerald-600/40 bg-emerald-50" aria-hidden="true" />
                    {t('journey.legend_experience')}
                </span>
            </div>

            <p className="mb-3 text-xs text-base-content/50 xl:hidden">{t('journey.scroll_hint')}</p>

            <div className="overflow-x-auto overflow-y-hidden overscroll-x-contain pb-3">
                <div className="relative min-w-[1024px]">
                    {/* Repères des années */}
                    <div aria-hidden="true" className="pointer-events-none absolute inset-0 top-6">
                        {ticks.map((year) => (
                            <span
                                key={year}
                                className="absolute inset-y-0 w-px bg-base-content/10"
                                style={{ left: `${left(year * 12)}%` }}
                            />
                        ))}
                    </div>

                    {/* Repère « aujourd'hui » — au-dessus des barres */}
                    {showToday && (
                        <div aria-hidden="true" className="pointer-events-none absolute inset-0 top-6 z-20">
                            <span
                                className="absolute inset-y-0 w-0.5 bg-rose-500/70"
                                style={{ left: `${todayLeft}%` }}
                            />
                        </div>
                    )}

                    {/* Axe des années */}
                    <div className="relative h-6">
                        {ticks.map((year) => (
                            <span
                                key={year}
                                className="absolute -translate-x-1/2 text-[11px] font-semibold text-base-content/50"
                                style={{ left: `${left(year * 12)}%` }}
                            >
                                {year}
                            </span>
                        ))}
                        {showToday && (
                            <span
                                className="absolute -top-0.5 -translate-x-1/2 whitespace-nowrap rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm"
                                style={{ left: `${todayLeft}%` }}
                            >
                                {t('journey.today')}
                            </span>
                        )}
                    </div>

                    {/* Voies */}
                    <div className="relative space-y-5">
                        {tracks.map((track) => (
                            <div key={track.key}>
                                <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-base-content/50">
                                    {t(track.label)}
                                </p>
                                {track.groups
                                    .filter((group) => group.lanes.length > 0)
                                    .map((group) => (
                                        <div key={group.key}>
                                            {group.label && (
                                                <p className="mb-1.5 mt-3 text-[10px] font-semibold uppercase tracking-wider text-emerald-700/70">
                                                    ↳ {t(group.label)}
                                                </p>
                                            )}
                                            <div className="space-y-2">
                                                {group.lanes.map((lane, index) => (
                                                    <div key={index} className="relative h-10">
                                                        {lane.map(renderBar)}
                                                        {group.overlays
                                                            .filter((overlay) =>
                                                                lane.some((bar) => bar.id === overlay.parentId),
                                                            )
                                                            .map(renderBar)}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Détail de l'étape sélectionnée */}
            <div aria-live="polite">
                <AnimatePresence initial={false}>
                    {selected ? (
                        <motion.div
                            key={selected.id}
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                            className="mt-2 rounded-xl border border-base-200 bg-base-100 p-4 shadow-sm"
                        >
                            <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-base-content/40">
                                {t(`journey.nature.${selected.nature}`)}
                            </p>
                            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                                <p className="text-sm font-bold text-base-content">
                                    {selected.flag && (
                                        <span className="mr-1.5" aria-hidden="true">{selected.flag}</span>
                                    )}
                                    {t(`${selected.prefix}.${selected.id}.title`)}
                                </p>
                                <span className="text-xs font-semibold text-primary">
                                    {t(`${selected.prefix}.${selected.id}.period`)}
                                </span>
                            </div>
                            <p className="mt-2 text-sm leading-relaxed text-base-content/70">
                                {t(`${selected.prefix}.${selected.id}.description`)}
                            </p>
                        </motion.div>
                    ) : (
                        <p className="mt-2 text-xs text-base-content/50">{t('journey.hint')}</p>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ParallelTimeline;
