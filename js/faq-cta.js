/**
 * LOQELO / STAGE 07 — FAQ accordion and final customer/provider CTA
 * No dependencies. Changes only the Stage 07 markup.
 * Native <details> support keyboard and screen readers without scripting.
 * Language labels change with the existing site language selector.
 */
(() => {
  'use strict';
  const root = document.querySelector('.faq-finale');
  if (!root) return;

  const translations = {
    en:{faqEyebrow:'FREQUENTLY ASKED QUESTIONS',faqHeading:'Got questions?\nWe have answers.',faqIntro:'Everything you need to know about Loqelo and our upcoming launch.',allFAQs:'View all FAQs',lessFAQs:'Show fewer FAQs',q1:'What is Loqelo?',a1:'Loqelo is a planned marketplace connecting customers with service providers for home, garden and office needs. Customers will be able to describe a job, receive offers and choose a provider.',q2:'When will Loqelo launch?',a2:'Loqelo is planning to launch in February 2027. An exact launch date has not yet been announced. Join the waitlist for updates.',q3:'Is Loqelo available worldwide?',a3:'Loqelo is collecting pre-launch interest from multiple countries. The countries where services will be available at launch have not yet been confirmed.',q4:'How do I become a service provider?',a4:'Choose “Join as a Provider,” enter your email address and service country, and consent to launch updates. This joins the pre-launch interest list; platform registration will come later.',q5:'What services will I find?',a5:'Loqelo is being developed around home, garden and office needs, with additional service categories previewed in the platform designs. Final launch coverage may vary.',q6:'What details does the waitlist require?',a6:'An email address and country are required. You can optionally indicate whether you are signing up as an individual or a business. Consent to project updates is separate and required to subscribe.',ctaHeading:'Be part of something bigger.',ctaBody:'Join the waitlist and help us build a global marketplace for home, garden and office services.',ctaCustomer:'Join as a Customer',ctaProvider:'Join as a Provider'},
    de:{faqEyebrow:'HÄUFIG GESTELLTE FRAGEN',faqHeading:'Noch Fragen?\nWir haben Antworten.',faqIntro:'Alles zum geplanten Loqelo-Start.',allFAQs:'Alle Fragen anzeigen',lessFAQs:'Weniger Fragen',q1:'Was ist Loqelo?',a1:'Loqelo ist ein geplanter Marktplatz für Dienstleistungen rund um Haus, Garten und Büro. Kunden sollen ihre Anfrage beschreiben, Angebote erhalten und Anbieter auswählen können.',q2:'Wann startet Loqelo?',a2:'Der Start ist für Februar 2027 geplant. Ein genaues Datum wurde noch nicht bekannt gegeben.',q3:'Ist Loqelo weltweit verfügbar?',a3:'Wir sammeln Interesse aus mehreren Ländern. Welche Länder zum Start verfügbar sind, ist noch nicht bestätigt.',q4:'Wie werde ich Dienstleister?',a4:'Wählen Sie „Als Anbieter vormerken“, geben Sie E-Mail und Einsatzland an und stimmen Sie den Projekt-Updates zu. Die eigentliche Plattform-Registrierung folgt später.',q5:'Welche Dienstleistungen wird es geben?',a5:'Geplant sind Bereiche rund um Haus, Garten und Büro. Die Verfügbarkeit einzelner Kategorien kann je nach Land variieren.',q6:'Was benötigt die Warteliste?',a6:'E-Mail und Land sind erforderlich; Privatperson oder Firma ist optional. Eine gesonderte Einwilligung für Updates ist nötig.',ctaHeading:'Werden Sie Teil von etwas Großem.',ctaBody:'Tragen Sie sich in die Warteliste ein und begleiten Sie die Entwicklung von Loqelo.',ctaCustomer:'Als Kunde vormerken',ctaProvider:'Als Anbieter vormerken'},
    fr:{faqEyebrow:'QUESTIONS FRÉQUENTES',faqHeading:'Des questions ?\nNos réponses.',faqIntro:'Tout ce qu’il faut savoir sur le lancement de Loqelo.',allFAQs:'Voir toutes les FAQ',lessFAQs:'Afficher moins',q1:'Qu’est-ce que Loqelo ?',a1:'Loqelo est une place de marché en préparation reliant clients et prestataires de services pour la maison, le jardin et le bureau. Les clients pourront décrire un besoin, recevoir des offres et choisir.',q2:'Quand Loqelo sera-t-il lancé ?',a2:'Le lancement est prévu en février 2027. La date précise n’a pas encore été annoncée.',q3:'Loqelo sera-t-il disponible partout ?',a3:'Nous recueillons les inscriptions dans plusieurs pays. Les pays desservis au lancement ne sont pas encore confirmés.',q4:'Comment devenir prestataire ?',a4:'Choisissez la liste d’attente des prestataires, saisissez votre adresse e-mail et votre pays d’activité, puis acceptez les nouvelles du projet. L’inscription à la plateforme viendra ensuite.',q5:'Quels services sont prévus ?',a5:'Le projet concerne les besoins de la maison, du jardin et du bureau. La disponibilité dépendra du lancement.',q6:'Quelles données sont demandées ?',a6:'Une adresse e-mail et un pays sont requis. Le type de compte est facultatif, et le consentement aux nouvelles est demandé séparément.',ctaHeading:'Participez à quelque chose de plus grand.',ctaBody:'Rejoignez la liste d’attente et contribuez au lancement de Loqelo.',ctaCustomer:'Rejoindre comme client',ctaProvider:'Rejoindre comme prestataire'},
    pl:{faqEyebrow:'NAJCZĘŚCIEJ ZADAWANE PYTANIA',faqHeading:'Masz pytania?\nMamy odpowiedzi.',faqIntro:'Wszystko, co warto wiedzieć o nadchodzącym starcie Loqelo.',allFAQs:'Zobacz wszystkie pytania',lessFAQs:'Pokaż mniej',q1:'Czym jest Loqelo?',a1:'Loqelo to planowana platforma łącząca klientów z usługodawcami w zakresie domu, ogrodu i biura. Klient będzie mógł opisać potrzebę, otrzymać oferty i wybrać wykonawcę.',q2:'Kiedy wystartuje Loqelo?',a2:'Start jest planowany na luty 2027. Dokładna data nie została jeszcze podana.',q3:'Czy Loqelo będzie dostępne na całym świecie?',a3:'Zbieramy zgłoszenia z wielu krajów. Kraje objęte startem nie zostały jeszcze potwierdzone.',q4:'Jak zostać usługodawcą?',a4:'Wybierz listę dla wykonawców, podaj e-mail i kraj świadczenia usług oraz zgodę na wiadomości. Rejestracja w platformie nastąpi później.',q5:'Jakie usługi będą dostępne?',a5:'Projekt obejmuje potrzeby domu, ogrodu i biura. Zakres usług w dniu startu może być różny.',q6:'Jakie dane podać na liście?',a6:'Wymagany jest e-mail i kraj. Typ konta jest opcjonalny, a zgoda na wiadomości jest osobna.',ctaHeading:'Bądź częścią czegoś większego.',ctaBody:'Dołącz do listy oczekujących i pomóż nam tworzyć Loqelo.',ctaCustomer:'Dołącz jako klient',ctaProvider:'Dołącz jako wykonawca'}
  };
  const selector = document.querySelector('#language');
  const extra = root.querySelector('#faq-extra');
  const more = root.querySelector('[data-faq-more]');
  let expanded = false;

  function setLanguage(){
    const lang = selector?.value || 'en';
    const strings = translations[lang] || translations.en;
    root.querySelectorAll('[data-faq-i18n]').forEach(element=>{
      const key=element.dataset.faqI18n;
      const text = key==='allFAQs' && expanded ? strings.lessFAQs : strings[key];
      if (!text) return;
      if (key==='faqHeading') {
        element.replaceChildren();
        text.split('\n').forEach((line,i)=>{if(i)element.append(document.createElement('br'));element.append(document.createTextNode(line));});
      } else element.textContent=text;
    });
  }
  selector?.addEventListener('change', setLanguage);
  more?.addEventListener('click',()=>{
    expanded = !expanded;
    extra.hidden = !expanded;
    more.setAttribute('aria-expanded',String(expanded));
    if(!expanded) extra.querySelectorAll('details[open]').forEach(d=>d.open=false);
    setLanguage();
  });
  // Prevent opening more than one FAQ answer simultaneously.
  root.querySelectorAll('.faq-item').forEach(details=>{
    details.addEventListener('toggle',()=>{
      if(!details.open) return;
      root.querySelectorAll('.faq-item[open]').forEach(other=>{if(other!==details) other.open=false;});
    });
  });
  // CTA buttons carry data-jump-to, so the existing waitlist.js scrolling
  // behavior handles them without changing previously approved scripts.
  setLanguage();
})();
