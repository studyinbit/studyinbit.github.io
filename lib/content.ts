export const siteContent = {
  hero: {
    title: "Engineering the Future",
    subtitle: "Join Beijing Institute of Technology - A premier 'Double First-Class' university leading China's aerospace and engineering innovation.",
    cta: "Start Your Journey",
  },
  stats: [
    { label: "Global Engineering Rank", value: "14", suffix: "th", source: "NTU Ranking" },
    { label: "Graduate Employability", value: "9", suffix: "th", source: "QS China" },
    { label: "Indonesian Students", value: "400", suffix: "+", source: "Active Community" },
    { label: "Global Rank", value: "102", suffix: "", source: "ARWU 2025" },
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
  scholarships: [
    {
      id: "csc-a",
      name: "CSC Type A (Bilateral)",
      coverage: ["Full tuition", "Accommodation (dorm)", "Monthly stipend (2,500 RMB)", "Comprehensive medical insurance"],
      value: 150000,
      eligibility: "Applied through Indonesian Embassy, CSCA score required, academic excellence",
      application: "Through Embassy education office, limited slots (competitive)",
    },
    {
      id: "csc-b",
      name: "CSC Type B",
      coverage: ["Full tuition", "Accommodation (dorm)", "Monthly stipend (2,500 RMB)"],
      value: 150000,
      eligibility: "Direct application to BIT, CSCA score required, academic merit",
      application: "Through BIT admissions portal, more slots than Type A",
    },
    {
      id: "beijing",
      name: "Beijing Municipal Scholarship",
      coverage: ["Full or partial tuition (varies)", "Renewable annually based on performance"],
      value: 30000,
      eligibility: "Automatic consideration upon admission, based on academic performance",
      application: "Automatic consideration, awarded after admission",
    },
    {
      id: "bit-merit",
      name: "BIT Merit Scholarship",
      coverage: ["Partial tuition reduction", "Awarded to continuing students"],
      value: 20000,
      eligibility: "Current BIT students, strong academic performance",
      application: "Automatic consideration based on GPA and achievements",
    },
    {
      id: "none",
      name: "Self-Funded (No Scholarship)",
      coverage: ["Pay full tuition and living expenses"],
      value: 0,
      eligibility: "Open to all admitted students",
      application: "Standard admission process",
    },
  ],
  costs: {
    tuition: 26000, // RMB per year
    dormOnCampus: 4000, // RMB per year
    livingOnCampus: 18000, // RMB per year (food, transport, etc.)
    livingOffCampus: 36000, // RMB per year
  },
};
