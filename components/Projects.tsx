import Image from 'next/image';
import React, { useEffect, useCallback, memo } from 'react';

declare global { interface Window { instgrm: any; } }

const addInstagramScript = () => {
    if (document.querySelector('script[src="https://www.instagram.com/embed.js"]')) return;

    const script = document.createElement('script');
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
};

const categories = [
    {
        icon: '/assets/images/icons/popcorn.png',
        title: 'Aftermovies',
        links: [
            { url: 'https://www.youtube.com/embed/Sb7A0weDnp0', title: 'Aftermovie WEI 2022' },
            { url: 'https://www.youtube.com/embed/6RUYPsd1AYE', title: 'Aftermovie WEI 2023' },
            { url: 'https://www.youtube.com/embed/vpLy7HO1pT0', title: 'Aftermovie TGS' }
        ]
    },
    {
        icon: '/assets/images/icons/collab.png',
        title: 'Collaborations',
        links: [
            { url: 'https://www.youtube.com/embed/c-GvjKw0eQ4', title: 'Kawasaki' },
            { url: 'https://www.instagram.com/p/C3GEH7XrNI2/', title: 'Clip Videos pour ISEP Record' },
            { url: 'https://www.youtube.com/embed/a5DTt68PKdw', title: 'Clip Videos pour Cheerlisep' }
        ]
    }
];

const isInstagramUrl = (url: string | string[]): boolean => url.includes('instagram.com');

const Iframe = memo(({ url }: { url: string }) => (
    <iframe src={url} title="Video player" allowFullScreen className="w-full aspect-video" />
));

const Project = memo(({ link }: { link: { url: string; title: string } }) => (
    <div className="relative card-video mb-4 rounded-lg shadow-md flex flex-col">
        {!isInstagramUrl(link.url) ? (
            <Iframe url={link.url} />
        ) : (
            <blockquote className="instagram-media" data-instgrm-permalink={link.url} style={{ minWidth: '100%', minHeight: '100%' }} />
        )}
    </div>
));

const Category = memo(({ category }: { category: { icon: string; title: string; links: { url: string; title: string }[] } }) => (
    <div className="card bg-base-100 shadow-lg hover:shadow-2xl transition-transform duration-300 hover:-translate-y-1 flex flex-col rounded-xl">
        <div className="card-body">
            <div className="flex items-center space-x-3 mb-4">
                <Image src={category.icon} alt={`${category.title} icon`} width={40} height={40} />
                <h2 className="card-title">{category.title}</h2>
            </div>
            {category.links.map((link, index) => (
                <Project key={index} link={link} />
            ))}
        </div>
    </div>
));

const Projects = () => {
    const processInstgrams = useCallback((): void => window.instgrm ? window.instgrm.Embeds.process() : setTimeout(processInstgrams, 300), []);

    useEffect(() => {
        addInstagramScript();
        window.instgrm ? window.instgrm.Embeds.process() : processInstgrams();
    }, [processInstgrams]);

    return (
        <div className="px-4 md:px-0 py-6 bg-base-200 h-full w-full flex justify-center">
            <div className="grid md:grid-cols-2 gap-20 container w-full">
                {categories.map((category, index) => (
                    <Category key={index} category={category} />
                ))}
            </div>
        </div>
    );
}

export default Projects;