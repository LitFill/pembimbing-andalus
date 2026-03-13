/**
 * @fileoverview Data for Pembimbing Andalus.
 * Contains the list of room supervisors.
 */

const Asrama = Object.freeze({
  Deza: 'Deza',
  Nahwu: 'Nahwu',
  Hadits: 'Hadits',
  Fiqih: 'Fiqih',
  Selatan: 'Selatan',
  PDF: 'PDF',
});

/**
 * @typedef {Object} Supervisor
 * @property {string} task - The room or task name.
 * @property {string} name - The supervisor's name.
 * @property {"Deza" | "Nahwu" | "Hadits" | "Fiqih" | "Selatan" | "PDF"} asrama
 */

/** @type {Array<Supervisor>} */
const SUPERVISORS = [
  // ================= DEZA =================
  {
    task: 'Pembimbing Kamar 1',
    name: 'Ust. Ahmad Mubarok',
    asrama: Asrama.Deza,
  },
  {
    task: 'Pembimbing Kamar 2',
    name: 'Farhan Fuadi',
    asrama: Asrama.Deza,
  },
  {
    task: 'Pembimbing Kamar 3',
    name: 'Ust. Misbakhul Munir, S.Ag.',
    asrama: Asrama.Deza,
  },
  {
    task: 'Pembimbing Kamar 4',
    name: 'Ust. Dzulfakhor',
    asrama: Asrama.Deza,
  },
  {
    task: 'Pembimbing Kamar 5',
    name: 'Ust. Wildan Habibie',
    asrama: Asrama.Deza,
  },
  {
    task: 'Pembimbing Kamar 6',
    name: 'Chusna Ananta',
    asrama: Asrama.Deza,
  },
  {
    task: "Pembimbing Kamar Deza Lt.3 (Ma'had 'Aly)",
    name: 'Ust. Masriyanto, Lc.',
    asrama: Asrama.Deza,
  },
  {
    task: 'Pembimbing Kamar Deza Lt.3 (Mutakhorrijin)',
    name: 'Ust. Fadhlulloh Ulil Azmi',
    asrama: Asrama.Deza,
  },

  // ================= NAHWU =================
  {
    task: 'Pembimbing Kamar Asymawi',
    name: 'Ust. Sufyan Tsauri',
    asrama: Asrama.Nahwu,
  },
  {
    task: 'Pembimbing Kamar Ibnu Hisyam',
    name: 'Ust. A Ibnu Dzikwan',
    asrama: Asrama.Nahwu,
  },
  {
    task: 'Pembimbing Kamar Ibnu Malik',
    name: 'Bayu Aditiya',
    asrama: Asrama.Nahwu,
  },
  {
    task: 'Pembimbing Kamar Imam Kholil',
    name: 'Ust. Tajudin',
    asrama: Asrama.Nahwu,
  },
  {
    task: 'Pembimbing Kamar Imam Sibawaih',
    name: 'Alfad Sirojul Musyarrof',
    asrama: Asrama.Nahwu,
  },
  {
    task: 'Pembimbing Kamar Imrithi',
    name: 'Ust. Mahsunwafir, S.Ag.',
    asrama: Asrama.Nahwu,
  },

  // ================= HADITS =================
  {
    task: 'Pembimbing Kamar Abu Daud I',
    name: 'Prima Wahyu Maulana Sidi',
    asrama: Asrama.Hadits,
  },
  {
    task: 'Pembimbing Kamar Abu Daud II',
    name: 'Ahmad Zaenuddin',
    asrama: Asrama.Hadits,
  },
  {
    task: 'Pembimbing Kamar Al-Mahalli',
    name: 'Ust. Khanifuddin',
    asrama: Asrama.Hadits,
  },
  {
    task: "Pembimbing Kamar An-Nasa'i",
    name: 'Ust. Ahmad Ulil Albab',
    asrama: Asrama.Hadits,
  },
  {
    task: 'Pembimbing Kamar As-Suyuthi',
    name: 'Ust. Imam Junaid',
    asrama: Asrama.Hadits,
  },
  {
    task: 'Pembimbing Kamar At-Tirmidzi',
    name: 'Ust. Ainun Najib',
    asrama: Asrama.Hadits,
  },
  {
    task: "Pembimbing Kamar Depan An-Nasa'i",
    name: 'Ust. Akmal Muaddib, S.Ag.',
    asrama: Asrama.Hadits,
  },
  {
    task: 'Pembimbing Kamar Depan At-Tirmidzi',
    name: 'Ust. Munir Subkhi',
    asrama: Asrama.Hadits,
  },
  {
    task: 'Pembimbing Kamar Ibnu Majah',
    name: 'Ust. Ibrohim Nasir',
    asrama: Asrama.Hadits,
  },
  {
    task: 'Pembimbing Kamar Imam Bukhori',
    name: "Ust. Yusron Nafi'a",
    asrama: Asrama.Hadits,
  },
  {
    task: 'Pembimbing Kamar Imam Muslim',
    name: "Ust. M A'wan Asyrof, S.Ag.",
    asrama: Asrama.Hadits,
  },

  // ================= FIQIH =================
  {
    task: 'Pembimbing Kamar Al-Bujaeromi',
    name: 'Ust. Saifulloh Husnan',
    asrama: Asrama.Fiqih,
  },
  {
    task: 'Pembimbing Kamar Al-Haromain',
    name: 'Ust. Abdulloh Shofi',
    asrama: Asrama.Fiqih,
  },
  {
    task: 'Pembimbing Kamar Al-Qolyubi',
    name: 'Ust. Fadhlulloh Ulil Azmi',
    asrama: Asrama.Fiqih,
  },
  {
    task: 'Wakil Pembimbing Al-Qolyubi',
    name: 'Luthfi Anas & M. Dahyu Arjabu',
    asrama: Asrama.Fiqih,
  },
  {
    task: 'Pembimbing Kamar An-Nawawi',
    name: 'Ust. Ahkam Alwi, S.Ag.',
    asrama: Asrama.Fiqih,
  },
  {
    task: "Pembimbing Kamar Ar-Rofi'i",
    name: 'Ust. Damanhuri',
    asrama: Asrama.Fiqih,
  },
  {
    task: 'Pembimbing Kamar Ibnu Hajar',
    name: "Ust. Alifudin Ma'ruf",
    asrama: Asrama.Fiqih,
  },
  {
    task: 'Pembimbing Kamar Qodli Husen',
    name: 'Ust. Ahmad Zuhril Wafa',
    asrama: Asrama.Fiqih,
  },

  // ================= SELATAN =================
  {
    task: 'Pembimbing Kamar Bahasa 1',
    name: 'Nasrul Chalim',
    asrama: Asrama.Selatan,
  },
  {
    task: 'Pembimbing Kamar Bahasa 2',
    name: 'Labibul Afngal',
    asrama: Asrama.Selatan,
  },
  {
    task: 'Pembimbing Kamar Bahasa 3',
    name: 'Imdadurrohman',
    asrama: Asrama.Selatan,
  },
  {
    task: 'Pembimbing Kamar Bahasa Mth',
    name: 'Ust. Rahmat Ridlo Tri Hidayatulloh, Lc',
    asrama: Asrama.Selatan,
  },
  {
    task: 'Pembimbing Kamar Tahfidz',
    name: "Rifa'i Adin",
    asrama: Asrama.Selatan,
  },

  // ================= PDF =================
  {
    task: "Pembimbing Kamar Granada (PDF 'Ulya)",
    name: 'Ust. Maftuh Ibn Faqih',
    asrama: Asrama.PDF,
  },
  {
    task: 'Pembimbing Kamar Granada (PDF Wustho)',
    name: 'Sohibul Ishom',
    asrama: Asrama.PDF,
  },
];
