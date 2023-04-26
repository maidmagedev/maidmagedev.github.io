// Initialize variables. This sometimes fails, so we end up having to call this again.
let songInfo = document.getElementById("songInfo");
let songart = document.getElementById("album-art"); 
let currentTrack;
let audio = new Audio();
let lockout = false;

// Sends the album art off screen, by manipulating the data-status variable.
// Positioning is controlled by CSS, which is dependent on the var we manipulate.
function hateButton() {
  // Lockout disables the buttons temporarily, preventing the user from spamming both buttons simultaneously.
  if (lockout) {
    return;
  } else {
    lockout = true;
  }

  if (songart == null) {
    songart = document.getElementById("album-art");
  }
  // Change the variable on this, updates the CSS
  songart.setAttribute("data-status", "before");

  // After a delay, call the setToActive() function, changing the position of the songart.
  setTimeout(setToActive, 800);

}

// Sends the album art off screen, by manipulating the data-status variable.
// Positioning is controlled by CSS, which is dependent on the var we manipulate.
function likeButton() {
  // Lockout disables the buttons temporarily, preventing the user from spamming both buttons simultaneously.
  if (lockout) {
    return;
  } else {
    lockout = true;
  }

  if (songart == null) {
    songart = document.getElementById("album-art");
  }
  // Change the variable on this, updates the CSS
  songart.setAttribute("data-status", "after");


  // After a delay, call the setToActive() function, changing the position of the songart.
  //setTimeout(displayAlbumArt, 500);
  setTimeout(setToActive, 1000);
}

// This function brings the image back to center by changing the data-status variable.
// Movement is controlled by CSS.
function setToActive() {

  if (songart == null) {
    songart = document.getElementById("album-art");
  }
    // Change the variable on this, updates the CSS
  songart.setAttribute("data-status", "active");

  lockout = false;

}

// Changes the button to display either:
//  - a pause symbol, if music is playing.
//  - a play symbol, if music is paused.
// It will also pause / play audio based on its state.
function pausePlayHandler() {
  //let pausePlayButton = document.getElementById('pausePlay'); // don't actually need this.
  let pausePlayIcon = document.getElementById('pausePlayIcon'); // This is an <i> element with the actual icon.

  if (pausePlayIcon.getAttribute("data-status") === "mode-pause") {
    // User just pressed pause. Now, pause the song and set the button to Play Mode.
    pausePlayIcon.setAttribute("data-status", "mode-play");

    // The icon is handled by Font Awesome Classes. Based on the class, it changes the icon displayed.
    pausePlayIcon.classList.remove("fa-pause");
    pausePlayIcon.classList.add("fa-play");

    audio.pause();

  } else if (pausePlayIcon.getAttribute("data-status") === "mode-play") {
    // User just pressed play. Now, play the song and set the button to Pause Mode.
    pausePlayIcon.setAttribute("data-status", "mode-pause");

    // The icon is handled by Font Awesome Classes. Based on the class, it changes the icon displayed.
    pausePlayIcon.classList.add("fa-pause");
    pausePlayIcon.classList.remove("fa-play");

    audio.play();
  }
}



// SPOTIFY API STUFF BELOW
// most of this stuff was done with chat gpt.

