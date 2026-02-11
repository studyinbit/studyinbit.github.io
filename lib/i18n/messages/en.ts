const enMessagesRaw = {
  common: {
    language: "Language",
    changeLanguage: "Change language",
    indonesian: "Indonesia",
    english: "English",
  },
  navbar: {
    home: "Home",
    campusLife: "Campus Life",
    community: "Community",
    scholarshipCost: "Scholarship & Cost",
    faq: "FAQ",
    admissions: "Admissions",
    freeConsultation: "Free Consultation",
  },
  footer: {
    description:
      "Your gateway to world-class engineering education at Beijing Institute of Technology.",
    explore: "Explore",
    resources: "Resources",
    connect: "Connect",
    home: "Home",
    campusLife: "Campus Life",
    community: "Indonesian Community",
    admissions: "Admissions & Scholarships",
    faq: "FAQ",
    whatsapp: "WhatsApp (Consultation)",
    contactName: "Timothy Pardin",
    emailInquiry: "Email Inquiry",
    rights: "All rights reserved.",
  },
  languagePrompt: {
    title: "Choose your language",
    description:
      "We defaulted to Indonesian because your browser language is not supported yet. You can switch anytime from the language button.",
    chooseLater: "Continue with Indonesian",
  },
  languageNudge: {
    title: "Language options",
    description:
      "We switched this page based on your saved language preference. Use the language switcher if you want another language.",
    action: "Change language",
    dismiss: "Dismiss",
  },
  home: {
    heroBadge: "Free Consultation",
    heroTitleLead: "BIT",
    heroTitleAccent: "The Future of Engineering",
    heroSubtitle:
      "Join Beijing Institute of Technology - A premier 'Double First-Class' university leading China's aerospace and engineering innovation.",
    rankingBySubject: "Ranking by Subject",
    rankingSource: "Source: QS Ranking",
    stats: [
      { value: "64", suffix: "th", label: "Mechanical Engineering" },
      { value: "89", suffix: "th", label: "Computer Science" },
      { value: "108", suffix: "th", label: "Economics" },
      { value: "400", suffix: "+", label: "Indonesian Students" },
    ],
    whyBitTitle: "Why BIT?",
    tableHeaders: {
      metric: "Metric",
      rank: "Rank",
      elaboration: "Elaboration",
    },
    rankingRows: [
      {
        metric: "QS Graduate Employability",
        rank: "#9",
        title: "Career-Ready Graduates",
        desc: "BIT graduates are valued higher by employers than graduates from higher ranked but less practical universities.",
      },
      {
        metric: "NTU Ranking (Engineering)",
        rank: "#14",
        title: "Engineering Excellence",
        desc: "In pure engineering output, BIT is a global top-15 institution, outranking many Ivy League schools.",
      },
      {
        metric: "ARWU (Shanghai Ranking) 2025",
        rank: "#102",
        title: "Global Research Impact",
        desc: "Being on the cusp of the Top 100 globally signals immense research productivity.",
      },
    ],
    priorityCards: [
      {
        title: "Funding Priority",
        desc: "While other universities struggle for grants, BIT's labs are capitalized by the state's most critical projects. This ensures priority in aerospace, high-end manufacturing, and national security research.",
      },
      {
        title: '"Double First-Class" Status',
        desc: "BIT is designated as a Class A \"Double First-Class\" university. This is the gold standard, placing you at the forefront of China's push to become a science and technology superpower.",
      },
    ],
    priorityVisual: {
      title: "Research Priority",
      subtitle: "Aerospace & Defense Engineering",
    },
    chinaSection: {
      headingStart: "China is",
      headingShiny: "the Future",
      body: "China has shown that it is not just the world's factory; it is becoming the world's laboratory. Speaking Chinese is no longer just a language but a critical career asset for the next 50 years.",
      points: [
        {
          title: "Economic Gravity",
          desc: "As trade between Indonesia and China explodes, bilingual engineers are the most sought-after talent in Jakarta.",
        },
        {
          title: "Future-Proof Career",
          desc: "Mastering Mandarin (aiming for HSK 5/6) opens doors to multinational giants like Huawei, BYD, and TikTok.",
        },
      ],
    },
    segue: {
      title: "Your BIT life",
      description: "Want to get a glimpse of what your life will be like in BIT?",
      button: "Explore Campus Life",
    },
  },
} as const;

type WidenLiteral<T> =
  T extends string ? string :
  T extends number ? number :
  T extends boolean ? boolean :
  T extends readonly (infer U)[] ? readonly WidenLiteral<U>[] :
  T extends object ? { [K in keyof T]: WidenLiteral<T[K]> } :
  T;

export type Messages = WidenLiteral<typeof enMessagesRaw>;

export const enMessages: Messages = enMessagesRaw;
