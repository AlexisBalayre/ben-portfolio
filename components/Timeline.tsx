import React, { useState } from 'react';
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
}

const TimelineItem = ({ item, index }: TimelineItemProps) => {
    const { t } = useTranslation('common');
    const [expanded, setExpanded] = useState(false);

    return (
        <motion.li 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="mb-10 ml-6 relative"
        >
            <span className="absolute flex items-center justify-center w-12 h-12 rounded-full -left-12 z-10">
                <Image 
                    className="rounded-full shadow-lg object-cover" 
                    src={`/assets/images/${item.logo}`} 
                    alt={t(`formation.${item.id}.title`)} 
                    width={48} 
                    height={48} 
                />
            </span>
            <motion.div 
                whileHover={{ scale: 1.02 }}
                className="ml-8 p-6 bg-base-100 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-base-200 max-w-3xl"
            >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-base-content">
                        {t(`formation.${item.id}.title`)}
                    </h3>
                    <span className="px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full mt-2 sm:mt-0">
                        {item.period}
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
                            <div 
                                className="p-4 mb-4 text-sm text-base-content/70 bg-base-200/50 rounded-lg border-l-4 border-primary"
                                dangerouslySetInnerHTML={{ __html: t(`formation.${item.id}.description`) }} 
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                 <button 
                    onClick={() => setExpanded(!expanded)}
                    className="flex items-center text-sm font-medium text-primary hover:text-primary-focus transition-colors group"
                >
                    {expanded ? t('timeline.show_less') : t('timeline.read_more')}
                    <svg 
                        className={`w-4 h-4 ml-1 transform transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </motion.div>
        </motion.li>
    );
};

const Timeline = ({ items }: { items: any[] }) => {
    return (
        <ol className="relative border-l-2 border-primary/20 mt-10 ml-6 space-y-10">
            {items.map((item, index) => (
                <TimelineItem key={index} item={item} index={index} />
            ))}
        </ol>
    );
};

export default Timeline;
