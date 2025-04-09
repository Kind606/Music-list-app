import http from "./scripts/httpClient.js";

const musicList = document.querySelector("#music");

const FAVORITES_KEY = "favoriteSongs";

const getFavorites = () => {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
};

const removeFavorite = (songId) => {
  let favorites = getFavorites();
  favorites = favorites.filter((id) => id !== songId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

const loadFavorites = async () => {
  const client = new http("songs");
  const songs = await client.get();
  musicList.innerHTML = ""; // Clear the list before loading favorites
  const favorites = getFavorites();

  const favSongs = songs.filter((song) => favorites.includes(song.id));

  for (let song of favSongs) {
    const section = document.createElement("section");
    section.classList.add("card");

    const image = document.createElement("img");
    image.setAttribute("src", `./images/${song.image}`);
    image.alt = song.title;

    const info = document.createElement("p");
    info.innerText = song.artist;

    const gerne = document.createElement("span");
    gerne.innerText = song.genre;
    gerne.classList.add("genre-name");

    const removeBtn = document.createElement("button");
    removeBtn.innerText = "Remove Favorite";
    removeBtn.classList.add("remove-btn");

    removeBtn.addEventListener("click", () => {
      removeFavorite(song.id);
      section.remove();
    });

    section.appendChild(image);
    section.appendChild(info);
    info.appendChild(gerne);
    section.appendChild(removeBtn);

    musicList.appendChild(section);
  }
};

document.addEventListener("DOMContentLoaded", loadFavorites);
