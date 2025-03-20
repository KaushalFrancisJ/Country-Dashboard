countries = [];
const container = document.getElementById('container');


const fetchCountries= async()=>{
    try{
        const data = await fetch(`https://restcountries.com/v3.1/all`);
        
        if(data.ok){
            const response = await data.json();
            assignData(response);
        }
    }catch(error){
        console.log(error);
    }
}


function assignData(data){
    this.countries = data;
}

(async () => {
    await fetchCountries();
    for(let i of countries){
        createDom(i);
    }
})();

const createDom = (countries) =>{
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
    flagPlace.setAttribute('src',flagImg);

    // setting the alternate text:
    if(flagAlt === undefined){
        flagPlace.setAttribute('alt', 'Flag Not Available.');
    }
    else {
        flagPlace.setAttribute('alt', flagAlt);
    }
    flagPlace.classList.add('flag');

    // Country Name:
    const nameCountry = document.createElement('div');
    nameCountry.classList.add('nameCountry');
    nameCountry.textContent = countryName;


    const capitalText = document.createElement('div');
    capitalText.classList.add('capital');

    try{const captemp = capitalCity.join(', ');
        capitalText.textContent = captemp;
    }
    catch(err){
        console.log(err);
        capitalText.textContent = 'No capital';
    };

    const locationHolder = document.createElement('a');
    locationHolder.classList.add('locationHolder');
    locationHolder.setAttribute('href', geolocation);
    locationHolder.setAttribute('target', '_blank');
    locationHolder.textContent = `${countryName} in Maps`;

    countryDetails.append(nameCountry, capitalText, locationHolder);
    countryCard.append(flagPlace, countryDetails);
    container.append(countryCard);
}

function searchCountries(inputId){
    const inputValue = document.getElementById(inputId).value;
    const result = countries.filter(country => country.name.official.toLowerCase().includes(inputValue.toLowerCase()));
    container.textContent = '';
    // console.log(result);
    if(result.length !== 0){
        for(let i of result){
            createDom(i);
        }
    }
    else{
        const notFound = document.createElement('div');
        const notFoundHeading = document.createElement('h1');
        const notFoundText = document.createElement('p');
        const notFoundImage = document.createElement('img');

        notFoundHeading.textContent = 'Country Not Found!'
        notFoundText.textContent = 'You from another world....?'
        notFoundImage.setAttribute('src','https://media.tenor.com/Kkq2AztNHV8AAAAM/ashlabeth-eyes.gif');

        notFound.append(notFoundHeading, notFoundText, notFoundImage);
        container.append(notFound);

        console.log('not fulkjasdf');
    }
}
