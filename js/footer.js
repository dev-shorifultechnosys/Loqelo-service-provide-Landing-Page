/**
 * Loqelo Stage 08 — shared footer interactions (Vanilla ES6+)
 * Reference-matched footer only. Earlier scripts and sections are intact.
 * Social and legal URLs are pending owner confirmation; never invent them.
 * Newsletter email is moved to the existing consent-based customer form.
 * This does NOT claim a saved contact or subscribe without a real backend.
 */
(() => {
  'use strict';
  const footer = document.querySelector('.site-footer');
  if (!footer) return;

  const translations = {
    en: {
      brandLine:'A simpler way to get things done for a brighter tomorrow.',
      product:'Product',how:'How it works',services:'Services',customers:'For Customers',providers:'For Providers',
      company:'Company',about:'FAQ',careers:'Careers',press:'Press',contact:'Contact',
      legal:'Legal',privacy:'Privacy Policy',terms:'Terms of Service',cookies:'Cookie Policy',
      newsletterTitle:'Stay in the loop',newsletterText:'Get the latest updates about our Launch.',
      emailLabel:'Your email address',newsletterNote:'Continue to the waitlist to provide consent.',
      copyright:'© 2026 Loqelo. All rights reserved.',
      continue:'Complete the customer waitlist form above to request updates.',
      pendingSocial:'Social profile URLs have not yet been supplied by Loqelo.',
      pendingCompany:'This company page is awaiting approved information from Loqelo.',
      pendingLegal:'Official legal documents must be supplied and approved before launch.'
    },
    de: {
      brandLine:'Einfacher erledigen, was ansteht – für eine bessere Zukunft.',
      product:'Produkt',how:'So funktioniert’s',services:'Dienstleistungen',customers:'Für Kunden',providers:'Für Anbieter',
      company:'Unternehmen',about:'FAQ',careers:'Karriere',press:'Presse',contact:'Kontakt',
      legal:'Rechtliches',privacy:'Datenschutzerklärung',terms:'Nutzungsbedingungen',cookies:'Cookie-Richtlinie',
      newsletterTitle:'Bleiben Sie informiert',newsletterText:'Neuigkeiten zum geplanten Start erhalten.',
      emailLabel:'Ihre E-Mail-Adresse',newsletterNote:'Bestätigen Sie Ihre Einwilligung im Wartelistenformular.',
      copyright:'© 2026 Loqelo. Alle Rechte vorbehalten.',
      continue:'Füllen Sie oben das Kunden-Wartelistenformular aus.',
      pendingSocial:'Links zu Social-Media-Profilen wurden noch nicht bestätigt.',
      pendingCompany:'Diese Unternehmensseite wartet auf freigegebene Inhalte.',
      pendingLegal:'Rechtliche Dokumente müssen vor dem Start bereitgestellt werden.'
    },
    fr: {
      brandLine:'Simplifier le quotidien pour un avenir meilleur.',
      product:'Produit',how:'Fonctionnement',services:'Services',customers:'Pour les clients',providers:'Pour les prestataires',
      company:'Entreprise',about:'FAQ',careers:'Carrières',press:'Presse',contact:'Contact',
      legal:'Mentions légales',privacy:'Politique de confidentialité',terms:'Conditions d’utilisation',cookies:'Politique de cookies',
      newsletterTitle:'Restez informé',newsletterText:'Recevez les actualités du prochain lancement.',
      emailLabel:'Votre adresse e-mail',newsletterNote:'Confirmez votre accord via le formulaire d’attente.',
      copyright:'© 2026 Loqelo. Tous droits réservés.',
      continue:'Complétez le formulaire client ci-dessus.',
      pendingSocial:'Les profils sociaux officiels ne sont pas encore renseignés.',
      pendingCompany:'Cette page attend les informations approuvées.',
      pendingLegal:'Les documents légaux officiels restent à fournir.'
    },
    pl: {
      brandLine:'Prostszy sposób na codzienne sprawy i lepsze jutro.',
      product:'Produkt',how:'Jak to działa',services:'Usługi',customers:'Dla klientów',providers:'Dla wykonawców',
      company:'Firma',about:'FAQ',careers:'Kariera',press:'Prasa',contact:'Kontakt',
      legal:'Informacje prawne',privacy:'Polityka prywatności',terms:'Regulamin',cookies:'Polityka cookies',
      newsletterTitle:'Bądź na bieżąco',newsletterText:'Otrzymuj wiadomości o planowanym starcie.',
      emailLabel:'Twój adres e-mail',newsletterNote:'Potwierdź zgodę w formularzu listy oczekujących.',
      copyright:'© 2026 Loqelo. Wszelkie prawa zastrzeżone.',
      continue:'Wypełnij formularz listy oczekujących dla klientów.',
      pendingSocial:'Oficjalne profile społecznościowe nie zostały podane.',
      pendingCompany:'Ta strona wymaga zatwierdzonych informacji.',
      pendingLegal:'Dokumenty prawne trzeba przygotować przed uruchomieniem.'
    }
  };
  const languageSelect = document.querySelector('#language');
  const feedback = footer.querySelector('#footer-feedback');
  const email = footer.querySelector('#footer-email');
  const localized = () => translations[languageSelect?.value] || translations.en;

  function translate() {
    const strings = localized();
    footer.querySelectorAll('[data-footer-i18n]').forEach(element => {
      const value = strings[element.dataset.footerI18n];
      if (value) element.textContent = value;
    });
    email.placeholder = strings.emailLabel;
    feedback.hidden = true;
  }
  languageSelect?.addEventListener('change',translate);
  translate();

  function setNotice(message) {
    feedback.textContent = message;
    feedback.hidden = false;
  }

  // URL-dependent items are intentionally not hyperlinks yet.
  // Show an accurate explanation instead of inventing destinations.
  footer.querySelectorAll('[data-footer-pending]').forEach(control => {
    control.addEventListener('click', () => {
      const topic = control.dataset.footerPending;
      setNotice(localized()[topic === 'social' ? 'pendingSocial' : topic === 'legal' ? 'pendingLegal' : 'pendingCompany']);
    });
  });

  // Reuse the existing signup flow, including country, user type and consent.
  footer.querySelector('#footer-newsletter')?.addEventListener('submit', event => {
    event.preventDefault();
    if (!email.reportValidity()) return;
    const form = document.querySelector('#customer-signup');
    const field = form?.querySelector('input[type="email"]');
    if (!form || !field) {
      setNotice(localized().pendingCompany);
      return;
    }
    field.value = email.value.trim();
    setNotice(localized().continue);
    form.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'});
    field.focus({preventScroll:true});
    // This is a referral to an unsubmitted form; no analytics event or false success.
  });
})();
