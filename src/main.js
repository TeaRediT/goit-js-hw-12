import { getImagesByQuery } from './js/pixabay-api';
import {
  clearGallery,
  createGallery,
  errorToast,
  hideLoader,
  hideLoadMoreButton,
  showLoader,
  showLoadMoreButton,
} from './js/render-functions';

export const refs = {
  formEl: document.querySelector('.form'),
  inputEl: document.querySelector("input[name='search-text']"),
  listEl: document.querySelector('.gallery'),
  loaderEl: document.querySelector('.loader'),
  btnEl: document.querySelector('.js-btn'),
};

let page;
let input;
let images;

refs.formEl.addEventListener('submit', async e => {
  e.preventDefault();
  hideLoadMoreButton();
  clearGallery();
  input = refs.inputEl.value.trim();
  page = 1;

  if (input === '') {
    errorToast('Enter your query!');
    return;
  }

  showLoader();
  try {
    images = await getImagesByQuery(input, page);
    hideLoader();
    //images not found
    if (images.hits.length === 0) {
      errorToast(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      refs.formEl.reset();
      return;
    }
    //images found
    createGallery(images.hits);
    if (!(page + 1 > Math.ceil(images.totalHits / 15))) showLoadMoreButton();
    //error
  } catch (err) {
    hideLoader();
    errorToast(`ERROR: ${err}`);
    refs.formEl.reset();
  }
});

refs.btnEl.addEventListener('click', async () => {
  page++;
  hideLoadMoreButton();
  showLoader();

  try {
    images = await getImagesByQuery(input, page);
    hideLoader();
    createGallery(images.hits);

    const itemEl = document.querySelector('.gallery-item');
    let rect = itemEl.getBoundingClientRect();
    window.scrollBy(0, (rect.height + 24) * 2); //висота двох карток + гапи
  } catch (err) {
    hideLoader();
    errorToast(`ERROR: ${err}`);
  }
  if (page + 1 > Math.ceil(images.totalHits / 15)) {
    hideLoader();
    errorToast("We're sorry, but you've reached the end of search results.");
    return;
  }
  showLoadMoreButton();
});
