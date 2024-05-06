import React from 'react';

const LatestProject = () => (
  <div className="w-full text-center bg-base-content pt-10 pb-10 min-h-fit p-10 relative z-10">
    <div className="relative z-10">
      <h2 className="text-3xl font-bold text-base-100">Mon dernier projet</h2>
      <hr className="trait" />
      <p className="mt-4 mb-6 px-4 md:px-20 text-base-100">
        En juillet 2023, j&apos;ai eu l&apos;opportunité de voyager au Japon. Pendant ce séjour, j&apos;ai réalisé un aftermovie qui retrace mon voyage, capturant ainsi chaque moment de cette expérience mémorable.
      </p>
      <div className="relative pt-[56.25%] rounded-xl">
        <iframe
          className="absolute top-0 left-0 w-full h-full rounded-xl"
          src="https://www.youtube.com/embed/OH5EjkYqK0I?si=njksvW21v-lahXZo"
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