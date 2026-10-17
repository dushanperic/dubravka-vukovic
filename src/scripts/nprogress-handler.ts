const progressBar = document.getElementById('nprogress-bar');

document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  const anchor = target.closest('a');

  if (
    anchor &&
    anchor.href &&
    anchor.origin === window.location.origin &&
    !anchor.hasAttribute('download') &&
    anchor.target !== '_blank' &&
    anchor.getAttribute('href') !== '#'
  ) {
    // Show loader on internal navigation click
    progressBar?.classList.add('loading');
  }
});

window.addEventListener('pageshow', () => {
  // Hide loader if user navigates back via browser history
  progressBar?.classList.remove('loading');
});
