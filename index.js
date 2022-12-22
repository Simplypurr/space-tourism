const menuBtn = document.querySelector('.mobile-nav-toggle');
const nav = document.querySelector('.primary-navigation');

menuBtn.addEventListener('click', () => {
  [menuBtn, nav].forEach(item => item.classList.toggle('active'));
})
