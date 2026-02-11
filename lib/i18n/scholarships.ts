import { type Locale } from "@/lib/i18n/config";

export type ScholarshipTier = {
  name: string;
  coverageSummary: string;
};

export type ScholarshipInfoData = {
  id: string;
  name: string;
  subtitle?: string;
  program: string;
  description: string;
  campus: "beijing" | "zhuhai" | "both";
  languageRestriction?: "chinese-only";
  deadline?: string;
  applicationPeriod?: string;
  applicationMethod: string;
  link?: string;
  tiers: ScholarshipTier[];
  notes?: string[];
};

export type ScholarshipUiLabels = {
  beijingCampus: string;
  zhuhaiCampus: string;
  allCampuses: string;
  chineseOnly: string;
  deadlinePrefix: string;
  applyPrefix: string;
  coverageTiers: string;
  howToApply: string;
  learnMore: string;
  showLess: string;
  showMore: (count: number) => string;
  carouselDotAria: (index: number) => string;
};

type ScholarshipCopy = {
  name: string;
  subtitle?: string;
  program: string;
  description: string;
  applicationMethod: string;
  tiers: ScholarshipTier[];
  notes?: string[];
};

type CostCalculatorLabels = {
  costEstimator: string;
  tuition: string;
  scholarshipType: string;
  housing: string;
  tuitionEnglishLabel: string;
  tuitionChineseLabel: string;
  intlDormCoveredLabel: string;
  accommodationCoveredNote: string;
  livingExpenses: string;
  insurance: string;
  stipend: string;
  totalAnnualCost: string;
  totalScholarshipCoverage: string;
  yourCostPerYear: string;
  usdApproxLabel: string;
  costBreakdown: string;
  scholarshipImpact: string;
  selectScholarshipHint: string;
  tuitionCovered: string;
  housingCovered: string;
  insuranceCovered: string;
  stipendCredit: string;
  outOfPocket: string;
  coverageIndicators: {
    tuition: string;
    accommodation: string;
    stipend: string;
    insurance: string;
    full: string;
  };
};

const idScholarshipCopyById: Record<string, ScholarshipCopy> = {
  csc: {
    name: "Chinese Government Scholarship",
    subtitle: "(khusus program berbahasa Mandarin)",
    program: "Program Sarjana",
    description:
      "Pengajuan beasiswa dilakukan melalui Kedutaan Besar atau Konsulat Tiongkok setempat. Saat mengisi formulir, pilih Type A dan pilih Beijing Institute of Technology sebagai pilihan pertama.",
    applicationMethod: "Melalui Kedutaan/Konsulat Tiongkok di negara asal",
    tiers: [
      { name: "Type A", coverageSummary: "Biaya kuliah penuh + Akomodasi + Uang saku + Asuransi" },
    ],
    notes: [
      "Khusus program berbahasa Mandarin",
      "Pilih Type A pada formulir pendaftaran",
      "Pilih BIT sebagai institusi prioritas pertama",
    ],
  },
  "beijing-gov": {
    name: "Beijing Government Scholarship",
    subtitle: "(khusus kampus Beijing)",
    program: "Program Sarjana",
    description:
      "Memiliki skema A, B, dan C. Silakan cek laman resmi untuk detail lengkap cakupan dan persyaratan.",
    applicationMethod: "Melalui portal admisi BIT",
    tiers: [
      { name: "Type A", coverageSummary: "Biaya kuliah + Akomodasi + Uang saku + Asuransi" },
      { name: "Type B", coverageSummary: "Biaya kuliah + Akomodasi + Asuransi" },
      { name: "Type C", coverageSummary: "Biaya kuliah + Asuransi" },
    ],
    notes: ["Khusus kampus Beijing"],
  },
  "bit-international": {
    name: "BIT International Student Scholarship",
    program: "Program Sarjana",
    description:
      "Beasiswa berbasis prestasi yang diberikan langsung oleh BIT, dengan opsi durasi 4 tahun dan 1 tahun dalam beberapa tingkatan penghargaan.",
    applicationMethod: "Dipertimbangkan otomatis berdasarkan performa akademik",
    tiers: [
      { name: "4 Tahun - Peringkat 1", coverageSummary: "Biaya kuliah + Akomodasi + Uang saku + Asuransi" },
      { name: "4 Tahun - Peringkat 2", coverageSummary: "Biaya kuliah + Akomodasi" },
      { name: "4 Tahun - Peringkat 3", coverageSummary: "Biaya kuliah saja" },
      { name: "1 Tahun - Peringkat 1", coverageSummary: "Biaya kuliah + Akomodasi" },
      { name: "1 Tahun - Peringkat 2", coverageSummary: "Biaya kuliah saja" },
      { name: "1 Tahun - Peringkat 3", coverageSummary: "50% Biaya kuliah" },
      { name: "1 Tahun - Peringkat 4", coverageSummary: "25% Biaya kuliah" },
    ],
  },
  "guangdong-gov": {
    name: "Guangdong Government Outstanding International Student Scholarship",
    subtitle: "(khusus kampus Zhuhai)",
    program: "Program Sarjana",
    description:
      "Standar pendanaan beasiswa: CNY 10.000/tahun. Silakan cek laman resmi untuk detail lengkap.",
    applicationMethod: "Melalui admisi BIT Zhuhai",
    tiers: [{ name: "Standar", coverageSummary: "CNY 10.000/tahun" }],
    notes: ["Khusus kampus Zhuhai"],
  },
  "bit-zhuhai-new": {
    name: 'BIT Zhuhai "Study in BIT" International Students New Student Scholarship',
    program: "Program Pra-Universitas",
    description:
      "Beasiswa untuk mahasiswa internasional berprestasi di kampus BIT Zhuhai. Beasiswa ini menanggung 50% biaya kuliah program Pra-Universitas.",
    applicationMethod:
      "Unduh formulir di situs ISC, lengkapi, lalu unggah ke sistem pendaftaran",
    tiers: [{ name: "Pra-Universitas", coverageSummary: "50% Biaya kuliah" }],
    notes: [
      "Khusus kampus Zhuhai",
      "Batas: 1 Januari 2026 (masuk Maret 2026)",
      "Batas: 15 Mei 2026 (masuk September 2026)",
      "Kuota nominasi dialokasikan proporsional berdasarkan jumlah pendaftar",
    ],
  },
};

