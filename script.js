const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

const links = document.querySelectorAll('a[href^="#"]');

links.forEach((link) => {
  link.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.15,
  }
);

const animatedElements = document.querySelectorAll(
  ".section-header, .plan-card, .card, .unit-card, .modalidade, .news-card, .video-preview, .image-card"
);

animatedElements.forEach((el) => {
  el.classList.add("hidden");
  observer.observe(el);
});

const faqItems = document.querySelectorAll(".faq details");

faqItems.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (item.open) {
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.open = false;
        }
      });
    }
  });
});