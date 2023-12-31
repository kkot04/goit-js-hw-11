import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { createGalleryCards } from './gallery-cards.js';
import { getPhotos } from './pixabay';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const input = document.querySelector('input');
const loadMoreBtn = document.querySelector('.load-more');
let userInput;
let perPage = 40;
let page;
let totalAmountOfPhoto = 0;
let arrOfPhotos = [];

// loadMoreBtn.classList.add('is-hidden');

async function getData(userInput, page, perPage) {
  try {
    const res = await getPhotos(userInput, page, perPage);
    totalAmountOfPhoto = res.totalHits;
    arrOfPhotos = res.hits;
    gallery.insertAdjacentHTML('beforeend', createGalleryCards(arrOfPhotos));
    const lightbox = new SimpleLightbox('.gallery a', {
      captions: true,
      captionPosition: 'bottom',
      captionDelay: 250,
      captionsData: 'alt',
    });

    const last = Math.ceil(res.totalHits / perPage);
    if (last === page){
      Notiflix.Notify.info(
        `It is end`
      )
      loadMoreBtn.classList.add('is-hidden')
    }

  } catch (error) {
    console.log(error);
  }
}

form.addEventListener('submit', async event => {
  event.preventDefault();
  page = 1;
  gallery.innerHTML = '';
  userInput = input.value.trim();
  if (!userInput) {
    Notiflix.Notify.failure(
      'Sorry, you can`t submit the empty query. Please type the text.'
    );
    return;
  }
  await getData(userInput, page, perPage);
  console.log(arrOfPhotos.length);
  if (arrOfPhotos.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
      gallery.innerHTML = '';
      loadMoreBtn.classList.add('is-hidden')
    return;
  } 
 if(arrOfPhotos.length < perPage) {
    Notiflix.Notify.success(`Hooray! We found ${totalAmountOfPhoto} images.`);
  } else {
    Notiflix.Notify.success(`Hooray! We found ${totalAmountOfPhoto} images.`);
    loadMoreBtn.classList.remove('is-hidden');
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  await getData(userInput, page, perPage);
  if (arrOfPhotos.length < perPage) {
    Notiflix.Notify.info(
      `We're sorry, but you've reached the end of search results.`
    );
    loadMoreBtn.classList.add('is-hidden');
  } 
});
