import { Notify } from 'notiflix';
function fetchCountries(name) {
  const BASE_URL = 'https://restcountries.com/v3.1';

  return fetch(
    `${BASE_URL}/name/${name}?fields=capital&fields=population&fields=languages&fields=flags&fields=name`
  ).then(resp => {
    if (!resp.ok) {
      // throw new Error
      
      Notify.failure('Oops, there is no country with that name');
      list.innerHTML = '';
      divInfo.innerHTML = '';   
    }
    return resp.json();
  });
}
export { fetchCountries };
