console.log("Welcome to Spotify");

// Initialize Variables
let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItemPlay'));

let songs = [
    { songName: "Premalo", filePath: "songs/01-Premalo.mp3", coverPath: "coverphoto/01.jpg" },
    { songName: "Hilesso Hilessa", filePath: "songs/02-Hilessa.mp3", coverPath: "coverphoto/02.jpg" },
    { songName: "Chuttamalle", filePath: "songs/03-Chuttamalle.mp3", coverPath: "coverphoto/03.jpg" },
    { songName: "Tera Chehra", filePath: "songs/04-Tera Chehra.mp3", coverPath: "coverphoto/04.jpg" },
    { songName: "Uyi Amma", filePath: "songs/05-Uyi Amma.mp3", coverPath: "coverphoto/05.jpg" },
    { songName: "Dekhona Dekhona zulfon se", filePath: "songs/06-Dekho Na.mp3", coverPath: "coverphoto/06.jpg" },
    { songName: "Ye Mantramo", filePath: "songs/07-Ye Mantramo.mp3", coverPath: "coverphoto/07.jpg" },
    { songName: "Nenu Nuvvantu", filePath: "songs/08-Nenu Nuvvantu.mp3", coverPath: "coverphoto/08.jpg" },
    { songName: "Yemito", filePath: "songs/09-Yemito.mp3", coverPath: "coverphoto/09.jpg" },
    { songName: "Sooseki", filePath: "songs/10-Sooseki.mp3", coverPath: "coverphoto/10.jpg" }
];

// Update song list UI
document.querySelectorAll('.songItem').forEach((element, i) => {
    element.querySelector("img").src = songs[i].coverPath;
    element.querySelector(".songName").innerText = songs[i].songName;
});

// Play/Pause Button
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime === 0) {
        audioElement.play();
        masterPlay.classList.replace('fa-play-circle', 'fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.replace('fa-pause-circle', 'fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Update Progress Bar
audioElement.addEventListener('timeupdate', () => {
    let progress = (audioElement.currentTime / audioElement.duration) * 100;
    myProgressBar.value = progress;
});

// Seekbar Change Handling
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value / 100) * audioElement.duration;
});

// Reset Play Icons
const resetPlayIcons = () => {
    songItems.forEach(element => {
        element.classList.replace('fa-pause-circle', 'fa-play-circle');
    });
};

// Play Specific Song
songItems.forEach((element, index) => {
    element.addEventListener('click', () => {
        resetPlayIcons();
        songIndex = index;
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.replace('fa-play-circle', 'fa-pause-circle');
        element.classList.replace('fa-play-circle', 'fa-pause-circle');
    });
});

// Next Song
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.replace('fa-play-circle', 'fa-pause-circle');
});

// Previous Song
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.replace('fa-play-circle', 'fa-pause-circle');
});
