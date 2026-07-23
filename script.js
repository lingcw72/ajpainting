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

document.querySelectorAll('[data-language]').forEach(link => {
  link.addEventListener('click', () => {
    try {
      localStorage.setItem('aj-language', link.dataset.language);
    } catch (error) {}
    if (location.hash && !link.hash) link.href += location.hash;
  });
});

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
  const isChinese = event.currentTarget.dataset.formLanguage === 'zh';
  const message = isChinese
    ? `您好 A&J 油漆，我是${name}。我想索取免费报价。\n\n物业类型：${property}\n工程范围：${scope}\n详情：${details || '我会在对话中提供更多资料。'}`
    : `Hi A&J Painting, I'm ${name}. I'd like a free quotation.\n\nProperty: ${property}\nScope: ${scope}\nDetails: ${details || 'I will share more details in chat.'}`;
  window.open(`https://wa.me/6593821820?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
});

document.getElementById('year').textContent = new Date().getFullYear();
