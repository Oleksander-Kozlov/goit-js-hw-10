import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries(name)';
import { Notify } from 'notiflix';
const DEBOUNCE_DELAY = 300;

const enterCountry = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const divInfo = document.querySelector(".country-info")
list.style.listStyle = `none`;

enterCountry.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));
function onSearch(evt) {
   console.log(evt.target.value);  
    fetchCountries(evt.target.value.trim())
        .then((data) => {
            
            if (data.length > 9) {
                return Notify.info(
                    'Too many matches found. Please enter a more specific name.'
                );
                
            }
            else if (2 <= data.length <= 10) {
              console.log(data);
                return list.innerHTML=createList(data);
            //   console.log(createList(data));
            }
            else if (data.length = 1) {
              return (divInfo.innerHTML = createMarkup(data));
            }
        })
      .catch(err => console.log(err));
}

          
function createList(arr) {
    return arr.map(
        ({ flags: { svg, alt }, name: { official } }) =>
            `<li><img src="${svg}" alt="${alt} width="50px" height="30px"><span>${ official }</span></li>`
    );
    
};
   

function createMarkup(arr) {
    return arr.map((({ flags: { svg, alt }, name: { official },capital, languages, population })) => `<div><h2><img src="${svg}" alt="${alt} width="50px" height="30px"><span>${ official }</span></h2><h3>Capital:<span>${capital}</span></h3><h3>Population:<span>${population}</span></h3></div>`
    ).join(' ');
    
}
// {/* <h3>Languages<span>${languages}</span></h3> */}
