import Image from 'next/image';

interface Logo {
  src: string;
  alt: string;
}

interface Skill {
  title: string;
  logos: Logo[];
  description: string;
  image: {
    src: string;
    alt: string;
  };
  imageDescription: string;
}

const SkillCard: React.FC<{ skill: Skill }> = ({ skill }) => (
  <div className="card bg-base-100 shadow-lg transition-shadow duration-300 hover:shadow-xl h-full rounded-xl">
    <div className="card-body">
      <h3 className="card-title text-3xl">{skill.title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
        {skill.logos.map((logo, logoIndex) => (
          <div key={logoIndex} className="animate-pulse">
            <Image
              className="rounded-xl"
              src={logo.src}
              alt={logo.alt}
              width={64}
              height={64}
              layout="responsive"
            />
          </div>
        ))}
      </div>
      <p className="text-lg">{skill.description}</p>
      <div className="my-6">
        <div className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
          <Image
            className="rounded-xl"
            src={skill.image.src}
            alt={skill.image.alt}
            width={640}
            height={360}
            layout="responsive"
          />
        </div>
      </div>
      <p className="text-center italic">{skill.imageDescription}</p>
    </div>
  </div>
);

export default SkillCard;