import type { SVGProps } from 'react';

type LogoMarkProps = SVGProps<SVGSVGElement> & {
  title?: string;
};

export function LogoMark({ title = 'Foleman Electricals', ...props }: LogoMarkProps) {
  return (
    <svg viewBox="0 0 120 120" role="img" aria-label={title} {...props}>
      <title>{title}</title>
      <circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" strokeWidth="7" />
      <path
        d="M43 88V31h39M43 59h31"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="11"
      />
      <path
        d="M31 75 87 43"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="6"
      />
      <path d="m81 34 18 3-9 16Z" fill="currentColor" />
    </svg>
  );
}

export const contact = {
  phone: '+2347030076345',
  phoneDisplay: '+234 703 007 6345',
  email: 'eisrael378@gmail.com',
  instagram: '@foleman_electricals',
  whatsapp: 'https://wa.me/2347030076345',
};
