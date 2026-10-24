/**
 * Loqelo — Stage 08 pre-launch Help chat preview.
 * All messages and replies stay in the browser. No personal data is stored,
 * transmitted or collected. Connect a real chat provider before claiming live support.
 */
(() => {
  'use strict';
  const root = document.querySelector('[data-loqelo-chat]');
  if (!root) return;
  const panel = root.querySelector('#loqelo-chat-panel');
  const launcher = root.querySelector('[data-chat-toggle]');
  const close = root.querySelector('[data-chat-close]');
  const conversation = root.querySelector('[data-chat-conversation]');
  const form = root.querySelector('[data-chat-form]');
  const input = root.querySelector('[data-chat-input]');
  const language = document.querySelector('#language');
  const dictionary = {
    en: {
      header:'Loqelo Help',status:'Automated answers · preview',disclaimer:'This is an automated pre-launch preview. Messages are not sent to a live agent.',
      welcome:'Welcome! How can we help you learn about Loqelo?',launch:'Launch date',customer:'For customers',provider:'For providers',
      label:'Your question',placeholder:'Ask a question...',waitlist:'Join the waitlist ↗',launcher:'Chat with us',
      askLaunch:'When is Loqelo launching?',askCustomer:'How does Loqelo work for customers?',askProvider:'How can service providers join?',
      answerLaunch:'Loqelo is planning to launch in February 2027. The exact launch day has not been announced.',
      answerCustomer:'Customers will be able to describe a need, receive provider offers and choose a suitable professional. You can join the early-access waitlist now.',
      answerProvider:'Service providers can join the separate pre-launch waitlist by sharing an email address and their service country.',
      answerOther:'This chat is an automated website preview, not a live support inbox. For updates, use the customer or provider waitlist above.'
    },
    de: {
      header:'Loqelo Hilfe',status:'Automatische Antworten · Vorschau',disclaimer:'Dies ist eine automatische Vorschau. Nachrichten werden nicht an einen Mitarbeiter gesendet.',
      welcome:'Willkommen! Was möchten Sie über Loqelo wissen?',launch:'Starttermin',customer:'Für Kunden',provider:'Für Anbieter',
      label:'Ihre Frage',placeholder:'Frage stellen...',waitlist:'Zur Warteliste ↗',launcher:'Chat öffnen',
      askLaunch:'Wann startet Loqelo?',askCustomer:'Wie funktioniert Loqelo für Kunden?',askProvider:'Wie melden sich Anbieter an?',
      answerLaunch:'Loqelo plant den Start im Februar 2027. Ein genaues Datum wurde noch nicht angekündigt.',
      answerCustomer:'Kunden beschreiben ihren Bedarf, vergleichen Angebote und wählen einen Dienstleister. Die Warteliste ist verfügbar.',
      answerProvider:'Dienstleister können sich mit E-Mail-Adresse und Tätigkeitsland für die Warteliste vormerken lassen.',
      answerOther:'Dies ist eine automatische Vorschau und kein Live-Support. Informationen erhalten Sie über die Warteliste.'
    },
    fr: {
      header:'Aide Loqelo',status:'Réponses automatiques · aperçu',disclaimer:'Ceci est une démonstration automatique. Aucun message n’est envoyé à un conseiller.',
      welcome:'Bienvenue ! Que souhaitez-vous savoir sur Loqelo ?',launch:'Date de lancement',customer:'Pour les clients',provider:'Pour les prestataires',
      label:'Votre question',placeholder:'Posez une question...',waitlist:'Liste d’attente ↗',launcher:'Discuter avec nous',
      askLaunch:'Quand Loqelo sera-t-il lancé ?',askCustomer:'Comment fonctionne Loqelo pour les clients ?',askProvider:'Comment les prestataires s’inscrivent-ils ?',
      answerLaunch:'Le lancement de Loqelo est prévu en février 2027. La date exacte n’a pas encore été annoncée.',
      answerCustomer:'Les clients décriront leur besoin, compareront les offres et choisiront un professionnel. Inscrivez-vous sur la liste d’attente.',
      answerProvider:'Les prestataires peuvent rejoindre la liste d’attente en indiquant leur adresse e-mail et leur pays d’activité.',
      answerOther:'Il s’agit d’une démonstration, pas d’un service en direct. Consultez la liste d’attente pour les actualités.'
    },
    pl: {
      header:'Pomoc Loqelo',status:'Automatyczne odpowiedzi · podgląd',disclaimer:'To automatyczny podgląd. Wiadomości nie są wysyłane do konsultanta.',
      welcome:'Witamy! Co chcesz wiedzieć o Loqelo?',launch:'Data startu',customer:'Dla klientów',provider:'Dla wykonawców',
      label:'Twoje pytanie',placeholder:'Zadaj pytanie...',waitlist:'Lista oczekujących ↗',launcher:'Napisz do nas',
      askLaunch:'Kiedy wystartuje Loqelo?',askCustomer:'Jak Loqelo działa dla klientów?',askProvider:'Jak wykonawcy mogą dołączyć?',
      answerLaunch:'Planowany start Loqelo to luty 2027. Dokładna data nie została ogłoszona.',
      answerCustomer:'Klienci opiszą potrzebę, porównają oferty i wybiorą wykonawcę. Można już dołączyć do listy oczekujących.',
      answerProvider:'Wykonawcy mogą dołączyć do listy, podając e-mail i kraj działania.',
      answerOther:'To tylko automatyczny podgląd, a nie czat na żywo. Aktualności znajdziesz na liście oczekujących.'
    }
  };
  const tr = () => dictionary[language?.value] || dictionary.en;
  let open = false;
  function toggle(visible) {
    open = Boolean(visible);
    panel.hidden = !open;
    launcher.setAttribute('aria-expanded', String(open));
    launcher.setAttribute('aria-label', open ? 'Close Loqelo chat help' : 'Open Loqelo chat help');
    if (open) input.focus({preventScroll:true});
    else launcher.focus({preventScroll:true});
  }
  function bubble(text, kind) {
    const item = document.createElement('div');
    item.className = 'loqelo-chat__bubble loqelo-chat__bubble--' + kind;
    item.textContent = text;
    conversation.appendChild(item);
    conversation.scrollTop = conversation.scrollHeight;
  }
  function reply(category, userText) {
    const t = tr();
    bubble(userText, 'user');
    bubble(category === 'launch' ? t.answerLaunch : category === 'customer' ? t.answerCustomer : category === 'provider' ? t.answerProvider : t.answerOther, 'bot');
  }
  function classify(text) {
    const q = text.toLowerCase();
    if (/launch|start|date|february|februar|février|luty|কবে|লঞ্চ/.test(q)) return 'launch';
    if (/customer|home|garden|client|kunde|maison|klient|গ্রাহক/.test(q)) return 'customer';
    if (/provider|contractor|service pro|anbieter|prestataire|wykonawc|কন্ট্রাক্টর/.test(q)) return 'provider';
    return 'other';
  }
  launcher.addEventListener('click', () => toggle(!open));
  close.addEventListener('click', () => toggle(false));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && open) toggle(false); });
  root.querySelectorAll('[data-chat-question]').forEach(button => button.addEventListener('click', () => {
    const type = button.dataset.chatQuestion;
    reply(type, tr()['ask'+type[0].toUpperCase()+type.slice(1)]);
  }));
  form.addEventListener('submit', event => {
    event.preventDefault();
    const question = input.value.trim();
    if (!question) return;
    reply(classify(question), question);
    input.value = '';
    input.focus();
  });
  root.querySelector('[data-chat-waitlist]').addEventListener('click', () => {
    toggle(false);
    const target = document.querySelector('#waitlist');
    target?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'});
  });
  function translate() {
    const t = tr();
    root.querySelectorAll('[data-chat-i18n]').forEach(element => {
      const key = element.dataset.chatI18n;
      if (t[key]) element.textContent = t[key];
    });
    input.placeholder = t.placeholder;
  }
  language?.addEventListener('change', translate);
  translate();
})();
