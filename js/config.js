// ============================================
// CONFIG.JS - Personal Configuration
// ============================================

const birthdayConfig = {
    // Personal Info
    girlfriendName: "Sayangkuu",
    yourName: "Akuuuu Sayang muuu",

    // Password untuk unlock
    password: "190810",

    // Tanggal pertama kali bertemu
    firstMeeting: "12 Januari 2024",

    // Path ke file musik
    music: "assets/music/birthday.mp3",

    // Path ke foto final
    finalPhoto: "assets/images/photo01.jpg",

    // ============================================
    // LOVE CALCULATOR CONFIG
    // ============================================
    loveCalculator: {
        defaultName1: "Sayangku",
        defaultName2: "Akuu",
        
        messages: {
            perfect: "💕 Perfect Match! Kalian memang ditakdirkan bersama! 💕",
            high: "❤️ Wow! Cinta kalian sangat kuat! ❤️",
            medium: "💗 Cocok banget! Terus jaga hubungan ini ya! 💗",
            low: "💖 Masih ada chemistry! Cinta itu butuh proses! 💖"
        },
        
        resultEmojis: ['❤️', '💕', '💗', '💖', '💝', '✨', '🌟', '💫'],
        
        loadingMessages: [
            "Menghitung cinta... 💭",
            "Menganalisis perasaan... 💕",
            "Melihat ke masa depan... ✨",
            "Mengecek chemistry... ❤️",
            "Memastikan jodoh... 💫"
        ]
    },

    // Timeline data
    timeline: [
        {
            date: "12 Januari 2024",
            title: "Pertama Kali Bertemu",
            description: "Hari pertama kita bertemu. Aku masih ingat betapa berdebar-debarnya hatiku saat itu.",
            image: "assets/images/photo01.jpg"
        },
        {
            date: "14 Februari 2024",
            title: "Valentine Pertama",
            description: "Valentine pertama kita berdua. Momen yang tak akan pernah aku lupakan.",
            image: "assets/images/photo02.jpg"
        },
        {
            date: "17 Maret 2024",
            title: "Kencan Pertama",
            description: "Kencan pertama kita. Senyummu membuat hari itu terasa sempurna.",
            image: "assets/images/photo03.jpg"
        },
        {
            date: "1 Mei 2024",
            title: "Bulan Pertama",
            description: "Satu bulan penuh bersama. Setiap hari bersamamu adalah anugerah.",
            image: "assets/images/photo04.jpg"
        }
    ],

    // Gallery images
    gallery: [
        { src: "assets/images/photo01.jpg", caption: "Momen pertama kita" },
        { src: "assets/images/photo02.jpg", caption: "Senyum yang membuat hari cerah" },
        { src: "assets/images/photo03.jpg", caption: "Kebersamaan yang tak ternilai" },
        { src: "assets/images/photo04.jpg", caption: "Canda tawa kita" },
        { src: "assets/images/photo05.jpg", caption: "Momen spesial" },
        { src: "assets/images/photo06.jpg", caption: "Kenangan terindah" }
    ],

    // Quiz questions
    quizQuestions: [
        {
            question: "Kalau aku lagi bad mood, biasanya aku...",
            options: ["Diam", "Ngambek", "Cari makanan", "Semua benar"],
            correct: 3
        },
        {
            question: "Makanan favoritku adalah...",
            options: ["Nasi goreng", "Mie ayam", "Ayam Geprek", "Semua enak"],
            correct: 3
        },
        {
            question: "Warna favoritku adalah...",
            options: ["Biru", "Merah", "Hijau", "Kuning"],
            correct: 0
        }
    ],

    // Love Letter
    loveLetter: `Sayangku,

Hari ini adalah hari yang sangat istimewa. Bukan hanya karena hari ulang tahunmu, tapi karena hari ini adalah hari dimana aku bisa merayakan keberadaanmu di dunia ini.

Setiap hari yang aku lewati bersamamu adalah hari yang berharga. Senyummu, tawamu, cara kamu memandang dunia — semuanya membuatku jatuh cinta setiap hari.

Terima kasih telah menjadi bagian dari hidupku. Terima kasih untuk semua momen indah yang sudah kita bagi bersama.

Di hari ulang tahunmu ini, aku hanya ingin kamu tahu bahwa aku sangat mencintaimu. Lebih dari kata-kata bisa ungkapkan.

Selamat ulang tahun, sayangku. Semoga semua impianmu menjadi kenyataan.

Dengan segenap cinta,
[Sayanggmu]`,

    // Final message
    finalMessage: "Semoga hari ini menjadi awal dari banyak hal baik yang akan datang.",

    // Microcopy / fallback
    emptyGalleryMessage: "Foto-fotonya belum dimasukkan. Nanti bagian ini bakal jadi museum kecil kita. 📸",
    videoFallbackMessage: "Videonya belum dipasang. Tapi tenang, dramanya belum dibatalkan. 🎬",
    unlockHint: "Petunjuk: sesuatu yang punya arti buat kita berdua.",

    // Durasi transisi
    timings: {
        sectionTransition: 520,
        quizNext: 1300,
        loveCalcDelay: 2000
    }
};