import { getImagesByQuery } from './js/pixabay-api';
import {
  clearGallery,
  createGallery,
  errorToast,
  hideLoader,
  showLoader,
} from './js/render-functions';

export const refs = {
  formEl: document.querySelector('.form'),
  inputEl: document.querySelector("input[name='search-text']"),
  listEl: document.querySelector('.gallery'),
  loaderEl: document.querySelector('.loader'),
};

refs.formEl.addEventListener('submit', e => {
  e.preventDefault();
  clearGallery();
  const input = refs.inputEl.value.trim();

  if (input === '') {
    errorToast('Enter your query!');
    return;
  }

  showLoader();
  getImagesByQuery(input)
    .then(images => {
      hideLoader();
      //images not found
      if (images.length === 0) {
        errorToast(
          'Sorry, there are no images matching your search query. Please try again!'
        );
        return;
      }
      //images found
      createGallery(images);
    })
    .catch(err => {
      errorToast(`ERROR: ${err}`);
    });
  refs.formEl.reset();
});
