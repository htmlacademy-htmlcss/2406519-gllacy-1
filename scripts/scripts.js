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

document.querySelectorAll('[data-slide]').forEach((sliderElement) => {
  const slideElements = sliderElement.querySelectorAll('[data-slides] li');
  const miniElements = sliderElement.querySelectorAll('[data-mini] li');
  const paginationElements = sliderElement.querySelectorAll('[data-pagination] button');
  const prevElement = sliderElement.querySelector('[data-prev]');
  const nextElement = sliderElement.querySelector('[data-next]');

  sliderElement.addEventListener('click', (event) => {
    const { to } = event.target.dataset;
    if (!to) {
      return;
    }
    const currentIndex = +to;
    sliderElement.dataset.slide = to;
    pageElement.dataset.color = to;
    slideElements.forEach((slideElement, i) => {
      if (i === currentIndex - 1) {
        slideElement.setAttribute('data-current', '');
        miniElements[i].setAttribute('data-current', '');
        paginationElements[i].setAttribute('data-current', '');
      } else {
        slideElement.removeAttribute('data-current');
        miniElements[i].removeAttribute('data-current');
        paginationElements[i].removeAttribute('data-current');
      }
    });
    if (currentIndex <= 1) {
      prevElement.dataset.to = slideElements.length;
    } else {
      prevElement.dataset.to = currentIndex - 1;
    }
    if (currentIndex >= slideElements.length) {
      nextElement.dataset.to = 1;
    } else {
      nextElement.dataset.to = currentIndex + 1;
    }
  });
});

const popoverOpenElements = document.querySelectorAll('.popover-open');
if (popoverOpenElements.length) {
  popoverOpenElements.forEach((popoverOpenElement) => {
    popoverOpenElement.addEventListener('click', (event) => {
      event.preventDefault();
      popoverOpenElements.forEach((element) => {
        if (element === event.currentTarget) {
          element.classList.toggle('popover-active');
        } else {
          element.classList.remove('popover-active');
        }
      });
    });
  });
  pageElement.addEventListener('click', (event) => {
    if (event.target.closest('.popover')) {
      return;
    }
    popoverOpenElements.forEach((element) => {
      element.classList.remove('popover-active');
    });
  });
}
