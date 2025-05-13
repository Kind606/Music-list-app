import http from "./scripts/httpClient.js";

const musicList = document.querySelector("#music");
const searchInput = document.querySelector("[data-search]");

const FAVORITES_KEY = "favoriteSongs";

searchInput.addEventListener("input", (event) => {
    const searchValue = event.target.value.toLowerCase();
    const sections = musicList.querySelectorAll("section.card");
    
    sections.forEach((section) => {
        const title = section.querySelector("p" , ).innerText.toLowerCase();
        if (title.includes(searchValue)) {
        section.style.display = "block";
        } else {
        section.style.display = "none";
        }
    });
    });

const getFavorites = () => {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
};

const toggleFavorite = (songId) => {
  let favorites = getFavorites();

  if (favorites.includes(songId)) {
    favorites = favorites.filter((id) => id !== songId);
  } else {
    favorites.push(songId);
  }

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

const isFavorite = (songId) => {
  return getFavorites().includes(songId);
};

const loadMusic = async () => {
  const client = new http("songs");
  const songs = await client.get();

  for (let song of songs) {
    const section = document.createElement("section");
    section.classList.add("card");

    const image = document.createElement("img");
    image.setAttribute("src", `./images/${song.image}`);
    image.alt = song.title;

    const info = document.createElement("p");
    info.innerText = song.title;
    info.classList.add("artist-name");

    const gerne = document.createElement("span");
    gerne.innerText = song.genre;
    
    const artist = document.createElement("span");
    artist.innerText = song.artist;
    artist.classList.add("artist-name");

    const favButton = document.createElement("button");
    favButton.innerText = isFavorite(song.id) ? "★" : "☆";
    favButton.classList.add("fav-btn");

    favButton.addEventListener("click", () => {
      toggleFavorite(song.id);
      favButton.innerText = isFavorite(song.id) ? "★" : "☆";
    });

    section.appendChild(image);
    section.appendChild(info);
    info.appendChild(gerne);
    info.appendChild(artist);
    section.appendChild(favButton);

    musicList.appendChild(section);
  }
};

document.addEventListener("DOMContentLoaded", loadMusic);
