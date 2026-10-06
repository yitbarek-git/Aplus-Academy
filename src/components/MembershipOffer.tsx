import React from 'react';
import { Check, X, Sparkles, Shield, Send, ArrowRight } from 'lucide-react';
import { AppConfig } from '../types';
import { Language, translations } from '../translations';

interface MembershipOfferProps {
  lang: Language;
  config: AppConfig | null;
}

export const MembershipOffer: React.FC<MembershipOfferProps> = ({ lang, config }) => {
  const t = translations[lang].membership;
  const fee = config?.membershipFeeETB || '400';

  return (
    <section id="membership" className="py-24 bg-[#090b10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16e016]/10 border border-[#16e016]/20 text-[#16e016] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-['Poppins']">
            {t.title} <span className="text-[#16e016]">{t.titleHighlight}</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            {t.subtitle}
          </p>
        </div>

        {/* Pricing & Benefit Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          {/* Main Membership Card */}
          <div className="lg:col-span-7 bg-gradient-to-b from-[#151a28] to-[#10141f] rounded-3xl p-8 sm:p-10 border-2 border-[#16e016]/50 shadow-2xl relative flex flex-col justify-between">
            <div className="absolute -top-3.5 right-8 bg-[#16e016] text-black text-xs font-extrabold uppercase px-3 py-1 rounded-full shadow-md">
              {t.popularBadge}
            </div>

            <div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl sm:text-5xl font-black text-white font-['Poppins']">
                  {fee} <span className="text-xl sm:text-2xl font-bold text-[#16e016]">{t.currency}</span>
                </span>
                <span className="text-sm font-semibold text-slate-400">{t.period}</span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-400 font-medium mb-6">
                {t.tagline}
              </p>

              <div className="h-px bg-[#232c3f] my-6" />

              <h3 className="text-base font-bold text-white mb-4">{t.includedTitle}</h3>
              <ul className="space-y-3.5 text-sm text-slate-200 mb-8">
                {t.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="p-1 rounded-full bg-[#16e016]/10 text-[#16e016] shrink-0 mt-0.5">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <a
                href="#register"
                className="w-full py-4 rounded-xl font-bold text-base bg-[#16e016] hover:bg-[#12be12] text-black shadow-lg shadow-[#16e016]/25 hover:shadow-xl hover:shadow-[#16e016]/40 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
              >
                <span>{t.ctaButton}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-slate-400">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t.securitySub}</span>
              </div>
            </div>
          </div>

          {/* Delivery & Community Info Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Telegram Learning Hub Card */}
            <div className="bg-[#121623] border border-[#232b3d] rounded-3xl p-7 flex-1 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mb-5">
                  <Send className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{t.telegramHubTitle}</h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  {t.telegramHubDesc}
                </p>
                <div className="space-y-2 text-xs text-slate-400">
                  <div className="p-2.5 rounded-xl bg-[#0b0e16] border border-[#1d2332]">
                    <span className="text-slate-200 font-semibold block">{t.telegramFeature1Title}</span>
                    {t.telegramFeature1Desc}
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#0b0e16] border border-[#1d2332]">
                    <span className="text-slate-200 font-semibold block">{t.telegramFeature2Title}</span>
                    {t.telegramFeature2Desc}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#202738] text-xs text-slate-400">
                {t.telegramNote}
              </div>
            </div>

            {/* Quick Summary Note */}
            <div className="bg-amber-500/5 border border-amber-500/20 rounded-3xl p-6">
              <h4 className="text-sm font-bold text-amber-300 mb-1">{t.noPerCourseTitle}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t.noPerCourseDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Free vs Member Comparison Table */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white font-['Poppins']">
              {t.compareTitle}
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              {t.compareSubtitle}
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#21293b] bg-[#10141f]">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-[#141926] text-xs uppercase tracking-wider text-slate-400 border-b border-[#21293b]">
                <tr>
                  <th scope="col" className="px-6 py-4">{t.colFeature}</th>
                  <th scope="col" className="px-6 py-4 text-center">{t.colPublic}</th>
                  <th scope="col" className="px-6 py-4 text-center text-[#16e016] font-bold">
                    {t.colMember}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e2536]">
                {t.rows.map((row, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 font-medium text-white">{row.name}</td>
                    <td className="px-6 py-4 text-center">
                      {row.public ? (
                        <Check className="w-5 h-5 mx-auto text-emerald-400" />
                      ) : (
                        <X className="w-5 h-5 mx-auto text-slate-500" />
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.member ? (
                        <Check className="w-5 h-5 mx-auto text-emerald-400" />
                      ) : (
                        <X className="w-5 h-5 mx-auto text-slate-500" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
