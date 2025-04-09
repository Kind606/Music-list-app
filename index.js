
import http from './scripts/httpClient.js';

const musicList = querySelector("#gallary")

const initApp = () => {
    if (location.href.endsWith('gallery.html')) {
      loadMusic();
    } else if (location.href.includes('favmusic.html')) {
      loadFavMusic();
    }
  };

  const loadMusic = async () => {
    const client = new http('music');
    const songs = await client.get();
  
    console.log(songs);
  
    // for (let song of songs) {
    //   const section = document.createElement('section');
    //   section.classList.add('card');
  
    //   const image = document.createElement('img');
    //   image.setAttribute('src', `./images/${vehicle.imageUrl}`);
    //   image.alt = vehicle.manufacturer;
    //   image.setAttribute('vehicleId', vehicle.id);
  
    //   section.appendChild(image);
  
    //   const info = document.createElement('p');
    //   info.innerText = vehicle.manufacturer;
  
    //   section.appendChild(info);
  
    //   vehicleList.appendChild(section);
    // }
  
    // const images = document.querySelectorAll('img');
    // images.forEach((image) => {
    //   image.addEventListener('click', () => {
    //     console.log(`Du klickade på ${image.getAttribute('vehicleId')}`);
    //     location.href =
    //       './vehicle-details.html?vehicle=' + image.getAttribute('vehicleId');
    //   });
    // });
  };

