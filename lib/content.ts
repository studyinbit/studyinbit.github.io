export const siteContent = {
  hero: {
    title: "Engineering the Future",
    subtitle: "Join Beijing Institute of Technology - A premier 'Double First-Class' university leading China's aerospace and engineering innovation.",
    cta: "Start Your Journey",
  },
  stats: [
    { label: "Mechanical Engineering", value: "64", suffix: "th", source: "QS Ranking" },
    { label: "Computer Science", value: "89", suffix: "th", source: "QS Ranking" },
    { label: "Economics", value: "108", suffix: "th", source: "QS Ranking" },
    { label: "Indonesian Students", value: "400", suffix: "+", source: "Active Community" },
  ],
  features: [
    {
      title: "Backed by China",
      description: "A premier member of the 'Seven Sons of National Defense', with labs capitalized by the state's most critical projects in aerospace and security.",
      icon: "Shield",
    },
    {
      title: "Strategic Location",
      description: "Located in Liangxiang, engineered for deep work. A distraction-free environment with a library seating 2,500 students.",
      icon: "MapPin",
    },
    {
      title: "Zero-Stress Landing",
      description: "From free airport shuttles to 'Jastip' services for dorm essentials, we solve the 'Day 1' logistics for peace of mind.",
      icon: "Plane",
    },
    {
      title: "Employability Premium",
      description: "Ranked #9 in employability. Graduates are valued by tech giants like Huawei, BYD, and TikTok for their practical building skills.",
      icon: "Briefcase",
    },
  ],
  contact: {
    whatsapp: "https://wa.me/6281388577873",
    phone: "+62 813 8857 7873",
    name: "Timothy Pardin",
  },
  scholarshipInfo: [
    {
      id: "csc",
      name: "Chinese Government Scholarship",
      subtitle: "(only for Chinese-taught program)",
      program: "Undergraduates Program",
      description: "The scholarship application is directed to the local Chinese Embassy or Consulate. When filling in the scholarship application form, the applicant should choose Type A and select Beijing Institute of Technology as the first priority institution.",
      campus: "both" as const,
      languageRestriction: "chinese-only" as const,
      applicationPeriod: "November - April",
      applicationMethod: "Through Chinese Embassy/Consulate in your home country",
      tiers: [
        { name: "Type A", coverageSummary: "Full tuition + Accommodation + Stipend + Insurance" },
      ],
      notes: ["Chinese-taught programs only", "Choose Type A on the application form", "Select BIT as the first priority institution"],
    },
    {
      id: "beijing-gov",
      name: "Beijing Government Scholarship",
      subtitle: "(only for Beijing campus)",
      program: "Undergraduates Program",
      description: "Includes A-class, B-class, and C-class scholarships. Please refer to the website for details.",
      campus: "beijing" as const,
      deadline: "May 1, 2026",
      applicationMethod: "Through BIT admissions portal",
      link: "https://english.beijing.gov.cn/studyinginbeijing/index.html",
      tiers: [
        { name: "Type A", coverageSummary: "Tuition + Accommodation + Stipend + Insurance" },
        { name: "Type B", coverageSummary: "Tuition + Accommodation + Insurance" },
        { name: "Type C", coverageSummary: "Tuition + Insurance" },
      ],
      notes: ["Beijing campus only"],
    },
    {
      id: "bit-international",
      name: "BIT International Student Scholarship",
      program: "Undergraduates Program",
      description: "Merit-based scholarship awarded directly by BIT with four-year and one-year duration options across multiple prize tiers.",
      campus: "both" as const,
      applicationMethod: "Automatic consideration based on academic performance",
      tiers: [
        { name: "4-Year First Prize", coverageSummary: "Tuition + Accommodation + Stipend + Insurance" },
        { name: "4-Year Second Prize", coverageSummary: "Tuition + Accommodation" },
        { name: "4-Year Third Prize", coverageSummary: "Tuition only" },
        { name: "1-Year First Prize", coverageSummary: "Tuition + Accommodation" },
        { name: "1-Year Second Prize", coverageSummary: "Tuition only" },
        { name: "1-Year Third Prize", coverageSummary: "50% Tuition" },
        { name: "1-Year Fourth Prize", coverageSummary: "25% Tuition" },
      ],
    },
    {
      id: "guangdong-gov",
      name: "Guangdong Government Outstanding International Student Scholarship",
      subtitle: "(only for Zhuhai campus)",
      program: "Undergraduates Program",
      description: "Scholarship funding standard: CNY 10,000/year. Please refer to the website for details.",
      campus: "zhuhai" as const,
      deadline: "May 1, 2026",
      applicationMethod: "Through BIT Zhuhai admissions",
      link: "https://www.gd.gov.cn/zwgk/gongbao/2013/28/content/post_3364046.html",
      tiers: [
        { name: "Standard", coverageSummary: "CNY 10,000/year" },
      ],
      notes: ["Zhuhai campus only"],
    },
    {
      id: "bit-zhuhai-new",
      name: "BIT Zhuhai \"Study in BIT\" International Students New Student Scholarship",
      program: "Pre-University Program",
      description: "This scholarship is for outstanding international students to study in BIT Zhuhai campus. This scholarship covers 50% of the tuition fees for the Pre-University program.",
      campus: "zhuhai" as const,
      applicationMethod: "Download application form from ISC website, complete and upload to the application system",
      link: "https://isc.bit.edu.cn/",
      tiers: [
        { name: "Pre-University", coverageSummary: "50% Tuition" },
      ],
      notes: [
        "Zhuhai campus only",
        "Deadline: January 1, 2026 (for enrollment in March 2026)",
        "Deadline: May 15, 2026 (for enrollment in September 2026)",
        "Nomination quota allocated proportionally based on number of applicants",
      ],
    },
  ],
  calculatorScholarships: [
    {
      id: "beijing-a",
      name: "Beijing Gov Scholarship Type A",
      group: "Beijing Government Scholarship",
      coverage: { tuitionPercent: 1, accommodation: true, stipend: 2500, insurance: true },
    },
    {
      id: "beijing-b",
      name: "Beijing Gov Scholarship Type B",
      group: "Beijing Government Scholarship",
      coverage: { tuitionPercent: 1, accommodation: true, stipend: 0, insurance: true },
    },
    {
      id: "beijing-c",
      name: "Beijing Gov Scholarship Type C",
      group: "Beijing Government Scholarship",
      coverage: { tuitionPercent: 1, accommodation: false, stipend: 0, insurance: true },
    },
    {
      id: "bit-4yr-1st",
      name: "BIT Intl Scholarship (4yr, First Prize)",
      group: "BIT International Student Scholarship",
      coverage: { tuitionPercent: 1, accommodation: true, stipend: 2500, insurance: true },
    },
    {
      id: "bit-4yr-2nd",
      name: "BIT Intl Scholarship (4yr, Second Prize)",
      group: "BIT International Student Scholarship",
      coverage: { tuitionPercent: 1, accommodation: true, stipend: 0, insurance: false },
    },
    {
      id: "bit-4yr-3rd",
      name: "BIT Intl Scholarship (4yr, Third Prize)",
      group: "BIT International Student Scholarship",
      coverage: { tuitionPercent: 1, accommodation: false, stipend: 0, insurance: false },
    },
    {
      id: "bit-1yr-1st",
      name: "BIT Intl Scholarship (1yr, First Prize)",
      group: "BIT International Student Scholarship",
      coverage: { tuitionPercent: 1, accommodation: true, stipend: 0, insurance: false },
    },
    {
      id: "bit-1yr-2nd",
      name: "BIT Intl Scholarship (1yr, Second Prize)",
      group: "BIT International Student Scholarship",
      coverage: { tuitionPercent: 1, accommodation: false, stipend: 0, insurance: false },
    },
    {
      id: "bit-1yr-3rd",
      name: "BIT Intl Scholarship (1yr, Third Prize)",
      group: "BIT International Student Scholarship",
      coverage: { tuitionPercent: 0.5, accommodation: false, stipend: 0, insurance: false },
    },
    {
      id: "bit-1yr-4th",
      name: "BIT Intl Scholarship (1yr, Fourth Prize)",
      group: "BIT International Student Scholarship",
      coverage: { tuitionPercent: 0.25, accommodation: false, stipend: 0, insurance: false },
    },
    {
      id: "self-funded",
      name: "Self-Funded (No Scholarship)",
      group: "Other",
      coverage: { tuitionPercent: 0, accommodation: false, stipend: 0, insurance: false },
    },
  ],
  housingOptions: [
    { id: "intl-4p", name: "International Dorm 4-Person Room", cost: 500, type: "on-campus" as const },
    { id: "intl-3p", name: "International Dorm 3-Person Room", cost: 700, type: "on-campus" as const },
    { id: "intl-2p", name: "International Dorm 2-Person Room", cost: 900, type: "on-campus" as const },
    { id: "bohou-4p", name: "Bohou 4-Person Suite", cost: 800, type: "on-campus" as const },
    { id: "off-campus", name: "Off-Campus Apartment", cost: 1600, type: "off-campus" as const },
  ],
  costs: {
    tuitionEnglish: 30000, // RMB per year (English-taught)
    tuitionChinese: 23000, // RMB per year (Chinese-taught)
    livingOnCampus: 18000, // RMB per year (food, transport, etc.)
    livingOffCampus: 36000, // RMB per year
    insurance: 800, // RMB per year (medical insurance estimate)
  },
};
