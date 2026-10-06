import React from 'react';
import { Youtube, Send, Shield, Lock, Search } from 'lucide-react';
import { Language, translations } from '../translations';

interface FooterProps {
  lang: Language;
  onOpenAdmin: () => void;
  onOpenStatusCheck: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onOpenAdmin,
  onOpenStatusCheck,
  onOpenTerms,
}) => {
  const t = translations[lang].footer;
  const navT = translations[lang].nav;

  return (
    <footer className="bg-[#080a0f] border-t border-[#1a2030] text-slate-400 py-16 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#181f2f]">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/Logo.webp"
                alt="Aplus Academy Logo"
                className="w-10 h-10 rounded-full border border-[#16e016]"
              />
              <span className="text-xl font-bold text-white font-['Poppins']">
                Aplus <span className="text-[#16e016]">Academy</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              {t.desc}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.youtube.com/@aplusacademy1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#141824] hover:bg-red-600/20 text-slate-400 hover:text-red-500 border border-[#232a3d] flex items-center justify-center transition-all"
                title="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://t.me/aplusacademy11"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#141824] hover:bg-sky-600/20 text-slate-400 hover:text-sky-400 border border-[#232a3d] flex items-center justify-center transition-all"
                title="Telegram Channel"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="https://www.tiktok.com/@yitbarekk21"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#141824] hover:bg-pink-600/20 text-slate-400 hover:text-pink-400 border border-[#232a3d] flex items-center justify-center transition-all text-xs font-bold"
                title="TikTok"
              >
                TT
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t.quickNav}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" className="hover:text-[#16e016] transition-colors">
                  {navT.home}
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-[#16e016] transition-colors">
                  {navT.howItWorks}
                </a>
              </li>
              <li>
                <a href="#membership" className="hover:text-[#16e016] transition-colors">
                  {navT.membership}
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-[#16e016] transition-colors">
                  {navT.courses}
                </a>
              </li>
              <li>
                <a href="#resources" className="hover:text-[#16e016] transition-colors">
                  {navT.resources}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#16e016] transition-colors">
                  {navT.about}
                </a>
              </li>
            </ul>
          </div>

          {/* Member Tools & Legal */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t.studentTools}
            </h4>
            <div className="flex flex-col gap-2.5 text-xs">
              <button
                onClick={onOpenStatusCheck}
                className="flex items-center gap-2 text-left hover:text-[#16e016] transition-colors cursor-pointer"
              >
                <Search className="w-3.5 h-3.5 text-[#16e016]" />
                <span>{t.checkStatus}</span>
              </button>

              <button
                onClick={onOpenTerms}
                className="flex items-center gap-2 text-left hover:text-[#16e016] transition-colors cursor-pointer"
              >
                <Shield className="w-3.5 h-3.5 text-slate-400" />
                <span>{t.terms}</span>
              </button>

              <button
                onClick={onOpenAdmin}
                className="flex items-center gap-2 text-left text-slate-500 hover:text-amber-400 transition-colors pt-2 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-amber-500" />
                <span>{t.adminPortal}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>{t.copyright}</p>
          <p className="flex items-center gap-1 text-emerald-400 font-medium">
            {t.badge}
          </p>
        </div>
      </div>
    </footer>
  );
};
