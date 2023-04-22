import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries(name)';
import { Notify } from 'notiflix';
const DEBOUNCE_DELAY = 300;

const enterCountry = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const divInfo = document.querySelector(".country-info")
console.log(divInfo);
list.style.listStyle = `none`;


enterCountry.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));
function onSearch(evt) {
    console.log(evt.target.value)
    if (!evt.target.value) {
        list.innerHTML = '';
        divInfo.innerHTML = '';
    }
    else {
        fetchCountries(evt.target.value.trim())
            .then((data) => {
            
                if (data.length > 10) {
                    return Notify.info(
                        'Too many matches found. Please enter a more specific name.'
                    );
                
                }
                if (data.length === 1) {
                    list.innerHTML = ''
                    return divInfo.innerHTML = createMarkup(data);
                    //   console.log(createMarkup(data));
                }
                if (2 <= data.length & data.length <= 10) {
                    console.log(data);
                    divInfo.innerHTML = '';
                    return (list.innerHTML = createList(data));
              
                }
            
            })
            .catch(err => {
               
                Notify.failure(err)
                list.innerHTML = '';
                divInfo.innerHTML = '';
            });
    }
}

          
function createList(arr) {
    return arr
      .map(
        ({ flags: { svg, alt }, name: { official } }) =>
          `<li><p><img src="${svg}" alt="${alt} width="35px" height="20px">  ${official}</p></li>`
      )
      .join();
    
};
   

function createMarkup(arr) {
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
          )}</span></h3>`
      )
      .join(' ');
    
}
// {/*  */}
