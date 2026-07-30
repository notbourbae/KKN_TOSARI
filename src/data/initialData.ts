import { DusunInfo, BeritaItem, UmkmItem, WisataItem, WisataEvent, PejabatDusun, PotensiSDA, StatistikProduksi, BudayaItem } from '../types';

export const initialDusunInfo: DusunInfo = {
  namaDusun: 'Dusun Tosari',
  desa: 'Desa Asri Jaya',
  kecamatan: 'Kecamatan Mutiara',
  kabupaten: 'Kabupaten Harapan',
  provinsi: 'Jawa Barat',
  kodePos: '40123',
  kepalaDusun: 'Bapak H. Sukarna S.T.',
  teleponDusun: '+62 812-3456-7890',
  emailDusun: 'informasi@dusunsukamaju.id',
  alamatKantor: 'Jl. Raya Dusun Tosari No. 12, RT 02/RW 01, Desa Asri Jaya',
  luasWilayah: '145.8 Hektar',
  jumlahPenduduk: 1850,
  jumlahKK: 480,
  slogan: 'Tosari Mandiri, Asri, Sejahtera, dan Berbudaya',
  fotoWilayah: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80',
  sejarah: {
    tahunBerdiri: '1948',
    pendiri: 'Kyai Raden Hidayatullah',
    cerita: 'Dusun Tosari didirikan pasca-kemerdekaan pada tahun 1948 oleh para tetua adat dan perintis pertanian yang dipimpin oleh Kyai Raden Hidayatullah. Nama "Tosari" diambil dari ungkapan bahasa Sunda yang bermakna kemauan keras masyarakat untuk selalu melangkah maju, gotong royong, dan menjaga kelestarian alam pegunungan sekitarnya.',
    milestone: [
      { tahun: '1948', peristiwa: 'Pembukaan pemukiman pertama dan pembentukan sistem kerapatan adat dusun.' },
      { tahun: '1975', peristiwa: 'Pembangunan irigasi desa pertama dan perintisan kelompok tani padi.' },
      { tahun: '2005', peristiwa: 'Peresmian Jalur Wisata Curug Tosari dan sentra kerajinan bambu.' },
      { tahun: '2018', peristiwa: 'Penghargaan Dusun Mandiri Pangan dan Pelopor Desa Digital Tingkat Kabupaten.' },
      { tahun: '2024', peristiwa: 'Peluncuran Portal Informasi Digital Dusun & Digitalisasi UMKM Dusun.' },
    ]
  },
  visi: 'Mewujudkan Dusun Tosari yang Mandiri secara Ekonomi, Lestari Lingkungannya, Bermanfaat Budayanya, serta Sejahtera Masyarakatnya Berbasis Digital pada Tahun 2030.',
  misi: [
    'Meningkatkan taraf hidup masyarakat melalui pemberdayaan UMKM lokal dan pertanian berkelanjutan.',
    'Mengembangkan potensi destinasi wisata alam dan budaya berbasis ekowisata kemasyarakatan.',
    'Mewujudkan tata kelola pemerintahan dusun yang transparan, akuntabel, dan berintegritas.',
    'Memelihara kearifan lokal, gotong royong, dan pelestarian lingkungan sumber daya alam.',
    'Meningkatkan sarana prasarana kesehatan, pendidikan, dan aksesibilitas digital masyarakat.'
  ],
  sambutanJudul: 'Sekapur Sirih: Bersama Mewujudkan Dusun Mandiri, Asri, dan Berdaya Saing Digital',
  sambutanIsi: 'Assalamu\'alaikum Warahmatullahi Wabarakatuh. Selamat datang di Portal Resmi Dusun Tosari. Website ini hadir sebagai wujud keterbukaan informasi publik dan komitmen kami dalam memajukan perekonomian warga melalui kemudahan promosi UMKM lokal, destinasi wisata alam, serta pengelolaan potensi sumber daya alam yang transparan. Mari kita terus pererat rasa gotong royong demi kemajuan dusun tercinta.',
  sambutanJabatan: 'Kepala Dusun Tosari',
  sambutanFoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80'
};

