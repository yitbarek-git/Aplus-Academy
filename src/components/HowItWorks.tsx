import React from 'react';
import { UserCheck, CreditCard, UploadCloud, ShieldCheck, Send, BookOpenCheck } from 'lucide-react';
import { Language, translations } from '../translations';

interface HowItWorksProps {
  lang: Language;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ lang }) => {
  const t = translations[lang].howItWorks;

  const iconList = [UserCheck, CreditCard, UploadCloud, ShieldCheck, Send, BookOpenCheck];
  const colorList = [
    'from-blue-500/20 to-blue-600/5 text-blue-400 border-blue-500/30',
    'from-amber-500/20 to-amber-600/5 text-amber-400 border-amber-500/30',
    'from-emerald-500/20 to-emerald-600/5 text-emerald-400 border-emerald-500/30',
    'from-purple-500/20 to-purple-600/5 text-purple-400 border-purple-500/30',
    'from-[#16e016]/20 to-[#16e016]/5 text-[#16e016] border-[#16e016]/30',
    'from-cyan-500/20 to-cyan-600/5 text-cyan-400 border-cyan-500/30',
  ];

  return (
    <section id="how-it-works" className="py-20 bg-[#0c0e16] border-y border-[#1c2232] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-3">
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Poppins']">
            {t.title} <span className="text-[#16e016]">{t.titleHighlight}</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {t.steps.map((item, idx) => {
            const Icon = iconList[idx] || UserCheck;
            const color = colorList[idx] || colorList[0];
            return (
              <div
                key={item.step}
                className="relative bg-[#131724] border border-[#21293b] hover:border-[#2f3b55] rounded-2xl p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 group shadow-lg"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} border flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-black text-slate-600 group-hover:text-slate-400 transition-colors font-mono">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#16e016] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Core reminder banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#141b2a] via-[#162033] to-[#141b2a] border border-[#23304a] text-center max-w-3xl mx-auto">
          <p className="text-sm sm:text-base text-slate-200">
            {t.banner}
          </p>
        </div>
      </div>
    </section>
  );
};
