// pages/asso.tsx
import type { NextPage } from "next";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { InstagramLogo } from "~~/public/assets/svg/InstagramLogo";

const AssociativeCareer: NextPage = () => {
  const { t } = useTranslation("common");

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <div className="hero min-h-screen bg-fixed relative">
        <div>
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
            <h1 className="text-6xl font-bold mb-4 text-white">{t("associative.title")}</h1>
            <p className="mb-6 text-white">
              {t("associative.hero_desc")}
            </p>
          </div>
        </div>
      </div>

      {/* ISEP Live */}
      <div className="w-full p-10 md:px-40 grid">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-center">{t("associative.iseplive.title")}</h2>
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
            <h3 className="font-bold text-2xl md:text-2xl lg:text-xl xl:text-2xl">
              {t("associative.iseplive.presentation_title")}
            </h3>
            <p className="leading-relaxed lg:text-lg text-justify" dangerouslySetInnerHTML={{ __html: t("associative.iseplive.presentation_desc") }} />
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
            <h3 className="font-bold text-2xl md:text-2xl lg:text-xl xl:text-2xl">
              {t("associative.iseplive.iseplife_title")}
            </h3>
            <p className="leading-relaxed lg:text-lg text-justify">
              {t("associative.iseplive.iseplife_desc")}
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
            <h3 className="font-bold text-2xl md:text-2xl lg:text-xl xl:text-2xl">
              {t("associative.iseplive.path_title")}
            </h3>
            <p className="leading-relaxed lg:text-lg text-justify" dangerouslySetInnerHTML={{ __html: t("associative.iseplive.path_desc") }} />
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

        <div className="flex justify-center gap-4 md:mt-10">
          <a
            href="https://www.instagram.com/iseplive?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
          >
            <InstagramLogo className="w-20 h-20 transition hover:text-primary" />
          </a>
          <a href="https://www.youtube.com/@iseplive" target="_blank">
            <svg
              className="w-20 h-20 transition hover:text-primary text-black"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M23.498 6.186a2.986 2.986 0 00-2.101-2.11C19.513 3.5 12 3.5 12 3.5s-7.513 0-9.397.576a2.986 2.986 0 00-2.101 2.11C0 8.069 0 12 0 12s0 3.931.502 5.814a2.986 2.986 0 002.101 2.11C4.487 20.5 12 20.5 12 20.5s7.513 0 9.397-.576a2.986 2.986 0 002.101-2.11C24 15.931 24 12 24 12s0-3.931-.502-5.814zM9.75 15.568V8.432L15.818 12 9.75 15.568z" />
            </svg>
          </a>
        </div>
      </div>

      {/* VIZION BDE */}
      <div className="bg-base-content w-full p-10 md:px-40 grid">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-base-100 text-center">
            {t("associative.vizion.title")}
          </h2>
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
            <h3 className="font-bold text-base-100 text-2xl sm:text-lg md:text-2xl lg:text-xl xl:text-2xl">
              {t("associative.vizion.presentation_title")}
            </h3>
            <p className="leading-relaxed lg:text-lg text-justify text-base-100" dangerouslySetInnerHTML={{ __html: t("associative.vizion.presentation_desc") }} />
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
            <h3 className="font-bold text-base-100 text-2xl sm:text-lg md:text-2xl lg:text-xl xl:text-2xl">
              {t("associative.vizion.path_title")}
            </h3>
            <p className="leading-relaxed lg:text-lg text-justify text-base-100" dangerouslySetInnerHTML={{ __html: t("associative.vizion.path_desc") }} />
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

      {/* ISEP Drone */}
      <div className="bg-white w-full p-10 md:px-40 grid">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-black text-center">
            {t("associative.isepdrone.title")}
          </h2>
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
            <h3 className="font-bold text-black text-2xl sm:text-lg md:text-2xl lg:text-xl xl:text-2xl">
              {t("associative.isepdrone.presentation_title")}
            </h3>
            <p className="leading-relaxed lg:text-lg text-justify text-black" dangerouslySetInnerHTML={{ __html: t("associative.isepdrone.presentation_desc") }} />
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
          <h3 className="font-bold text-black text-2xl mb-10">{t("associative.isepdrone.path_title")}</h3>
          <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical text-black">
            <li>
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-start md:text-end mb-10">
                <time className="font-mono italic">2023</time>
                <div className="text-lg font-black">{t("associative.isepdrone.timeline.president")}</div>
              </div>
              <hr className="bg-primary" />
            </li>
            <li>
              <hr className="bg-primary" />
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-end mb-10">
                <time className="font-mono italic">2022</time>
                <div className="text-lg font-black">
                  {t("associative.isepdrone.timeline.comm_manager")}
                </div>
              </div>
              <hr className="bg-primary" />
            </li>
            <li>
              <hr className="bg-primary" />
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-start md:text-end mb-10">
                <time className="font-mono italic">2021</time>
                <div className="text-lg font-black">{t("associative.isepdrone.timeline.founder")}</div>
              </div>
              <hr className="bg-primary" />
            </li>
          </ul>
        </div>

        <div className="mt-10 flex flex-row justify-between items-center h-full sm:grid-cols-1 md:grid-cols-2">
          <div className="md:pr-10 sm:mb-8">
            <h3 className="font-bold text-black text-2xl sm:text-lg md:text-2xl lg:text-xl xl:text-2xl">
              {t("associative.isepdrone.presentation_title")}
            </h3>

            <p className="text-black leading-relaxed lg:text-lg text-justify" dangerouslySetInnerHTML={{ __html: t("associative.isepdrone.path_desc") }} />
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
          <InstagramLogo className="w-20 h-20 transition hover:text-primary text-black" />
        </a>
      </div>
    </div>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};

export default AssociativeCareer;
