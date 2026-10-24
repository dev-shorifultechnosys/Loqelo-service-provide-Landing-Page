/* Contact deletion is intentional and asks for confirmation. No inline scripts. */
document.querySelectorAll('[data-admin-contact-form]').forEach(form => {
  form.addEventListener('click', event => {
    const control = event.target.closest('button[name="contact_action"]');
    if (!control) return;
    const label = control.value === 'delete' ? 'permanently delete' : 'unsubscribe';
    if (!window.confirm('Do you want to ' + label + ' this contact?')) event.preventDefault();
  });
});
