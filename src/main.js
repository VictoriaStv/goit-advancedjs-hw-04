import './css/styles.css';

import { fetchImages } from './js/pixabay-api';
import { renderGallery, clearGallery } from './js/render-functions';
import { showToast } from './js/izi-toast';

const form = document.querySelector('.form-container');
const queryInput = form.querySelector('input[name="query"]');
const loader = document.querySelector('.downloader');
const loadMoreBtn = document.querySelector('.load-more');
const loadingMessage = document.querySelector('.loading-message');
let currentPage = 1;
let currentQuery = '';
let totalLoadedImages = 0;

form.addEventListener('submit', async event => {
  event.preventDefault();
  currentQuery = queryInput.value.trim();

  if (!currentQuery) {
    showToast('error', 'Please enter a search term!', 'Error');
    return;
  }

  clearGallery();
  loader.style.display = 'block';
  loadingMessage.style.display = 'block';
  loadMoreBtn.style.display = 'none';
  currentPage = 1;
  totalLoadedImages = 0;

  try {
    const data = await fetchImages(currentQuery, currentPage);
    loader.style.display = 'none';
    loadingMessage.style.display = 'none';

    if (data.hits.length === 0) {
      showToast(
        'fail',
        'Sorry, there are no images matching your search query.',
        'No Results'
      );
    } else {
      renderGallery(data.hits);
      totalLoadedImages += data.hits.length;
      if (totalLoadedImages < data.totalHits) {
        loadMoreBtn.style.display = 'block';
      }
      showToast('success', 'Images loaded successfully!', 'Success');
    }
  } catch (error) {
    loader.style.display = 'none';
    loadingMessage.style.display = 'none';
    showToast('error', 'Failed to fetch images.', 'Error');
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  loader.style.display = 'block';
  loadingMessage.style.display = 'block';

  try {
    const data = await fetchImages(currentQuery, currentPage);
    loader.style.display = 'none';
    loadingMessage.style.display = 'none';

    renderGallery(data.hits);
    totalLoadedImages += data.hits.length;

    if (totalLoadedImages >= data.totalHits) {
      loadMoreBtn.style.display = 'none';
      showToast(
        'fail',
        "We're sorry, but you've reached the end of search results.",
        'End'
      );
    } else {
      scrollPage();
      showToast('success', 'More images loaded!', 'Success');
    }
  } catch (error) {
    loader.style.display = 'none';
    loadingMessage.style.display = 'none';
    showToast('error', 'Failed to fetch images.', 'Error');
  }
});

function scrollPage() {
  const galleryElement = document.querySelector('.gallery');
  const { height } = galleryElement.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}
