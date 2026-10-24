/**
 * Loqelo / Stage 04 — Service Categories
 * --------------------------------------
 * Uses only browser APIs. Existing hero, video and form behaviour is
 * preserved. All nine supported concept categories are shown immediately, plus
 * an enquiry card. This is still a pre-launch preview, not live booking.
 */
(() => {
  'use strict';

  const languageSelect = document.getElementById('language');

  const messages = {
    en: {
      eyebrow: 'EXPLORE OUR SERVICES', heading: 'Popular categories',
      viewAll: 'View all categories', viewLess: 'View fewer categories',
      homeTitle: 'Home', homeDescription: 'Cleaning, repairs & more',
      gardenTitle: 'Garden', gardenDescription: 'Landscaping, mowing & care',
      officeTitle: 'Office', officeDescription: 'Cleaning, maintenance & fit-outs',
      installationsTitle: 'Installations', installationsDescription: 'Electrical, plumbing & more',
      petsTitle: 'Pets', petsDescription: 'Pet care & services',
      vehiclesTitle: 'Vehicles', vehiclesDescription: 'Cleaning, detailing & repairs',
      constructionTitle: 'Construction', constructionDescription: 'Building & renovation',
      careTitle: 'Personal care', careDescription: 'Support & personal services',
      movingTitle: 'Moving & transport', movingDescription: 'Moving, delivery & transport',
      otherTitle: 'Other services', otherDescription: 'Tell us what you need'
    },
    de: {
      eyebrow: 'UNSERE DIENSTLEISTUNGEN', heading: 'Beliebte Kategorien',
      viewAll: 'Alle Kategorien anzeigen', viewLess: 'Weniger Kategorien',
      homeTitle: 'Zuhause', homeDescription: 'Reinigung, Reparaturen & mehr',
      gardenTitle: 'Garten', gardenDescription: 'Landschaftsbau, Mähen & Pflege',
      officeTitle: 'Büro', officeDescription: 'Reinigung, Wartung & Ausbau',
      installationsTitle: 'Installationen', installationsDescription: 'Elektrik, Sanitär & mehr',
      petsTitle: 'Haustiere', petsDescription: 'Pflege & Dienstleistungen',
      vehiclesTitle: 'Fahrzeuge', vehiclesDescription: 'Reinigung, Pflege & Reparatur',
      constructionTitle: 'Bau', constructionDescription: 'Bauen & Renovieren',
      careTitle: 'Betreuung', careDescription: 'Unterstützung & persönliche Dienste',
      movingTitle: 'Umzug & Transport', movingDescription: 'Umzug, Lieferung & Transport',
      otherTitle: 'Weitere Dienste', otherDescription: 'Sagen Sie uns, was Sie brauchen'
    },
    fr: {
      eyebrow: 'NOS SERVICES', heading: 'Catégories populaires',
      viewAll: 'Toutes les catégories', viewLess: 'Voir moins de catégories',
      homeTitle: 'Maison', homeDescription: 'Nettoyage, réparations & plus',
      gardenTitle: 'Jardin', gardenDescription: 'Paysagisme, tonte & entretien',
      officeTitle: 'Bureau', officeDescription: 'Nettoyage, entretien & travaux',
      installationsTitle: 'Installations', installationsDescription: 'Électricité, plomberie & plus',
      petsTitle: 'Animaux', petsDescription: 'Soins & services',
      vehiclesTitle: 'Véhicules', vehiclesDescription: 'Lavage, entretien & réparations',
      constructionTitle: 'Construction', constructionDescription: 'Construction & rénovation',
      careTitle: 'Aide personnelle', careDescription: 'Aide & services individuels',
      movingTitle: 'Déménagement', movingDescription: 'Livraison & transport',
      otherTitle: 'Autres services', otherDescription: 'Décrivez votre besoin'
    },
    pl: {
      eyebrow: 'NASZE USŁUGI', heading: 'Popularne kategorie',
      viewAll: 'Zobacz wszystkie kategorie', viewLess: 'Pokaż mniej kategorii',
      homeTitle: 'Dom', homeDescription: 'Sprzątanie, naprawy i więcej',
      gardenTitle: 'Ogród', gardenDescription: 'Prace ogrodnicze i pielęgnacja',
      officeTitle: 'Biuro', officeDescription: 'Sprzątanie, konserwacja i remonty',
      installationsTitle: 'Instalacje', installationsDescription: 'Elektryka, hydraulika i więcej',
      petsTitle: 'Zwierzęta', petsDescription: 'Opieka i usługi',
      vehiclesTitle: 'Pojazdy', vehiclesDescription: 'Mycie, pielęgnacja i naprawy',
      constructionTitle: 'Budownictwo', constructionDescription: 'Budowa i remonty',
      careTitle: 'Opieka osobista', careDescription: 'Pomoc i usługi osobiste',
      movingTitle: 'Przeprowadzki', movingDescription: 'Dostawy i transport',
      otherTitle: 'Inne usługi', otherDescription: 'Opisz, czego potrzebujesz'
    }
  };

  function translateCategories() {
    const language = languageSelect?.value || 'en';
    const dictionary = messages[language] || messages.en;
    document.querySelectorAll('[data-category-i18n]').forEach(element => {
      const value = dictionary[element.dataset.categoryI18n];
      if (value) element.textContent = value;
    });
  }

  // Keep the existing language selector synchronized, without changing
  // the previous sections' translations or any original JS files.
  languageSelect?.addEventListener('change', () => { translateCategories(); syncToggleLabel(); });
  translateCategories();


  const toggleButton = document.querySelector('[data-categories-toggle]');
  const categoriesGrid = document.getElementById('services-grid');
  const categoryItems = categoriesGrid ? [...categoriesGrid.querySelectorAll('.categories__item')] : [];
  let expanded = false;

  function getVisibleCount() {
    const width = window.innerWidth;
    if (width >= 1100) return 5;
    if (width >= 700) return 3;
    return 2;
  }

  function syncToggleLabel() {
    if (!toggleButton) return;
    const language = languageSelect?.value || 'en';
    const dictionary = messages[language] || messages.en;
    const label = toggleButton.querySelector('[data-category-i18n="viewAll"]');
    if (label) label.textContent = expanded ? dictionary.viewLess : dictionary.viewAll;
    toggleButton.setAttribute('aria-expanded', String(expanded));
  }

  function renderCategoryRows() {
    if (!categoriesGrid || !categoryItems.length) return;
    const visibleCount = getVisibleCount();
    categoriesGrid.classList.toggle('is-expanded', expanded);
    categoryItems.forEach((item, index) => {
      const hide = !expanded && index >= visibleCount;
      item.classList.toggle('is-hidden', hide);
    });
    syncToggleLabel();
  }

  toggleButton?.addEventListener('click', () => {
    expanded = !expanded;
    renderCategoryRows();
  });

  window.addEventListener('resize', renderCategoryRows);
  renderCategoryRows();
})();