export const initialPejabat: PejabatDusun[] = [
  {
    id: 'p1',
    nama: 'H. Sukarna, S.T.',
    jabatan: 'Kepala Dusun (Kadus)',
    foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    kontak: '+62 812-3456-7890',
    tugasUtama: 'Memimpin penyelenggaraan pemerintahan dusun, membina ketentraman, dan mengoordinasikan pembangunan.'
  },
  {
    id: 'p2',
    nama: 'Rina Rahmawati, S.Pd.',
    jabatan: 'Sekretaris Dusun',
    foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    kontak: '+62 813-9876-5432',
    tugasUtama: 'Mengelola administrasi pemerintahan, pencatatan kependudukan, dan surat-menyurat resmi dusun.'
  },
  {
    id: 'p3',
    nama: 'Ahmad Mulyana',
    jabatan: 'Bendahara & Kasi Pembangunan',
    foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    kontak: '+62 815-2233-4455',
    tugasUtama: 'Mengelola keuangan operasional dusun, alokasi bantuan sosial, dan proyek infrastruktur jalan dusun.'
  },
  {
    id: 'p4',
    nama: 'Dede Kurnia',
    jabatan: 'Kepala Seksi Pelayanan & Kesra',
    foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
    kontak: '+62 817-6655-4433',
    tugasUtama: 'Mengoordinasikan posyandu, bantuan kemasyarakatan, kegiatan kepemudaan, dan keagamaan.'
  },
  {
    id: 'p5',
    nama: 'Hj. Siti Mariam',
    jabatan: 'Ketua TP-PKK Dusun Tosari',
    foto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    kontak: '+62 812-1122-3344',
    tugasUtama: 'Menggerakkan program pemberdayaan wanita, UMKM rumahan, pelatihan gizi anak, dan kebersihan lingkungan.'
  }
];

export const initialBerita: BeritaItem[] = [
  {
    id: 'b1',
    judul: 'Kerja Bakti Massal Pembukaan Jalur Irigasi Pertanian Sawah Dusun Tosari',
    kategori: 'Berita',
    tanggal: '24 Juli 2026',
    penulis: 'Sekretariat Dusun',
    ringkasan: 'Ratusan warga Dusun Tosari bergotong royong membersihkan dan memperluas saluran irigasi guna mengantisipasi musim tanam padi.',
    konten: 'Warga RT 01 hingga RT 05 Dusun Tosari berkumpul di area persawahan timur untuk melangsungkan aksi kerja bakti gotong royong. Kegiatan yang dipimpin langsung oleh Kepala Dusun H. Sukarna ini bertujuan memperlancar debit air dari Sumber Mata Air Cikahuripan menuju 45 hektar lahan persawahan. "Alhamdulillah, antusiasme warga luar biasa. Irigasi ini sangat krusial bagi ketahanan pangan dusun kita," ujar Bapak Kadus.',
    gambar: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80',
    dibaca: 342
  },
  {
    id: 'b2',
    judul: 'Pelatihan Kemasan Modern dan Pemasaran Digital bagi Pelaku UMKM Dusun',
    kategori: 'Berita',
    tanggal: '18 Juli 2026',
    penulis: 'Kasi Pembangunan',
    ringkasan: 'Dusun Tosari menyelenggarakan workshop branding produk dan optimalisasi WhatsApp Business untuk 30 pengrajin & pembuat kuliner.',
    konten: 'Guna meningkatkan daya saing UMKM lokal di pasar nasional, Pemdes menggelar pelatihan foto produk dan pendaftaran izin P-IRT gratis. Peserta diajarkan cara membuat katalog WhatsApp Business yang menarik serta memanfaatkan portal digital dusun untuk menarik pembeli luar daerah.',
    gambar: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&auto=format&fit=crop&q=80',
    dibaca: 285
  },
  {
    id: 'b3',
    judul: 'PENGUMUMAN: Pendaftaran Posyandu Lansia dan Balita Bulan Agustus 2026',
    kategori: 'Pengumuman',
    tanggal: '28 Juli 2026',
    penulis: 'TP-PKK Dusun',
    ringkasan: 'Diimbau kepada seluruh warga yang memiliki balita atau anggota keluarga lansia untuk menghadiri Posyandu rutin di Balai Dusun.',
    konten: 'Jadwal pelaksanaan Posyandu Balita & Lansia Dusun Tosari akan dilaksanakan pada Hari Selasa, 4 Agustus 2026 mulai pukul 08:00 WIB di Balai Dusun Tosari. Agenda mencakup penimbangan berat badan, pemberian vitamin A, imunisasi dasar, serta pemeriksaan gula darah gratis bagi lansia.',
    gambar: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
    dibaca: 512
  },
  {
    id: 'b4',
    judul: 'Persiapan Festival Budaya & Panen Raya Kopi Robusta Tosari 2026',
    kategori: 'Agenda',
    tanggal: '15 Juli 2026',
    penulis: 'Panitia Festival Wisata',
    ringkasan: 'Festival tahunan kebanggaan Dusun Tosari akan digelar selama 3 hari berturut-turut pada pertengahan bulan Agustus.',
    konten: 'Dalam rangka merayakan hasil panen perkebunan kopi dan kemerdekaan RI, Dusun Tosari siap menggeledarkan Festival Budaya & Panen Kopi. Acara akan dimeriahkan dengan seduh kopi gratis 1000 cangkir, pertunjukan seni calung bambu, dan bazaar UMKM.',
    gambar: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
    dibaca: 420
  }
];

