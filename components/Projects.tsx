import Image from 'next/image';
import React, { useEffect } from 'react';
import { useTranslation } from 'next-i18next';

import projects from "~~/public/assets/data/projects.json";

declare global { interface Window { instgrm: any; } }

const addInstagramScript = () => {
    if (typeof window === 'undefined' || window.instgrm) return;

    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    document.body.appendChild(script);
};

const isInstagramUrl = (url: string): boolean => url.includes('instagram.com');

const Iframe = ({ url }: { url: string }) => (
    <iframe
        src={url}
        title="Video player"
        allowFullScreen
        className="w-full aspect-video"
        loading="lazy"
    />
);

const Project = ({ link, categoryId }: { link: { id: string; url: string }; categoryId: string }) => (
    <div className="relative card-video mb-4 rounded-lg shadow-md flex flex-col">
        {isInstagramUrl(link.url) ? (
            <blockquote
                className="instagram-media"
                data-instgrm-permalink={link.url}
                style={{ minWidth: '100%', minHeight: '100%' }}
            />
        ) : (
            <Iframe url={link.url} />
        )}
    </div>
);

const Category = ({
    category,
}: {
    category: { id: string; icon: string; links: { id: string; url: string }[] };
}) => {
    const { t } = useTranslation('common');
    return (
        <div className="card bg-base-100 shadow-lg hover:shadow-2xl transition-transform duration-300 hover:-translate-y-1 flex flex-col rounded-xl">
            <div className="card-body">
                <div className="flex items-center space-x-3 mb-4">
                    <Image src={category.icon} alt={`${t(`projects.${category.id}.title`)} icon`} width={40} height={40} />
                    <h2 className="card-title">{t(`projects.${category.id}.title`)}</h2>
                </div>
                {category.links.map((link, index) => (
                    <div key={index}>
                        <h3 className="font-semibold mb-2">{t(`projects.${category.id}.links.${link.id}`)}</h3>
                        <Project link={link} categoryId={category.id} />
                    </div>
                ))}
            </div>
        </div>
    );
};

const Projects = () => {
    useEffect(() => {
        addInstagramScript();
    }, []);

    useEffect(() => {
        if (window.instgrm) {
            window.instgrm.Embeds.process();
        }
    }, []);

    return (
        <div className="px-4 md:px-0 py-10 bg-base-200 h-full w-full flex justify-center">
            <div className="grid md:grid-cols-2 md:gap-20 gap-10 container w-full">
                {projects.map((project, index) => (
                    <Category key={index} category={project} />
                ))}
            </div>
        </div>
    );
};

export default Projects;