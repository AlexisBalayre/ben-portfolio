import Image from 'next/image';
import React, { useEffect } from 'react';

declare global {
    interface Window {
        instgrm: any;
    }
}

const addInstagramEmbedScript = () => {
    if (!document.querySelector('script[src="https://www.instagram.com/embed.js"]')) {
        const script = document.createElement('script');
        script.async = true;
        script.src = "https://www.instagram.com/embed.js";
        document.body.appendChild(script);
    }
}

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
            { url: 'https://www.instagram.com/p/C3GEH7XrNI2/', title: 'Clip Videos pour ISEP Record' }, // Note the change in URL for the Instagram embed
            { url: 'https://www.youtube.com/embed/a5DTt68PKdw', title: 'Clip Videos pour Cheerlisep' }
        ]
    }
];

const Projects = () => {


    useEffect(() => {
        addInstagramEmbedScript();
        const checkInstgrm = () => {
            if (window.instgrm) {
                window.instgrm.Embeds.process();
            } else {
                setTimeout(checkInstgrm, 300); // Check again after a delay
            }
        };
        checkInstgrm();
    }, []);

    return (
        <div className="px-4 md:px-0 py-6 bg-base-200 h-full w-full flex justify-center">
            <div className="grid md:grid-cols-2 gap-20 container w-full">
                {categories.map((category, index) => (
                    <div key={index} className="card bg-base-100 shadow-lg hover:shadow-2xl transition-transform duration-300 hover:-translate-y-1 flex flex-col rounded-xl">
                        <div className="card-body">
                            <div className="flex items-center space-x-3 mb-4">
                                <Image src={category.icon} alt={`${category.title} icon`} width={40} height={40} />
                                <h2 className="card-title">{category.title}</h2>
                            </div>
                            {category.links.map((link, linkIndex) => {
                                const isInstagram = link.url.includes('instagram.com');
                                return (
                                    <div key={linkIndex} className="relative card-video mb-4 rounded-lg shadow-md flex flex-col">
                                        {!isInstagram ? (
                                            <iframe
                                                src={link.url}
                                                title="Video player"
                                                allowFullScreen
                                                className="w-full aspect-video"
                                            />
                                        ) : (
                                            <blockquote className="instagram-media" data-instgrm-permalink={link.url} style={{ minWidth: '100%', minHeight: '100%' }} />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;