const idCalculatorScholarshipNames: Record<string, string> = {
  "beijing-a": "Beasiswa Pemda Beijing Tipe A",
  "beijing-b": "Beasiswa Pemda Beijing Tipe B",
  "beijing-c": "Beasiswa Pemda Beijing Tipe C",
  "bit-4yr-1st": "Beasiswa BIT Internasional (4 thn, Peringkat 1)",
  "bit-4yr-2nd": "Beasiswa BIT Internasional (4 thn, Peringkat 2)",
  "bit-4yr-3rd": "Beasiswa BIT Internasional (4 thn, Peringkat 3)",
  "bit-1yr-1st": "Beasiswa BIT Internasional (1 thn, Peringkat 1)",
  "bit-1yr-2nd": "Beasiswa BIT Internasional (1 thn, Peringkat 2)",
  "bit-1yr-3rd": "Beasiswa BIT Internasional (1 thn, Peringkat 3)",
  "bit-1yr-4th": "Beasiswa BIT Internasional (1 thn, Peringkat 4)",
  "self-funded": "Biaya Mandiri (Tanpa Beasiswa)",
};

const idCalculatorScholarshipGroups: Record<string, string> = {
  "Beijing Government Scholarship": "Beasiswa Pemerintah Beijing",
  "BIT International Student Scholarship": "Beasiswa Mahasiswa Internasional BIT",
  Other: "Lainnya",
};

const idHousingNames: Record<string, string> = {
  "intl-4p": "Asrama Internasional 4 Orang",
  "intl-3p": "Asrama Internasional 3 Orang",
  "intl-2p": "Asrama Internasional 2 Orang",
  "bohou-4p": "Bohou Suite 4 Orang",
  "off-campus": "Apartemen di Luar Kampus",
};

export function localizeScholarshipInfo(
  scholarship: ScholarshipInfoData,
  locale: Locale
): ScholarshipInfoData {
  if (locale !== "id") {
    return scholarship;
  }

  const copy = idScholarshipCopyById[scholarship.id];
  if (!copy) {
    return scholarship;
  }

  return {
    ...scholarship,
    name: copy.name,
    subtitle: copy.subtitle,
    program: copy.program,
    description: copy.description,
    applicationMethod: copy.applicationMethod,
    tiers: copy.tiers,
    notes: copy.notes,
  };
}

export function localizeCalculatorScholarshipName(
  id: string,
  fallback: string,
  locale: Locale
): string {
  if (locale !== "id") {
    return fallback;
  }

  return idCalculatorScholarshipNames[id] ?? fallback;
}

export function localizeCalculatorScholarshipGroup(group: string, locale: Locale): string {
  if (locale !== "id") {
    return group;
  }

  return idCalculatorScholarshipGroups[group] ?? group;
}

