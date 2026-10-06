import React, { useState } from 'react';
import {
  Brain,
  Globe2,
  TrendingUp,
  Languages,
  Cpu,
  Clock,
  CheckCircle,
  BookOpen,
  Sparkles,
  ShieldCheck,
  Heart,
  Activity,
  Lightbulb,
  Play,
  X,
} from 'lucide-react';
import { Language, translations } from '../translations';

export interface CourseItem {
  id: string;
  titleEn: string;
  titleAm: string;
  icon: React.ElementType;
  creditHours: string;
  descriptionEn: string;
  descriptionAm: string;
  whatYouLearnEn: string[];
  whatYouLearnAm: string[];
  materialsEn: string;
  materialsAm: string;
  embedVideoId?: string; // YouTube video or playlist ID for on-site iframe
  isPlaylist?: boolean;
  category: 'humanities' | 'social' | 'tech_applied';
}

interface CoursesProps {
  lang: Language;
  onSelectCourse?: (courseTitle: string) => void;
}

export const Courses: React.FC<CoursesProps> = ({ lang, onSelectCourse }) => {
  const [filter, setFilter] = useState<'all' | 'humanities' | 'social' | 'tech_applied'>('all');
  const [activeVideoModal, setActiveVideoModal] = useState<{ title: string; embedUrl: string } | null>(null);
  const t = translations[lang].courses;

  // The 11 official courses Aplus Academy gives
  const courses: CourseItem[] = [
    {
      id: 'english',
      titleEn: 'Communicative English Language Skills I & II',
      titleAm: 'የእንግሊዝኛ ተግባቦት ክህሎት I & II (Communicative English)',
      icon: Languages,
      creditHours: '4 Credit Hours',
      descriptionEn: 'Academic reading strategies, grammatical mechanics, paragraph structure, thesis writing, and active speaking communication.',
      descriptionAm: 'የአካዳሚክ ንባብ ክህሎት፣ ሰዋሰው (Grammar)፣ አንቀጽ አፃፃፍ እና ለፈተና የሚያዘጋጁ የንባብ ምንባቦች አሰራር።',
      whatYouLearnEn: [
        'Critical reading comprehension & contextual inference',
        'Academic paragraph building & coherence patterns',
        'Common grammatical pitfalls & sentence structures',
        'Campus midterm and final English exam drills',
      ],
      whatYouLearnAm: [
        'የአካዳሚክ ንባብ እና የቃላት አገባብ ትንተና',
        'የአንቀጽ ግንባታ እና የሀሳብ ቅደም ተከተል',
        'የሰዋሰው ህጎች እና የተለመዱ ስህተቶች እርማት',
        'ያለፉ የዩኒቨርሲቲ ፈተናዎች የተሰሩ ምንባቦች',
      ],
      materialsEn: 'Full Chapter Videos • Grammar Handouts • Solved Exams',
      materialsAm: 'የምዕራፍ ቪዲዮዎች • የሰዋሰው ኖቶች • ያለፉ ፈተናዎች',
      embedVideoId: 'PLw0Js0Bn4IfMDHY6qtVNs17WYCBOGrHNe',
      isPlaylist: true,
      category: 'humanities',
    },
    {
      id: 'logic',
      titleEn: 'Logic and Critical Thinking',
      titleAm: 'ሎጂክ እና ክሪቲካል ቲንኪንግ (Logic and Critical Thinking)',
      icon: Brain,
      creditHours: '4 Credit Hours',
      descriptionEn: 'Deductive & inductive arguments, informal fallacies of relevance and presumption, categorical logic, and exam strategies.',
      descriptionAm: 'አመክንዮአዊ አስተሳሰብ፣ ክርክሮች፣ የማሳሳቻ አይነቶች (Fallacies) እና የፈተና ጥያቄዎች አሰራር ደረጃ በደረጃ።',
      whatYouLearnEn: [
        'Argument structure: premises, conclusions & validity',
        'Informal fallacies: relevance, weak induction, presumption',
        'Categorical syllogisms, Venn diagrams & truth conditions',
        'Detailed step-by-step solutions to past university midterms',
      ],
      whatYouLearnAm: [
        'የክርክር አይነቶች፣ ቅድመ-ሀሳብ እና ማጠቃለያ ትንተና',
        'የተለመዱ የማሳሳቻ አይነቶች (Informal Fallacies)',
        'ካቴጎሪካል ሲሎጂዝም እና ቬን ዲያግራም አሰራር',
        'ያለፉ የዩኒቨርሲቲ ፈተናዎች ከዝርዝር ማብራሪያ ጋር',
      ],
      materialsEn: '18+ Videos • Condensed PDF Notes • Solved Exams',
      materialsAm: '18+ ቪዲዮዎች • የፒዲኤፍ ኖቶች • ያለፉ ፈተናዎች',
      embedVideoId: 'PLw0Js0Bn4IfNa8qnJvjEOlfxfQe6q-qXu',
      isPlaylist: true,
      category: 'humanities',
    },
    {
      id: 'geography',
      titleEn: 'Geography of Ethiopia and the Horn',
      titleAm: 'የኢትዮጵያ እና የቀንድ አፍሪካ ጂኦግራፊ (Geography of Ethiopia & Horn)',
      icon: Globe2,
      creditHours: '3 Credit Hours',
      descriptionEn: 'Topography, geological formations, climate regimes, drainage systems, water resources, and socio-economic geography.',
      descriptionAm: 'የኢትዮጵያ መልክአ ምድራዊ አቀማመጥ፣ የአየር ንብረት ክልሎች፣ ወንዞች እና የተፈጥሮ ሀብቶች ጥናት።',
      whatYouLearnEn: [
        'Geological processes, rock systems & relief features',
        'Climate controls, seasons & agro-ecological zones',
        'Drainage systems, lakes, watersheds & environmental issues',
        'Past exam multiple-choice, matching & diagram question keys',
      ],
      whatYouLearnAm: [
        'የመሬት አፈጣጠር ታሪክ እና የተራራማ አካባቢዎች ገጽታ',
        'የአየር ንብረት ተቆጣጣሪዎች እና ወቅቶች',
        'የወንዞች ተፋሰስ እና የውሃ ሀብት ስርጭት',
        'ያለፉ ፈተናዎች ካርታዎች እና የምርጫ ጥያቄዎች ባንክ',
      ],
      materialsEn: '15+ Videos • Spatial Maps • Exam Question Banks',
      materialsAm: '15+ ቪዲዮዎች • ካርታዎች • የፈተና ጥያቄዎች ባንክ',
      embedVideoId: 'PLw0Js0Bn4IfPj8GOYd6bHkwup294BzD4p',
      isPlaylist: true,
      category: 'social',
    },
    {
      id: 'history',
      titleEn: 'History of Ethiopia and the Horn',
      titleAm: 'የኢትዮጵያ እና የቀንድ አፍሪካ ታሪክ (History of Ethiopia & Horn)',
      icon: BookOpen,
      creditHours: '3 Credit Hours',
      descriptionEn: 'Historiography, human origins, state formation, external relations, modern developments, and key historical milestones.',
      descriptionAm: 'የታሪክ ምንጮች፣ የጥንት መንግስታት፣ የንግድ መስመሮች፣ የውጭ ግንኙነቶች እና ዘመናዊ የታሪክ ሁነቶች።',
      whatYouLearnEn: [
        'Sources of history, archaeological findings & evidence',
        'States, religious interactions, and medieval political systems',
        'Modern state formation and anti-colonial resistance',
        'University mid & final exam test banks fully explained',
      ],
      whatYouLearnAm: [
        'የታሪክ ጥናት ምንጮች እና የአጠናን ዘዴዎች',
        'ጥንታዊ መንግስታት እና የንግድ ግንኙነቶች',
        'የዘመናዊት ኢትዮጵያ ምስረታ እና የታሪክ ክስተቶች',
        'የተሰሩ ያለፉ የሚድ እና የፋይናል ፈተና ጥያቄዎች',
      ],
      materialsEn: '15+ Videos • Historical Timelines • Chapter Notes',
      materialsAm: '15+ ቪዲዮዎች • የታሪክ ቅደም ተከተሎች • ማጠቃለያ ኖቶች',
      embedVideoId: 'PLw0Js0Bn4IfPj8GOYd6bHkwup294BzD4p',
      isPlaylist: true,
      category: 'humanities',
    },
    {
      id: 'civics',
      titleEn: 'Moral and Civic Education',
      titleAm: 'ስነ-ምግባር እና የዜግነት ትምህርት (Moral & Civic Education)',
      icon: ShieldCheck,
      creditHours: '3 Credit Hours',
      descriptionEn: 'Ethical theories, constitutionalism, democracy, human rights, civic participation, and institutional ethics in Ethiopia.',
      descriptionAm: 'የስነ-ምግባር ፅንሰ-ሀሳቦች፣ ህገ-መንግስታዊነት፣ ዲሞክራሲ፣ ሰብአዊ መብቶች እና የዜግነት ሚናዎች።',
      whatYouLearnEn: [
        'Normative & applied ethical frameworks',
        'State theories, citizenship, democracy & governance',
        'Constitutional principles, rule of law & rights',
        'Real university exam situational and objective questions',
      ],
      whatYouLearnAm: [
        'የስነ-ምግባር መርሆዎች እና የሞራል ውሳኔዎች',
        'የመንግስት ፅንሰ-ሀሳብ፣ ዴሞክራሲ እና አስተዳደር',
        'ህገ-መንግስት እና የሰብአዊ መብቶች ጥበቃ',
        'የፈተና ጥያቄዎች ትንተና ከመፍትሔዎች ጋር',
      ],
      materialsEn: '10+ Videos • Lecture Summaries • Solved Exam Banks',
      materialsAm: '10+ ቪዲዮዎች • የንባብ ማጠቃለያዎች • የፈተና ጥያቄዎች',
      category: 'humanities',
    },
    {
      id: 'emerging',
      titleEn: 'Introduction to Emerging Technologies',
      titleAm: 'ኢመርጂንግ ቴክኖሎጂስ (Introduction to Emerging Technologies)',
      icon: Cpu,
      creditHours: '3 Credit Hours',
      descriptionEn: 'Artificial Intelligence, Internet of Things (IoT), Big Data, Cloud Computing, Blockchain, and cybersecurity paradigms.',
      descriptionAm: 'አርቴፊሻል ኢንተለጀንስ (AI)፣ IoT፣ ቢግ ዳታ፣ ክላውድ ኮምፒውቲንግ እና ብሎክቼይን ቴክኖሎጂዎች።',
      whatYouLearnEn: [
        'Core concepts of Industry 4.0: AI, ML, IoT architectures',
        'Data science, cloud models (IaaS/PaaS/SaaS) & security',
        'Blockchain, smart contracts & future tech trends',
        'Step-by-step reviews of university midterm exam tests',
      ],
      whatYouLearnAm: [
        'የአራተኛው የኢንዱስትሪ አብዮት (Industry 4.0) መሰረቶች',
        'አርቴፊሻል ኢንተለጀንስ እና የማሽን ለርኒንግ አሰራር',
        'ክላውድ ኮምፒውቲንግ፣ አይኦቲ (IoT) እና ዳታ ሳይንስ',
        'የሚድተርም ፈተና ጥያቄዎች ከትክክለኛ መልሶቻቸው ጋር',
      ],
      materialsEn: '12+ Videos • Slide Reviews • Real Exam Keys',
      materialsAm: '12+ ቪዲዮዎች • የስላይድ ማጠቃለያ • የፈተና ቁልፎች',
      category: 'tech_applied',
    },
    {
      id: 'psychology',
      titleEn: 'General Psychology and Life Skills',
      titleAm: 'አጠቃላይ ሳይኮሎጂ እና የህይወት ክህሎት (General Psychology and Life Skills)',
      icon: Brain,
      creditHours: '3 Credit Hours',
      descriptionEn: 'Human behavior, cognitive processes, sensation, perception, learning theories, memory, motivation, and mental wellness.',
      descriptionAm: 'የሰው ልጅ ባህሪ፣ አእምሯዊ ሂደቶች፣ የመማር ፅንሰ-ሀሳቦች፣ ማስታወስ፣ ስሜት እና ስነ-ልቦናዊ ጤና።',
      whatYouLearnEn: [
        'Biological bases of behavior, nervous system & cognition',
        'Sensation vs perception & classical/operant conditioning',
        'Memory stages (encoding, storage, retrieval) & forgetting',
        'Past exam multiple-choice questions solved and explained',
      ],
      whatYouLearnAm: [
        'የባህሪ ሳይንሳዊ መሰረቶች እና የስነ-ልቦና ዘርፎች',
        'ስሜት፣ ግንዛቤ (Perception) እና የመማር ህጎች',
        'የማስታወስ ችሎታ ደረጃዎች እና የመርሳት ምክንያቶች',
        'ያለፉ ፈተናዎች የምርጫ ጥያቄዎች ከመልሶቻቸው ጋር',
      ],
      materialsEn: '10+ Videos • Chapter Outlines • Solved Midterms',
      materialsAm: '10+ ቪዲዮዎች • የምዕራፍ ኖቶች • የሚድ ጥያቄዎች',
      category: 'social',
    },
    {
      id: 'fitness',
      titleEn: 'Physical Fitness',
      titleAm: 'የአካል ብቃት ትምህርት (Physical Fitness)',
      icon: Activity,
      creditHours: '2 Credit Hours',
      descriptionEn: 'Health-related fitness components, cardiovascular endurance, muscular strength, nutrition basics, and wellness habits.',
      descriptionAm: 'የአካል ብቃት አካላት፣ የልብና የደም ዝውውር ጥንካሬ፣ ጤናማ አመጋገብ እና የአካል ብቃት እንቅስቃሴ መርሆዎች።',
      whatYouLearnEn: [
        'Health-related vs skill-related fitness components',
        'Principles of exercise training (FITT formula)',
        'Nutrition, energy balance & weight management',
        'Exam review questions and conceptual worksheets',
      ],
      whatYouLearnAm: [
        'የአካል ብቃት መሰረታዊ ክፍሎች እና ጥቅሞች',
        'የስፖርት ማዘውተሪያ ሳይንሳዊ መርሆዎች (FITT)',
        'የአመጋገብ ስርዓት እና ጤናማ የአኗኗር ዘይቤ',
        'የፈተና ጥያቄዎች እና መልሶቻቸው',
      ],
      materialsEn: 'Lectures • Key Summaries • Practice Questions',
      materialsAm: 'የቪዲዮ ማብራሪያ • ኖቶች • የተሰሩ ጥያቄዎች',
      category: 'tech_applied',
    },
    {
      id: 'economics',
      titleEn: 'Economics',
      titleAm: 'ኢኮኖሚክስ (Economics)',
      icon: TrendingUp,
      creditHours: '4 Credit Hours',
      descriptionEn: 'Micro & macroeconomics: scarcity, market mechanisms, utility, production costs, GDP, inflation, and mathematical graphs.',
      descriptionAm: 'የፍላጎትና የአቅርቦት ህጎች፣ የገበያ ሚዛን፣ የምርት ወጪዎች እና የኢኮኖሚክስ የሂሳብ ስሌት ጥያቄዎች።',
      whatYouLearnEn: [
        'Theory of demand, supply, market equilibrium & elasticity',
        'Consumer behavior, utility & indifference curve analysis',
        'Production functions, short-run vs long-run cost curves',
        'Step-by-step workout of mathematical exam questions',
      ],
      whatYouLearnAm: [
        'የፍላጎት እና የአቅርቦት መተንተኛ ቀመሮች',
        'የሸማቾች ባህሪ፣ ዩቲሊቲ እና የዋጋ መዋቅር',
        'የምርት ወጪዎች እና የገበያ አይነቶች',
        'ያለፉ ፈተናዎች የሂሳብ ጥያቄዎች በደረጃ የተሰሩ',
      ],
      materialsEn: '14+ Videos • Formula Handouts • Solved Exams',
      materialsAm: '14+ ቪዲዮዎች • የቀመሮች ዝርዝር • ያለፉ ፈተናዎች',
      embedVideoId: 'PLw0Js0Bn4IfNJFhAatRe0maGTkNLUc2Me',
      isPlaylist: true,
      category: 'social',
    },
    {
      id: 'entrepreneurship',
      titleEn: 'Entrepreneurship',
      titleAm: 'የስራ ፈጠራ እና ኢንተርፕረነርሺፕ (Entrepreneurship)',
      icon: Lightbulb,
      creditHours: '3 Credit Hours',
      descriptionEn: 'Business opportunity identification, feasibility analysis, business model canvas, financing, and marketing for ventures.',
      descriptionAm: 'የቢዝነስ ሀሳብ አመነጫጨት፣ የአዋጭነት ጥናት፣ የንግድ እቅድ ዝግጅት እና የገበያ ስልቶች።',
      whatYouLearnEn: [
        'Entrepreneurial mindset, creativity & opportunity recognition',
        'Feasibility analysis & preparing viable business plans',
        'Forms of business ownership, funding sources & scaling',
        'Past exam multiple-choice questions and case study solutions',
      ],
      whatYouLearnAm: [
        'የስራ ፈጠራ አስተሳሰብ እና የገበያ ክፍተትን መለየት',
        'የቢዝነስ ፕላን (Business Plan) ዝግጅት እና አዋጭነት',
        'የፋይናንስ ምንጮች እና የኢንተርፕራይዝ አስተዳደር',
        'ያለፉ ፈተናዎች እና የኬዝ ስተዲ ጥያቄዎች መፍትሔ',
      ],
      materialsEn: '10+ Videos • Business Plan Templates • Exam Keys',
      materialsAm: '10+ ቪዲዮዎች • የቢዝነስ ፕላን ቴምፕሌት • የፈተና ቁልፎች',
      category: 'social',
    },
    {
      id: 'inclusiveness',
      titleEn: 'Inclusiveness',
      titleAm: 'አካታችነት (Inclusiveness / Special Needs)',
      icon: Heart,
      creditHours: '2 Credit Hours',
      descriptionEn: 'Inclusion principles, addressing barriers for persons with disabilities, universal learning design, and supportive policy frameworks.',
      descriptionAm: 'የአካታች ትምህርት መርሆዎች፣ ልዩ ፍላጎት ያላቸው ግለሰቦች ድጋፍ፣ እንቅፋቶችን ማስወገድ እና ህጋዊ ማዕቀፎች።',
      whatYouLearnEn: [
        'Concepts of impairment, disability, and inclusion models',
        'Identifying and mitigating environmental & attitudinal barriers',
        'Differentiated instruction & universal design for learning (UDL)',
        'Campus midterm and final exam questions with full explanations',
      ],
      whatYouLearnAm: [
        'የአካታችነት ፅንሰ-ሀሳብ እና ማህበራዊ ሞዴሎች',
        'ለተማሪዎች ምቹ የመማሪያ አካባቢ መፍጠር',
        'ሁለንተናዊ የትምህርት ንድፍ (Universal Design for Learning)',
        'ያለፉ የዩኒቨርሲቲ ፈተናዎች ጥያቄዎች እና መልሶቻቸው',
      ],
      materialsEn: 'Video Lectures • Summary Slides • Exam Worksheets',
      materialsAm: 'የቪዲዮ ትምህርቶች • የማጠቃለያ ስላይዶች • የፈተና ወረቀቶች',
      category: 'humanities',
    },
  ];

  const filteredCourses =
    filter === 'all' ? courses : courses.filter((c) => c.category === filter);

  const openVideo = (course: CourseItem) => {
    const isList = course.isPlaylist;
    const id = course.embedVideoId || 'PLw0Js0Bn4IfNa8qnJvjEOlfxfQe6q-qXu';
    const embedUrl = isList
      ? `https://www.youtube-nocookie.com/embed/videoseries?list=${id}&autoplay=1`
      : `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`;

    const title = lang === 'am' ? course.titleAm : course.titleEn;
    setActiveVideoModal({ title, embedUrl });
  };

  return (
    <section id="courses" className="py-24 bg-[#0c0f18] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[#16e016] text-xs font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-['Poppins']">
            {t.title} <span className="text-[#16e016]">{t.titleHighlight}</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            {t.subtitle}
          </p>

          {/* Filter pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-[#16e016] text-black shadow-md shadow-[#16e016]/20'
                  : 'bg-[#151926] text-slate-300 hover:text-white border border-[#232b3d]'
              }`}
            >
              {lang === 'am' ? 'ሁሉም 11 ኮርሶች' : 'All 11 Courses'} ({courses.length})
            </button>
            <button
              onClick={() => setFilter('humanities')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                filter === 'humanities'
                  ? 'bg-[#16e016] text-black shadow-md shadow-[#16e016]/20'
                  : 'bg-[#151926] text-slate-300 hover:text-white border border-[#232b3d]'
              }`}
            >
              {lang === 'am' ? 'ሰብአዊ ሳይንስ (Humanities)' : 'Humanities & Languages'}
            </button>
            <button
              onClick={() => setFilter('social')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                filter === 'social'
                  ? 'bg-[#16e016] text-black shadow-md shadow-[#16e016]/20'
                  : 'bg-[#151926] text-slate-300 hover:text-white border border-[#232b3d]'
              }`}
            >
              {lang === 'am' ? 'ማህበራዊ ሳይንስ (Social)' : 'Social Sciences & Economics'}
            </button>
            <button
              onClick={() => setFilter('tech_applied')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                filter === 'tech_applied'
                  ? 'bg-[#16e016] text-black shadow-md shadow-[#16e016]/20'
                  : 'bg-[#151926] text-slate-300 hover:text-white border border-[#232b3d]'
              }`}
            >
              {lang === 'am' ? 'ቴክኖሎጂ እና ተግባራዊ (Tech)' : 'Tech & Applied Skills'}
            </button>
          </div>
        </div>

        {/* 11 Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredCourses.map((course) => {
            const Icon = course.icon;
            const title = lang === 'am' ? course.titleAm : course.titleEn;
            const description = lang === 'am' ? course.descriptionAm : course.descriptionEn;
            const topics = lang === 'am' ? course.whatYouLearnAm : course.whatYouLearnEn;
            const materials = lang === 'am' ? course.materialsAm : course.materialsEn;

            return (
              <div
                key={course.id}
                className="bg-[#121623] border border-[#22293a] hover:border-[#16e016]/60 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group shadow-lg hover:shadow-2xl hover:shadow-[#16e016]/10"
              >
                <div>
                  {/* Top Bar with Icon and Status */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-[#16e016]/10 border border-[#16e016]/25 text-[#16e016] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="w-7 h-7" />
                    </div>
                    <div className="text-right">
                      <span className="inline-block text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#1b2234] text-slate-300 border border-[#273248]">
                        {course.creditHours}
                      </span>
                      <span className="block text-[10px] text-emerald-400 font-semibold mt-1">
                        ● {lang === 'am' ? 'በግሩፑ ውስጥ ይገኛል' : 'Included in Group'}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-[#16e016] transition-colors font-['Poppins']">
                    {title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mb-5 leading-relaxed">
                    {description}
                  </p>

                  {/* Key Syllabus Points */}
                  <div className="mb-6 space-y-1.5 border-t border-[#1d2433] pt-4">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                      {lang === 'am' ? 'ዋና ዋና ርዕሶች፡' : 'Key Topics Covered:'}
                    </span>
                    {topics.slice(0, 3).map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle className="w-3.5 h-3.5 text-[#16e016] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer with Materials & On-Site Video Trigger */}
                <div className="pt-4 border-t border-[#1d2433] flex flex-col gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{materials}</span>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        if (onSelectCourse) {
                          onSelectCourse(course.titleEn);
                        }
                        const target = document.getElementById('register');
                        if (target) {
                          target.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-black bg-[#16e016] hover:bg-[#12be12] px-3 py-1.5 rounded-lg transition-colors cursor-pointer shadow-sm shadow-[#16e016]/20"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>{lang === 'am' ? 'በዚህ ኮርስ ተመዝገብ' : 'Enroll in this Course'}</span>
                    </button>

                    {/* On-Site Video Preview Button (does not redirect away!) */}
                    <button
                      type="button"
                      onClick={() => openVideo(course)}
                      className="inline-flex items-center gap-1 text-xs text-slate-300 hover:text-[#16e016] bg-[#171e2e] hover:bg-[#20293d] px-2.5 py-1.5 rounded-lg border border-[#2a3650] transition-colors cursor-pointer"
                      title={lang === 'am' ? 'ቪዲዮውን በድረ-ገጹ ላይ ይመልከቱ' : 'Watch video preview on site'}
                    >
                      <Play className="w-3 h-3 text-[#16e016] fill-[#16e016]" />
                      <span>{lang === 'am' ? 'ቪዲዮ እይ' : 'Watch Video'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 text-center">
          <p className="text-sm text-slate-400 mb-4">
            {t.bottomText}
          </p>
          <a
            href="#register"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm bg-[#16e016] text-black hover:bg-[#12be12] transition-colors shadow-lg shadow-[#16e016]/20"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t.bottomCta}</span>
          </a>
        </div>
      </div>

      {/* On-Site Video Modal with Iframe */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-[#111522] border border-[#242d42] rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#1f283d]">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 text-[#16e016] fill-[#16e016]" />
                <h4 className="font-bold text-white text-sm sm:text-base truncate max-w-md sm:max-w-xl">
                  {activeVideoModal.title}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setActiveVideoModal(null)}
                className="p-1.5 rounded-xl bg-[#171d2c] text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Embedded Iframe Player right on the page */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-[#1d263b] shadow-2xl">
              <iframe
                src={activeVideoModal.embedUrl}
                title={activeVideoModal.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
              <span>{lang === 'am' ? 'የኤ ፕላስ አካዳሚ ቪዲዮ ማጫወቻ' : 'Aplus Academy Video Player'}</span>
              <a
                href="#register"
                onClick={() => setActiveVideoModal(null)}
                className="text-[#16e016] hover:underline font-semibold"
              >
                {lang === 'am' ? 'ሙሉውን የትምህርት ማህበረሰብ ተቀላቀል (400 ብር)' : 'Join Full Learning Community (400 Birr)'} →
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
