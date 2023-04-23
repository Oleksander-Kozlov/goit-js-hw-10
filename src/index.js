import './css/styles.css';
// підключаю пакет lodash.debounce
import debounce from 'lodash.debounce';
// підключаю функцію для отримання даних з REST API
import { fetchCountries } from './fetchCountries(name)';
// підключаю функцію для створення розмітки
import { createContainer } from "./createContainer"
import { createList } from './createList';
// підключаю бібліотеку notiflix
import { Notify } from 'notiflix';
const DEBOUNCE_DELAY = 300;
// отримую доступ до HTML документів
const enterCountry = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const divInfo = document.querySelector(".country-info")

// налаштовую інлайнові стилі
list.style.listStyle = `none`;
list.style.paddingLeft = `0`;

// прослуховувач на подію інпут з дебонсом в 300 мл
enterCountry.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(evt) {
  
  if (!evt.target.value.trim()) {
    list.innerHTML = '';
    divInfo.innerHTML = '';
  }
  
  else {
    fetchCountries(evt.target.value.trim())
        .then(data => {
          // Якщо у відповіді бекенд повернув більше ніж 10 країн
          if (data.length > 10) {
            return Notify.info(
              'Too many matches found. Please enter a more specific name.'
            );
          }
          // Якщо результат запиту - це масив з однією країною
          if (data.length === 1) {
            list.innerHTML = '';
            return (divInfo.innerHTML = createContainer(data));
          }
          //   Якщо бекенд повернув від 2-х до 10-и країн
          if ((2 <= data.length) & (data.length <= 10)) {
            divInfo.innerHTML = '';
            return (list.innerHTML = createList(data));
          }
        })
      .catch(err => {
        Notify.failure(err);
        list.innerHTML = '';
        divInfo.innerHTML = '';
      });
  }
}

          

