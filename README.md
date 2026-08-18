# Birthday Surprise — versi polished 💙

## Urutan pengalaman
Opening → pertanyaan → story → gallery → video → quiz → memory → password → surat → surprise.

## Yang sudah dibenahi
- Reveal surat dan surprise sekarang dimulai **saat section dibuka**, bukan saat website pertama kali loading.
- Navigasi tidak bisa loncat ke bagian yang belum dibuka.
- Musik tidak lagi mengaku sedang play kalau browser gagal memutarnya.
- Gallery, timeline, dan video punya fallback kalau asset belum dimasukkan.
- Modal gallery tidak lagi menumpuk event keyboard setiap kali foto diganti.
- Feedback game dibuat lebih natural dan tidak terlalu penuh emoji.
- Tombol dan input punya focus state yang jelas.
- Tetap menghormati `prefers-reduced-motion`.

## Asset yang wajib
- `assets/images/photo01.jpg` — `photo06.jpg`
- `assets/music/birthday.mp3`
- `assets/videos/our-story.mp4`

## Data personal
Edit `js/config.js`: nama, password, tanggal, timeline, gallery, pertanyaan, surat, dan pesan.

> Catatan: password di website statis bukan keamanan sungguhan. Siapa pun yang membuka source bisa melihatnya. Ini cuma puzzle romantis, bukan brankas negara.
