import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Search, Sparkles, Languages } from 'lucide-react';
import { Language, translations } from '../translations';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenStatusCheck: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  onOpenStatusCheck,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = translations[lang].nav;

  useEffect(() => {
    const savedTheme = localStorage.getItem('aplus-theme');
    if (savedTheme === 'light') {
      setIsLightMode(true);
      document.body.classList.add('light');
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextState = !isLightMode;
    setIsLightMode(nextState);
    if (nextState) {
      document.body.classList.add('light');
      localStorage.setItem('aplus-theme', 'light');
    } else {
      document.body.classList.remove('light');
      localStorage.setItem('aplus-theme', 'dark');
    }
  };

  const navLinks = [
    { label: t.home, href: '#home' },
    { label: t.howItWorks, href: '#how-it-works' },
    { label: t.membership, href: '#membership' },
    { label: t.courses, href: '#courses' },
    { label: t.resources, href: '#resources' },
    { label: t.about, href: '#about' },
    { label: t.contact, href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0e111a]/95 backdrop-blur-md border-b border-[#222938] py-3 shadow-lg shadow-black/20'
          : 'bg-[#090b10]/90 backdrop-blur-sm border-b border-[#1b2030] py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="relative">
            <img
              src="/images/Logo.webp"
              alt="Aplus Academy Logo"
              className="w-10 h-10 rounded-full border-2 border-[#16e016] shadow-sm shadow-[#16e016]/40 transition-transform duration-300 group-hover:scale-105"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#16e016] border-2 border-[#090b10] rounded-full animate-pulse" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1 font-['Poppins']">
              Aplus <span className="text-[#16e016]">Academy</span>
            </span>
            <span className="text-[11px] block text-emerald-400 font-medium tracking-wide">
              {lang === 'am' ? 'የትምህርት ማህበረሰብ' : 'Learning Community'}
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-300 hover:text-[#16e016] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#16e016] hover:after:w-full after:transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Language Switcher Button */}
          <button
            onClick={onToggleLang}
            type="button"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-[#172033] text-amber-300 hover:text-white border border-[#2a3652] hover:border-[#16e016]/50 transition-all cursor-pointer shadow-sm"
            title="Switch Language / ቋንቋ ቀይር"
          >
            <Languages className="w-3.5 h-3.5 text-[#16e016]" />
            <span>{t.langSwitch}</span>
          </button>

          {/* Status Check Button */}
          <button
            onClick={onOpenStatusCheck}
            type="button"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-[#151926] text-slate-300 hover:text-white border border-[#262f44] hover:border-[#16e016]/50 transition-all cursor-pointer shadow-sm"
            title={t.checkStatus}
          >
            <Search className="w-3.5 h-3.5 text-[#16e016]" />
            <span>{t.checkStatus}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            type="button"
            aria-label="Toggle dark and light mode"
            className="p-2 rounded-lg text-slate-400 hover:text-amber-400 bg-[#151926] border border-[#262f44] transition-colors cursor-pointer"
          >
            {isLightMode ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>

          {/* Primary CTA */}
          <a
            href="#register"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-[#16e016] hover:bg-[#13be13] text-black shadow-md shadow-[#16e016]/20 hover:shadow-lg hover:shadow-[#16e016]/40 transition-all transform hover:-translate-y-0.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t.joinNow}</span>
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex sm:hidden items-center gap-2">
          {/* Language Toggle Mobile */}
          <button
            onClick={onToggleLang}
            type="button"
            className="px-2.5 py-1.5 rounded-lg bg-[#172033] text-amber-300 border border-[#2a3652] text-xs font-bold"
          >
            {lang === 'am' ? 'EN' : 'አማ'}
          </button>

          <button
            onClick={onOpenStatusCheck}
            type="button"
            className="p-2 rounded-lg bg-[#151926] text-[#16e016] border border-[#262f44]"
            title="Check Status"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="p-2 rounded-lg text-slate-300 hover:text-white bg-[#151926] border border-[#262f44]"
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e111a] border-b border-[#23293a] px-4 pt-3 pb-6 animate-fadeIn">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-base font-medium text-slate-200 hover:text-[#16e016] rounded-md hover:bg-[#161c2b] transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-4 border-t border-[#23293a] flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenStatusCheck();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold bg-[#161d2d] text-slate-200 border border-[#2a344d]"
              >
                <Search className="w-4 h-4 text-[#16e016]" />
                <span>{t.checkStatus}</span>
              </button>

              <a
                href="#register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-bold bg-[#16e016] text-black shadow-lg shadow-[#16e016]/30 text-center"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t.joinNow}</span>
              </a>

              <div className="flex justify-between items-center px-2 pt-2">
                <button
                  onClick={onToggleLang}
                  className="flex items-center gap-1.5 text-xs font-bold text-amber-300 px-3 py-1.5 rounded-lg bg-[#161d2d]"
                >
                  <Languages className="w-3.5 h-3.5 text-[#16e016]" />
                  <span>{t.langSwitch}</span>
                </button>

                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 text-xs font-medium text-slate-300 px-3 py-1.5 rounded-lg bg-[#161d2d]"
                >
                  {isLightMode ? (
                    <>
                      <Moon className="w-3.5 h-3.5 text-indigo-400" /> Dark Mode
                    </>
                  ) : (
                    <>
                      <Sun className="w-3.5 h-3.5 text-amber-400" /> Light Mode
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
