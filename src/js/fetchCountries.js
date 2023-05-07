import { API } from './constants';

function fetchCountries(countryName) {
  const api = `${API}${countryName}?fields=name,capital,population,flags,languages`;
  return fetch(api)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => {
      throw error;
    });
}

export { fetchCountries };