// This lets us connect to the Spotify API.
async function getAccessToken() {
  // This ID & Secret belong to the dummy account Spencer created for this project.
  const clientId = '426c231666a8400ba36c0e557ca169ea'; 
  const clientSecret = '19f8189bab2b420f93ffc864345c9157';
  
  const basicAuth = btoa(`${clientId}:${clientSecret}`);
  const tokenEndpoint = 'https://accounts.spotify.com/api/token';
  
  const response = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${basicAuth}`
    },
    body: 'grant_type=client_credentials'
  });
  
  const data = await response.json();
  const accessToken = data.access_token;

  return accessToken;
}

// Gets a random song from Spotify, but also calls some other functions at the end.
async function fetchRandomSong() {
  const token = await getAccessToken();
  const genresResponse = await fetch('https://api.spotify.com/v1/browse/categories', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  // Gets a random genre from Spotify.
  const genresData = await genresResponse.json();
  const randomGenre = genresData.categories.items[Math.floor(Math.random() * genresData.categories.items.length)];

  const playlistsResponse = await fetch(`https://api.spotify.com/v1/browse/categories/${randomGenre.id}/playlists`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  // When Spotify gives us a genre, it also gives us a giant list of playlists. We pull a random playlist from each genre.
  const playlistsData = await playlistsResponse.json();
  const randomPlaylist = playlistsData.playlists.items[Math.floor(Math.random() * playlistsData.playlists.items.length)];

  const tracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${randomPlaylist.id}/tracks`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  // Once we have a random playlist, we pull a random song from that playlist.
  const tracksData = await tracksResponse.json();
  const randomTrack = tracksData.items[Math.floor(Math.random() * tracksData.items.length)];
  
  // Somewhere along the line, a fetch request failed. This could be for a variety of reasons, including bad internet connection on our end,
  // a server issue on Spotify's end, etc. We'll try again.
  if (randomTrack == null) {
    console.log("Track was null, so restarting search.");
    fetchRandomSong();
    return; // end this function prematurely.
  }
  
  // We successfully got a song, so let's debug print the name of it, and then update other information.
  console.log(`Random song: ${randomTrack.track.name} by ${randomTrack.track.artists[0].name}, with ID ${randomTrack.track.id}`);

  // songInfo is a reference to our HTML, this is the text thaat displays "SongName by ArtistName."
  if (songInfo == null) {
    songInfo = document.getElementById("songInfo");
  }
  // Adds an anchor element to the songInfo div.
  // We use target="_blank" in order to make the link open in a new tab.
  // We are required to have a link to the original Spotify page. This might need to be more evident.
  songInfo.innerHTML = `<a target="_blank" href="https://open.spotify.com/track/${randomTrack.track.id}">${randomTrack.track.name} by ${randomTrack.track.artists[0].name}</a>`;

  // update other parts of our site. The audio and the art element.
  playTrack(randomTrack.track);  
  displayAlbumArt(randomTrack);
  currentTrack = randomTrack;
  return randomTrack;
}
  
  fetchRandomSong().then(randomTrack => {
    //console.log(`Random song: ${randomTrack.track.name} by ${randomTrack.track.artists[0].name}`);
    displayAlbumArt(randomTrack);  
  }).catch(error => {
    console.error(error);
  });

  function displayAlbumArt(track) {
    const albumArtUrl = track.track.album.images[0].url;
    const div = document.getElementById('album-art');
  
    div.style.backgroundImage = `url('${albumArtUrl}')`;
  }



// The page has loaded. Do stuff once the page has loaded.
document.addEventListener("DOMContentLoaded", function() {
    // your code here
    const myButton = document.getElementById('hate');
    myButton.addEventListener('click', () => {
    fetchRandomSong()
        .then(randomTrack => {
        displayAlbumArt(randomTrack);
        })
        .catch(error => {
        console.error(error);
        });
    });

    const myButton2 = document.getElementById('like');
    myButton2.addEventListener('click', () => {
    fetchRandomSong()
        .then(randomTrack => {
        displayAlbumArt(randomTrack);
        })
        .catch(error => {
        console.error(error);
        });
    });
  });

  // Handles the playing of audio.
  function playTrack(track) {
    audio.pause(); // stops the current track.

    // Using a track, we can get the preview_url in order to play a short clip from the song.
    // There's another method for web playback using Spotify's Web Playback SDK - which seems relatively new, but that's premium locked
    // As a result, we're just gonna stick to the free preview clips.
    if (track.preview_url == null) {
      console.log(track.name + " had null preview URL, finding new song.");
      // No audio is available for this current song. 
      // Call a new random song.
      fetchRandomSong();
      return;
    }

    audio = new Audio(track.preview_url); // sets to the new song
    audio.play(); // starts the new track

    /* Turns the main pause/play button to represent "pause", since music is currently playing. */
    let pausePlayIcon = document.getElementById('pausePlayIcon');
    if (pausePlayIcon.getAttribute("data-status") === "mode-play") {
      pausePlayIcon.setAttribute("data-status", "mode-pause");
      pausePlayIcon.classList.add("fa-pause");
      pausePlayIcon.classList.remove("fa-play");
    }

    /* Once the song clip ends, changes the icon to prompt the user to press play. */
    audio.addEventListener('ended', function() {
      console.log("song clip ended.");
      let pausePlayIcon = document.getElementById('pausePlayIcon');
      if (pausePlayIcon == null) {
        console.log("null");
      }
      // Button is currently displaying pause. Now, pause the song and set the button to Play Mode.
      pausePlayIcon.setAttribute("data-status", "mode-play");
      pausePlayIcon.classList.remove("fa-pause");
      pausePlayIcon.classList.add("fa-play");
    });
    
  }

// This method cycles the volume between 1.0, 0.5, or 0.0.
// Once again, we're manipulating Font-Awesome classes to change the icons.
function volumeHandler() {
  let audioButton = document.getElementById("volume");
  // console.log(audio.volume);
  let status = audioButton.getAttribute("data-status");
  if (status == 1) {
    audioButton.setAttribute("data-status", 0.5);
    audioButton.classList.remove("fa-volume-high");
    audioButton.classList.add("fa-volume-low");
    audio.volume = 0.5;
  } else if (status == 0.5) {
    audioButton.setAttribute("data-status", 0);
    audioButton.classList.remove("fa-volume-low");
    audioButton.classList.add("fa-volume-xmark");
    audio.volume = 0.0;
  } else {
    audioButton.setAttribute("data-status", 1);
    audioButton.classList.remove("fa-volume-xmark");
    audioButton.classList.add("fa-volume-high");
    audio.volume = 1;
  }
}

// Take the user to the official spotify page.
function externalLink() {
  if (currentTrack == null) {
    console.log("Track was null, can't send user to the official track page without one!.");
    return;
  }
  // we use the _blank in order to open into a new tab.
  window.open(`https://open.spotify.com/track/${currentTrack.track.id}`, "_blank");
}