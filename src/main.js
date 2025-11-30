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

let page = 1;
let input;
let totalHits;

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
    const images = await getImagesByQuery(input, page);
    //images not found
    if (images.hits.length === 0) {
      errorToast(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      return;
    }
    //images found
    totalHits = images.totalHits;
    createGallery(images.hits);
    if (totalHits > 15) showLoadMoreButton();
    //error
  } catch (err) {
    errorToast(`ERROR: ${err}`);
  } finally {
    hideLoader();
    refs.formEl.reset();
  }
});

refs.btnEl.addEventListener('click', async () => {
  page++;
  hideLoadMoreButton();
  showLoader();

  try {
    const images = await getImagesByQuery(input, page);
    createGallery(images.hits);

    const itemEl = document.querySelector('.gallery-item');
    let rect = itemEl.getBoundingClientRect();
    window.scrollBy(0, (rect.height + 24) * 2); //висота двох карток + гапи

    if (page * 15 >= totalHits) {
      errorToast("We're sorry, but you've reached the end of search results.");
      return;
    }
    showLoadMoreButton();
  } catch (err) {
    errorToast(`ERROR: ${err}`);
  } finally {
    hideLoader();
  }
});
