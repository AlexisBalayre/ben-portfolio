/**
 * Boutons et liens d'action : géométrie unique sur tout le site.
 *
 * `variant` porte le poids visuel, `tone` indique la surface sur laquelle
 * l'action est posée (claire ou sombre). Rien d'autre : pas de bouton
 * inventé au cas par cas dans les pages.
 */
export type ActionVariant = 'solid' | 'outline' | 'quiet';
export type ActionTone = 'light' | 'dark';
export type ActionSize = 'md' | 'sm';

const BASE =
  'group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold tracking-wide ' +
  'transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

const SIZE: Record<ActionSize, string> = {
  md: 'min-h-[44px] px-6 text-sm',
  sm: 'min-h-[44px] px-4 text-xs',
};

const STYLE: Record<ActionTone, Record<ActionVariant, string>> = {
  light: {
    solid:
      'bg-primary text-white shadow-sm hover:bg-secondary hover:shadow-lg hover:-translate-y-0.5 focus-visible:ring-primary focus-visible:ring-offset-base-100',
    outline:
      'border-[1.5px] border-primary/35 text-primary hover:border-primary hover:bg-primary hover:text-white hover:-translate-y-0.5 focus-visible:ring-primary focus-visible:ring-offset-base-100',
    quiet:
      'text-primary hover:text-secondary focus-visible:ring-primary focus-visible:ring-offset-base-100',
  },
  dark: {
    solid:
      'bg-white text-secondary shadow-sm hover:bg-accent hover:text-white hover:-translate-y-0.5 focus-visible:ring-white focus-visible:ring-offset-secondary',
    outline:
      'border-[1.5px] border-white/30 text-white hover:border-white hover:bg-white hover:text-secondary hover:-translate-y-0.5 focus-visible:ring-white focus-visible:ring-offset-secondary',
    quiet:
      'text-white/70 hover:text-white focus-visible:ring-white focus-visible:ring-offset-secondary',
  },
};

export const actionClasses = (
  variant: ActionVariant = 'solid',
  tone: ActionTone = 'light',
  size: ActionSize = 'md',
  extra = '',
) => [BASE, SIZE[size], STYLE[tone][variant], extra].filter(Boolean).join(' ');
