const loader = document.getElementById('page-loader');

document.addEventListener('astro:before-preparation', () => {
  loader?.classList.remove('hidden');
});

document.addEventListener('astro:after-swap', () => {
  loader?.classList.add('hidden');
});

document.addEventListener('astro:page-load', () => {
  loader?.classList.add('hidden');
});
