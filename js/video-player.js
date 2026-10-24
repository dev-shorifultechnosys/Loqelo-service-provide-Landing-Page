/**
 * LOQELO / STAGE 02 — promotional video playback
 * Client-provided MP4 plays ONLY after a direct user interaction.
 * Vanilla JS, no packages, no CDN, no inline event attributes.
 */
(() => {
  'use strict';
  const dialog = document.getElementById('loqelo-video-modal');
  const player = document.getElementById('loqelo-video-player');
  if (!dialog || !player) return;

  // Two separate play buttons intentionally open the same video.
  document.querySelectorAll('[data-video-open]').forEach(button => {
    button.addEventListener('click', () => {
      if (!dialog.open) dialog.showModal();
      // Autoplay isn't needed on page load. Playback starts from the click.
      player.play().catch(() => { /* native controls remain available */ });
    });
  });

  function closeVideo() {
    player.pause();
    player.currentTime = 0;
    if (dialog.open) dialog.close();
  }

  dialog.querySelector('[data-video-close]').addEventListener('click', closeVideo);
  // Clicking outside the framed player closes the video on desktop.
  dialog.addEventListener('click', event => {
    if (event.target === dialog) closeVideo();
  });
  // Escape is handled by <dialog>; stop playing after it closes.
  dialog.addEventListener('close', () => {
    player.pause();
    player.currentTime = 0;
  });
})();
