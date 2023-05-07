import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { DEBOUNCE_DELAY, countryInfo, countryList, inputEl } from './constants';
import { fetchCountries } from './fetchCountries';
import { useClearResults, useCountryList, useSingleCountry } from './hooks';
import '../css/styles.css';

function handleSearch({ target: { value } }) {
  useClearResults();
  const searchTerm = value.trim().toLowerCase();
  if (searchTerm === '') {
    return;
  }
  fetchCountries(searchTerm)
    .then(countries => {
      if (countries.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (countries.length >= 2 && countries.length <= 10) {
        countryListRender(useCountryList(countries));
      } else if (countries.length === 1) {
        singleCountryRender(useSingleCountry(countries));
      }
    })
    .catch(() => {
      Notify.failure('Oops, there is no country with that name');
    });
}

function singleCountryRender({
  countryName,
  capitalName,
  population,
  svg,
  langList,
}) {
  countryInfo.innerHTML = `
    <div class='country_header'>
      <img class='country_icon' src='${svg}' alt='${countryName}'>
      <h3 class='country_name'>${countryName}</h3>
    </div>
    <ul>
      <li><span class='bold'>Capital</span>: ${capitalName}</li>
      <li><span class='bold'>Population</span>: ${population}</li>
      <li><span class='bold'>Languages</span>: ${langList}</li>
    <ul>
  `;
}

function countryListRender(countryData) {
  const listToRender = countryData
    .map(({ official, svg }) => {
      return `<li class='country_item'>
      <img class='country_item__icon' src='${svg}' alt='${official}'>
      ${official}
      </li>`;
    })
    .join('');
  countryList.innerHTML = listToRender;
}

inputEl.addEventListener('input', debounce(handleSearch, DEBOUNCE_DELAY));
