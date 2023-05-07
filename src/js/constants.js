const API = 'https://restcountries.com/v3.1/name/';
const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

export { API, DEBOUNCE_DELAY, inputEl, countryList, countryInfo };
