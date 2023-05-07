import { countryInfo, countryList } from './constants';

function useSingleCountry(res) {
  const {
    name: { official },
    capital: [capitalName],
    population,
    flags: { svg },
    languages,
  } = res[0];

  return {
    countryName: official,
    capitalName,
    population,
    svg,
    langList: Object.values(languages).join(', '),
  };
}

function useCountryList(res) {
  return res.reduce((accumulator, { name: { official }, flags: { svg } }) => {
    return [...accumulator, { official, svg }];
  }, []);
}

function useClearResults() {
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';
}

export { useSingleCountry, useCountryList, useClearResults };
