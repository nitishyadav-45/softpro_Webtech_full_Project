const songs = [
    {
        title: "Pyaari Lage",
        artist: "Vishal Mishra, Tulsi Kumar",
        src: "songs/song1.mp3",
        cover: "images/song1.jpeg"
    },
    {
        title: "Tum se",
        artist: "Varun Jain, Raghav Chaitanya",
        src: "songs/song2.mp3",
        cover: "images/song2.jpeg"
    },
    {
        title: "Kesariya",
        artist: "Arijit Singh, Antara Mitra",
        src: "songs/song3.mp3",
        cover: "images/song3.jpeg"
    }
];

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");

let songIndex = 0;
let isPlaying = false;

function loadSong(song) {
    title.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = song.src;
    cover.src = song.cover;
}

function playSong() {
    audio.play();
    playBtn.textContent = "⏸";
    isPlaying = true;
}

function pauseSong() {
    audio.pause();
    playBtn.textContent = "▶";
    isPlaying = false;
}

playBtn.addEventListener("click", () => {
    isPlaying ? pauseSong() : playSong();
});

nextBtn.addEventListener("click", () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
});

prevBtn.addEventListener("click", () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
});

audio.addEventListener("timeupdate", () => {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.value = progressPercent || 0;
});

progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

audio.addEventListener("ended", () => {
    nextBtn.click();
});

// Load first song
loadSong(songs[songIndex]);
