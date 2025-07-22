document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });
  }

  const elements = document.querySelectorAll('section, h1');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  elements.forEach(el => observer.observe(el));

  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
      const scroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progressBar = document.getElementById('progress-bar');
      if (progressBar) {
        progressBar.style.width = (scroll / height) * 100 + '%';
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const update = () => {
      const target = +counter.getAttribute('data-target');
      const current = +counter.innerText;
      const increment = target / 100;
      if (current < target) {
        counter.innerText = Math.ceil(current + increment);
        setTimeout(update, 30);
      } else {
        counter.innerText = target;
      }
    };
    update();
  });

  const title = document.getElementById('page-title');
  if (title) {
    const text = title.innerText;
    title.innerText = '';
    let index = 0;
    function typeWriter() {
      if (index < text.length) {
        title.innerText += text.charAt(index);
        index++;
        setTimeout(typeWriter, 40);
      } else {
        title.classList.add('visible');
      }
    }
    typeWriter();
  }

  const image = document.querySelector('.side-image-wrapper');
  window.addEventListener('scroll', () => {
    if (image) {
      image.style.transform = `translateY(${window.scrollY * 0.03}px)`;
    }
  });

  const cards = document.querySelectorAll(".post-card");
  const cardObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          cardObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  cards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
    cardObserver.observe(card);
  });
});
