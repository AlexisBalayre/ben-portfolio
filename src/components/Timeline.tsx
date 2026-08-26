import React, { Fragment, useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

interface ExchangeEntry {
    id: string;
    logo: string;
    period: string;
    flag?: string;
}

export interface TimelineEntry {
    id: string;
    logo: string;
    period: string;
    /** Semestres d'échange effectués *pendant* ce cursus, affichés en sous-branche. */
    exchanges?: ExchangeEntry[];
}

interface TimelineItemProps {
    item: TimelineEntry;
    index: number;
    translationPrefix: string;
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

const itemVariants = {
    hidden:  { opacity: 0, x: -32, scale: 0.97 },
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            duration: 0.55,
            delay: i * 0.1,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
};

const TimelineItem = ({ item, index, translationPrefix }: TimelineItemProps) => {
    const { t } = useTranslation('common');
    const [expanded, setExpanded] = useState(false);
    const exchanges = item.exchanges ?? [];

    return (
        <li className="relative mb-10">
            {/* Pastille posée sur le rail : `left-0` vise le rail et la translation
                de moitié l'y centre. Le placement vit sur l'enveloppe, l'animation
                sur l'élément intérieur : sinon le `scale` de Framer écraserait
                cette translation et la pastille repartirait de travers. */}
            <span className="absolute left-0 z-10 -translate-x-1/2">
                <motion.span
                    className="flex h-10 w-10 items-center justify-center rounded-full sm:h-12 sm:w-12"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 + 0.15, ease: [0.34, 1.56, 0.64, 1] }}
                    viewport={{ once: true }}
                >
                    <Image
                        className="h-full w-full rounded-full object-cover shadow-lg"
                        src={`/assets/images/${item.logo}`}
                        alt={t(`${translationPrefix}.${item.id}.title`)}
                        width={48}
                        height={48}
                    />
                </motion.span>
            </span>

            {/* Seule la carte glisse à l'entrée. Quand toute l'entrée glissait, la
                pastille sortait de l'écran le temps de l'animation sur mobile. */}
            <motion.div
                custom={index}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="ml-7 max-w-3xl rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm transition-shadow duration-300 hover:shadow-xl sm:ml-9 sm:p-6"
            >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
                    <h3 className="text-base sm:text-xl font-bold text-base-content">
                        {t(`${translationPrefix}.${item.id}.title`)}
                    </h3>
                    <span className="px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full mt-2 sm:mt-0">
                        {t(`${translationPrefix}.${item.id}.period`)}
                    </span>
                </div>

                {/* Sous-branche : échanges effectués pendant ce cursus */}
                {exchanges.length > 0 && (
                    <div className="mb-4">
                        <div className="flex items-center gap-1.5 mb-2">
                            <GlobeAltIcon className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                            <span className="text-[11px] font-bold uppercase tracking-eyebrow text-accent">
                                {t('timeline.exchange_label')}
                            </span>
                        </div>
                        <ul className="space-y-3 border-l-2 border-dashed border-accent/40 pl-5">
                            {exchanges.map((exchange) => (
                                <li key={exchange.id} className="relative">
                                    <span
                                        aria-hidden="true"
                                        className="absolute -left-[1.55rem] top-5 h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-base-100"
                                    />
                                    <div className="flex items-start gap-3 rounded-xl border border-accent/20 bg-accent/[0.07] p-3">
                                        <Image
                                            className="rounded-full object-cover shrink-0"
                                            src={`/assets/images/${exchange.logo}`}
                                            alt={t(`${translationPrefix}.${exchange.id}.title`)}
                                            width={36}
                                            height={36}
                                        />
                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                                                <p className="text-sm font-semibold text-base-content">
                                                    {exchange.flag && (
                                                        <span className="mr-1.5" aria-hidden="true">{exchange.flag}</span>
                                                    )}
                                                    {t(`${translationPrefix}.${exchange.id}.title`)}
                                                </p>
                                                <span className="text-[11px] font-semibold text-primary sm:whitespace-nowrap">
                                                    {t(`${translationPrefix}.${exchange.id}.period`)}
                                                </span>
                                            </div>
                                            <p className="mt-1 text-xs leading-relaxed text-base-content/70">
                                                {t(`${translationPrefix}.${exchange.id}.summary`)}
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
                            <div className="mb-4 rounded-xl border-l-[3px] border-primary bg-base-200 p-4 text-sm leading-relaxed text-base-content/70">
                                {renderHtmlText(t(`${translationPrefix}.${item.id}.description`))}
                            </div>
                            {exchanges.map((exchange) => (
                                <div
                                    key={exchange.id}
                                    className="mb-4 rounded-xl border-l-[3px] border-accent bg-base-200 p-4 text-sm leading-relaxed text-base-content/70"
                                >
                                    <p className="mb-1 font-semibold text-base-content">
                                        {t(`${translationPrefix}.${exchange.id}.title`)}
                                    </p>
                                    {renderHtmlText(t(`${translationPrefix}.${exchange.id}.description`))}
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                <button
                    onClick={() => setExpanded(!expanded)}
                    aria-expanded={expanded}
                    aria-label={expanded ? t('timeline.show_less') : t('timeline.read_more')}
                    className="inline-flex min-h-[44px] items-center text-sm font-semibold text-primary transition-colors hover:text-accent"
                >
                    {expanded ? t('timeline.show_less') : t('timeline.read_more')}
                    <svg
                        className={`w-4 h-4 ml-1 transform transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </motion.div>
        </li>
    );
};

interface TimelineProps {
    items: TimelineEntry[];
    translationPrefix?: string;
}

const Timeline = ({ items, translationPrefix = 'formation' }: TimelineProps) => {
    return (
        <ol className="relative mt-10 ml-5 space-y-10 sm:ml-6">
            {/* Animated vertical line */}
            <motion.div
                className="absolute bottom-0 left-0 top-0 w-0.5 origin-top bg-primary/15"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                style={{ transformOrigin: 'top' }}
            />
            <motion.div
                className="absolute left-0 top-0 w-0.5 bg-primary origin-top"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                viewport={{ once: true }}
                style={{ transformOrigin: 'top', height: '100%' }}
            />
            {items.map((item, index) => (
                <TimelineItem key={item.id} item={item} index={index} translationPrefix={translationPrefix} />
            ))}
        </ol>
    );
};

export default Timeline;
