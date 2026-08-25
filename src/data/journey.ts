import associationsData from '~~/public/assets/data/associations.json';
import educationData from '~~/public/assets/data/formation.json';
import experiencesData from '~~/public/assets/data/experiences.json';

/**
 * Forme commune des entrées de parcours. Les fichiers JSON ne portent que la
 * structure. Chaque libellé vient des locales, sous `formation.<id>.*` ou
 * `experiences.<id>.*`.
 */
export interface JourneyItem {
  id: string;
  logo: string;
  period: string;
  /** Surtitre de la barre dans la frise, clé de `journey.nature.*`. */
  nature?: string;
  /** `"projects"` : rattaché à la voie Projets de la frise. */
  track?: string;
  /** `"AAAA-MM"` ; `end` est une borne exclusive. */
  start?: string;
  end?: string;
  ongoing?: boolean;
  /** Stage mené à l'intérieur d'un cursus : il rejoint la voie Formation. */
  integratedIn?: string;
  url?: string;
  exchanges?: {
    id: string;
    logo: string;
    period: string;
    flag?: string;
    nature?: string;
    start?: string;
    end?: string;
  }[];
}

export const education = educationData as JourneyItem[];
export const experiences = experiencesData as JourneyItem[];

/** Engagements associatifs : voie dédiée dans la frise, section dédiée sur l'accueil. */
export const associations = associationsData as JourneyItem[];

/**
 * Les trois activités image : prestations, boutique de tirages, produit web.
 * Elles alimentent le chapitre « L'image » et la voie Projets de la frise.
 */
export const imageProjects = experiences.filter((entry) => entry.track === 'projects');

/**
 * Timeline des expériences : les produits (ReLive, Benevolence) sont racontés
 * dans le chapitre « L'image », ils ne sont pas répétés ici.
 */
export const timelineExperiences = experiences.filter((entry) => entry.nature !== 'project');
