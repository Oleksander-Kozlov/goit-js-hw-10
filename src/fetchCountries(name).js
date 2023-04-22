import { Notify } from 'notiflix';
function fetchCountries(nameCounrty) {
  const BASE_URL = 'https://restcountries.com/v3.1';

  return fetch(
    `${BASE_URL}/name/${nameCounrty}?fields=capital&fields=population&fields=languages&fields=flags&fields=name`
  ).then(resp => {
    if (!resp.ok) {
      Notify.failure('Oops, there is no country with that name');
    }
    return resp.json();
  });
}
export { fetchCountries };
