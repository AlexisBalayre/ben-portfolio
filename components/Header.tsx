import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AcademicCapIcon,
  Bars3Icon,
  EnvelopeIcon,
  CameraIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useOutsideClick } from "~~/hooks";
import { useRouter } from 'next/router';

interface HeaderMenuLink {
  label: string;
  section: string;
  icon?: React.ReactNode;
}

export const menuLinks: HeaderMenuLink[] = [
  {
    label: "About Me",
    section: "",
    icon: <UserIcon className="h-4 w-4" />,
  },
  {
    label: "Portfolio",
    section: "portfolio",
    icon: <CameraIcon className="h-4 w-4" />,
  },
  {
    label: "Associative Career",
    section: "associativeCareer",
    icon: <AcademicCapIcon className="h-4 w-4" />,
  },
  {
    label: "Contact Details",
    section: "contact",
    icon: <EnvelopeIcon className="h-4 w-4" />,
  },
];

export const HeaderMenuLinks = () => {
  const [isActive, setIsActive] = useState({
    aboutMe: true,
    portfolio: false,
    associativeCareer: false,
    contact: false,
  });

  const router = useRouter();

  const handleActive = (section: string) => {
    if (section !== "contact") {
      setIsActive({
        aboutMe: false,
        portfolio: false,
        associativeCareer: false,
        contact: false,
        [section]: true,
      });
    }

    if (section === "contact") {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    } else {
      router.push(`/${section}`);
    }
  }

  useEffect(() => {
    const currentSection = router.pathname.split("/")[1];
    setIsActive({
      aboutMe: false,
      portfolio: false,
      associativeCareer: false,
      contact: false,
      [currentSection]: true,
    });
  }, [router.pathname]);

  return (
    <>
      {menuLinks.map(({ label, section, icon }) => {
        return (
          <li key={section}>
            <span
              onClick={() => handleActive(section)}
              className={`${isActive[section as keyof typeof isActive] ? "bg-primary shadow-md text-base-100" : ""
                }
                hover:bg-info hover:shadow-md cursor-pointer focus:!bg-accent py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col`}
            >
              {icon}
              <span>{label}</span>
            </span>
          </li>
        );
      })}
    </>
  );
};

/**
 * Site header
 */
export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );

  return (
    <div className="fixed top-0 navbar bg-base-100 min-h-0 flex-shrink-0 justify-between z-20 shadow-md shadow-primary px-0 sm:px-2=">
      <div className="navbar-start w-auto lg:w-1/2">
        <div className="lg:hidden dropdown" ref={burgerMenuRef}>
          <label
            tabIndex={0}
            className={`ml-1 btn btn-ghost ${isDrawerOpen ? "hover:bg-secondary" : "hover:bg-transparent"}`}
            onClick={() => {
              setIsDrawerOpen(prevIsOpenState => !prevIsOpenState);
            }}
          >
            <Bars3Icon className="h-1/2" />
          </label>
          {isDrawerOpen && (
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              onClick={() => {
                setIsDrawerOpen(false);
              }}
            >
              <HeaderMenuLinks />
            </ul>
          )}
        </div>
        <Link href="/" passHref className="hidden lg:flex items-center gap-2 ml-4 mr-6 shrink-0">
          <div className="flex flex-col">
            <span className="font-bold leading-tight">Benjamin Balayre</span>
            <span className="text-xs">ISEP Student</span>
          </div>
        </Link>
        <ul className="hidden lg:flex lg:flex-nowrap menu menu-horizontal px-1 gap-2">
          <HeaderMenuLinks />
        </ul>
      </div>
      <div className="flex text-center pr-5">
        <a href="/documents/CV.pdf" className="bg-primary hover:bg-info text-white px-4 py-2 rounded-lg transition duration-300" download>Download Resume</a>
      </div>
    </div>
  );
};