const api = fetch('https://restcountries.com/v3.1/all')
  .then((response) => response.json())
  .then((array) => array);

let countries = [];

async function loadflag() {
  api.then((array) => {
    countries = array;
    const total = array.length;
    let loaded = 0;
    array.forEach((item, index) => {
      setTimeout(() => {
        createDom(item);
        loaded++;
        const progress = Math.floor((loaded / total) * 100);
        const radius = 120;
        const circumference = 2 * Math.PI * radius;
        const offset = ((100 - progress) / 100) * circumference;
        const circle = document.getElementById('circle');
        const text = document.querySelector('.svg-circle-text');

        circle.style.strokeDasharray = circumference;
        circle.style.strokeDashoffset = offset;
        text.textContent = `${progress}%`;

        if (loaded === total) {
          setTimeout(() => {
            document.getElementById('progressSvg').classList.add('hidden');
            document.getElementById('container').classList.remove('hidden');
          }, 200); // slight delay to allow final progress update
        }
      }, index * 5);
    });
  });
}

const createDom = (countries) => {
  const countryCard = document.createElement('div');
  countryCard.classList.add('country');
  const countryDetails = document.createElement('div');
  countryDetails.classList.add('country-details');

  const countryName = countries.name.common;
  const flagImg = countries.flags.svg;
  const flagAlt = countries.flags.alt;
  const geolocation = countries.maps.googleMaps;
  const capitalCity = countries.capital;

  // flag definition:
  const flagPlace = document.createElement('img');
  flagPlace.setAttribute('src', flagImg);

  // setting the alternate text:
  if (flagAlt === undefined) {
    flagPlace.setAttribute('alt', 'Flag Not Available.');
  } else {
    flagPlace.setAttribute('alt', flagAlt);
  }
  flagPlace.classList.add('flag');

  // Country Name:
  const nameCountry = document.createElement('div');
  nameCountry.classList.add('nameCountry');
  nameCountry.textContent = countryName;

  const capitalText = document.createElement('div');
  capitalText.classList.add('capital');

  try {
    const captemp = capitalCity.join(', ');
    capitalText.textContent = captemp;
  } catch (err) {
    console.log(err);
    capitalText.textContent = 'No capital';
  }

  const locationHolder = document.createElement('a');
  locationHolder.classList.add('locationHolder');
  locationHolder.setAttribute('href', geolocation);
  locationHolder.setAttribute('target', '_blank');
  locationHolder.textContent = `${countryName} in Maps`;

  countryDetails.append(nameCountry, capitalText, locationHolder);
  countryCard.append(flagPlace, countryDetails);
  container.append(countryCard);
};

function searchCountries(inputId) {
  const inputValue = document.getElementById(inputId).value;
  const result = countries.filter((country) =>
    country.name.official.toLowerCase().includes(inputValue.toLowerCase()),
  );
  container.textContent = '';
  console.log(result);
  if (result.length !== 0) {
    for (let i of result) {
      createDom(i);
    }
  } else {
    const notFound = document.createElement('div');
    const notFoundHeading = document.createElement('h1');
    const notFoundText = document.createElement('p');
    const notFoundImage = document.createElement('img');

    notFoundHeading.textContent = 'Country Not Found!';
    notFoundText.textContent = 'You from another world....?';
    notFoundImage.setAttribute(
      'src',
      'https://media.tenor.com/Kkq2AztNHV8AAAAM/ashlabeth-eyes.gif',
    );

    notFound.append(notFoundHeading, notFoundText, notFoundImage);
    container.append(notFound);

    console.log('not fulkjasdf');
  }
}

loadflag();
