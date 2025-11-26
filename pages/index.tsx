import React from 'react';
import Image from 'next/image';
import { AcademicCapIcon, BriefcaseIcon } from '@heroicons/react/24/outline';
import Timeline from '~~/components/Timeline';
import TimelineDark from '~~/components/TimelineDark';
import experiences from "~~/public/assets/data/experiences.json";
import education from "~~/public/assets/data/formation.json";
import { NextPage } from 'next/types';

const Home: NextPage = () => {
    return (
        <div className="pt-10 w-full overflow-y-auto overflow-x-hidden 	bg-neutral-content">
            <div className="hero md:mt-20 md:mb-20 mt-10">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <Image src="/assets/images/pp.jpg" alt="Photo de Benjamin Balayre" width={300} height={300} className="max-w-sm rounded-full shadow-2xl" />
                    <div>
                        <h1 className="text-5xl font-bold">Benjamin Balayre</h1>
                        <h2 className="text-3xl">Etudiant en école d&apos;ingénieur</h2>
                        <p className="py-6">
                            Bienvenue sur mon site web, un espace dédié à la découverte de mon parcours et de mes passions. Vous y trouverez des informations sur mes projets professionnels, personnels et associatifs.
                        </p>
                        <a href="/assets/documents/Benjamin_Balayre_CV.pdf" className="btn btn-primary rounded-xl text-base-100" download>
                            Download Resume
                        </a>
                    </div>
                </div>
            </div>

            {/* Education Timeline */}
            <div className="md:py-12 mt-10 md:mt-0 bg-primary-content w-full px-10 md:px-20" id="education">
                <span className="flex flex-row items-center justify-center md:justify-start">
                    <AcademicCapIcon className="h-8 w-8 mr-2 flex place-self-center text-base-100" />
                    <h2 className="text-4xl font-bold text-center md:text-left text-base-100">Education</h2>
                </span>
                <p className="text-base-100">Depuis mon enfance, je suis animé par une curiosité pour les nouvelles technologies, ce qui m&apos;a poussé à poursuivre mes études en ingénierie du numérique à l&apos;ISEP.</p>
                <Timeline items={education} />
            </div>

            {/* Experience Timeline */}
            <div className="md:py-12 mt-10 md:mt-0 w-full px-10 md:px-20" id="education">
                <span className="flex flex-row items-center justify-center md:justify-start">
                    <BriefcaseIcon className="h-8 w-8 mr-2 flex place-self-center" />
                    <h2 className="text-4xl font-bold text-center md:text-left">Experiences</h2>
                </span>
                <p className="t">Mon objectif est de développer mes compétences dans le domaine du numérique, tout en explorant ses enjeux et en contribuant à son développement.</p>
                <TimelineDark items={experiences} />
            </div>
        </div>
    );
}

export default Home;