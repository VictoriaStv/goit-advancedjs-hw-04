import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox;

export function renderGallery(images) {
  const galleryElement = document.querySelector('.gallery');
  const markup = images
    .map(
      image => `<li class="gallery-item">
  <a class="gallery-link" href="${image.largeImageURL}">
    <img
      class="gallery-image"
      src="${image.webformatURL}"
      data-source="${image.largeImageURL}"
      data-likes="${image.likes}"
      data-views="${image.views}"
      data-comments="${image.comments}"
      data-downloads="${image.downloads}"
      alt="${image.tags}"
    />
  </a>
  <ul class="stats">
    <li class="stats-item">
      <p class="stats-item-header">Likes</p>
      <p class="stats-item-value">${image.likes}</p>
    </li>
    <li class="stats-item">
      <p class="stats-item-header">Views</p>
      <p class="stats-item-value">${image.views}</p>
    </li>
    <li class="stats-item">
      <p class="stats-item-header">Comments</p>
      <p class="stats-item-value">${image.comments}</p>
    </li>
    <li class="stats-item">
      <p class="stats-item-header">Downloads</p>
      <p class="stats-item-value">${image.downloads}</p>
    </li>
  </ul>
</li>`
    )
    .join('');

  galleryElement.insertAdjacentHTML('beforeend', markup);

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a');
  } else {
    lightbox.refresh();
  }
}

export function clearGallery() {
  document.querySelector('.gallery').innerHTML = '';
}
