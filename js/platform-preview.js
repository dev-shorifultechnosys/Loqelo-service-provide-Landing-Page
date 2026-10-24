/** Loqelo Stage 06 • Platform screenshots & sample story carousel.
 *  Vanilla ES6+, no CDNs, no external frameworks or inline script.
 *  Stage 01–05 JavaScript intentionally unchanged.
 */
(() => {
  'use strict';
  const modal=document.getElementById('platform-modal');
  if(!modal) return;
  const image=modal.querySelector('[data-preview-image]');
  const title=modal.querySelector('[data-preview-title]');
  const counter=modal.querySelector('[data-preview-counter]');
  const gallery=[
    {id:'find',title:'Find services',file:'find-full.webp'},
    {id:'compare',title:'Compare offers',file:'compare-full.webp'},
    {id:'manage',title:'Manage requests',file:'manage-full.webp'},
    {id:'provider',title:'Provider dashboard',file:'provider-full.webp'},
    {id:'mobile-home',title:'Mobile experience',file:'mobile-home-full.webp'},
    {id:'mobile-quotes',title:'Mobile offers',file:'mobile-quotes-full.webp'}
  ];
  let index=0;
  let opener=null;

  function render(){
    const item=gallery[index];
    image.src='assets/images/platform/'+item.file;
    image.alt='Original Loqelo '+item.title+' Figma UI preview';
    title.textContent=item.title;
    counter.textContent=String(index+1).padStart(2,'0')+' / '+String(gallery.length).padStart(2,'0');
    modal.querySelector('.preview-modal__photo').scrollTop=0;
  }
  function open(id,button){
    opener=button;
    index=Math.max(0,gallery.findIndex(item=>item.id===id));
    render();modal.showModal();
  }
  function step(direction){index=(index+direction+gallery.length)%gallery.length;render();}
  document.querySelectorAll('[data-preview-open]').forEach(button=>button.addEventListener('click',()=>open(button.dataset.previewOpen,button)));
  modal.querySelector('[data-preview-close]').addEventListener('click',()=>modal.close());
  modal.querySelector('[data-preview-prev]').addEventListener('click',()=>step(-1));
  modal.querySelector('[data-preview-next]').addEventListener('click',()=>step(1));
  modal.addEventListener('click',event=>{if(event.target===modal)modal.close();});
  modal.addEventListener('keydown',event=>{
    if(event.key==='ArrowLeft'){event.preventDefault();step(-1);}
    if(event.key==='ArrowRight'){event.preventDefault();step(1);}
  });
  modal.addEventListener('close',()=>opener?.focus());

  // Carousel describes use cases, not actual customer endorsements.
  const track=document.querySelector('[data-story-track]');
  if(track){
    const advance=(dir)=>track.scrollBy({left:dir * (track.querySelector('.story-tile')?.getBoundingClientRect().width || 280)+dir*13,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
    document.querySelector('[data-stories-prev]')?.addEventListener('click',()=>advance(-1));
    document.querySelector('[data-stories-next]')?.addEventListener('click',()=>advance(1));
  }

  // Local section copy follows existing header language switch. UI screenshots
  // remain original client English designs, as provided.
  const translations={
    en:{whyLabel:'WHY CHOOSE LOQELO',whyHeading:'A better way to manage your space.',previewLabel:'PLATFORM PREVIEW',previewHeading:'A look inside Loqelo',previewText:'A modern, easy-to-use platform for customers and service providers.',moreShots:'See more screenshots',storyLabel:'WHO LOQELO IS FOR',storyHeading:'Designed for everyday needs',useHome:'Describe what needs doing, compare offers and find a suitable provider.',useProvider:'Showcase your services and discover relevant local enquiries.',useBusiness:'Organise home, garden and office service needs in one place.',roleHome:'For homeowners',roleProvider:'For service providers',roleBusiness:'For busy teams',descHome:'Home service needs',descProvider:'Service opportunities',descBusiness:'Workplace services',homeLabel:'HOME',providerLabel:'PROVIDER',businessLabel:'BUSINESS'},
    de:{whyLabel:'WARUM LOQELO',whyHeading:'Eine einfachere Art, Ihren Alltag zu organisieren.',previewLabel:'PLATTFORMVORSCHAU',previewHeading:'Loqelo im Überblick',previewText:'Eine moderne Plattform für Kunden und Dienstleister.',moreShots:'Weitere Screenshots',storyLabel:'FÜR WEN LOQELO IST',storyHeading:'Für alltägliche Aufgaben gemacht',useHome:'Beschreiben Sie Ihren Bedarf, vergleichen Sie Angebote und finden Sie passende Hilfe.',useProvider:'Zeigen Sie Ihre Leistungen und entdecken Sie passende Anfragen.',useBusiness:'Organisieren Sie Dienste für Haus, Garten und Büro an einem Ort.',roleHome:'Für Privathaushalte',roleProvider:'Für Dienstleister',roleBusiness:'Für Teams',descHome:'Dienste zu Hause',descProvider:'Neue Möglichkeiten',descBusiness:'Büroservice',homeLabel:'ZUHAUSE',providerLabel:'ANBIETER',businessLabel:'BETRIEB'},
    fr:{whyLabel:'POURQUOI LOQELO',whyHeading:'Une façon plus simple de gérer votre espace.',previewLabel:'APERÇU DE LA PLATEFORME',previewHeading:'Découvrez Loqelo',previewText:'Une plateforme moderne pour clients et prestataires.',moreShots:'Voir les écrans',storyLabel:'POUR QUI EST LOQELO',storyHeading:'Pensé pour vos besoins quotidiens',useHome:'Décrivez votre besoin, comparez les offres et trouvez un prestataire adapté.',useProvider:'Présentez vos services et découvrez des demandes locales pertinentes.',useBusiness:'Regroupez les besoins de la maison, du jardin et du bureau.',roleHome:'Pour les particuliers',roleProvider:'Pour les prestataires',roleBusiness:'Pour les équipes',descHome:'Services à domicile',descProvider:'Nouvelles opportunités',descBusiness:'Services de bureau',homeLabel:'MAISON',providerLabel:'PRESTATAIRE',businessLabel:'ENTREPRISE'},
    pl:{whyLabel:'DLACZEGO LOQELO',whyHeading:'Łatwiejszy sposób na dbanie o swoją przestrzeń.',previewLabel:'PODGLĄD PLATFORMY',previewHeading:'Zobacz Loqelo',previewText:'Nowoczesna platforma dla klientów i wykonawców.',moreShots:'Zobacz ekrany',storyLabel:'DLA KOGO JEST LOQELO',storyHeading:'Stworzone do codziennych potrzeb',useHome:'Opisz potrzebę, porównaj oferty i znajdź odpowiedniego wykonawcę.',useProvider:'Pokaż swoje usługi i odkrywaj lokalne zapytania.',useBusiness:'Zorganizuj usługi dla domu, ogrodu i biura w jednym miejscu.',roleHome:'Dla właścicieli domów',roleProvider:'Dla wykonawców',roleBusiness:'Dla zespołów',descHome:'Usługi domowe',descProvider:'Nowe możliwości',descBusiness:'Usługi biurowe',homeLabel:'DOM',providerLabel:'WYKONAWCA',businessLabel:'FIRMA'}
  };
  const languagePicker=document.getElementById('language');
  function translate(){
    const lang=translations[languagePicker?.value] || translations.en;
    document.querySelectorAll('[data-platform-i18n]').forEach(el=>{const value=lang[el.dataset.platformI18n];if(value)el.textContent=value;});
  }
  languagePicker?.addEventListener('change',translate);
  translate();
})();
