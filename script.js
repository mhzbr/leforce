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

/* HOME BANNER CAROUSEL */

const bannerSlides = document.querySelectorAll(".home-banner-slide");
const bannerDots = document.querySelectorAll(".home-banner-dots button");
const bannerPrev = document.querySelector(".home-banner-arrow.prev");
const bannerNext = document.querySelector(".home-banner-arrow.next");
let bannerIndex = 0;
let bannerTimer;

function showBanner(index) {
  if (!bannerSlides.length) return;

  bannerIndex = (index + bannerSlides.length) % bannerSlides.length;

  bannerSlides.forEach((slide, i) => {
    slide.classList.toggle("active", i === bannerIndex);
  });

  bannerDots.forEach((dot, i) => {
    dot.classList.toggle("active", i === bannerIndex);
  });
}

function startBannerAutoplay() {
  clearInterval(bannerTimer);
  bannerTimer = setInterval(() => {
    showBanner(bannerIndex + 1);
  }, 6500);
}

if (bannerSlides.length) {
  bannerPrev?.addEventListener("click", () => {
    showBanner(bannerIndex - 1);
    startBannerAutoplay();
  });

  bannerNext?.addEventListener("click", () => {
    showBanner(bannerIndex + 1);
    startBannerAutoplay();
  });

  bannerDots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      showBanner(i);
      startBannerAutoplay();
    });
  });

  showBanner(0);
  startBannerAutoplay();
}
