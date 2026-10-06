export type Language = 'am' | 'en';

export interface Translations {
  nav: {
    home: string;
    howItWorks: string;
    membership: string;
    courses: string;
    resources: string;
    about: string;
    contact: string;
    checkStatus: string;
    joinNow: string;
    langSwitch: string;
  };
  hero: {
    badge: string;
    titleMain: string;
    titleHighlight: string;
    subtitle: string;
    benefit1: string;
    benefit2: string;
    benefit3: string;
    benefit4: string;
    ctaPrimary: string;
    ctaSecondary: string;
    securityNote: string;
    hubBadge: string;
    oneTimeFee: string;
    statStudents: string;
    statVideos: string;
    statEstablished: string;
    youtubeHandle: string;
  };
  howItWorks: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    steps: {
      step: string;
      title: string;
      desc: string;
    }[];
    banner: string;
  };
  membership: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    popularBadge: string;
    currency: string;
    period: string;
    tagline: string;
    includedTitle: string;
    benefits: string[];
    ctaButton: string;
    securitySub: string;
    telegramHubTitle: string;
    telegramHubDesc: string;
    telegramFeature1Title: string;
    telegramFeature1Desc: string;
    telegramFeature2Title: string;
    telegramFeature2Desc: string;
    telegramNote: string;
    noPerCourseTitle: string;
    noPerCourseDesc: string;
    compareTitle: string;
    compareSubtitle: string;
    colFeature: string;
    colPublic: string;
    colMember: string;
    rows: {
      name: string;
      public: boolean;
      member: boolean;
    }[];
  };
  courses: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    filterAll: string;
    filterCore: string;
    filterStem: string;
    filterHumanities: string;
    includedTag: string;
    sampleVideo: string;
    bottomText: string;
    bottomCta: string;
  };
  resources: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    cards: {
      title: string;
      desc: string;
      tag: string;
      action: string;
    }[];
    videoShowcaseTitle: string;
    videoShowcaseSubtitle: string;
    video1Tag: string;
    video1Title: string;
    video1Desc: string;
    video2Tag: string;
    video2Title: string;
    video2Desc: string;
    watchYoutube: string;
  };
  about: {
    badge: string;
    title: string;
    titleHighlight: string;
    founderTitle: string;
    founderRole: string;
    quote: string;
    founderLabel: string;
    body: string;
    pillar1Title: string;
    pillar1Desc: string;
    pillar2Title: string;
    pillar2Desc: string;
  };
  register: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    step1Title: string;
    step2Title: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    phoneHelp: string;
    telegramLabel: string;
    telegramPlaceholder: string;
    telegramHelp: string;
    paymentMethodLabel: string;
    transactionLabel: string;
    transactionPlaceholder: string;
    transactionHelp: string;
    proofLabel: string;
    proofUploadText: string;
    proofUploadHint: string;
    proofAttached: string;
    proofChange: string;
    privacyNote: string;
    submitBtn: string;
    submittingBtn: string;
    successBadge: string;
    successTitle: string;
    regIdLabel: string;
    regPhoneLabel: string;
    statusPending: string;
    checkStatusBtn: string;
    submitAnotherBtn: string;
    copied: string;
    copy: string;
  };
  status: {
    title: string;
    subtitle: string;
    inputPlaceholder: string;
    searchBtn: string;
    approvedTitle: string;
    approvedDesc: string;
    telegramLinkTitle: string;
    joinBtn: string;
    copyBtn: string;
    copiedBtn: string;
    pendingTitle: string;
    pendingDesc: string;
    pendingContact: string;
    rejectedTitle: string;
    rejectedDesc: string;
    rejectedReason: string;
    contactSupport: string;
    resubmit: string;
  };
  contact: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    youtubeTitle: string;
    youtubeSub: string;
    telegramTitle: string;
    telegramSub: string;
    tiktokTitle: string;
    tiktokSub: string;
    supportTitle: string;
    supportSub: string;
    bannerTitle: string;
    bannerSub: string;
    bannerTgBtn: string;
  };
  footer: {
    desc: string;
    quickNav: string;
    studentTools: string;
    checkStatus: string;
    terms: string;
    adminPortal: string;
    copyright: string;
    badge: string;
  };
}

