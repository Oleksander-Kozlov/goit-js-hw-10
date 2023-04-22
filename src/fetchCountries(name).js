function fetchCountries(nameCounrty) {
  const BASE_URL = 'https://restcountries.com/v3.1';

  return fetch(
    `${BASE_URL}/name/${nameCounrty}?fields=capital&fields=population&fields=languages&fields=flags&fields=name`
  ).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}
export { fetchCountries };

