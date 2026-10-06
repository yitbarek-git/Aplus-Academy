import React from 'react';
import { Youtube, Send, Mail, MessageSquare, ExternalLink } from 'lucide-react';
import { Language, translations } from '../translations';

interface ContactSectionProps {
  lang: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang }) => {
  const t = translations[lang].contact;

  return (
    <section id="contact" className="py-24 bg-[#090b10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#16e016]/10 border border-[#16e016]/20 text-[#16e016] text-xs font-semibold mb-3">
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-['Poppins']">
            {t.title} <span className="text-[#16e016]">{t.titleHighlight}</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            {t.subtitle}
          </p>
        </div>

        {/* Social Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
          {/* YouTube */}
          <a
            href="https://www.youtube.com/@aplusacademy1"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-3xl bg-gradient-to-br from-red-950/40 via-[#131622] to-[#111520] border border-red-900/30 hover:border-red-500/50 transition-all duration-300 hover:-translate-y-1 group shadow-lg"
          >
            <div className="w-12 h-12 rounded-2xl bg-red-600/20 text-red-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Youtube className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-red-400 transition-colors">
              {t.youtubeTitle}
            </h3>
            <p className="text-xs text-slate-400 mt-1 mb-4">
              {t.youtubeSub}
            </p>
            <span className="text-xs font-semibold text-red-400 inline-flex items-center gap-1">
              <span>@aplusacademy1</span>
              <ExternalLink className="w-3 h-3" />
            </span>
          </a>

          {/* Telegram Channel */}
          <a
            href="https://t.me/aplusacademy11"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-3xl bg-gradient-to-br from-sky-950/40 via-[#131622] to-[#111520] border border-sky-900/30 hover:border-sky-500/50 transition-all duration-300 hover:-translate-y-1 group shadow-lg"
          >
            <div className="w-12 h-12 rounded-2xl bg-sky-600/20 text-sky-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Send className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-sky-400 transition-colors">
              {t.telegramTitle}
            </h3>
            <p className="text-xs text-slate-400 mt-1 mb-4">
              {t.telegramSub}
            </p>
            <span className="text-xs font-semibold text-sky-400 inline-flex items-center gap-1">
              <span>@aplusacademy11</span>
              <ExternalLink className="w-3 h-3" />
            </span>
          </a>

          {/* TikTok */}
          <a
            href="https://www.tiktok.com/@yitbarekk21"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-3xl bg-gradient-to-br from-pink-950/30 via-[#131622] to-[#111520] border border-pink-900/30 hover:border-pink-500/50 transition-all duration-300 hover:-translate-y-1 group shadow-lg"
          >
            <div className="w-12 h-12 rounded-2xl bg-pink-600/20 text-pink-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-pink-400 transition-colors">
              {t.tiktokTitle}
            </h3>
            <p className="text-xs text-slate-400 mt-1 mb-4">
              {t.tiktokSub}
            </p>
            <span className="text-xs font-semibold text-pink-400 inline-flex items-center gap-1">
              <span>@yitbarekk21</span>
              <ExternalLink className="w-3 h-3" />
            </span>
          </a>

          {/* Direct Support */}
          <a
            href="https://t.me/Yitbarek_2"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-3xl bg-gradient-to-br from-emerald-950/40 via-[#131622] to-[#111520] border border-emerald-900/30 hover:border-[#16e016]/50 transition-all duration-300 hover:-translate-y-1 group shadow-lg"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-[#16e016] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Send className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-[#16e016] transition-colors">
              {t.supportTitle}
            </h3>
            <p className="text-xs text-slate-400 mt-1 mb-4">
              {t.supportSub}
            </p>
            <span className="text-xs font-semibold text-[#16e016] inline-flex items-center gap-1">
              <span>@Yitbarek_2</span>
              <ExternalLink className="w-3 h-3" />
            </span>
          </a>
        </div>

        {/* Quick Contact Banner */}
        <div className="p-8 rounded-3xl bg-[#121623] border border-[#232b3e] max-w-3xl mx-auto text-center">
          <h3 className="text-xl font-bold text-white mb-2">{t.bannerTitle}</h3>
          <p className="text-xs sm:text-sm text-slate-300 mb-6">
            {t.bannerSub}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://t.me/Yitbarek_2"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-[#16e016] text-black font-bold text-xs sm:text-sm hover:bg-[#12be12] transition-colors flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{t.bannerTgBtn}</span>
            </a>
            <a
              href="mailto:ykifleyohans@gmail.com"
              className="px-6 py-3 rounded-full bg-[#171d2b] text-slate-200 border border-[#2b354b] hover:text-white font-semibold text-xs sm:text-sm transition-colors flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-emerald-400" />
              <span>ykifleyohans@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
