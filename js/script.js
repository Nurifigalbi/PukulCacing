const tanah = document.querySelectorAll('.tanah');
const worm = document.querySelectorAll('.worm');
const papanScore = document.querySelector('.papan-score')

let tanahSebelumnya;
let selesai;
let score;

function randomTanah(tanah) {
    let tRandom;
    do {
        const t = Math.floor(Math.random() * tanah.length);
        tRandom = tanah[t];
    } while (tRandom === tanahSebelumnya) 
    
    tanahSebelumnya = tRandom;
    return tRandom;
}

function randomWaktu(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function munculkanWorm() {
    if (selesai) return; //Hentikan jika selesai

    const tRandom = randomTanah(tanah);
    const wRandom = randomWaktu(3000, 1000);
    tRandom.classList.add('muncul');

    setTimeout(() => {
        tRandom.classList.remove('muncul');
        if (!selesai) {
            munculkanWorm();
        }
    }, wRandom);
}

function mulai() {
    selesai = false;
    score = 0;
    papanScore.textContent = score;
    munculkanWorm();
    setTimeout(() => {
        selesai = true;
        // Hapus semua worm yang masih muncul ketika selesai
        tanah.forEach(t => t.classList.remove('muncul'))
    }, 30000);
}

function pukul() {
    if (selesai) return; // Cegah pukulan saat selesai

    //Menambahkan logika untuk memeriksa jika cacing yang diklik sedang muncul
    if (this.parentElement.classList.contains('muncul')) {
        score++;
    papanScore.textContent = score;
    this.parentElement.classList.remove('muncul');
    }
}


// Menambahkan event listener untuk setiap worm
worm.forEach(t => {
    t.addEventListener('click', pukul);
});