import React from 'react';
import { Award, Target, HeartHandshake, Youtube, Send } from 'lucide-react';
import { Language, translations } from '../translations';

interface AboutSectionProps {
  lang: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang }) => {
  const t = translations[lang].about;

  return (
    <section id="about" className="py-24 bg-[#0c0f18] border-t border-[#1d2334] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Founder Image & Visual Badges */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group">
              {/* Outer halo */}
              <div className="absolute -inset-2 bg-gradient-to-r from-[#16e016]/40 to-amber-500/40 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition duration-700" />

              <div className="relative bg-[#121623] p-3 rounded-3xl border border-[#232b3f] shadow-2xl">
                <picture>
                  <source srcSet="/images/profile.webp" type="image/webp" />
                  <img
                    src="/images/profile.jpg"
                    alt="Yitbarek Kifleyohans - Founder of Aplus Academy"
                    className="w-72 sm:w-80 h-72 sm:h-80 object-cover rounded-2xl shadow-inner border border-[#16e016]/30"
                  />
                </picture>

                <div className="mt-4 text-center pb-2">
                  <h4 className="text-lg font-bold text-white font-['Poppins']">
                    {t.founderTitle}
                  </h4>
                  <p className="text-xs text-[#16e016] font-semibold">
                    {t.founderRole}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick social channel badges */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://www.youtube.com/@aplusacademy1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#181d2c] border border-[#262f44] text-xs text-slate-300 hover:text-white transition-colors"
              >
                <Youtube className="w-3.5 h-3.5 text-red-500" />
                <span>11.4K Subscribers</span>
              </a>

              <a
                href="https://t.me/aplusacademy11"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#181d2c] border border-[#262f44] text-xs text-slate-300 hover:text-white transition-colors"
              >
                <Send className="w-3.5 h-3.5 text-sky-400" />
                <span>Telegram Channel</span>
              </a>
            </div>
          </div>

          {/* Mission & Story */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[#16e016] text-xs font-semibold mb-4">
              <Award className="w-3.5 h-3.5" />
              <span>{t.badge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6 font-['Poppins']">
              {t.title} <span className="text-[#16e016]">{t.titleHighlight}</span>
            </h2>

            {/* Founder Quote Card */}
            <div className="bg-[#121623] border-l-4 border-[#16e016] rounded-r-2xl p-5 sm:p-6 mb-6 shadow-md border-y border-r border-[#1f2738]">
              <p className="text-sm sm:text-base text-slate-200 italic leading-relaxed font-normal">
                {t.quote}
              </p>
              <span className="block mt-3 text-xs font-semibold text-slate-400">
                {t.founderLabel}
              </span>
            </div>

            <p className="text-sm sm:text-base text-slate-300 mb-6 leading-relaxed">
              {t.body}
            </p>

            {/* 2 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#121623] border border-[#202738]">
                <div className="flex items-center gap-2 mb-1.5">
                  <Target className="w-4 h-4 text-amber-400" />
                  <h4 className="text-sm font-bold text-white">{t.pillar1Title}</h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {t.pillar1Desc}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#121623] border border-[#202738]">
                <div className="flex items-center gap-2 mb-1.5">
                  <HeartHandshake className="w-4 h-4 text-[#16e016]" />
                  <h4 className="text-sm font-bold text-white">{t.pillar2Title}</h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {t.pillar2Desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
