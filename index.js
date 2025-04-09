import http from "./scripts/httpClient.js";

const musicList = document.querySelector("#music");

const initApp = () => {
    loadMusic();
};

const loadMusic = async () => {
  const client = new http("songs");
  const songs = await client.get();

  console.log(songs);

  for (let song of songs) {
    const section = document.createElement("section");
    section.classList.add("card");

    const image = document.createElement("img");
    image.setAttribute("src", `./images/${song.image}`);
    image.alt = songs.title;
    image.setAttribute("songId", song.id);

    section.appendChild(image);

    const info = document.createElement("p");
    info.innerText = song.artist;

    section.appendChild(info);

    musicList.appendChild(section);
  }

  //   const images = document.querySelectorAll('img');
  //   images.forEach((image) => {
  //     image.addEventListener('click', () => {
  //       console.log(`Du klickade på ${image.getAttribute('vehicleId')}`);
  //       location.href =
  //         './vehicle-details.html?vehicle=' + image.getAttribute('vehicleId');
  //     });
  //   });
};

document.addEventListener("DOMContentLoaded", initApp);
