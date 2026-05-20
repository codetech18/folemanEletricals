import { useState } from 'react';
import { contact, LogoMark } from '../utils/brand';

const links = [
  { href: '/#services', label: 'Services' },
  { href: '/works', label: 'Our Work' },
  { href: '/#process', label: 'Process' },
  { href: '/#contact', label: 'Contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 py-4 sm:px-6">
      <nav className="relative mx-auto max-w-7xl rounded-[1.75rem] border border-white/10 bg-black/35 px-4 py-3 text-sm text-white/80 shadow-inner-line backdrop-blur-xl md:rounded-full">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 text-white" aria-label="Foleman Electricals home" data-cursor="hover" onClick={closeMenu}>
            <LogoMark className="h-9 w-9 text-foleman-yellow" />
            <span className="font-display text-2xl tracking-normal">Foleman</span>
          </a>
          <div className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <a key={link.href} href={link.href} data-cursor="hover" className="transition hover:text-foleman-yellow">
                {link.label}
              </a>
            ))}
          </div>
          <a
            href={contact.whatsapp}
            data-cursor="hover"
            className="hidden rounded-full bg-foleman-yellow px-4 py-2 font-bold text-black transition hover:shadow-glow md:inline-flex"
          >
            Call Now
          </a>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition hover:border-foleman-yellow hover:text-foleman-yellow md:hidden"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((current) => !current)}
          >
            <span className="relative h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-px w-5 bg-current transition-transform duration-300 ${
                  isOpen ? 'translate-y-2 rotate-45' : ''
                }`}
              />
              <span
                className={`absolute left-0 top-2 h-px w-5 bg-current transition-opacity duration-300 ${
                  isOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-px w-5 bg-current transition-transform duration-300 ${
                  isOpen ? '-translate-y-2 -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>
        <div
          className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 md:hidden ${
            isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="min-h-0">
            <div className="mt-4 border-t border-white/10 pt-3">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="block py-3 font-display text-4xl leading-none text-white transition hover:text-foleman-yellow"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={contact.whatsapp}
                onClick={closeMenu}
                className="mt-3 inline-flex rounded-full bg-foleman-yellow px-5 py-3 font-bold text-black"
              >
                WhatsApp Foleman
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
