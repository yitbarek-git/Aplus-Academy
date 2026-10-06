import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, PlayCircle, BookOpen } from 'lucide-react';
import { AppConfig } from '../types';
import { Language, translations } from '../translations';

interface HeroProps {
  lang: Language;
  config: AppConfig | null;
}

export const Hero: React.FC<HeroProps> = ({ lang, config }) => {
  const t = translations[lang].hero;
  const feeDisplay = config?.membershipFeeETB
    ? `${config.membershipFeeETB} ${lang === 'am' ? 'ብር' : 'ETB'}`
    : `400 ${lang === 'am' ? 'ብር' : 'ETB'}`;

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#16e016]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & Offer */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16e016]/10 border border-[#16e016]/30 text-emerald-400 text-xs font-semibold mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#16e016] animate-pulse" />
              <span>{t.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.18] mb-6 font-['Poppins']">
              {t.titleMain}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16e016] via-[#4ade80] to-amber-300">
                {t.titleHighlight}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              {t.subtitle}
            </p>

            {/* Value checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-9 max-w-xl mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2.5 text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#16e016] shrink-0" />
                <span>{t.benefit1}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#16e016] shrink-0" />
                <span>{t.benefit2}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#16e016] shrink-0" />
                <span>{t.benefit3}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#16e016] shrink-0" />
                <span>{t.benefit4}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#register"
                className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-sm sm:text-base bg-[#16e016] hover:bg-[#12be12] text-black shadow-lg shadow-[#16e016]/25 hover:shadow-xl hover:shadow-[#16e016]/40 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
              >
                <span>{t.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#courses"
                className="w-full sm:w-auto px-7 py-4 rounded-full font-semibold text-sm sm:text-base bg-[#141926] hover:bg-[#1b2234] text-slate-200 border border-[#273248] hover:border-slate-500 transition-all flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-[#16e016]" />
                <span>{t.ctaSecondary}</span>
              </a>
            </div>

            {/* Quick security notice */}
            <div className="mt-5 flex items-center justify-center lg:justify-start gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{t.securityNote}</span>
            </div>
          </div>

          {/* Right Column: Visual Card & Stats */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-sm sm:max-w-md bg-gradient-to-b from-[#181f2f] to-[#10141f] p-6 sm:p-8 rounded-3xl border border-[#27324a] shadow-2xl">
              {/* Top Card Badge */}
              <div className="flex items-center justify-between pb-6 border-b border-[#232c40]">
                <div className="flex items-center gap-3">
                  <img
                    src="/images/Logo.webp"
                    alt="Aplus Academy"
                    className="w-14 h-14 rounded-2xl border-2 border-[#16e016] shadow-md shadow-[#16e016]/30"
                  />
                  <div>
                    <h3 className="font-bold text-white text-base">Aplus Academy</h3>
                    <p className="text-xs text-slate-400">Your Path to Excellence</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-bold block">
                    {t.hubBadge}
                  </span>
                  <span className="text-sm font-extrabold text-white">{feeDisplay}</span>
                </div>
              </div>

              {/* Center Highlight */}
              <div className="my-6 p-4 rounded-2xl bg-[#0d1017] border border-[#21283a]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-slate-400 font-medium">Community Platform</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#16e016]/20 text-[#16e016] font-semibold">
                    Private Telegram Group
                  </span>
                </div>
                <div className="text-xs text-slate-300 space-y-1.5">
                  <p className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16e016]" />
                    {lang === 'am' ? 'የሁሉም ኮርሶች የተሟላ ቪዲዮዎች' : 'Full access to all course tutorial playlists'}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16e016]" />
                    {lang === 'am' ? 'ትክክለኛ ያለፉ ሚድ እና ፋይናል ፈተናዎች' : 'Authentic previous midterm & final campus exams'}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16e016]" />
                    {lang === 'am' ? 'የተጠቃለሉ የፒዲኤፍ ማስታወሻዎች' : 'Summarized lecture notes & printable study guides'}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16e016]" />
                    {lang === 'am' ? 'ከአስተማሪ ጋር የቀጥታ ጥያቄና መልስ' : 'Direct student Q&A with instructor'}
                  </p>
                </div>
              </div>

              {/* Verified Channel Stats */}
              <div className="grid grid-cols-3 gap-3 pt-2 text-center">
                <div className="p-3 rounded-xl bg-[#121622] border border-[#202738]">
                  <span className="block text-lg sm:text-xl font-extrabold text-[#16e016]">11.4K+</span>
                  <span className="text-[11px] text-slate-400 font-medium">{t.statStudents}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#121622] border border-[#202738]">
                  <span className="block text-lg sm:text-xl font-extrabold text-amber-400">44+</span>
                  <span className="text-[11px] text-slate-400 font-medium">{t.statVideos}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#121622] border border-[#202738]">
                  <span className="block text-lg sm:text-xl font-extrabold text-emerald-400">2017 E.C</span>
                  <span className="text-[11px] text-slate-400 font-medium">{t.statEstablished}</span>
                </div>
              </div>

              {/* Handle badge */}
              <div className="mt-5 text-center">
                <a
                  href="https://www.youtube.com/@aplusacademy1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#16e016] transition-colors"
                >
                  <PlayCircle className="w-3.5 h-3.5 text-red-500" />
                  <span>{t.youtubeHandle}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
