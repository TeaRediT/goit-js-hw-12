import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { refs } from '../main';

const createMarkup = el => {
  const {
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = el;

  return `<li class="gallery-item">
          <a class="img-link" href="${largeImageURL}"><img class="img" src="${webformatURL}" alt="${tags
    .split(',')
    .slice(0, 3)
    .join(',')}"/></a>
          <ul class="img-stats-list">
            <li class="img-stats-item"><h3 class="img-stats-title">likes</h3><p class="img-stats">${likes}</p></li>
            <li class="img-stats-item"><h3 class="img-stats-title">views</h3><p class="img-stats">${views}</p></li>
            <li class="img-stats-item"><h3 class="img-stats-title">comments</h3><p class="img-stats">${comments}</p></li>
            <li class="img-stats-item"><h3 class="img-stats-title">downloads</h3><p class="img-stats">${downloads}</p></li>
          </ul>
        </li>`;
};

export const lightbox = new SimpleLightbox('.img-link', {
  captionsData: 'alt',
  captionDelay: 250,
});

export const errorToast = mess => {
  return iziToast.show({
    message: `${mess}`,
    color: 'red',
    position: 'topRight',
    close: false,
  });
};

export const createGallery = images => {
  const markup = images.map(el => createMarkup(el)).join('');
  refs.listEl.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
};

export const clearGallery = () => {
  refs.listEl.innerHTML = '';
};

export const showLoader = () => {
  refs.loaderEl.style.display = 'block';
};

export const hideLoader = () => {
  refs.loaderEl.style.display = 'none';
};

export const showLoadMoreButton = () => {
  refs.btnEl.style.display = 'block';
};

export const hideLoadMoreButton = () => {
  refs.btnEl.style.display = 'none';
};
