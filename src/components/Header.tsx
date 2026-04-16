import React from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { name: 'Início', href: '#inicio' },
    { name: 'Ferramentas', href: '#ferramentas' },
    { name: 'Suite Pro', href: '#creator-pro' },
    { name: 'Como funciona', href: '#como-funciona' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border-main">
      <div className="max-w-7xl mx-auto px-10">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <span className="text-xl font-sans font-extrabold tracking-tighter uppercase">Nexus<span className="text-brand-accent">Hub</span></span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[13px] font-medium text-brand-secondary hover:text-brand-primary transition-colors flex items-center gap-1.5"
              >
                {link.name}
                {link.name === 'Suite Pro' && (
                  <span className="px-1 py-0.5 bg-brand-accent text-[8px] rounded text-white font-bold">NEW</span>
                )}
              </a>
            ))}
            <button className="btn-primary">
              Acessar Tudo
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-brand-secondary hover:text-white transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-bg-dark border-b border-white/5 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-4 text-base font-medium text-brand-secondary hover:text-white hover:bg-white/5 rounded-lg transition-all flex items-center justify-between"
                >
                  {link.name}
                  {link.name === 'Suite Pro' && (
                    <span className="px-2 py-1 bg-brand-accent text-[10px] rounded text-white font-bold">NEW</span>
                  )}
                </a>
              ))}
              <div className="pt-4">
                <button className="w-full bg-white text-bg-dark px-6 py-4 rounded-xl text-base font-semibold hover:bg-white/90 transition-all">
                  Começar Agora
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