export const initialUmkm: UmkmItem[] = [
  {
    id: 'u1',
    namaUsaha: 'Dapur Keripik Singkong Renyah Tosari',
    pemilik: 'Ibu Ningsih',
    kategori: 'Makanan dan Minuman',
    deskripsi: 'Olahan keripik singkong kaya bumbu rempah pilihan hasil panen kebun lokal Dusun Tosari. Tersedia varian Pedas Manis, Balado, dan Original Garam Laut.',
    alamat: 'RT 03 / RW 01, Dusun Tosari, Desa Asri Jaya',
    whatsapp: '6281234567890',
    mapUrl: 'https://maps.google.com/?q=-6.917464,107.619123',
    status: 'disetujui',
    tanggalDaftar: '10 Jan 2025',
    gambar: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=800&auto=format&fit=crop&q=80',
    rating: 4.8,
    produk: [
      { id: 'up1', nama: 'Keripik Singkong Pedas Manis 250g', harga: 15000, deskripsi: 'Renyah gurih berbumbu cabai alami tanpa pengawet.', gambar: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&auto=format&fit=crop&q=80' },
      { id: 'up2', nama: 'Keripik Singkong Original Garlic 250g', harga: 15000, deskripsi: 'Aroma bawang putih harum khas olahan dapur tradisional.', gambar: 'https://images.unsplash.com/photo-1621447504864-d8686e12698c?w=400&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'u2',
    namaUsaha: 'Kopi Robusta Pegunungan Tosari',
    pemilik: 'Kang Agum & Kelompok Tani Kopi',
    kategori: 'Pertanian',
    deskripsi: 'Biji kopi Robusta petik merah organik diolah secara natural process dari perkebunan lereng bukit Dusun Tosari pada ketinggian 900 mdpl.',
    alamat: 'RT 05 / RW 02, Blok Kebun Kopi, Dusun Tosari',
    whatsapp: '6281398765432',
    mapUrl: 'https://maps.google.com/?q=-6.918000,107.620000',
    status: 'disetujui',
    tanggalDaftar: '15 Feb 2025',
    gambar: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
    produk: [
      { id: 'up3', nama: 'Kopi Bubuk Fine Robusta 200g', harga: 35000, deskripsi: 'Aroma dark chocolate & nutty manis alami.', gambar: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&auto=format&fit=crop&q=80' },
      { id: 'up4', nama: 'Biji Kopi Sangrai (Roasted Beans) 500g', harga: 80000, deskripsi: 'Medium to Dark roast cocok untuk tubruk atau espresso.', gambar: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=400&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'u3',
    namaUsaha: 'Kerajinan Bambu & Anyaman Tradisional "Bambu Asri"',
    pemilik: 'Bapak Sariman',
    kategori: 'Kerajinan',
    deskripsi: 'Pengrajin spesialis anyaman bambu ramah lingkungan, mulai dari tampah, tempat nasi, lampu hias estetik, hingga souvenir pernikahan handmade.',
    alamat: 'RT 01 / RW 01, Dusun Tosari',
    whatsapp: '6281522334455',
    mapUrl: 'https://maps.google.com/?q=-6.919000,107.621000',
    status: 'disetujui',
    tanggalDaftar: '20 Mar 2025',
    gambar: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80',
    rating: 4.7,
    produk: [
      { id: 'up5', nama: 'Kap Lampu Gantung Anyaman Bambu', harga: 75000, deskripsi: 'Memberikan kesan hangat ala cafe & resto natural.', gambar: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&auto=format&fit=crop&q=80' },
      { id: 'up6', nama: 'Set Basket & Bakul Nasi Bambu', harga: 45000, deskripsi: 'Anyaman halus anti jamur dilapisi bahan alami.', gambar: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'u4',
    namaUsaha: 'Peternakan Kambing Etawa "Berkah Jaya"',
    pemilik: 'Pak Mulyadi',
    kategori: 'Peternakan',
    deskripsi: 'Menyediakan susu kambing Etawa segar murni tanpa pengawet, kambing qurban berkualitas, dan pupuk organik padat kaya nutrisi.',
    alamat: 'RT 04 / RW 02, Dusun Tosari',
    whatsapp: '6281766554433',
    mapUrl: 'https://maps.google.com/?q=-6.920000,107.622000',
    status: 'disetujui',
    tanggalDaftar: '05 Apr 2025',
    gambar: 'https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?w=800&auto=format&fit=crop&q=80',
    rating: 4.8,
    produk: [
      { id: 'up7', nama: 'Susu Kambing Etawa Pasteur 1 Liter', harga: 30000, deskripsi: 'Segar dan kaya kalsium, dikemas higienis.', gambar: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&auto=format&fit=crop&q=80' },
      { id: 'up8', nama: 'Pupuk Kompos Organik 20kg', harga: 25000, deskripsi: 'Sangat mengagumkan untuk tanaman hias dan sawah.', gambar: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'u5',
    namaUsaha: 'Bengkel & Jasa Las Listrik Mandiri',
    pemilik: 'Mas Taufik',
    kategori: 'Jasa',
    deskripsi: 'Jasa konstruksi pagar besi, kanopi rumah, perbaikan alat pertanian, serta perbaikan mesin traktor sawah cepat dan bergaransi.',
    alamat: 'Jl. Utama RT 02 / RW 01, Dusun Tosari',
    whatsapp: '6281211223344',
    mapUrl: 'https://maps.google.com/?q=-6.921000,107.623000',
    status: 'disetujui',
    tanggalDaftar: '12 Mei 2025',
    gambar: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
    produk: [
      { id: 'up9', nama: 'Pembuatan Pagar Minimalis (per meter)', harga: 350000, deskripsi: 'Besi hollow tebal galvanis anti karat.', gambar: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400&auto=format&fit=crop&q=80' }
    ]
  }
];

export const initialWisata: WisataItem[] = [
  {
    id: 'w1',
    nama: 'Wisata Alam Curug Cikahuripan Tosari',
    kategori: 'Wisata Alam',
    deskripsi: 'Air terjun alami dengan ketinggian 25 meter dikelilingi hutan pinus yang asri dan kolam pemandian mata air jernih menyegarkan. Cocok untuk terapi relaksasi, kemping keluarga, dan spot foto instagramable.',
    gambar: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800&auto=format&fit=crop&q=80',
    fotoLain: [
      'https://images.unsplash.com/photo-1511497584788-876761c11969?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80'
    ],
    googleMapsPin: 'https://maps.google.com/?q=-6.925000,107.630000',
    jamOperasional: '07:00 - 17:00 WIB (Setiap Hari)',
    hargaTiket: 'Rp 10.000 / Orang (Parkir Motor Rp 3.000)',
    fasilitas: ['Area Parkir Luas', 'Gazebo Istirahat', 'Kamar Bilas & Toilet', 'Warung Makan Khas Dusun', 'Area Camping Ground', 'Spot Foto Deck Kayu'],
    kontakPengelola: '+62 812-9988-7766 (Mas Bayu - Pokdarwis)',
    rating: 4.9,
    favorit: true
  },
  {
    id: 'w2',
    nama: 'Kampung Edukasi Pertanian & Kopi Tosari',
    kategori: 'Wisata Edukasi',
    deskripsi: 'Destinasi wisata edukatif di mana pengunjung dapat belajar langsung menanam padi, memetik buah Kopi Robusta, mengikuti proses roasting tradisional, hingga menikmati seduhan kopi bersama para petani lokal.',
    gambar: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80',
    fotoLain: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80'
    ],
    googleMapsPin: 'https://maps.google.com/?q=-6.926000,107.631000',
    jamOperasional: '08:00 - 16:00 WIB (Selasa - Minggu)',
    hargaTiket: 'Rp 25.000 / Orang (Sudah termasuk welcome drink kopi & pakan ternak)',
    fasilitas: ['Pemandu Wisata Edukasi', 'Peralatan Bertani Lengkap', 'Pondok Belajar Kopi', 'Toilet & Musholla', 'Toko Souvenir Kopi'],
    kontakPengelola: '+62 813-7766-5544 (Ibu Dewi)',
    rating: 4.8,
    favorit: true
  },
  {
    id: 'w3',
    nama: 'Rumah Adat & Sanggar Seni Calung Tosari',
    kategori: 'Wisata Edukasi',
    deskripsi: 'Pusat pelestarian kebudayaan tradisional Sunda. Pengunjung dapat menyaksikan pertunjukan musik Calung Bambu, tarian Jaipong, pelatihan ukir bambu, serta meminjam pakaian adat tradisional untuk berfoto.',
    gambar: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    googleMapsPin: 'https://maps.google.com/?q=-6.927000,107.632000',
    jamOperasional: '09:00 - 16:30 WIB (Sabtu & Minggu atau Reservasi Rombongan)',
    hargaTiket: 'Rp 15.000 / Orang',
    fasilitas: ['Panggung Pertunjukan', 'Penyewaan Baju Adat', 'Instruktur Seni Bambu', 'Kantin Jajanan Pasundan'],
    kontakPengelola: '+62 815-5544-3322 (Aki Danu - Sesepuh Adat)',
    rating: 4.7
  },
  {
    id: 'w4',
    nama: 'Sentra Wisata Kuliner Lesehan Saung Sawah',
    kategori: 'Wisata Kuliner',
    deskripsi: 'Resto lesehan berkonsep saung kayu di atas hamparan persawahan hijau. Menyajikan sajian khas Nasi Liwet Kastrol, Ikan Nila Bakar Madu, Sambal Dadak Terasi, dan Es Kelapa Muda Segar.',
    gambar: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80',
    googleMapsPin: 'https://maps.google.com/?q=-6.928000,107.633000',
    jamOperasional: '10:00 - 21:00 WIB (Setiap Hari)',
    hargaTiket: 'Gratis Masuk (Bayar Makanan Sesuai Menu Rp 15k - 60k)',
    fasilitas: ['Saung Lesehan Pribadi', 'Kolam Pancing Ikan', 'Playground Anak', 'Musholla', 'Live Music Akhir Pekan'],
    kontakPengelola: '+62 812-4433-2211 (Resto Saung Sawah)',
    rating: 4.9
  }
];

export const initialWisataEvents: WisataEvent[] = [
  {
    id: 'e1',
    judul: 'Festival Panen Raya & Seduh 1000 Cangkir Kopi',
    tanggal: '17 Agustus 2026',
    lokasi: 'Lapangan Dusun Tosari',
    deskripsi: 'Perayaan syukur panen melimpah dengan pembagian kopi gratis, bazar UMKM, dan lomba memetik kopi cepat.',
    kategori: 'Festival Budaya'
  },
  {
    id: 'e2',
    judul: 'Pagelaran Seni Calung & Malam Keakraban Warga',
    tanggal: '24 Agustus 2026',
    lokasi: 'Sanggar Seni Tosari',
    deskripsi: 'Pertunjukan musik bambu tradisional dan tarian budaya kolaborasi pemuda-pemudi dusun.',
    kategori: 'Seni & Seni Pertunjukan'
  },
  {
    id: 'e3',
    judul: 'Lomba Mancing Mania & Jelajah Curug Cikahuripan',
    tanggal: '05 September 2026',
    lokasi: 'Area Wisata Curug Cikahuripan',
    deskripsi: 'Kompetisi memancing ikan air deras dan jalan sehat menyusuri hutan pinus.',
    kategori: 'Olahraga & Rekreasi'
  }
];

export const initialBudaya: BudayaItem[] = [
  {
    id: 'bdy1',
    nama: 'Seni Musik Calung Bambu Tosari',
    kategori: 'Kesenian',
    deskripsi: 'Alat musik tradisional khas Sunda yang terbuat dari bambu pilihan, dimainkan secara ensemble. Sanggar Calung Tosari aktif menggelar pertunjukan di acara adat, festival dusun, dan menerima pelatihan bagi generasi muda setiap hari Minggu.',
    gambar: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    lokasi: 'Sanggar Seni Tosari, RT 03 RW 01',
    status: 'aktif'
  },
  {
    id: 'bdy2',
    nama: 'Tari Jaipong & Rampak Kendang',
    kategori: 'Tarian Tradisional',
    deskripsi: 'Tarian pergaulan khas Sunda yang enerjik dan penuh improvisasi, diiringi kendang, gong, dan rebab. Sanggar Tari Tosari melatih 30 penari muda dan sering menjadi pembuka hajatan besar maupun penyambutan tamu penting di tingkat kecamatan.',
    gambar: 'https://images.unsplash.com/photo-1545224140-10d600b1ac5d?w=800&auto=format&fit=crop&q=80',
    lokasi: 'Balai Dusun Tosari, RT 02 RW 01',
    status: 'aktif'
  },
  {
    id: 'bdy3',
    nama: 'Upacara Adat Seren Taun',
    kategori: 'Upacara Adat',
    deskripsi: 'Ritual tahunan syukur masyarakat petani atas hasil panen padi dan kopi yang melimpah. Rangkaian acara meliputi arak-arakan gunungan hasil bumi, doa bersama tetua adat, pagelaran wayang golek semalam suntuk, dan makan bersama seluruh warga dusun.',
    gambar: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&auto=format&fit=crop&q=80',
    lokasi: 'Lapangan Dusun Tosari & Area Persawahan',
    status: 'aktif'
  },
  {
    id: 'bdy4',
    nama: 'Kerajinan Anyaman Bambu & Mendong',
    kategori: 'Kerajinan Tradisional',
    deskripsi: 'Keterampilan turun-temurun menganyam bambu dan serat mendong menjadi kap lampu estetik, bakul nasi, tampah, tas belanja, dan souvenir khas dusun. Sentra kerajinan terletak di rumah produksi "Bambu Asri" yang produknya telah dipasarkan hingga luar kota.',
    gambar: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80',
    lokasi: 'Sentra Kerajinan Bambu Asri, RT 01 RW 01',
    status: 'aktif'
  },
  {
    id: 'bdy5',
    nama: 'Basa Sunda & Kawih Buhun',
    kategori: 'Bahasa & Sastra Lisan',
    deskripsi: 'Pelestarian bahasa Sunda lemes (halus) dan kawih buhun (nyanyian tradisional) melalui program muatan lokal di SD Negeri Dusun Tosari dan forum rutin "Mikukuh Basa" setiap hari Jumat malam di balai dusun.',
    gambar: 'https://images.unsplash.com/photo-1516307365426-bea591f05011?w=800&auto=format&fit=crop&q=80',
    lokasi: 'SDN Dusun Tosari & Balai Dusun',
    status: 'lestari'
  }
];

export const initialPotensiSDA: PotensiSDA[] = [
  {
    id: 'sda1',
    kategori: 'Pertanian',
    nama: 'Lahan Sawah Padi Organik',
    deskripsi: 'Luas area persawahan produktif memanfaatkan irigasi mata air pegunungan alami tanpa pupuk kimia sintetis.',
    luasAtauJumlah: '45.5 Hektar',
    estimasiHasil: '270 Ton Padi Gabah Kering / Tahun',
    gambar: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80',
    lokasi: 'Blok Sawah Timur & Barat'
  },
  {
    id: 'sda2',
    kategori: 'Perkebunan',
    nama: 'Perkebunan Kopi Robusta & Kakao',
    deskripsi: 'Perkebunan rakyat di ketinggian bukit dengan varietas Robusta unggul yang menghasilkan aroma cita rasa kopi khas.',
    luasAtauJumlah: '32 Hektar',
    estimasiHasil: '48 Ton Biji Kopi Sangrai / Tahun',
    gambar: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
    lokasi: 'Perbukitan Lereng Selatan'
  },
  {
    id: 'sda3',
    kategori: 'Peternakan',
    nama: 'Sentra Peternakan Kambing & Sapi Potong',
    deskripsi: 'Peternakan rakyat mandiri dengan sistem pakan pakan hijau alami melimpah dari hasil kebun.',
    luasAtauJumlah: '18 Kelompok Ternak (350 Ekor Kambing, 85 Ekor Sapi)',
    estimasiHasil: '12.000 Liter Susu Kambing & 25 Ton Daging / Tahun',
    gambar: 'https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?w=800&auto=format&fit=crop&q=80',
    lokasi: 'Blok Peternakan Pasir Putih'
  },
  {
    id: 'sda4',
    kategori: 'Perikanan',
    nama: 'Budidaya Ikan Nila & Lele Kolam Air Deras',
    deskripsi: 'Memanfaatkan aliran air jernih sungai pegunungan untuk pembesaran ikan konsumsi yang segar dan tidak berbau lumpur.',
    luasAtauJumlah: '62 Petak Kolam Air Deras',
    estimasiHasil: '35 Ton Ikan Konsumsi / Tahun',
    gambar: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
    lokasi: 'Aliran Sungai Cikahuripan'
  }
];

export const initialStatistikProduksi: StatistikProduksi[] = [
  { tahun: '2022', pertanianTonton: 210, perkebunanTonton: 38, perikananTonton: 24, peternakanEkor: 280 },
  { tahun: '2023', pertanianTonton: 235, perkebunanTonton: 42, perikananTonton: 28, peternakanEkor: 310 },
  { tahun: '2024', pertanianTonton: 250, perkebunanTonton: 45, perikananTonton: 31, peternakanEkor: 335 },
  { tahun: '2025', pertanianTonton: 270, perkebunanTonton: 48, perikananTonton: 35, peternakanEkor: 350 },
  { tahun: '2026 (Est)', pertanianTonton: 290, perkebunanTonton: 52, perikananTonton: 40, peternakanEkor: 380 }
];
