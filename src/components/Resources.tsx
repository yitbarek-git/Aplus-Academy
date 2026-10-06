import React, { useState } from 'react';
import {
  FileText,
  Video,
  BookOpen,
  Compass,
  Play,
  MonitorPlay,
  Send,
  Sparkles,
} from 'lucide-react';
import { Language, translations } from '../translations';

interface ResourcesProps {
  lang: Language;
}

export const Resources: React.FC<ResourcesProps> = ({ lang }) => {
  const t = translations[lang].resources;

  // Embedded Video Showcase items on the site
  const showcaseVideos = [
    {
      id: 'guidance',
      titleEn: 'Department Information & Freshman Transition Guide',
      titleAm: 'የዲፓርትመንት መረጃ እና የካምፓስ የሽግግር መመሪያ',
      descEn: 'Official Aplus Academy guidance on campus life, GPA management, department selection, and credit hours.',
      descAm: 'ስለ ዲፓርትመንት ምርጫ፣ ጂፒኤ (GPA) አያያዝ እና በካምፓስ ስኬታማ ስለመሆን የተዘጋጀ ይፋዊ መመሪያ።',
      embedUrl: 'https://www.youtube-nocookie.com/embed/vS1-eEw9PeQ',
      badge: lang === 'am' ? 'የካምፓስ መመሪያ' : 'Guidance Video',
      tag: 'Freshman Guide',
    },
    {
      id: 'logic',
      titleEn: 'Logic & Critical Thinking: Fallacies & Arguments',
      titleAm: 'ሎጂክ እና ክሪቲካል ቲንኪንግ፡ ፎላሲዎች እና ክርክሮች',
      descEn: 'Detailed lecture breakdown on informal fallacies of presumption, relevance, and logical syllogisms.',
      descAm: 'የማሳሳቻ አይነቶች (Fallacies)፣ ክርክሮች እና የፈተና ጥያቄዎች አሰራር በአማርኛ የተብራራበት።',
      embedUrl: 'https://www.youtube-nocookie.com/embed/videoseries?list=PLw0Js0Bn4IfNa8qnJvjEOlfxfQe6q-qXu',
      badge: lang === 'am' ? 'የቪዲዮ ማብራሪያ' : 'Lecture Playlist',
      tag: 'Logic Series',
    },
    {
      id: 'economics',
      titleEn: 'Economics: Supply, Demand & Market Equilibrium',
      titleAm: 'ኢኮኖሚክስ፡ ፍላጎት፣ አቅርቦት እና የገበያ ሚዛን',
      descEn: 'Step-by-step calculus, utility equations, elasticity calculations, and exam question workouts.',
      descAm: 'የፍላጎትና አቅርቦት ስሌቶች፣ የገበያ ሚዛን እና ያለፉ ፈተናዎች የሂሳብ ጥያቄዎች በደረጃ የተሰሩበት።',
      embedUrl: 'https://www.youtube-nocookie.com/embed/videoseries?list=PLw0Js0Bn4IfNJFhAatRe0maGTkNLUc2Me',
      badge: lang === 'am' ? 'የሂሳብ ስሌቶች' : 'Math Workouts',
      tag: 'Economics Series',
    },
    {
      id: 'history',
      titleEn: 'History of Ethiopia and the Horn: Exam Walkthrough',
      titleAm: 'የኢትዮጵያ ታሪክ እና ጂኦግራፊ፡ የፈተና ጥያቄዎች አሰራር',
      descEn: 'Explaining key historical periods, state formations, external relations, and multiple-choice tricks.',
      descAm: 'የጥንት መንግስታት፣ የንግድ መስመሮች እና ያለፉ የሚድ እና የፋይናል ፈተና ጥያቄዎች ዝርዝር ማብራሪያ።',
      embedUrl: 'https://www.youtube-nocookie.com/embed/videoseries?list=PLw0Js0Bn4IfPj8GOYd6bHkwup294BzD4p',
      badge: lang === 'am' ? 'የፈተና ትንተና' : 'Exam Solutions',
      tag: 'History & Horn',
    },
    {
      id: 'programming',
      titleEn: 'Computer Programming (C++): Loops, Arrays & Pointers',
      titleAm: 'ኮምፒውተር ፕሮግራሚንግ (C++)፡ ሉፖች፣ አሬይ እና ፖይንተሮች',
      descEn: 'Practical coding walkthroughs breaking down algorithms, conditionals, and exam questions.',
      descAm: 'የC++ መሰረታዊያን፣ ሉፖች፣ ፋንክሽኖች እና የፈተና የኮድ ጥያቄዎች አሰራር።',
      embedUrl: 'https://www.youtube-nocookie.com/embed/videoseries?list=PLw0Js0Bn4IfO5AZUluZqRQ9CFDypty_GI',
      badge: lang === 'am' ? 'ኮዲንግ' : 'Code Drills',
      tag: 'C++ Programming',
    },
    {
      id: 'study_tips',
      titleEn: 'Study Hacks & Exam Preparation Tips',
      titleAm: 'የጥናት ዘዴዎች እና ለፈተና የመዘጋጃ ምክሮች',
      descEn: 'Proven techniques for mastering high credit-hour subjects and achieving high GPAs in campus.',
      descAm: 'ከፍተኛ ውጤት (A+) ለማምጣት የሚረዱ የጥናት ስልቶች እና የጊዜ አጠቃቀም ዘዴዎች።',
      embedUrl: 'https://www.youtube-nocookie.com/embed/videoseries?list=PLw0Js0Bn4IfMDHY6qtVNs17WYCBOGrHNe',
      badge: lang === 'am' ? 'የጥናት ምክር' : 'Study Hacks',
      tag: 'Study Skills',
    },
  ];

  const [activeVideoIdx, setActiveVideoIdx] = useState(0);
  const activeVideo = showcaseVideos[activeVideoIdx];

  const resourceCards = [
    {
      title: lang === 'am' ? 'ያለፉት ዓመታት ፈተናዎች' : 'Past Campus Exams',
      desc: lang === 'am'
        ? 'ከተለያዩ የኢትዮጵያ ዩኒቨርሲቲዎች የተሰበሰቡ ትክክለኛ ሚድ እና ፋይናል ፈተናዎች ከመፍትሔዎቻቸው ጋር።'
        : 'Real midterm and final examinations collected from top Ethiopian universities with fully worked out solutions.',
      tag: 'Mid & Final Papers',
      action: lang === 'am' ? 'በቴሌግራም አግኝ' : 'Open in Telegram',
      href: 'https://t.me/aplusacademy11',
      icon: FileText,
      badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    },
    {
      title: lang === 'am' ? 'የቪዲዮ ትምህርቶች' : 'Video Lesson Playlists',
      desc: lang === 'am'
        ? 'አስቸጋሪ የካምፓስ ፅንሰ-ሀሳቦችን በአማርኛ እና በእንግሊዝኛ በግልጽ የሚያብራሩ ቪዲዮዎች።'
        : 'In-depth video tutorials simplifying difficult campus math, programming, logic, and theory concepts in Amharic & English.',
      tag: 'On-Site Player',
      action: lang === 'am' ? 'ከታች ይመልከቱ' : 'Watch Below',
      href: '#video-player',
      icon: Video,
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      title: lang === 'am' ? 'የጥናት ማጠቃለያዎች' : 'Study Guides & Summaries',
      desc: lang === 'am'
        ? 'ከፈተና በፊት በፍጥነት ለመከለስ የሚረዱ አጫጭር ኖቶች፣ ፎርሙላዎች እና ዋና ዋና ነጥቦች።'
        : 'Concise lecture notes, formulas, and high-yield chapter summaries designed for rapid review right before exam week.',
      tag: 'PDF Summaries',
      action: lang === 'am' ? 'የጥናት ምክሮች' : 'Study Tips',
      href: '#video-player',
      icon: BookOpen,
      badgeColor: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
    },
    {
      title: lang === 'am' ? 'የዲፓርትመንት መረጃ' : 'Department Guidance',
      desc: lang === 'am'
        ? 'ስለ ዲፓርትመንት ምርጫ፣ የክሬዲት አወሳሰድ እና ጂፒኤ (GPA) አያያዝ ጠቃሚ መመሪያዎች።'
        : 'Insightful overviews regarding campus department selection, credit hour management, GPA calculation, and freshman transition.',
      tag: 'University Tips',
      action: lang === 'am' ? 'መመሪያ ይመልከቱ' : 'Watch Guidance',
      href: '#video-player',
      icon: Compass,
      badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    },
  ];

  return (
    <section id="resources" className="py-24 bg-[#090b10] border-t border-[#1c2232] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-3">
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-['Poppins']">
            {t.title} <span className="text-[#16e016]">{t.titleHighlight}</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            {t.subtitle}
          </p>
        </div>

        {/* Resource Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {resourceCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="bg-[#121623] border border-[#21293c] hover:border-[#2f3b55] rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-xl group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#182033] border border-[#26334f] text-[#16e016] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${card.badgeColor}`}>
                      {card.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#16e016] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-6">
                    {card.desc}
                  </p>
                </div>

                <a
                  href={card.href}
                  target={card.href.startsWith('http') ? '_blank' : undefined}
                  rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center justify-between w-full pt-4 border-t border-[#1c2436] text-xs font-bold text-[#16e016] hover:text-white transition-colors"
                >
                  <span>{card.action}</span>
                  <Play className="w-3.5 h-3.5 fill-[#16e016]" />
                </a>
              </div>
            );
          })}
        </div>

        {/* ON-SITE EMBEDDED VIDEO PLAYER SECTION (NO YOUTUBE REDIRECTION) */}
        <div id="video-player" className="pt-10 border-t border-[#1d2334]">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16e016]/10 border border-[#16e016]/20 text-[#16e016] text-xs font-bold uppercase tracking-wider mb-2">
              <MonitorPlay className="w-4 h-4" />
              <span>{lang === 'am' ? 'የድረ-ገጽ ላይ ቪዲዮ ማጫወቻ' : 'Embedded On-Site Video Player'}</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-['Poppins']">
              {lang === 'am' ? 'ተለይተው የቀረቡ የቪዲዮ ትምህርቶች' : 'Featured Video Lessons & Walkthroughs'}
            </h3>
            <p className="text-sm text-slate-400 mt-2 max-w-2xl mx-auto">
              {lang === 'am'
                ? 'የኤ ፕላስ አካዳሚ ቪዲዮዎችን በቀጥታ እዚሁ ድረ-ገጽ ላይ ይመልከቱ። ወደ ዩቲዩብ መሄድ አያስፈልግዎትም።'
                : 'Watch official Aplus Academy video lessons directly on the site without leaving the page.'}
            </p>
          </div>

          {/* Interactive Player Layout: Video Screen on Left, Playlists on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto bg-[#111522] border border-[#232b3f] rounded-3xl p-5 sm:p-8 shadow-2xl">
            {/* The Embedded Iframe Container */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-[#242e43] shadow-2xl">
                <iframe
                  key={activeVideo.embedUrl}
                  src={activeVideo.embedUrl}
                  title={lang === 'am' ? activeVideo.titleAm : activeVideo.titleEn}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              {/* Video Title & Description Under Player */}
              <div className="bg-[#0b0e16] p-4 sm:p-5 rounded-2xl border border-[#1e2536]">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold text-black bg-[#16e016] px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                    {activeVideo.badge}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {lang === 'am' ? 'ኤ ፕላስ አካዳሚ ይፋዊ ቪዲዮ' : 'Official Aplus Academy Lesson'}
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white mb-2">
                  {lang === 'am' ? activeVideo.titleAm : activeVideo.titleEn}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {lang === 'am' ? activeVideo.descAm : activeVideo.descEn}
                </p>
              </div>
            </div>

            {/* Video Selector List on Right */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#202738]">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {lang === 'am' ? 'የትምህርት ቪዲዮዎች ዝርዝር' : 'Select Video / Playlist'}
                </span>
                <span className="text-xs text-emerald-400 font-semibold">
                  {showcaseVideos.length} {lang === 'am' ? 'ቪዲዮዎች' : 'Videos'}
                </span>
              </div>

              <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
                {showcaseVideos.map((video, idx) => {
                  const isActive = idx === activeVideoIdx;
                  return (
                    <button
                      key={video.id}
                      type="button"
                      onClick={() => setActiveVideoIdx(idx)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer ${
                        isActive
                          ? 'bg-[#182236] border-[#16e016] shadow-md shadow-[#16e016]/10 ring-1 ring-[#16e016]'
                          : 'bg-[#0d1018] border-[#1f2638] hover:border-[#2f3a55] hover:bg-[#141926]'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                          isActive
                            ? 'bg-[#16e016] text-black font-bold'
                            : 'bg-[#192133] text-slate-400'
                        }`}
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold text-emerald-400 block mb-0.5">
                          {video.tag}
                        </span>
                        <h5
                          className={`text-xs font-bold leading-snug truncate ${
                            isActive ? 'text-white' : 'text-slate-300'
                          }`}
                        >
                          {lang === 'am' ? video.titleAm : video.titleEn}
                        </h5>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Call to action for full group */}
              <div className="mt-2 p-4 rounded-2xl bg-gradient-to-br from-emerald-950/30 to-[#0e121d] border border-emerald-900/30 text-center">
                <span className="text-xs font-bold text-white block mb-1">
                  {lang === 'am' ? 'ሙሉውን የቪዲዮ ማህደር ይፈልጋሉ?' : 'Want Full Video Archives?'}
                </span>
                <p className="text-[11px] text-slate-400 mb-3">
                  {lang === 'am'
                    ? 'በቴሌግራም መማሪያ ግሩፕ ውስጥ ሁሉንም የተሟሉ ቪዲዮዎች ያገኛሉ።'
                    : 'Get access to every single course playlist & mid/final answers.'}
                </p>
                <a
                  href="#register"
                  className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-[#16e016] text-black font-bold text-xs hover:bg-[#12be12] transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{lang === 'am' ? 'ተመዝገብ (400 ብር)' : 'Join Member Hub (400 Birr)'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
