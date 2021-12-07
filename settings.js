
var li_active = document.querySelector('.active_li_blank');
var dots = document.querySelector('.dots');
var alldots = document.querySelectorAll('.dot');
var anchor = document.querySelectorAll('a');
var nav = document.querySelector('nav');
var ul = document.querySelector('ul');
dots.addEventListener('click', () => {
  nav.classList.toggle('nav_visible')
  ul.classList.toggle('ul_visible')
  alldots.forEach(adot => adot.classList.toggle('dot_after'));
  anchor.forEach(e => e.classList.toggle('a_visible'))
})
dots.addEventListener('click', () => {
  li_active.classList.toggle('active_li')
})


