function changePlaylist(playlistUrl) {
    var iframe = document.getElementById('spotifyPlaylist');
    iframe.src = "https://open.spotify.com/embed/playlist/" + playlistUrl;

    document.querySelectorAll('.playlist-buttons button').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

document.getElementById('viral50Btn').addEventListener('click', function() {
    changePlaylist('37i9dQZEVXbK4NvPi6Sxit');
});

document.getElementById('top50GlobalBtn').addEventListener('click', function() {
    changePlaylist('37i9dQZEVXbMDoHDwVN2tF');
});




function changeBackgroundColor() {
    const sections = document.querySelectorAll('section'); 
    const body = document.body; 

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight; 

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            const backgroundColor = section.getAttribute('data-background-color'); 
            body.style.backgroundColor = backgroundColor;
        }
    });
}

window.addEventListener('scroll', changeBackgroundColor);
