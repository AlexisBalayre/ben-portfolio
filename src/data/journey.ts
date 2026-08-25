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
  /** Engagements associatifs : un segment par année scolaire, coupé en septembre. */
  roles?: { role: string; start: string; end: string }[];
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
 * Les projets menés en indépendant : refonte de site, produit web, boutique de
 * tirages, prestations photo. Ils alimentent le chapitre « Mes projets » de
 * l'accueil et la voie Projets de la frise.
 */
export const sideProjects = experiences.filter((entry) => entry.track === 'projects');

/**
 * Timeline des expériences : les produits et les sites livrés sont racontés
 * dans le chapitre « Mes projets », ils ne sont pas répétés ici.
 */
export const timelineExperiences = experiences.filter((entry) => entry.nature !== 'project');
