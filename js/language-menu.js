/**
 * V9 language menu enhancement.
 * The original #language select remains the source of truth because existing
 * translation modules, geographic language hints and consent logic use it.
 * Every selection dispatches its normal change event, preserving all features.
 */
(() => {
  'use strict';
  const picker = document.querySelector('.language-picker');
  const select = picker?.querySelector('#language');
  if (!picker || !select || picker.querySelector('.language-picker__trigger')) return;

  const languages = [
    {code:'en', short:'EN', name:'English'},
    {code:'de', short:'DE', name:'Deutsch'},
    {code:'fr', short:'FR', name:'Français'},
    {code:'pl', short:'PL', name:'Polski'}
  ];
  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'language-picker__trigger';
  trigger.setAttribute('aria-label', 'Select website language');
  trigger.setAttribute('aria-haspopup','menu');
  trigger.setAttribute('aria-expanded','false');
  trigger.setAttribute('aria-controls','loqelo-language-menu');

  const current = document.createElement('span');
  current.className = 'language-picker__current';
  const chevron = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  chevron.setAttribute('viewBox', '0 0 24 24');
  chevron.setAttribute('aria-hidden','true');
  const line = document.createElementNS('http://www.w3.org/2000/svg','path');
  line.setAttribute('d','m6 9 6 6 6-6');
  chevron.appendChild(line);
  trigger.append(current,chevron);

  const menu = document.createElement('div');
  menu.id='loqelo-language-menu';
  menu.className='language-picker__menu';
  menu.setAttribute('role','menu');
  menu.setAttribute('aria-label','Website language');
  menu.hidden=true;

  const buttons = languages.map(language => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'language-picker__option';
    button.dataset.language = language.code;
    button.setAttribute('role','menuitemradio');
    button.setAttribute('aria-checked','false');
    button.tabIndex = -1;

    const short = document.createElement('span');
    short.className = 'language-picker__short';
    short.textContent = language.short;
    const name = document.createElement('span');
    name.className = 'language-picker__option-label';
    name.textContent=language.name;
    const check = document.createElementNS('http://www.w3.org/2000/svg','svg');
    check.classList.add('language-picker__check');
    check.setAttribute('viewBox','0 0 24 24');
    check.setAttribute('aria-hidden','true');
    check.setAttribute('fill','none');
    check.setAttribute('stroke','currentColor');
    check.setAttribute('stroke-width','2.2');
    const mark=document.createElementNS('http://www.w3.org/2000/svg','path');
    mark.setAttribute('d','m5 12 5 5 9-10');
    check.appendChild(mark);
    button.append(short,name,check);

    button.addEventListener('click',() => {
      // The native change event updates every existing language-aware section.
      select.value=language.code;
      select.dispatchEvent(new Event('change',{bubbles:true}));
      close();
      trigger.focus();
    });
    menu.appendChild(button);
    return button;
  });

  function selectedIndex() {
    const index=languages.findIndex(language => language.code===select.value);
    return index<0?0:index;
  }
  function sync() {
    current.textContent=languages[selectedIndex()].short;
    buttons.forEach((button,index) => {
      button.setAttribute('aria-checked',String(index===selectedIndex()));
    });
  }
  function close() {
    menu.hidden=true;
    trigger.setAttribute('aria-expanded','false');
  }
  function open() {
    sync();
    menu.hidden=false;
    trigger.setAttribute('aria-expanded','true');
    buttons[selectedIndex()].focus();
  }
  function moveFocus(delta) {
    const active=buttons.indexOf(document.activeElement);
    const next=(active+delta+buttons.length)%buttons.length;
    buttons[next].focus();
  }

  picker.append(trigger,menu);
  // Only hide the select once the accessible custom control exists.
  select.tabIndex=-1;
  select.setAttribute('aria-hidden','true');
  picker.classList.add('lang-enhanced');
  sync();
  select.addEventListener('change',sync);
  trigger.addEventListener('click',()=>menu.hidden?open():close());
  document.addEventListener('pointerdown',event => {
    if(!picker.contains(event.target))close();
  });
  picker.addEventListener('focusout',event => {
    if(!picker.contains(event.relatedTarget))close();
  });
  picker.addEventListener('keydown',event => {
    if(event.key==='Escape' && !menu.hidden) {
      event.preventDefault();close();trigger.focus();
    } else if(!menu.hidden && ['ArrowDown','ArrowUp','Home','End'].includes(event.key)) {
      event.preventDefault();
      if(event.key==='Home')buttons[0].focus();
      else if(event.key==='End')buttons[buttons.length-1].focus();
      else moveFocus(event.key==='ArrowDown'?1:-1);
    } else if(event.key==='ArrowDown' && menu.hidden && document.activeElement===trigger) {
      event.preventDefault();open();
    }
  });
})();
