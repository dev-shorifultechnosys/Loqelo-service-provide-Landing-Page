/**
 * Loqelo — consent and analytics integration, geographic language hint.
 * Google Analytics is not loaded until a visitor explicitly opts in.
 * Track only coarse event names and audience role (never email, country field,
 * message text or other personal form details). No external UI libraries.
 */
(() => {
  'use strict';
  const config = window.LoqeloSite || {};
  const select = document.getElementById('language');
  const banner = document.getElementById('analytics-consent-banner');
  const settings = document.querySelector('[data-consent-settings]');
  const accept = document.querySelector('[data-consent-accept]');
  const reject = document.querySelector('[data-consent-reject]');
  const consentKey = 'loqelo-analytics-consent-v1';
  let consent = null;
  let loaded = false;
  const validID = /^G-[A-Z0-9]{6,20}$/.test(String(config.analyticsMeasurementId || ''));

  function analyticsSetup() {
    if (!validID || loaded) return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    // Basic consent mode: no Google tag is loaded until consent is granted.
    window.gtag('consent', 'default', {
      ad_storage:'denied', ad_user_data:'denied',
      ad_personalization:'denied', analytics_storage:'denied'
    });
    window.gtag('consent', 'update', {analytics_storage:'granted'});
    window.gtag('js', new Date());
    window.gtag('config', config.analyticsMeasurementId, {send_page_view:true});
    const tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(config.analyticsMeasurementId);
    document.head.append(tag);
  }

  function preference(next) {
    consent = next;
    try { localStorage.setItem(consentKey, next); } catch (_) {}
    banner.hidden = true;
    if (next === 'accepted') analyticsSetup();
    else if (loaded && window.gtag) {
      window.gtag('consent','update', {
        analytics_storage:'denied',ad_storage:'denied',
        ad_user_data:'denied',ad_personalization:'denied'
      });
    }
  }

  try { consent = localStorage.getItem(consentKey); } catch (_) {}
  if (consent === 'accepted') analyticsSetup();
  else if (consent !== 'rejected') banner.hidden = false;
  accept?.addEventListener('click', () => preference('accepted'));
  reject?.addEventListener('click', () => preference('rejected'));
  settings?.addEventListener('click', () => { banner.hidden = false; });
  window.LoqeloAnalytics = Object.freeze({
    track(eventName, data = {}) {
      if (consent !== 'accepted' || !loaded || !window.gtag) return;
      const events = ['waitlist_form_submit', 'waitlist_signup', 'waitlist_form_view'];
      if (!events.includes(eventName)) return;
      const role = ['customer','provider'].includes(data.role) ? data.role : 'unknown';
      window.gtag('event', eventName, {audience_role:role});
    }
  });

  // Only explicit user selections should override future geographic hints.
  select?.addEventListener('change', () => {
    try { localStorage.setItem('loqelo-language-manual','yes'); } catch (_) {}
  });
  if (config.enableCountryHint && select) {
    let isManual = false;
    try { isManual = localStorage.getItem('loqelo-language-manual') === 'yes'; } catch (_) {}
    if (!isManual) {
      fetch('/api/locale.php', {credentials:'same-origin',cache:'no-store'})
        .then(response => response.ok ? response.json() : {})
        .then(value => {
          const proposed = value.suggestedLanguage;
          if (proposed && Array.isArray(config.supportedLanguages) && config.supportedLanguages.includes(proposed)) {
            let manuallyChanged = false;
            try { manuallyChanged = localStorage.getItem('loqelo-language-manual') === 'yes'; } catch (_) {}
            if (!manuallyChanged && select.value !== proposed) {
              select.value = proposed;
              select.dispatchEvent(new Event('change', {bubbles:true}));
              try { localStorage.removeItem('loqelo-language-manual'); } catch (_) {}
            }
          }
        }).catch(() => { /* Browser language already selected by the existing script. */ });
    }
  }
})();
