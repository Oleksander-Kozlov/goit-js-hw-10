function createContainer (arr) {
  return arr
    .map(
      ({
        flags: { svg, alt },
        capital,
        languages,
        population,
        name: { official },
      }) =>
        `<h2><img src="${svg}" alt="${alt} width="50px" height="30px">
          <span> ${official}</span></h2>
          <h3>Capital: <span style="font-weight: normal"> ${capital}</span></h3>
          <h3>Population: <span style="font-weight: normal"> ${population}</span></h3>
          <h3>Languages: <span style="font-weight: normal"  > ${Object.values(
            languages
          ).join(", ")}</span></h3>`
    )
    .join(' ');
}
export { createContainer };