export const translations: Record<Language, Translations> = {
  am: {
    nav: {
      home: 'መነሻ',
      howItWorks: 'አሰራር',
      membership: 'አባልነት',
      courses: 'ኮርሶች',
      resources: 'ግብአቶች',
      about: 'ስለ እኛ',
      contact: 'ያግኙን',
      checkStatus: 'ሁኔታን ፈትሽ',
      joinNow: 'ተመዝገብ (400 ብር)',
      langSwitch: 'English',
    },
    hero: {
      badge: 'የኢትዮጵያ ዩኒቨርሲቲ ተማሪዎች የትምህርት ማዕከል',
      titleMain: 'የካምፓስ ኮርሶችን በ',
      titleHighlight: 'ኤ ፕላስ አካዳሚ (Aplus)',
      subtitle:
        'የዩኒቨርሲቲ ኮርሶችን በቀላሉ እንዲረዱ፣ ለሚድተርም እና ፋይናል ፈተናዎች በልህቀት እንዲዘጋጁ የተዘጋጀ ልዩ የትምህርት ማህበረሰብ። አንድ ጊዜ ብቻ 400 ብር በመክፈል የፕራይቬት ቴሌግራም ግሩፕ አባል ይሁኑ እና ሁሉንም የቪዲዮ ትምህርቶች፣ ማጠቃለያዎች እና ያለፉ ፈተናዎች ያግኙ።',
      benefit1: 'የአንድ ጊዜ ክፍያ 400 ብር (ወርሃዊ ክፍያ የለም)',
      benefit2: 'የፕራይቬት ቴሌግራም ግሩፕ ሙሉ አባልነት',
      benefit3: 'ያለፉት ዓመታት ሚድ እና ፋይናል ፈተናዎች ከመፍትሔዎቻቸው ጋር',
      benefit4: 'በአማርኛ እና በእንግሊዝኛ ግልጽ ማብራሪያዎች',
      ctaPrimary: 'አካዳሚውን ይቀላቀሉ (400 ብር)',
      ctaSecondary: 'ኮርሶችን ይመልከቱ',
      securityNote: 'በቴሌብር እና በኢትዮጵያ ንግድ ባንክ ደህንነቱ የተጠበቀ ክፍያ • በእጅ የሚረጋገጥ',
      hubBadge: 'የአባልነት እድል',
      oneTimeFee: 'የአንድ ጊዜ 400 ብር',
      statStudents: '11.4K+ ተማሪዎች በዩቲዩብ',
      statVideos: '44+ የቪዲዮ ትምህርቶች',
      statEstablished: 'ከ2017 ዓ.ም ጀምሮ',
      youtubeHandle: 'ይፋዊ ዩቲዩብ: @aplusacademy1',
    },
    howItWorks: {
      badge: 'ቀላል እና ግልጽ አሰራር',
      title: 'እንዴት ነው',
      titleHighlight: 'የሚሰራው?',
      subtitle: 'ከክፍያ ጀምሮ የፕራይቬት ቴሌግራም ግሩፑን እስከመቀላቀል በ6 ቀላል እርምጃዎች',
      steps: [
        {
          step: '01',
          title: 'አባል ለመሆን ይወስኑ',
          desc: 'የአንድ ጊዜ ክፍያ ሞዴላችንን ይረዱ። ለአንድ ኮርስ ሳይሆን ለሁሉም የትምህርት ይዘቶች አንድ ጊዜ ብቻ ነው የሚከፍሉት።',
        },
        {
          step: '02',
          title: 'አንድ ጊዜ 400 ብር ይክፈሉ',
          desc: 'በቴሌብር (Telebirr)፣ በኢትዮጵያ ንግድ ባንክ (CBE) ወይም በአቢሲኒያ ባንክ (BOA) ክፍያዎን ይፈጽሙ።',
        },
        {
          step: '03',
          title: 'ደረሰኝዎን ያስገቡ',
          desc: 'ስምዎን፣ ስልክ ቁጥርዎን፣ የቴሌግራም ዩዘርኔምዎን እና የከፈሉበትን ደረሰኝ ስክሪንሽት ቅጹ ላይ ይላኩ።',
        },
        {
          step: '04',
          title: 'ፈጣን ማረጋገጫ',
          desc: 'የኤ ፕላስ አካዳሚ አስተዳዳሪ የላኩትን የክፍያ ቁጥር እና ደረሰኝ በፍጥነት ያረጋግጣል።',
        },
        {
          step: '05',
          title: 'የግሩፑን ሊንክ ይቀበሉ',
          desc: 'ክፍያዎ እንደተረጋገጠ የፕራይቬት ቴሌግራም መማሪያ ግሩፕ መግቢያ ሊንክ ወዲያውኑ ይደርስዎታል።',
        },
        {
          step: '06',
          title: 'መማር ይጀምሩ',
          desc: 'ሁሉንም የቪዲዮ ትምህርቶች፣ የፈተና ጥያቄዎች ከመፍትሔዎቻቸው ጋር እና አጋዥ ኖቶችን ያግኙ።',
        },
      ],
      banner: 'አስፈላጊ ማስታወሻ፡ በኤ ፕላስ አካዳሚ ለእያንዳንዱ ኮርስ ለየብቻ አይከፍሉም። የ400 ብር አንድ ጊዜ ክፍያ ለሁሉም ኮርሶች እና የፈተና ግብአቶች ሙሉ መዳረሻ ይሰጥዎታል።',
    },
    membership: {
      badge: 'የአንድ ጊዜ አባልነት',
      title: 'የኤ ፕላስ አካዳሚ',
      titleHighlight: 'ሙሉ አባል ይሁኑ',
      subtitle: 'አንድ ጊዜ ብቻ 400 ብር ይክፈሉ፤ የፕራይቬት ቴሌግራም ግሩፑ የዕድሜ ልክ አባል ይሁኑ። ምንም ወርሃዊ ክፍያ ወይም ለእያንዳንዱ ኮርስ ክፍያ የለም።',
      popularBadge: 'ተመራጭ',
      currency: 'ብር (ETB)',
      period: '/ የአንድ ጊዜ ክፍያ ብቻ',
      tagline: 'አንድ ጊዜ ይክፈሉ። የቴሌግራም መማሪያ ግሩፑን ሙሉ ይዘት ያግኙ።',
      includedTitle: 'በአባልነት የሚያገኟቸው ጥቅሞች፡',
      benefits: [
        'የሁሉም የካምፓስ ኮርሶች የተሟሉ የቪዲዮ ትምህርቶች',
        'ያለፉት ዓመታት ትክክለኛ ሚድ እና ፋይናል ፈተናዎች ከመፍትሔ ጋር',
        'በአማርኛ እና በእንግሊዝኛ የተዘጋጁ አጫጭር የፒዲኤፍ ማጠቃለያ ኖቶች',
        'የተማሪዎች የውይይት መድረክ በፕራይቬት ቴሌግራም ግሩፕ ውስጥ',
        'ከአስተማሪው ጋር የቀጥታ ጥያቄና መልስ ድጋፍ',
        'ወደፊት ለሚለቀቁ ተጨማሪ ኮርሶች ያለ ተጨማሪ ክፍያ መዳረሻ',
        'ምንም ዓይነት ወርሃዊ ወይም ተጨማሪ ክፍያ የለውም',
      ],
      ctaButton: 'አሁን ይመዝገቡ (400 ብር)',
      securitySub: 'ክፍያዎ በእጅ ተረጋግጦ የቴሌግራም ሊንክ ይሰጥዎታል',
      telegramHubTitle: 'ፕራይቬት የቴሌግራም ማዕከል',
      telegramHubDesc: 'ቴሌግራም ፈጣን የቪዲዮ ማጫወቻ፣ በኮርስ ሃሽታግ የመፈለግ ምቾት እና በዝቅተኛ የኢንተርኔት ፍጥነት በቀላሉ ፒዲኤፎችን ለማውረድ ተመራጭ ነው።',
      telegramFeature1Title: '📱 በስልክም በኮምፒውተርም',
      telegramFeature1Desc: 'በየትኛውም ሰዓት በስልክዎ ወይም በላፕቶፕዎ ማጥናት ይችላሉ።',
      telegramFeature2Title: '🔒 ከማስታወቂያ የጸዳ',
      telegramFeature2Desc: 'የተረጋገጡ አባላት ብቻ የሚገቡበት ንጹህ የትምህርት መድረክ።',
      telegramNote: 'የግሩፕ መግቢያ ሊንኩ የሚሰጠው የከፈሉበት ደረሰኝ እንደተረጋገጠ ብቻ ነው።',
      noPerCourseTitle: 'ለእያንዳንዱ ኮርስ ለየብቻ መክፈል የለም!',
      noPerCourseDesc: 'ለፕሮግራሚንግ፣ ለሎጂክ ወይም ለኢኮኖሚክስ ለየብቻ መክፈል አያስፈልግዎትም። አንድ ጊዜ 400 ብር ከፍለው ሁሉንም ያገኛሉ።',
      compareTitle: 'የነጻ ግብአቶች እና የፕራይቬት አባልነት ልዩነት',
      compareSubtitle: 'የአባልነት ጥቅሞችን በግልጽ ይመልከቱ',
      colFeature: 'የትምህርት ግብአት',
      colPublic: 'የነጻ ክፍት ግብአቶች',
      colMember: 'የፕራይቬት አባልነት',
      rows: [
        { name: 'አጫጭር የዩቲዩብ ቪዲዮዎች', public: true, member: true },
        { name: 'የተሟሉ ምዕራፍ በምዕራፍ ቪዲዮዎች', public: false, member: true },
        { name: 'ያለፉ ሚድ ፈተናዎች ከመፍትሔ ጋር', public: false, member: true },
        { name: 'ያለፉ ፋይናል ፈተናዎች በደረጃ የተሰሩ', public: false, member: true },
        { name: 'ሊወርዱ የሚችሉ የፒዲኤፍ ማጠቃለያ ኖቶች', public: false, member: true },
        { name: 'ከአስተማሪ ጋር የቀጥታ ጥያቄና መልስ', public: false, member: true },
      ],
    },
    courses: {
      badge: 'የኮርሶች ዝርዝር',
      title: 'በአካዳሚው ውስጥ የሚገኙ',
      titleHighlight: 'የትምህርት ይዘቶች',
      subtitle: 'ከዚህ በታች የተዘረዘሩት ሁሉም ኮርሶች በአንድ ጊዜ በ400 ብር አባልነት ውስጥ የተካተቱ ናቸው። ለብቻቸው አይሸጡም።',
      filterAll: 'ሁሉም ኮርሶች',
      filterCore: 'ዋና ዋና ኮርሶች',
      filterStem: 'STEM እና ሂሳብ',
      filterHumanities: 'ማህበራዊ ሳይንስ',
      includedTag: 'በአባልነት ውስጥ የተካተተ',
      sampleVideo: 'የቪዲዮ ናሙና',
      bottomText: 'ተጨማሪ የዩኒቨርሲቲ ዲፓርትመንት ኮርሶች በየጊዜው በግሩፑ ውስጥ ይጨመራሉ!',
      bottomCta: 'ሁሉንም ኮርሶች በ400 ብር አባልነት ያግኙ',
    },
    resources: {
      badge: 'የተማሪዎች ድጋፍ',
      title: 'የተማሪዎች',
      titleHighlight: 'ግብአቶች',
      subtitle: 'በዩኒቨርሲቲ ቆይታዎ ውጤታማ እንዲሆኑ የሚረዱዎት የፈተና ወረቀቶች እና የትምህርት መርጃዎች',
      cards: [
        {
          title: 'ያለፉት ዓመታት ፈተናዎች',
          desc: 'ከተለያዩ የኢትዮጵያ ዩኒቨርሲቲዎች የተሰበሰቡ ትክክለኛ ሚድ እና ፋይናል ፈተናዎች ከመፍትሔዎቻቸው ጋር።',
          tag: 'ሚድ እና ፋይናል',
          action: 'ፈተናዎችን ይመልከቱ',
        },
        {
          title: 'የቪዲዮ ማብራሪያዎች',
          desc: 'አስቸጋሪ የካምፓስ ፅንሰ-ሀሳቦችን በአማርኛ እና በእንግሊዝኛ በግልጽ የሚያብራሩ ቪዲዮዎች።',
          tag: 'ዩቲዩብ እና ቴሌግራም',
          action: 'በዩቲዩብ ይመልከቱ',
        },
        {
          title: 'የጥናት ማጠቃለያዎች',
          desc: 'ከፈተና በፊት በፍጥነት ለመከለስ የሚረዱ አጫጭር ኖቶች፣ ፎርሙላዎች እና ዋና ዋና ነጥቦች።',
          tag: 'የፒዲኤፍ ኖቶች',
          action: 'ጠቃሚ ምክሮች',
        },
        {
          title: 'የዲፓርትመንት መረጃ',
          desc: 'ስለ ዲፓርትመንት ምርጫ፣ የክሬዲት አወሳሰድ እና ጂፒኤ (GPA) አያያዝ ጠቃሚ መመሪያዎች።',
          tag: 'የካምፓስ ምክሮች',
          action: 'መረጃ ይመልከቱ',
        },
      ],
      videoShowcaseTitle: 'ተለይተው የቀረቡ የቪዲዮ ትምህርቶች',
      videoShowcaseSubtitle: 'ከይፋዊው የዩቲዩብ ቻናላችን (@aplusacademy1) የተመረጡ ናሙናዎች',
      video1Tag: 'የዩቲዩብ ትምህርት',
      video1Title: 'የኮምፒውተር ፕሮግራሚንግ (C++) እና ሎጂክ',
      video1Desc: 'የC++ መሰረታዊያን እና የሎጂክ ፎላሲዎች በአማርኛ የተብራሩበት።',
      video2Tag: 'የፈተና አሰራር',
      video2Title: 'የሚድ እና የፋይናል ፈተናዎች አሰራር',
      video2Desc: 'ጥያቄዎችን እንዴት በፍጥነት እና በትክክል መስራት እንደሚቻል የሚያሳይ።',
      watchYoutube: 'በዩቲዩብ ይመልከቱ',
    },
    about: {
      badge: 'ከ2017 ዓ.ም ጀምሮ',
      title: 'ስለ',
      titleHighlight: 'ኤ ፕላስ አካዳሚ (Aplus Academy)',
      founderTitle: 'ይትባረክ ክፍለዮሐንስ',
      founderRole: 'መሥራች እና ዋና አስተማሪ • Aplus Academy',
      quote:
        '“ኤ ፕላስ አካዳሚ የተቋቋመው ግልጽ በሆነ ዓላማ ነው፡ ለኢትዮጵያ ዩኒቨርሲቲ ተማሪዎች ተደራሽ እና ጥራት ያለው የትምህርት ድጋፍ በመስጠት የካምፓስ ቆይታቸውን በልበ-ሙሉነት እና በከፍተኛ ውጤት እንዲያጠናቅቁ ለማስቻል ነው።”',
      founderLabel: '— ይትባረክ፣ የኤ ፕላስ አካዳሚ መሥራች',
      body:
        'የካምፓስ ትምህርቶች በፍጥነት ስለሚሄዱ ተማሪዎች አስቸጋሪ ፅንሰ-ሀሳቦችን እና ፈተናዎችን ለመረዳት ሊቸገሩ ይችላሉ። በኤ ፕላስ አካዳሚ ውስብስብ የትምህርት ክፍሎችን በቀላሉ ወደሚገቡ የአማርኛ ቪዲዮዎች፣ የተሰሩ ያለፉ ፈተናዎች እና አጋዥ ማጠቃለያዎች ቀይረን እናቀርባለን።',
      pillar1Title: 'ትክክለኛ የካምፓስ ስርዓተ-ትምህርት',
      pillar1Desc: 'በኢትዮጵያ ዩኒቨርሲቲዎች ከሚሰጡ ኮርሶች ጋር በቀጥታ የተጣጣመ።',
      pillar2Title: 'አጋዥ የመማሪያ ማህበረሰብ',
      pillar2Desc: 'ተማሪዎች ጥያቄዎችን የሚጠይቁበት እና አብረው የሚዘጋጁበት የቴሌግራም ግሩፕ።',
    },
    register: {
      badge: 'የአባልነት ምዝገባ',
      title: 'ይመዝገቡ እና',
      titleHighlight: 'ክፍያዎን ያስገቡ',
      subtitle: 'የአንድ ጊዜ ክፍያ 400 ብር ከፍለው መረጃዎን ከታች ያስገቡ።',
      step1Title: '1. የአንድ ጊዜ ክፍያ 400 ብር ይክፈሉ',
      step2Title: '2. የክፍያ መረጃዎን እና ደረሰኝዎን ያስገቡ',
      nameLabel: 'ሙሉ ስም',
      namePlaceholder: 'ምሳሌ፡ አበበ በቀለ',
      phoneLabel: 'ስልክ ቁጥር',
      phonePlaceholder: 'ምሳሌ፡ 0912345678',
      phoneHelp: 'ክፍያዎን እና ሁኔታዎን ለማረጋገጥ ያገለግላል።',
      telegramLabel: 'የቴሌግራም ዩዘርኔም (Telegram Username)',
      telegramPlaceholder: 'ምሳሌ፡ @your_username ወይም ስልክ ቁጥር',
      telegramHelp: 'የፕራይቬት ቴሌግራም ግሩፑን ለመቀላቀል የግድ ያስፈልጋል።',
      paymentMethodLabel: 'የከፈሉበት መንገድ',
      transactionLabel: 'የሂሳብ ማረጋገጫ ቁጥር (Transaction ID / Ref)',
      transactionPlaceholder: 'ምሳሌ፡ TB123456789 ወይም የንግድ ባንክ ሪፈረንስ',
      transactionHelp: 'በቴሌብር የደረሰዎት የኤስኤምኤስ ኮድ ወይም የባንክ ደረሰኝ ቁጥር።',
      proofLabel: 'የክፍያ ደረሰኝ ስክሪንሽት (Payment Screenshot)',
      proofUploadText: 'ስክሪንሽት ለመጫን እዚህ ይጫኑ ወይም ይጎትቱ',
      proofUploadHint: 'JPG, PNG ወይም WEBP ምስል ብቻ (እስከ 5 ሜጋባይት)',
      proofAttached: 'ደረሰኝ ተያይዟል፡',
      proofChange: 'ምስሉን ለመቀየር ይጫኑ',
      privacyNote: 'የክፍያ ደረሰኝዎ ሚስጥራዊነቱ በተጠበቀ ማከማቻ ውስጥ የሚቀመጥ ሲሆን ክፍያዎን ለማረጋገጥ ብቻ ያገለግላል።',
      submitBtn: 'ደረሰኙን ላክ እና አረጋግጥ',
      submittingBtn: 'በመላክ ላይ ነው...',
      successBadge: 'ምዝገባው ተልኳል',
      successTitle: 'ምዝገባዎ በተሳካ ሁኔታ ደርሶናል!',
      regIdLabel: 'የምዝገባ መለያ (ID):',
      regPhoneLabel: 'የተመዘገበ ስልክ:',
      statusPending: '🟡 በግምገማ ላይ',
      checkStatusBtn: 'የማረጋገጫ ሁኔታን ይፈትሹ',
      submitAnotherBtn: 'ሌላ ይመዝግቡ',
      copied: 'ተቀድቷል',
      copy: 'ኮፒ',
    },
    status: {
      title: 'የአባልነት ሁኔታን ይፈትሹ',
      subtitle: 'የተመዘገቡበትን ስልክ ቁጥር ወይም የምዝገባ መለያ (ID) ያስገቡ።',
      inputPlaceholder: 'ምሳሌ፡ 0912345678 ወይም APL-...',
      searchBtn: 'ፈልግ',
      approvedTitle: 'ክፍያዎ ተረጋግጧል!',
      approvedDesc: 'እንኳን ደስ አለዎት! ክፍያዎ ተረጋግጧል። አሁን የኤ ፕላስ አካዳሚ ፕራይቬት የቴሌግራም ግሩፕን መቀላቀል ይችላሉ።',
      telegramLinkTitle: 'የፕራይቬት ቴሌግራም ግሩፕ መግቢያ ሊንክ፡',
      joinBtn: 'አሁን ቴሌግራም ግሩፑን ይቀላቀሉ',
      copyBtn: 'ሊንክ ኮፒ',
      copiedBtn: 'ተቀድቷል',
      pendingTitle: 'ክፍያዎ በግምገማ ላይ ነው',
      pendingDesc: 'ምዝገባዎ ደርሶናል። አስተዳዳሪው የከፈሉበትን ደረሰኝ በእጅ እያረጋገጠ ነው። እባክዎ ትንሽ ቆይተው እንደገና ይፈትሹ።',
      pendingContact: 'ፈጣን ማረጋገጫ ከፈለጉ የምዝገባ መለያዎን (ID) በመያዝ በቴሌግራም @Yitbarek_2 ላይ ማነጋገር ይችላሉ።',
      rejectedTitle: 'ክፍያዎ አልተረጋገጠም',
      rejectedDesc: 'የላኩት ክፍያ ማረጋገጫ ተቀባይነት አላገኘም።',
      rejectedReason: 'ምክንያት፡',
      contactSupport: 'በቴሌግራም አግኙን',
      resubmit: 'እንደገና ያስገቡ',
    },
    contact: {
      badge: 'ድጋፍ እና ማህበራዊ ሚዲያ',
      title: 'ከእኛ ጋር',
      titleHighlight: 'ይገናኙ',
      subtitle: 'ለአዳዲስ ቪዲዮዎች፣ የፈተና መረጃዎች እና ቀጥታ የተማሪዎች ድጋፍ ይከተሉን።',
      youtubeTitle: 'ይፋዊ ዩቲዩብ ቻናል',
      youtubeSub: '11.4K+ ተከታዮች • ነጻ የትምህርት ቪዲዮዎች',
      telegramTitle: 'ይፋዊ ቴሌግራም ቻናል',
      telegramSub: 'ማስታወቂያዎች፣ ያለፉ ፈተናዎች እና ዜናዎች',
      tiktokTitle: 'ቲክቶክ (TikTok)',
      tiktokSub: 'አጫጭር የጥናት ዘዴዎች እና የካምፓስ መረጃዎች',
      supportTitle: 'የቀጥታ ድጋፍ',
      supportSub: 'ስለ ምዝገባ እና ክፍያ ጥያቄ ካለዎት በቀጥታ ያናግሩን',
      bannerTitle: 'ጥያቄ ወይም አስተያየት አለዎት?',
      bannerSub: 'የኢትዮጵያ ዩኒቨርሲቲ ተማሪዎችን ለመደገፍ ምንጊዜም ዝግጁ ነን።',
      bannerTgBtn: 'በቴሌግራም ይጻፉልን፡ @Yitbarek_2',
    },
    footer: {
      desc: 'የኢትዮጵያ ዩኒቨርሲቲ ተማሪዎች የትምህርት የልህቀት ማዕከል። የቪዲዮ ትምህርቶች፣ ያለፉ ፈተናዎች እና ንቁ የቴሌግራም መማሪያ ማህበረሰብ።',
      quickNav: 'ፈጣን አሰሳ',
      studentTools: 'የተማሪ እና የአስተዳዳሪ ገጽ',
      checkStatus: 'የምዝገባ ሁኔታን ይፈትሹ',
      terms: 'ውሎች እና የግላዊነት ፖሊሲ',
      adminPortal: 'የአስተዳዳሪ መግቢያ',
      copyright: '© 2026 ኤ ፕላስ አካዳሚ (Aplus Academy) • መብቱ በሕግ የተጠበቀ ነው',
      badge: 'ለኢትዮጵያ ዩኒቨርሲቲ ተማሪዎች የተዘጋጀ',
    },
  },
  en: {
    nav: {
      home: 'Home',
      howItWorks: 'How It Works',
      membership: 'Membership',
      courses: 'Courses',
      resources: 'Resources',
      about: 'About',
      contact: 'Contact',
      checkStatus: 'Check Status',
      joinNow: 'Join Now (400 Birr)',
      langSwitch: 'አማርኛ',
    },
    hero: {
      badge: 'Dedicated Ethiopian University Learning Community',
      titleMain: 'Excel in Campus with',
      titleHighlight: 'Aplus Academy',
      subtitle:
        'We help university students learn, prepare, and access high-yield academic materials through our dedicated private learning community. Pay once (400 Birr) to become a member and unlock full access to structured video lessons, lecture summaries, and past midterm & final exam walkthroughs inside the private group.',
      benefit1: 'One-Time 400 Birr Payment (No monthly subscriptions)',
      benefit2: 'Private Telegram Group Lifetime Membership',
      benefit3: 'Real Past Midterm & Final Exams with Solutions',
      benefit4: 'Taught in Clear Amharic & English',
      ctaPrimary: 'Join Aplus Academy (400 Birr)',
      ctaSecondary: 'Explore Learning Content',
      securityNote: 'Safe payment with Telebirr & CBE • Manual verification by owner',
      hubBadge: 'Membership Access',
      oneTimeFee: 'One-Time 400 Birr',
      statStudents: '11.4K+ YouTube Learners',
      statVideos: '44+ Video Lessons',
      statEstablished: 'Active Since 2017 E.C',
      youtubeHandle: 'Official YouTube: @aplusacademy1',
    },
    howItWorks: {
      badge: 'Simple & Transparent Process',
      title: 'How It',
      titleHighlight: 'Works',
      subtitle: 'From initial payment to joining the private learning group in 6 straightforward steps.',
      steps: [
        {
          step: '01',
          title: 'Decide to Join',
          desc: 'Understand our one-time membership model. You pay once for full community access, not per course.',
        },
        {
          step: '02',
          title: 'Pay Once (400 Birr)',
          desc: 'Send the one-time fee using Telebirr, Commercial Bank of Ethiopia (CBE), or Bank of Abyssinia (BOA).',
        },
        {
          step: '03',
          title: 'Submit Proof',
          desc: 'Fill in your name, phone number, Telegram username, and upload your payment screenshot.',
        },
        {
          step: '04',
          title: 'Manual Review',
          desc: 'The Aplus Academy owner checks your payment reference and receipt to verify your transaction safely.',
        },
        {
          step: '05',
          title: 'Get Group Access',
          desc: 'Once approved, you receive the invitation link to the private Aplus Academy Telegram learning community.',
        },
        {
          step: '06',
          title: 'Start Learning',
          desc: 'Access full video archives, lecture notes, exam papers with answers, and study alongside fellow students.',
        },
      ],
      banner: 'Important Reminder: Aplus Academy does not charge you per course. Your single one-time payment of 400 Birr gives you access to the entire private Telegram group and all learning materials delivered inside it.',
    },
    membership: {
      badge: 'One-Time Membership',
      title: 'Join the',
      titleHighlight: 'Aplus Academy Community',
      subtitle: 'One single payment of 400 Birr gives you lifetime access to the private Telegram learning group. No hidden fees, no subscriptions, and no per-course charges.',
      popularBadge: 'Most Popular',
      currency: 'ETB',
      period: '/ One-Time Payment',
      tagline: 'Pay once. Full access to the private Telegram learning group.',
      includedTitle: 'What You Receive As a Member:',
      benefits: [
        'Complete video tutorial archives for all university courses',
        'Real campus Midterm & Final past exams with detailed solutions',
        'Condensed PDF lecture summaries and chapter study notes',
        'Private Telegram community with active student discussions',
        'Direct Q&A and exam problem assistance from the instructor',
        'Access to upcoming course uploads without paying again',
        'One-time payment: Never billed monthly or per course',
      ],
      ctaButton: 'Enroll Now (400 Birr)',
      securitySub: 'Manual verification ensures secure admission to the Telegram group',
      telegramHubTitle: 'Private Telegram Hub',
      telegramHubDesc: 'Why Telegram? It delivers high-speed video playback, search by course hashtag, easy PDF downloads, and zero bandwidth waste on slow campus connections.',
      telegramFeature1Title: '📱 Mobile & PC Friendly',
      telegramFeature1Desc: 'Study on your phone, tablet, or laptop anytime.',
      telegramFeature2Title: '🔒 Private & Spam-Free',
      telegramFeature2Desc: 'Only verified members enter the group.',
      telegramNote: 'Invitation link is issued immediately upon manual payment verification.',
      noPerCourseTitle: 'No Course-by-Course Checkout',
      noPerCourseDesc: 'You never need to buy Computer Programming, Logic, or Economics separately. One membership unlocks all available courses in the group.',
      compareTitle: 'Free Resources vs. Private Member Community',
      compareSubtitle: 'Transparent comparison so you know exactly what comes with membership',
      colFeature: 'Resource Feature',
      colPublic: 'Public Resources',
      colMember: 'Private Member Group',
      rows: [
        { name: 'Public YouTube Video Previews', public: true, member: true },
        { name: 'Full Video Chapters & Playlists', public: false, member: true },
        { name: 'Real Midterm Exams With Solutions', public: false, member: true },
        { name: 'Real Final Exams With Step-by-Step Proofs', public: false, member: true },
        { name: 'Downloadable PDF Chapter Notes & Slides', public: false, member: true },
        { name: 'Direct Instructor Q&A & Support', public: false, member: true },
      ],
    },
    courses: {
      badge: 'Curriculum & Content',
      title: 'Learning Content Available in',
      titleHighlight: 'Aplus Academy',
      subtitle: 'All subjects below are included within your single one-time membership of 400 Birr. You never pay separate fees for individual courses.',
      filterAll: 'All Subjects',
      filterCore: 'Core Academic',
      filterStem: 'STEM & Math',
      filterHumanities: 'Humanities & English',
      includedTag: 'Included with Membership',
      sampleVideo: 'Sample Video',
      bottomText: 'Looking for something specific? More university department subjects are added continuously inside the group!',
      bottomCta: 'Unlock All Subjects With One-Time Membership',
    },
    resources: {
      badge: 'Academic Support',
      title: 'Student',
      titleHighlight: 'Resources',
      subtitle: 'Everything you need to study smart, prepare for midterms, and excel across your university semesters.',
      cards: [
        {
          title: 'Past Campus Exams',
          desc: 'Real midterm and final examinations collected from top Ethiopian universities with fully worked out solutions.',
          tag: 'Mid & Final Papers',
          action: 'Explore Exams',
        },
        {
          title: 'Video Lesson Playlists',
          desc: 'In-depth video tutorials simplifying difficult campus math, programming, logic, and theory concepts in Amharic & English.',
          tag: 'YouTube & Telegram',
          action: 'Watch on YouTube',
        },
        {
          title: 'Study Guides & Summaries',
          desc: 'Concise lecture notes, formulas, and high-yield chapter summaries designed for rapid review right before exam week.',
          tag: 'Downloadable PDFs',
          action: 'Study Tips & Notes',
        },
        {
          title: 'Department Guidance',
          desc: 'Insightful overviews regarding campus department selection, credit hour management, GPA calculation, and freshman transition.',
          tag: 'University Tips',
          action: 'View Guidance Video',
        },
      ],
      videoShowcaseTitle: 'Featured Video Lessons from Aplus Academy',
      videoShowcaseSubtitle: 'Sample walkthroughs from our official YouTube channel (@aplusacademy1)',
      video1Tag: 'YouTube Lecture Series',
      video1Title: 'Computer Programming (C++) & Logic Fallacies',
      video1Desc: 'Step-by-step Amharic explanations breaking down tricky logic arguments and core C++ functions.',
      video2Tag: 'Real Exam Solving',
      video2Title: 'Midterm & Final Exam Solutions Walkthrough',
      video2Desc: 'Learn how questions are structured, how to eliminate wrong choices, and how to write clear step-by-step proofs.',
      watchYoutube: 'Watch on YouTube',
    },
    about: {
      badge: 'Dedicated Since 2017 E.C',
      title: 'About',
      titleHighlight: 'Aplus Academy',
      founderTitle: 'Yitbarek Kifleyohans',
      founderRole: 'Founder & Lead Instructor • Aplus Academy',
      quote:
        '"Aplus Academy was created with a clear purpose: to provide accessible, high-quality academic support for Ethiopian university students and help them navigate their campus experience with confidence and excellence."',
      founderLabel: '— Yitbarek, Founder of Aplus Academy',
      body:
        'University courses often move fast, leaving students struggling with complex theories, dense proofs, and little exam guidance. At Aplus Academy, we break down challenging curriculum subjects into practical, engaging video tutorials, clear Amharic breakdowns, and fully worked-out past examination solutions.',
      pillar1Title: 'Targeted Curriculum',
      pillar1Desc: 'Directly mapped to Ethiopian public and private university syllabi.',
      pillar2Title: 'Supportive Community',
      pillar2Desc: 'A private Telegram learning space where students can ask questions and prepare together.',
    },
    register: {
      badge: 'Membership Registration',
      title: 'Membership Registration &',
      titleHighlight: 'Payment',
      subtitle: 'Make the one-time payment of 400 ETB, then fill in your details and upload your payment screenshot below.',
      step1Title: '1. Make the One-Time Payment (400 ETB)',
      step2Title: '2. Submit Your Registration & Payment Proof',
      nameLabel: 'Full Name',
      namePlaceholder: 'e.g. Abebe Bikila',
      phoneLabel: 'Phone Number',
      phonePlaceholder: 'e.g. 0912345678',
      phoneHelp: 'Used to check your approval status.',
      telegramLabel: 'Telegram Username',
      telegramPlaceholder: 'e.g. @your_username',
      telegramHelp: 'So we can grant you access to the private Telegram community.',
      paymentMethodLabel: 'Payment Method Used',
      transactionLabel: 'Transaction ID / Reference Number',
      transactionPlaceholder: 'e.g. TX123456789 or CBE Ref number',
      transactionHelp: 'Found in your Telebirr SMS or CBE transaction confirmation.',
      proofLabel: 'Payment Proof Screenshot',
      proofUploadText: 'Click to upload or drag & drop screenshot',
      proofUploadHint: 'JPG, PNG, or WEBP (Max 5 MB)',
      proofAttached: 'Screenshot attached:',
      proofChange: 'Click to change image',
      privacyNote: 'Your screenshot is kept strictly confidential in private storage and reviewed only by the owner to verify payment.',
      submitBtn: 'Submit Payment Proof for Review',
      submittingBtn: 'Submitting Registration & Proof...',
      successBadge: 'Submission Received',
      successTitle: 'Registration Submitted Successfully!',
      regIdLabel: 'Registration ID:',
      regPhoneLabel: 'Registered Phone:',
      statusPending: '🟡 Pending Review',
      checkStatusBtn: 'Check Verification Status',
      submitAnotherBtn: 'Submit Another',
      copied: 'Copied',
      copy: 'Copy',
    },
    status: {
      title: 'Check Membership Status',
      subtitle: 'Enter your registered phone number, Telegram username, or Registration ID.',
      inputPlaceholder: 'e.g. 0912345678 or APL-...',
      searchBtn: 'Search',
      approvedTitle: 'Payment Verified!',
      approvedDesc: 'Congratulations! Your payment has been confirmed. You now have access to the private Aplus Academy Telegram community.',
      telegramLinkTitle: 'Private Telegram Access Link:',
      joinBtn: 'Join Private Telegram Group Now',
      copyBtn: 'Copy',
      copiedBtn: 'Copied',
      pendingTitle: 'Payment Under Review',
      pendingDesc: 'Your registration was received. The owner verifies transactions manually. Please check back shortly.',
      pendingContact: 'Need faster verification? You can message the founder directly on Telegram at @Yitbarek_2 with your Registration ID.',
      rejectedTitle: 'Verification Failed',
      rejectedDesc: 'Your payment could not be verified automatically.',
      rejectedReason: 'Reason:',
      contactSupport: 'Contact Support on Telegram',
      resubmit: 'Resubmit',
    },
    contact: {
      badge: 'Community & Help',
      title: 'Connect With',
      titleHighlight: 'Us',
      subtitle: 'Follow our channels for regular video lessons, exam updates, and direct student support.',
      youtubeTitle: 'YouTube Channel',
      youtubeSub: '11.4K Subscribers • Free tutorial previews & exam reviews',
      telegramTitle: 'Telegram Channel',
      telegramSub: 'Public announcements, past exam PDFs & updates',
      tiktokTitle: 'TikTok',
      tiktokSub: 'Quick study tips, university hacks & shorts',
      supportTitle: 'Direct Support',
      supportSub: 'Have questions about registration or payment?',
      bannerTitle: 'Have a question or feedback?',
      bannerSub: 'We are dedicated to helping Ethiopian campus students succeed. Reach out anytime!',
      bannerTgBtn: 'Telegram: @Yitbarek_2',
    },
    footer: {
      desc: 'Empowering Ethiopian university students for academic excellence. We provide dedicated course tutorials, past exam solutions, and an active private Telegram learning community.',
      quickNav: 'Quick Navigation',
      studentTools: 'Student & Owner Tools',
      checkStatus: 'Check Verification Status',
      terms: 'Terms & Privacy Policy',
      adminPortal: 'Owner Review Portal',
      copyright: '© 2026 Aplus Academy • All Rights Reserved',
      badge: 'Built for Ethiopian University Students',
    },
  },
};
