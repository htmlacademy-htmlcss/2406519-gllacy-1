const pageElement = document.querySelector('.page');

document.querySelectorAll('.modal').forEach((modalElement) => {
  const { modal } = modalElement.dataset;
  const openerElement = document.querySelector(`[data-open="${modal}"]`);
  if (openerElement) {
    openerElement.addEventListener('click', () => {
      pageElement.inert = true;
      modalElement.classList.remove('hidden');
    });
  }
  modalElement.addEventListener('click', (event) => {
    if (event.target === modalElement || event.target.closest('.modal-close')) {
      pageElement.inert = false;
      modalElement.classList.add('hidden');
    }
  });
});
