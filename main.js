document.addEventListener("DOMContentLoaded", () => {
  // ✅ Hamburger Menu Toggle
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  console.log("✅ Script loaded");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      console.log("✅ Hamburger clicked");
      mobileMenu.classList.toggle('active');
    });

    // ✅ Auto-close on menu item click
    document.querySelectorAll('#mobileMenu a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
      });
    });
  }

  // ✅ Section and H1 Fade-In on Scroll
  const elements = document.querySelectorAll('section, h1');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        sectionObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  elements.forEach(el => sectionObserver.observe(el));

  // ✅ Scroll to Top Button and Progress Bar
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

  // ✅ Animated Counters
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const update = () => {
      const target = +counter.getAttribute('data-target');
      const current = +counter.innerText;
      const increment = target / 100;
      if (current < target) {
        counter.innerText = Math.min(Math.ceil(current + increment), target);
        setTimeout(update, 30);
      } else {
        counter.innerText = target;
      }
    };
    update();
  });

  // ✅ Title Typewriter Effect
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

  // ✅ Parallax Side Image
  const image = document.querySelector('.side-image-wrapper');
  window.addEventListener('scroll', () => {
    if (image) {
      image.style.transform = `translateY(${window.scrollY * 0.03}px)`;
    }
  });

  // ✅ Post Card Fade-In Animation
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

  // ✅ Contact Form Success Handling
  const form = document.querySelector(".contact-form");
  const successMessage = document.getElementById("successMessage");
  if (form && successMessage) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      form.reset();
      successMessage.classList.add("visible");
      setTimeout(() => {
        successMessage.classList.remove("visible");
      }, 4000);
    });
  }

  // ✅ Animate elements with [data-animate]
  const animateObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        animateObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('[data-animate]').forEach(card => {
    animateObserver.observe(card);
  });
});