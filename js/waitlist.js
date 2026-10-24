/**
 * Loqelo Stage 05 — audience cards, 2 preview signup forms, launch countdown.
 * Plain ES6+ JavaScript, kept separate from all approved earlier stage code.
 *
 * IMPORTANT: In this stage no waitlist service is configured. A visually valid
 * form never falsely claims to have stored a contact. Supply a secure approved
 * HTTPS POST endpoint via the per-form `data-endpoint` to enable real submissions.
 * Endpoint must implement consent logging, server-side validation, rate limits,
 * bot protection and safe persistence/export BEFORE production deployment.
 */
(() => {
  'use strict';
  const root = document.querySelector('.prelaunch');
  if (!root) return;

  const translations = {
    en: {
      forCustomers:'FOR CUSTOMERS', customerTitle:'Your place.\nYour time.', customerBody:'From everyday tasks to bigger projects, find trusted professionals and get it done, stress-free.', customerCTA:'Join as a Customer',
      forProviders:'FOR SERVICE PROVIDERS',providerTitle:'Grow your business.\nOn your terms.',providerBody:'Get new customers, showcase your skills, and grow your business with a platform built for professionals.',providerCTA:'Join as a Service Provider',
      waitlistEyebrow:'BE THE FIRST TO KNOW',waitlistTitle:'Join the Loqelo waitlist', waitlistBody:'Get launch updates and be among the first to know. Planned launch: February 2027.',
      customerFormTitle:"I'm a customer",customerFormSub:'Looking for trusted professionals.',providerFormTitle:"I'm a service provider",providerFormSub:'I offer professional services.',
      emailLabel:'Email address',customerCountryLabel:'Country of residence',providerCountryLabel:'Country where you provide services',selectCountry:'Select country',individual:'Individual',business:'Business',
      customerSubmit:'Join Customer Waitlist',providerSubmit:'Join Provider Waitlist',
      consent:"I agree to receive updates about Loqelo's launch and project news. I understand I can unsubscribe at any time.",privacyNote:'Your information will be used only for the waitlist and launch communications.',
      launchEyebrow:'LAUNCHING SOON',launchDescription:'A new way to get things done is on the way.',countdownDisclaimer:'Countdown to February 1; exact launch date to be announced.',days:'Days',hours:'Hours',minutes:'Minutes',seconds:'Seconds',
      consentError:'Please agree to receive launch updates before joining.',previewOnly:'Local preview: open this page through the configured PHP website to submit.',sending:'Submitting securely…',networkError:'Submission failed. Please try again later.',submitted:'Thank you! Your interest has been recorded on the Loqelo waitlist.'
    },
    de: {forCustomers:'FÜR KUNDEN',customerTitle:'Ihr Zuhause.\nIhre Zeit.',customerBody:'Vom Alltag bis zu größeren Projekten: Finden Sie passende Dienstleister.',customerCTA:'Als Kunde vormerken',forProviders:'FÜR ANBIETER',providerTitle:'Geschäft ausbauen.\nNach Ihren Regeln.',providerBody:'Erreichen Sie neue Kunden und präsentieren Sie Ihre Leistungen.',providerCTA:'Als Anbieter vormerken',waitlistEyebrow:'ALS ERSTE INFORMIERT',waitlistTitle:'Auf die Loqelo-Warteliste',waitlistBody:'Erhalten Sie Neuigkeiten zum geplanten Start im Februar 2027.',customerFormTitle:'Ich bin Kunde',customerFormSub:'Ich suche Dienstleister.',providerFormTitle:'Ich biete Dienstleistungen an',providerFormSub:'Für professionelle Anbieter.',emailLabel:'E-Mail-Adresse',customerCountryLabel:'Wohnsitzland',providerCountryLabel:'Land der Dienstleistung',selectCountry:'Land auswählen',individual:'Privatperson',business:'Unternehmen',customerSubmit:'Kundenwarteliste',providerSubmit:'Anbieterwarteliste',consent:'Ich möchte Informationen zum Start von Loqelo erhalten. Ich kann mich jederzeit abmelden.',privacyNote:'Daten werden nur für Warteliste und Startnachrichten verwendet.',launchEyebrow:'START IN KÜRZE',launchDescription:'Eine neue Art, Aufgaben zu erledigen.',countdownDisclaimer:'Countdown zum 1. Februar; genaues Startdatum noch offen.',days:'Tage',hours:'Stunden',minutes:'Minuten',seconds:'Sekunden',consentError:'Bitte stimmen Sie den Startnachrichten zu.',previewOnly:'Nur Vorschau – Daten wurden nicht gespeichert.',sending:'Wird gesendet…',networkError:'Übermittlung fehlgeschlagen.',submitted:'Vielen Dank! Ihre Anmeldung wurde gespeichert.'},
    fr: {forCustomers:'POUR LES CLIENTS',customerTitle:'Votre espace.\nVotre temps.',customerBody:'Des tâches quotidiennes aux grands projets, trouvez les bons professionnels.',customerCTA:'Rejoindre comme client',forProviders:'POUR LES PRESTATAIRES',providerTitle:'Développez votre activité.\nÀ votre rythme.',providerBody:'Présentez vos compétences et trouvez de nouveaux clients.',providerCTA:'Rejoindre comme prestataire',waitlistEyebrow:'SOYEZ LES PREMIERS',waitlistTitle:'Rejoignez la liste Loqelo',waitlistBody:'Recevez des informations avant le lancement prévu en février 2027.',customerFormTitle:'Je suis client',customerFormSub:'Je cherche des professionnels.',providerFormTitle:'Je suis prestataire',providerFormSub:'Je propose des services.',emailLabel:'Adresse e-mail',customerCountryLabel:'Pays de résidence',providerCountryLabel:'Pays d’activité',selectCountry:'Choisissez un pays',individual:'Particulier',business:'Entreprise',customerSubmit:'Liste clients',providerSubmit:'Liste prestataires',consent:'J’accepte de recevoir des nouvelles du lancement de Loqelo. Désinscription possible.',privacyNote:'Vos données servent uniquement à la liste d’attente.',launchEyebrow:'BIENTÔT DISPONIBLE',launchDescription:'Une nouvelle façon de tout organiser.',countdownDisclaimer:'Compte à rebours jusqu’au 1er février ; date exacte à confirmer.',days:'Jours',hours:'Heures',minutes:'Minutes',seconds:'Secondes',consentError:'Veuillez accepter les mises à jour.',previewOnly:'Aperçu uniquement — aucune donnée enregistrée.',sending:'Envoi…',networkError:'Échec de l’envoi.',submitted:'Merci ! Votre inscription est enregistrée.'},
    pl: {forCustomers:'DLA KLIENTÓW',customerTitle:'Twoje miejsce.\nTwój czas.',customerBody:'Od codziennych spraw po duże projekty — znajdź właściwych fachowców.',customerCTA:'Dołącz jako klient',forProviders:'DLA WYKONAWCÓW',providerTitle:'Rozwijaj firmę.\nNa swoich zasadach.',providerBody:'Pozyskuj nowych klientów i prezentuj swoje usługi.',providerCTA:'Dołącz jako wykonawca',waitlistEyebrow:'DOWIEDZ SIĘ PIERWSZY',waitlistTitle:'Dołącz do listy Loqelo',waitlistBody:'Otrzymuj informacje przed planowanym startem w lutym 2027.',customerFormTitle:'Jestem klientem',customerFormSub:'Szukam specjalistów.',providerFormTitle:'Jestem wykonawcą',providerFormSub:'Świadczę profesjonalne usługi.',emailLabel:'E-mail',customerCountryLabel:'Kraj zamieszkania',providerCountryLabel:'Kraj świadczenia usług',selectCountry:'Wybierz kraj',individual:'Osoba prywatna',business:'Firma',customerSubmit:'Lista klientów',providerSubmit:'Lista wykonawców',consent:'Zgadzam się na wiadomości o starcie Loqelo. Mogę zrezygnować w każdej chwili.',privacyNote:'Dane są używane wyłącznie do listy oczekujących.',launchEyebrow:'JUŻ WKRÓTCE',launchDescription:'Nowy sposób załatwiania spraw.',countdownDisclaimer:'Do początku lutego; dokładna data startu nie jest jeszcze znana.',days:'Dni',hours:'Godz.',minutes:'Min.',seconds:'Sek.',consentError:'Zaznacz zgodę na aktualności.',previewOnly:'Podgląd — dane nie zostały zapisane.',sending:'Wysyłanie…',networkError:'Błąd wysyłania.',submitted:'Dziękujemy! Zapisano zgłoszenie na listę.'}
  };
  const countrySelects = [...root.querySelectorAll('.signup-card select[name="country"]')];
  const languageControl = document.querySelector('#language');
  let language = 'en';
  const translator = lang => translations[lang] || translations.en;

  /** Stage 05 localizations have their own selector so original JS is stable. */
  function localize() {
    language = languageControl?.value || 'en';
    const strings = translator(language);
    document.querySelectorAll('[data-stage05-i18n]').forEach(element => {
      const message = strings[element.dataset.stage05I18n];
      if (!message) return;
      // Headers support intentional line breaks only, not arbitrary HTML.
      if (element.classList.contains('audience-card__title')) {
        element.replaceChildren();
        message.split('\n').forEach((line,index) => {
          if (index) element.append(document.createElement('br'));
          element.append(document.createTextNode(line));
        });
      } else element.textContent = message;
    });
    // Native ICU country names where supported; the ISO codes remain unchanged.
    if (typeof Intl.DisplayNames === 'function') {
      try {
        const names = new Intl.DisplayNames([language], {type:'region'});
        countrySelects.forEach(select => {
          [...select.options].slice(1).forEach(option => {
            const translated = names.of(option.value);
            if (translated && translated !== option.value) option.textContent = translated;
          });
        });
      } catch (_) { /* The bundled ISO country names stay usable. */ }
    }
  }
  languageControl?.addEventListener('change',localize);
  localize();

  // The cards scroll to the appropriate editable signup form, not a mock login.
  document.querySelectorAll('[data-jump-to]').forEach(button => {
    button.addEventListener('click', () => {
      const role = button.dataset.jumpTo;
      const target = document.querySelector(`#${role}-signup`);
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target?.scrollIntoView({behavior: reduced?'instant':'smooth', block:'center'});
      if (target) window.setTimeout(() => target.querySelector('input[type="email"]')?.focus({preventScroll:true}), reduced?0:450);
    });
  });

  /** Contact-list storage is always conditional on a configured backend. */
  const consent = document.querySelector('#waitlist-marketing-consent');
  root.querySelectorAll('[data-signup-role]').forEach(form => {
    form.addEventListener('submit', async event => {
      event.preventDefault();
      const messages = translator(language);
      const output = form.querySelector('.signup-card__result');
      output.hidden = false;
      if (!consent.checked) {
        output.textContent = messages.consentError;
        consent.focus();
        return;
      }
      const endpoint = form.dataset.endpoint?.trim();
      if (!endpoint) {
        output.textContent = messages.previewOnly;
        return;
      }
      // For production use ONLY an approved HTTPS endpoint.
      if (!endpoint.startsWith('/api/') && !/^https:\/\//i.test(endpoint)) {
        output.textContent = messages.networkError;
        return;
      }
      const submit = form.querySelector('[type="submit"]');
      const data = new FormData(form);
      let csrfToken = '';
      try { const tokenResponse = await fetch('/api/token.php', {credentials:'same-origin',cache:'no-store'}); const tokens = await tokenResponse.json(); csrfToken = tokens.csrfToken || ''; } catch (_) {}
      if (!csrfToken) { output.textContent = messages.previewOnly; return; }
      window.LoqeloAnalytics?.track('waitlist_form_submit', {role: form.dataset.signupRole});
      const payload = {
        csrfToken, website: String(data.get('website') || ''), language,
        role: form.dataset.signupRole,
        email: String(data.get('email') || '').trim(),
        country: String(data.get('country') || ''),
        accountType: String(data.get('accountType') || ''),
        marketingConsent: true,
        consentText: translator('en').consent,
        consentVersion: 'prelaunch-v1'
      };
      output.textContent = messages.sending;
      submit.disabled = true;
      try {
        const response = await fetch(endpoint, {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify(payload),
          cache:'no-store',
          credentials:'same-origin'
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok || result.success !== true) throw new Error('Submission not confirmed by backend');
        output.textContent = messages.submitted;
        if (result.created !== false) window.LoqeloAnalytics?.track('waitlist_signup', {role: form.dataset.signupRole});
        form.reset();
      } catch (_) { output.textContent = messages.networkError; }
      finally { submit.disabled = false; }
    });
  });

  // February 1 is NOT the official launch date: it is the start-of-month
  // boundary used solely for a decorative, accurately labeled countdown.
  const target = new Date(2027,1,1,0,0,0).getTime();
  const nodes = Object.fromEntries([...document.querySelectorAll('[data-countdown]')].map(node => [node.dataset.countdown,node]));
  function updateCountdown() {
    let remaining = Math.max(0, Math.floor((target - Date.now()) / 1000));
    const days = Math.floor(remaining/86400); remaining%=86400;
    const hours = Math.floor(remaining/3600); remaining%=3600;
    const minutes = Math.floor(remaining/60);
    const seconds = remaining%60;
    for (const [key,value] of Object.entries({days,hours,minutes,seconds})) {
      if (nodes[key]) nodes[key].textContent = String(value).padStart(2,'0');
    }
  }
  updateCountdown();
  // Updating while hidden is unnecessary, resume on tab visibility.
  window.setInterval(() => { if (!document.hidden) updateCountdown(); },1000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) updateCountdown(); });
})();
