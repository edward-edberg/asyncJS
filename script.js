'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();
//   // console.log(request.responseText);
//   request.addEventListener('load', function () {
//     // console.log(this.responseText);
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     // console.log(data.flags);
//     // console.log(data.flags['png']);
//     // console.log(data.languages);
//     // console.log(data.languages['ind']);
//     // console.log(Object.keys(data.languages)[0]);
//     // console.log(data.currencies[Object.keys(data.currencies)].name);

//     const html = `
//     <article class="country">
//       <img class="country__img" src="${data.flags['svg']}" />
//       <div class="country__data">
//         <h3 class="country__name">${data.name['common']}</h3>
//         <h4 class="country__region">${data.region}</h4>
//         <p class="country__row"><span>👫</span>${(
//           +data.population / 1000000
//         ).toFixed(1)}M people</p>
//         <p class="country__row"><span>🗣️</span>${
//           data.languages[Object.keys(data.languages)[0]]
//         }</p>
//         <p class="country__row"><span>💰</span>${
//           data.currencies[Object.keys(data.currencies)].name
//         }</p>

//       </div>
//     </article>
//   `;
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };
const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flags['svg']}" />
      <div class="country__data">
        <h3 class="country__name">${data.name['common']}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)}M people</p>
        <p class="country__row"><span>🗣️</span>${
          data.languages[Object.keys(data.languages)[0]]
        }</p>
        <p class="country__row"><span>💰</span>${
          data.currencies[Object.keys(data.currencies)].name
        }</p>

      </div>
    </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
const getCountryAndNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    // console.log(data);
    //  Render country 1
    renderCountry(data);

    // Get neighbour country (2)
    const [neighbour] = data.borders;
    // console.log(neighbour);
    if (!neighbour) return;

    // AJAX call country 2

    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      // console.log(this.responseText);
      const [data2] = JSON.parse(this.responseText);
      // console.log(data2);
      renderCountry(data2, 'neighbour');
    });
  });
};

getCountryAndNeighbour('usa');
// getCountryData('usa');
// getCountryData('india');

const request = fetch(`https://restcountries.com/v3.1/alpha/usa`);
// console.log(request);

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => renderCountry(data[0]));
};
getCountryData('portugal');
