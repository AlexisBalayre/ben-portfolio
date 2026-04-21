import React, { Fragment, useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { motion, AnimatePresence } from 'framer-motion';

interface TimelineItemProps {
    item: {
        id: string;
        logo: string;
        period: string;
    };
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

    return (
        <motion.li
            custom={index}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="mb-10 ml-6 relative"
        >
            {/* Dot on the line */}
            <motion.span
                className="absolute flex items-center justify-center w-12 h-12 rounded-full -left-12 z-10"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.15, ease: [0.34, 1.56, 0.64, 1] }}
                viewport={{ once: true }}
            >
                <Image
                    className="rounded-full shadow-lg object-cover"
                    src={`/assets/images/${item.logo}`}
                    alt={t(`${translationPrefix}.${item.id}.title`)}
                    width={48}
                    height={48}
                />
            </motion.span>

            <motion.div
                whileHover={{ scale: 1.015, x: 4 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="ml-8 p-6 bg-base-100 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-base-200 max-w-3xl"
            >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-base-content">
                        {t(`${translationPrefix}.${item.id}.title`)}
                    </h3>
                    <span className="px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full mt-2 sm:mt-0">
                        {t(`${translationPrefix}.${item.id}.period`)}
                    </span>
                </div>

                <AnimatePresence>
                    {expanded && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            <div className="p-4 mb-4 text-sm text-base-content/70 bg-base-200/50 rounded-lg border-l-4 border-primary">
                                {renderHtmlText(t(`${translationPrefix}.${item.id}.description`))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <button
                    onClick={() => setExpanded(!expanded)}
                    aria-expanded={expanded}
                    aria-label={expanded ? t('timeline.show_less') : t('timeline.read_more')}
                    className="flex items-center text-sm font-medium text-primary hover:text-primary-focus transition-colors"
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
        </motion.li>
    );
};

interface TimelineProps {
    items: { id: string; logo: string; period: string }[];
    translationPrefix?: string;
}

const Timeline = ({ items, translationPrefix = 'formation' }: TimelineProps) => {
    return (
        <ol className="relative mt-10 ml-6 space-y-10">
            {/* Animated vertical line */}
            <motion.div
                className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary/20 origin-top"
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
                <TimelineItem key={index} item={item} index={index} translationPrefix={translationPrefix} />
            ))}
        </ol>
    );
};

export default Timeline;
