const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  navLinks.classList.toggle('open', !open);
});

navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

document.getElementById('quote-form').addEventListener('submit', event => {
  event.preventDefault();
  const property = document.getElementById('property').value;
  const scope = document.getElementById('scope').value;
  const name = document.getElementById('name').value.trim();
  const details = document.getElementById('details').value.trim();
  const message = `Hi A&J Painting, I'm ${name}. I'd like a free quotation.\n\nProperty: ${property}\nScope: ${scope}\nDetails: ${details || 'I will share more details in chat.'}`;
  window.open(`https://wa.me/6593821820?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
});

document.getElementById('year').textContent = new Date().getFullYear();
