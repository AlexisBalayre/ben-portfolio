import React from 'react';

const LatestProject = () => (
  <div className="latest-project w-full text-center bg-base-content pt-10 pb-10 min-h-fit p-10 relative z-10">
    <div className="relative z-10 section-avec-trait">
      <h2 className="text-3xl font-bold text-base-100">Mon dernier projet</h2>
      <hr className="trait mx-auto" />

      <p className="mt-4 mb-6 px-4 md:px-20 text-base-100">
        En août dernier, j’ai eu la chance de voyager en Islande. 
        De cette aventure est né <span className="font-semibold">Element of Iceland</span>, 
        un montage qui capture l’intensité et la beauté brute de ce voyage 
        au cœur des paysages islandais.
      </p>

      <div className="relative pt-[56.25%] rounded-xl scale-90 md:scale-80 mx-auto shadow-[0_25px_70px_rgba(0,255,255,0.25),0_20px_60px_rgba(128,0,255,0.2)]">
        <iframe
          className="absolute top-0 left-0 w-full h-full rounded-xl"
          src="https://www.youtube.com/embed/7w186-bCRJM?si=H0H3cEsQHfjfVL8h"
          title="YouTube video player"
          frameBorder="0"
          allowFullScreen
          style={{ aspectRatio: '16 / 9' }}
        />
      </div>
    </div>
  </div>
);

export default LatestProject;