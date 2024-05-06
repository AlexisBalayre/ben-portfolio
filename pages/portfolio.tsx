import Image from 'next/image';
import type { NextPage } from 'next';
import React, { useState, useEffect, useCallback, memo } from 'react';

import skills from "~~/public/assets/data/skills.json";
import Carousel from '~~/components/Carousel';
import Projects from '~~/components/Projects';

const Portfolio: NextPage = () => {
    const [offsetY, setOffsetY] = useState(0);

    const handleScroll = useCallback(() => setOffsetY(window.pageYOffset), []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return (
        <div className="w-full overflow-hidden">
            <HeroSection offsetY={offsetY} />
            <LatestProject />
            <Projects />
            <Carousel />
            <SkillsSection skills={skills} />
        </div>
    );
};

export default Portfolio;

// HeroSection component
const HeroSection = memo(({ offsetY }: { offsetY: number }) => (
    <div className="hero min-h-screen bg-fixed" style={{ backgroundImage: `url(/assets/images/portfolio/Japon/image1.jpg)`, backgroundPositionY: `${offsetY * 0.5}px` }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content flex justify-center items-center flex-col">
            <div className="animate-fade-in-down max-w-lg">
                <h1 className="text-6xl font-bold mb-4">Portfolio</h1>
                <p className="mb-6">Welcome to my portfolio, a space dedicated to presenting my projects and galleries.</p>
            </div>
        </div>
    </div>
));

// LatestProject component
const LatestProject = memo(() => (
    <div className="w-full text-center bg-base-content pt-10 pb-10 min-h-fit p-10">
        <h2 className="text-3xl font-bold text-base-100">Mon dernier projet</h2>
        <hr className="trait" />
        <p className="mt-4 mb-6 px-4 md:px-20 text-base-100">En juillet 2023, j&apos;ai eu l&apos;opportunité de voyager au Japon. Pendant ce séjour, j&apos;ai réalisé un aftermovie qui retrace mon voyage, capturant ainsi chaque moment de cette expérience mémorable.</p>
        <div className="relative pt-[56.25%] rounded-xl">
            <iframe
                className="absolute top-0 left-0 w-full h-full rounded-xl"
                src="https://www.youtube.com/embed/OH5EjkYqK0I?si=njksvW21v-lahXZo"
                title="YouTube video player"
                frameBorder="0"
                allowFullScreen
                style={{ aspectRatio: '16 / 9' }} />
        </div>
    </div>
));

// SkillsSection component
const SkillsSection = memo(({ skills }: { skills: any[] }) => (
    <div className="py-12 bg-neutral-content text-base-content">
        <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">Compétences</h2>
            <hr className="trait" />
        </div>
        <div className="container mx-auto space-y-12">
            {skills.map((skill, index) => (
                <SkillCard key={index} skill={skill} />
            ))}
        </div>
    </div>
));

// SkillCard component
const SkillCard = memo(({ skill }: { skill: any }) => (
    <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="card-body">
            <h3 className="card-title text-3xl">{skill.title}</h3>
            <div className="flex justify-center gap-4 my-4">
                {skill.logos.map((logo: any, logoIndex: number) => (
                    <div key={logoIndex} className="animate-pulse">
                        <Image className="rounded-xl" src={logo.src} alt={logo.alt} width={64} height={64} layout="fixed" />
                    </div>
                ))}
            </div>
            <p className="text-lg">{skill.description}</p>
            <div className="flex justify-center my-4">
                <div className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                    <Image className="rounded-xl" src={skill.image.src} alt={skill.image.alt} width={640} height={360} layout="intrinsic" />
                </div>
            </div>
            <p className="text-center italic">{skill.imageDescription}</p>
        </div>
    </div>
));