export function localizeHousingOptionName(id: string, fallback: string, locale: Locale): string {
  if (locale !== "id") {
    return fallback;
  }

  return idHousingNames[id] ?? fallback;
}

export function getScholarshipUiLabels(locale: Locale): ScholarshipUiLabels {
  if (locale === "id") {
    return {
      beijingCampus: "Kampus Beijing",
      zhuhaiCampus: "Kampus Zhuhai",
      allCampuses: "Semua Kampus",
      chineseOnly: "Khusus Program Mandarin",
      deadlinePrefix: "Batas",
      applyPrefix: "Daftar",
      coverageTiers: "Skema Cakupan",
      howToApply: "Cara mendaftar",
      learnMore: "Pelajari Lebih Lanjut",
      showLess: "Tampilkan lebih sedikit",
      showMore: (count) => `+${count} lainnya`,
      carouselDotAria: (index) => `Beasiswa ${index}`,
    };
  }

  return {
    beijingCampus: "Beijing Campus",
    zhuhaiCampus: "Zhuhai Campus",
    allCampuses: "All Campuses",
    chineseOnly: "Chinese-Taught Only",
    deadlinePrefix: "Deadline",
    applyPrefix: "Apply",
    coverageTiers: "Coverage Tiers",
    howToApply: "How to apply",
    learnMore: "Learn More",
    showLess: "Show less",
    showMore: (count) => `+${count} more`,
    carouselDotAria: (index) => `Scholarship ${index}`,
  };
}

export function getCostCalculatorLabels(locale: Locale): CostCalculatorLabels {
  if (locale === "id") {
    return {
      costEstimator: "Simulasi Biaya",
      tuition: "Biaya kuliah",
      scholarshipType: "Jenis beasiswa",
      housing: "Tempat tinggal",
      tuitionEnglishLabel: "Program Berbahasa Inggris",
      tuitionChineseLabel: "Program Berbahasa Mandarin",
      intlDormCoveredLabel: "Asrama Internasional 4 Orang",
      accommodationCoveredNote:
        "Beasiswa akomodasi hanya menanggung Asrama Internasional 4 Orang.",
      livingExpenses: "Biaya hidup",
      insurance: "Asuransi",
      stipend: "Uang saku",
      totalAnnualCost: "Total biaya tahunan",
      totalScholarshipCoverage: "Total cakupan beasiswa",
      yourCostPerYear: "Biaya kamu per tahun",
      usdApproxLabel: "Estimasi USD",
      costBreakdown: "Rincian biaya",
      scholarshipImpact: "Dampak beasiswa",
      selectScholarshipHint: "Pilih beasiswa untuk melihat dampak terhadap biaya.",
      tuitionCovered: "Kuliah Ditanggung",
      housingCovered: "Akomodasi Ditanggung",
      insuranceCovered: "Asuransi Ditanggung",
      stipendCredit: "Kredit Uang Saku",
      outOfPocket: "Biaya Pribadi",
      coverageIndicators: {
        tuition: "Kuliah",
        accommodation: "Akomodasi",
        stipend: "Uang saku",
        insurance: "Asuransi",
        full: "Penuh",
      },
    };
  }

  return {
    costEstimator: "Cost Estimator",
    tuition: "Tuition",
    scholarshipType: "Scholarship Type",
    housing: "Housing",
    tuitionEnglishLabel: "English-Taught",
    tuitionChineseLabel: "Chinese-Taught",
    intlDormCoveredLabel: "International Dorm 4-Person Room",
    accommodationCoveredNote:
      "Scholarship accommodation covers the International Dorm 4-Person Room only.",
    livingExpenses: "Living Expenses",
    insurance: "Insurance",
    stipend: "Stipend",
    totalAnnualCost: "Total Annual Cost",
    totalScholarshipCoverage: "Total Scholarship Coverage",
    yourCostPerYear: "Your Cost Per Year",
    usdApproxLabel: "Approx. USD",
    costBreakdown: "Cost Breakdown",
    scholarshipImpact: "Scholarship Impact",
    selectScholarshipHint: "Select a scholarship to see its impact on your costs.",
    tuitionCovered: "Tuition Covered",
    housingCovered: "Housing Covered",
    insuranceCovered: "Insurance Covered",
    stipendCredit: "Stipend Credit",
    outOfPocket: "Out of Pocket",
    coverageIndicators: {
      tuition: "Tuition",
      accommodation: "Accommodation",
      stipend: "Stipend",
      insurance: "Insurance",
      full: "Full",
    },
  };
}
