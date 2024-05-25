// pages/asso.tsx
import type { NextPage } from "next";
import Image from "next/image";

import { InstagramLogo } from '~~/public/assets/svg/InstagramLogo';

const AssociativeCareer: NextPage = () => {

    return (
        <div className="w-full overflow-hidden">
            {/* Hero Section */}
            <div className="hero min-h-screen bg-fixed relative">
                <div
                >
                    <Image
                        src="/assets/images/portfolio/asso2.jpg"
                        alt="Hero background"
                        layout="fill"
                        objectFit="cover"
                        quality={80}
                    />
                </div>
                <div className="hero-overlay bg-opacity-20 z-100 absolute w-full h-full"></div>
                <div className="hero-content text-center text-neutral-content flex justify-center items-center flex-col">
                    <div className="animate-fade-in-down max-w-lg">
                        <h1 className="text-6xl font-bold mb-4">Associative Career</h1>
                        <p className="mb-6">
                            Welcome to my dedicated space for my volunteer journey. You will find information about my commitments and the projects I have completed within the associations here.
                        </p>
                    </div>
                </div>
            </div>

            {/* ISEP Drone */}
            <div className="bg-base-content w-full p-10 md:px-40 grid">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-base-100 text-center">ISEP Drone</h2>
                    <hr className="trait" />
                </div>

                <Image
                    src="/assets/images/isepdrone.png"
                    alt="ISEP Drone Logo"
                    width={150} // set the image width
                    height={150} // set the image height
                    className="rounded-full flex-shrink-0 md:hidden place-self-center mt-3"
                />

                <div className="mt-4 flex flex-row justify-between items-center h-full sm:grid-cols-1 md:grid-cols-2">
                    <div className="md:pr-10 sm:mb-8">
                        <h3 className="font-bold text-base-100 text-2xl sm:text-lg md:text-2xl lg:text-xl xl:text-2xl">Présentation</h3>
                        <p className="leading-relaxed lg:text-lg text-justify text-base-100">
                            Le drone FPV ("First Person View"), intègre une caméra qui offre au pilote une vision en temps réel à travers des lunettes FPV
                            permettant une expérience de vol immersive. <br /><br />
                            ISEP Drone est un club de drone FPV créé en 2021 par un groupe de
                            passionnés. <br />
                            Notre objectif, faire découvrir notre dicipline au plus grand nombre à travers des formations, sessions sur simulateur et sessions de vol.
                        </p>
                    </div>
                    <Image
                        src="/assets/images/isepdrone.png"
                        alt="ISEP Drone Logo"
                        width={300} // set the image width
                        height={300} // set the image height
                        className="rounded-full flex-shrink-0 sm:w-56 md:w-96 lg:w-72 xl:w-56 hidden md:block"
                    />
                </div>

                <div className="mt-20 w-full grid">
                    <h3 className="font-bold text-base-100 text-2xl mb-10">Mon Parcours</h3>
                    <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical text-base-100">
                        <li>
                            <div className="timeline-middle">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                            </div>
                            <div className="timeline-start md:text-end mb-10">
                                <time className="font-mono italic">2023</time>
                                <div className="text-lg font-black">Président du Club</div>
                            </div>
                            <hr className="bg-primary" />
                        </li>
                        <li>
                            <hr className="bg-primary" />
                            <div className="timeline-middle">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                            </div>
                            <div className="timeline-end mb-10">
                                <time className="font-mono italic">2022</time>
                                <div className="text-lg font-black">Responsable Communication</div>
                            </div>
                            <hr className="bg-primary" />
                        </li>
                        <li>
                            <hr className="bg-primary" />
                            <div className="timeline-middle">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                            </div>
                            <div className="timeline-start md:text-end mb-10">
                                <time className="font-mono italic">2021</time>
                                <div className="text-lg font-black">Membre Fondateur</div>
                            </div>
                            <hr className="bg-primary" />
                        </li>
                    </ul>
                </div>

                <div className="mt-10 flex flex-row justify-between items-center h-full sm:grid-cols-1 md:grid-cols-2">
                    <div className="md:pr-10 sm:mb-8">
                        <h3 className="font-bold text-base-100 text-2xl sm:text-lg md:text-2xl lg:text-xl xl:text-2xl">Présentation</h3>

                        <p className="text-base-100 leading-relaxed lg:text-lg text-justify">
                            Depuis que j'ai rejoint le club associatif ISEP Drone en 2021, j'ai
                            eu l'opportunité de contribuer à son développement. J'ai participé à
                            la création de l'identité visuelle du club, à l'organisation des
                            premiers événements, à la communication de lancement et au
                            recrutement des nouveaux membres. Ces expériences m'ont permis de
                            développer mes compétences en graphisme, en gestion de projet, en
                            communication digitale et en recrutement. <br /><br />
                            En 2023, j'ai pris la tête du club en tant que président. Cette
                            expérience m'a permis de développer mes compétences en leadership et
                            en gestion d'équipe, en veillant à la bonne marche du club et en
                            motivant les membres à atteindre nos objectifs communs. <br /><br />
                            En bref, mon parcours au sein de ISEP Drone m'a permis de développer
                            de nombreuses compétences transversales. C'est une expérience que je
                            suis fier d'avoir vécue et qui, je suis sûr, sera un atout pour mon
                            avenir professionnel.
                        </p>
                    </div>
                    <Image
                        src="/assets/images/drone_illustration.JPG"
                        alt="ISEP Drone Logo"
                        width={300} // set the image width
                        height={300} // set the image height
                        className="rounded-xl flex-shrink-0 sm:w-56 md:w-96 lg:w-72 xl:w-56 hidden md:block"
                    />
                </div>

                <a
                    href="https://www.instagram.com/isep_drone?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                    target="_blank"
                    className="place-self-center md:mt-10"
                >
                    <InstagramLogo className="w-20 h-20 transition hover:text-primary text-base-100" />
                </a>

            </div>

            {/* ISEP Live */}
            <div className="w-full p-10 md:px-40 grid">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-center">ISEP Live</h2>
                    <hr className="trait" />
                </div>

                <Image
                    src="/assets/images/iseplive.png"
                    alt="ISEP Drone Logo"
                    width={150} // set the image width
                    height={150} // set the image height
                    className="rounded-full flex-shrink-0 md:hidden place-self-center mt-3"
                />
                <div className="mt-4 flex flex-row justify-between items-center h-full sm:grid-cols-1 md:grid-cols-2">
                    <div className="md:pr-10">
                        <h3 className="font-bold text-2xl md:text-2xl lg:text-xl xl:text-2xl">Présentation</h3>
                        <p className="leading-relaxed lg:text-lg text-justify">
                            ISEP Live est l'association média officielle de l'ISEP, couvrant la
                            majorité des événements organisés par les associations, notamment le
                            Weekend d'Intégration, la Semaine de Ski et la Semaine Voile. Nous
                            proposons des formations en photographie, vidéo et illustration à
                            nos membres. Composée de 25 membres, cette association est au cœur
                            de la vie étudiante. <br /><br />
                        </p>
                    </div>
                    <Image
                        src="/assets/images/iseplive.png"
                        alt="ISEP Drone Logo"
                        width={300} // set the image width
                        height={300} // set the image height
                        className="rounded-full flex-shrink-0 sm:w-56 md:w-96 lg:w-72 xl:w-56 hidden md:block"
                    />
                </div>

                <Image
                    src="/assets/images/portfolio/logos/Iseplife.png"
                    alt="ISEP Drone Logo"
                    width={150} // set the image width
                    height={150} // set the image height
                    className="rounded-full flex-shrink-0 md:hidden place-self-center"
                />
                <div className="mt-4 flex flex-row justify-between items-center h-full sm:grid-cols-1 md:grid-cols-2">
                    <Image
                        src="/assets/images/portfolio/logos/Iseplife.png"
                        alt="ISEP Drone Logo"
                        width={300} // set the image width
                        height={300} // set the image height
                        className="rounded-full flex-shrink-0 sm:w-56 md:w-96 lg:w-72 xl:w-56 hidden md:block"
                    />
                    <div className="md:pl-10 sm:mb-8">
                        <h3 className="font-bold text-2xl md:text-2xl lg:text-xl xl:text-2xl">ISEP Life</h3>
                        <p className="leading-relaxed lg:text-lg text-justify">
                            ISEP Life est notre application mobile qui regroupe les différents
                            événements à venir, les informations relatives aux étudiants
                            isépiens et à leur appartenance à une association, ainsi que les
                            galeries photo et vidéo des événements passés.
                        </p>
                    </div>
                </div>


                <Image
                    src="/assets/images/portfolio/IL.jpg"
                    alt="iseplive-illustration"
                    width={150} // set the image width
                    height={150} // set the image height
                    className="rounded flex-shrink-0 md:hidden place-self-center mt-3"
                />
                <Image
                    src="/assets/images/portfolio/IL2.jpg"
                    alt="iseplive-illustration"
                    width={150} // set the image width
                    height={150} // set the image height
                    className="rounded flex-shrink-0 md:hidden place-self-center mt-3"
                />
                <div className="mt-4 flex flex-row justify-between items-center h-full w-full">
                    <div className="md:pr-10 sm:mb-8 md:basis-3/4">
                        <h3 className="font-bold text-2xl md:text-2xl lg:text-xl xl:text-2xl">Mon Parcours</h3>
                        <p className="leading-relaxed lg:text-lg text-justify">
                            Passionné par la photographie, la réalisation et la production de
                            projets vidéographiques, mon parcours au sein d'ISEP Live a été une
                            source d'épanouissement personnel. Mon engagement a débuté en 2021,
                            alors que je venais tout juste de me lancer dans la photographie,
                            dans le but d'échanger avec des personnes compétentes. <br /><br />
                            En 2022, j'ai été promu Vice-président. Cette expérience m'a permis
                            de participer et de diriger des projets collaboratifs qui ont du
                            sens pour moi. Mon poste de vice-président m'a appris à mener à bien
                            les projets que j'entreprends avec mon équipe, renforçant ainsi mes
                            compétences en gestion de projet, en leadership et en travail
                            d'équipe.
                        </p>
                    </div>
                    <div className="gap-4 flex flex-col basis-1/4">
                        <Image
                            src="/assets/images/portfolio/IL.jpg"
                            alt="iseplive-illustration"
                            width={300} // set the image width
                            height={300} // set the image height
                            className="rounded hidden md:block"
                        />
                        <Image
                            src="/assets/images/portfolio/IL2.jpg"
                            alt="iseplive-illustration"
                            width={300} // set the image width
                            height={300} // set the image height
                            className="rounded hidden md:block"
                        />
                    </div>
                </div>

                <a
                    href="https://www.instagram.com/iseplive?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                    target="_blank"
                    className="place-self-center md:mt-10"
                >
                    <InstagramLogo className="w-20 h-20 transition hover:text-primary" />
                </a>
            </div>

            {/* VIZION BDE */}
            <div className="bg-base-content w-full p-10 md:px-40 grid">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-base-100 text-center">Vizion</h2>
                    <hr className="trait" />
                </div>

                <Image
                    src="/assets/images/Vizion.png"
                    alt="Vizion BDE Logo"
                    width={150} // set the image width
                    height={150} // set the image height
                    className="rounded-full flex-shrink-0 md:hidden place-self-center mt-3"
                />

                <div className="mt-4 flex flex-row justify-between items-center h-full sm:grid-cols-1 md:grid-cols-2">
                    <div className="md:pr-10 sm:mb-8">
                        <h3 className="font-bold text-base-100 text-2xl sm:text-lg md:text-2xl lg:text-xl xl:text-2xl">Présentation</h3>
                        <p className="leading-relaxed lg:text-lg text-justify text-base-100">
                            Le Bureau des Élèves (BDE) Vizion est une organisation dynamique et
                            engagée qui a pour mission de dynamiser la vie étudiante au sein de
                            l'école. Composé de 40 membres actifs, le BDE Vizion travaille toute
                            l'année pour proposer une expérience étudiante inoubliable.
                            <br /><br />
                            Au cœur de cette mission se trouve le pôle Création, chargé de
                            définir l'identité visuelle du BDE, de la communication aux couleurs
                            de nos pulls, en passant par notre logo, et bien plus encore. Chaque
                            membre du BDE Vizion s'investit pleinement pour offrir des
                            événements et des activités variés qui répondent aux besoins et aux
                            attentes de la communauté étudiante.
                        </p>
                    </div>
                    <Image
                        src="/assets/images/Vizion.png"
                        alt="Vizion BDE Logo"
                        width={300} // set the image width
                        height={300} // set the image height
                        className="rounded-full hidden md:block"
                    />
                </div>

                <Image
                    src="/assets/images/Vizion_illustration.jpg"
                    alt="drone-illustration"
                    width={150} // set the image width
                    height={150} // set the image height
                    className="rounded flex-shrink-0 md:hidden place-self-center mt-3"
                />

                <div className="mt-4 flex flex-row justify-between items-center h-full sm:grid-cols-1 md:grid-cols-2">
                    <div className="md:pr-10 sm:mb-8">
                        <h3 className="font-bold text-base-100 text-2xl sm:text-lg md:text-2xl lg:text-xl xl:text-2xl">Présentation</h3>
                        <p className="leading-relaxed lg:text-lg text-justify text-base-100">
                            Le drone FPV ("First Person View"), intègre une caméra qui offre au pilote une vision en temps réel à travers des lunettes FPV
                            permettant une expérience de vol immersive. <br /><br />
                            ISEP Drone est un club de drone FPV créé en 2021 par un groupe de
                            passionnés. <br />
                            Notre objectif, faire découvrir notre dicipline au plus grand nombre à travers des formations, sessions sur simulateur et sessions de vol.
                        </p>
                    </div>
                    <Image
                        src="/assets/images/Vizion_illustration.jpg"
                        alt="drone-illustration"
                        width={300} // set the image width
                        height={300} // set the image height
                        className="rounded-xl hidden md:block"
                    />
                </div>

                <a
                    href="https://www.instagram.com/vizion_bdeisep?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                    target="_blank"
                    className="place-self-center md:mt-10"
                >
                    <InstagramLogo className="w-20 h-20 transition hover:text-primary text-base-100" />
                </a>

            </div>
        </div>
    );
}

export default AssociativeCareer;