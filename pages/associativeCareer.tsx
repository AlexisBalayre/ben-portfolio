// pages/asso.tsx
import Head from 'next/head';
import { useState } from 'react';
import Image from 'next/image';
import type { NextPage } from "next";

const AssociativeCareer: NextPage = () => {
    // State to handle menu visibility on mobile
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
                <div onClick={toggleMenu} className="menu-icon cursor-pointer">
                    <i className="fas fa-bars text-xl"></i>
                </div>
                <a href="/" className="index font-bold text-lg">
                    Benjamin Balayre
                </a>
                {isMenuOpen && (
                    <ul id="menu" className="absolute top-full left-0 w-full bg-gray-800 shadow-md flex flex-col items-center">
                        <li><a href="/" className="block px-4 py-2">Accueil</a></li>
                        <li><a href="/portfolio" className="block px-4 py-2" id="page-en-cours">Portfolio</a></li>
                        <li><a href="/associations" className="block px-4 py-2">Parcours associatif</a></li>
                        <li><a href="#contacts" className="block px-4 py-2">Contacts</a></li>
                    </ul>
                )}
            </nav>
        </>
    );
}

export default AssociativeCareer;