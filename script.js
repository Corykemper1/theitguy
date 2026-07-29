const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".primary-nav");
const serviceForm = document.querySelector("[data-service-form]");
const formStatus = document.querySelector("[data-form-status]");
const yearNode = document.querySelector("[data-year]");
const testimonialCarousel = document.querySelector("[data-testimonial-carousel]");
const projectCarousel = document.querySelector("[data-project-carousel]");

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

function closeMenu() {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
  navigation.style.height = "";
  document.body.classList.remove("menu-open");
}

function fitMenuToViewport() {
  if (!navigation?.classList.contains("is-open")) return;
  const top = navigation.getBoundingClientRect().top;
  navigation.style.height = `${Math.max(0, window.innerHeight - top)}px`;
}

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const willOpen = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(willOpen));
    navigation.classList.toggle("is-open", willOpen);
    document.body.classList.toggle("menu-open", willOpen);
    if (willOpen) {
      fitMenuToViewport();
    } else {
      navigation.style.height = "";
    }
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      closeMenu();
    } else {
      fitMenuToViewport();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      menuButton.focus();
    }
  });
}

if (testimonialCarousel) {
  const viewport = testimonialCarousel.querySelector("[data-testimonial-viewport]");
  const slides = Array.from(testimonialCarousel.querySelectorAll("[data-testimonial-slide]"));
  const previousButton = testimonialCarousel.querySelector("[data-testimonial-previous]");
  const nextButton = testimonialCarousel.querySelector("[data-testimonial-next]");
  const currentNode = testimonialCarousel.querySelector("[data-testimonial-current]");
  const totalNode = testimonialCarousel.querySelector("[data-testimonial-total]");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let currentIndex = 0;
  let autoRotateTimer;
  let scrollFrame;

  if (totalNode) {
    totalNode.textContent = String(slides.length);
  }

  function getSlideStep() {
    if (!slides[0]) return viewport.clientWidth;
    const styles = getComputedStyle(viewport.querySelector(".testimonial-carousel__track"));
    return slides[0].getBoundingClientRect().width + parseFloat(styles.columnGap || styles.gap || 0);
  }

  function updateTestimonialIndex() {
    const step = getSlideStep();
    currentIndex = step
      ? Math.min(slides.length - 1, Math.max(0, Math.round(viewport.scrollLeft / step)))
      : 0;

    if (currentNode) {
      currentNode.textContent = String(currentIndex + 1);
    }
  }

  function showTestimonial(index) {
    currentIndex = (index + slides.length) % slides.length;
    viewport.scrollTo({
      left: getSlideStep() * currentIndex,
      behavior: "smooth"
    });
  }

  function stopAutoRotate() {
    window.clearInterval(autoRotateTimer);
  }

  function startAutoRotate() {
    stopAutoRotate();
    if (!prefersReducedMotion.matches && !document.hidden) {
      autoRotateTimer = window.setInterval(() => showTestimonial(currentIndex + 1), 6000);
    }
  }

  function moveTestimonial(direction) {
    showTestimonial(currentIndex + direction);
    startAutoRotate();
  }

  previousButton.addEventListener("click", () => moveTestimonial(-1));
  nextButton.addEventListener("click", () => moveTestimonial(1));

  viewport.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      moveTestimonial(event.key === "ArrowLeft" ? -1 : 1);
    }
  });

  viewport.addEventListener(
    "scroll",
    () => {
      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(updateTestimonialIndex);
    },
    { passive: true }
  );

  testimonialCarousel.addEventListener("pointerenter", stopAutoRotate);
  testimonialCarousel.addEventListener("pointerleave", startAutoRotate);
  testimonialCarousel.addEventListener("focusin", stopAutoRotate);
  testimonialCarousel.addEventListener("focusout", startAutoRotate);
  testimonialCarousel.addEventListener("touchstart", stopAutoRotate, { passive: true });
  document.addEventListener("visibilitychange", startAutoRotate);
  prefersReducedMotion.addEventListener("change", startAutoRotate);
  window.addEventListener("resize", updateTestimonialIndex);

  updateTestimonialIndex();
  startAutoRotate();
}

if (projectCarousel) {
  const viewport = projectCarousel.querySelector("[data-carousel-viewport]");
  const slides = Array.from(projectCarousel.querySelectorAll("[data-carousel-slide]"));
  const previousButton = projectCarousel.querySelector("[data-carousel-previous]");
  const nextButton = projectCarousel.querySelector("[data-carousel-next]");
  const currentNode = projectCarousel.querySelector("[data-carousel-current]");
  const totalNode = projectCarousel.querySelector("[data-carousel-total]");
  let scrollFrame;

  if (totalNode) {
    totalNode.textContent = String(slides.length);
  }

  function getSlideStep() {
    if (!slides[0]) return viewport.clientWidth;
    const styles = getComputedStyle(viewport.querySelector(".project-carousel__track"));
    return slides[0].getBoundingClientRect().width + parseFloat(styles.columnGap || styles.gap || 0);
  }

  function getCurrentSlideIndex() {
    const step = getSlideStep();
    return step ? Math.min(slides.length - 1, Math.max(0, Math.round(viewport.scrollLeft / step))) : 0;
  }

  function updateCarousel() {
    const currentIndex = getCurrentSlideIndex();
    const maximumScroll = viewport.scrollWidth - viewport.clientWidth;

    if (currentNode) {
      currentNode.textContent = String(currentIndex + 1);
    }

    previousButton.disabled = viewport.scrollLeft <= 2;
    nextButton.disabled = viewport.scrollLeft >= maximumScroll - 2;
  }

  function moveCarousel(direction) {
    viewport.scrollBy({
      left: getSlideStep() * direction,
      behavior: "smooth"
    });
  }

  previousButton.addEventListener("click", () => moveCarousel(-1));
  nextButton.addEventListener("click", () => moveCarousel(1));

  viewport.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      moveCarousel(event.key === "ArrowLeft" ? -1 : 1);
    }
  });

  viewport.addEventListener(
    "scroll",
    () => {
      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(updateCarousel);
    },
    { passive: true }
  );

  window.addEventListener("resize", updateCarousel);
  updateCarousel();
}

if (serviceForm && formStatus) {
  serviceForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = serviceForm.querySelector("button[type='submit']");
    const submitText = submitButton.querySelector("span");
    const originalText = submitText.textContent;

    submitButton.disabled = true;
    submitText.textContent = "Sending request…";
    formStatus.textContent = "";
    formStatus.className = "form-status";

    try {
      const response = await fetch(serviceForm.action, {
        method: "POST",
        body: new FormData(serviceForm),
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        serviceForm.reset();
        formStatus.textContent = "Your request was sent. We’ll use these details to confirm the next step.";
        formStatus.classList.add("is-success");
        return;
      }

      if (response.status === 429) {
        throw new Error("Too many requests");
      }

      const result = await response.json().catch(() => null);
      const message = result?.errors?.map((item) => item.message).join(" ");
      throw new Error(message || "Unable to send");
    } catch (error) {
      formStatus.textContent =
        error.message === "Too many requests"
          ? "Please wait a moment and try again, or call/text (785) 230-8156."
          : "We couldn’t send the request. Please try again or call/text (785) 230-8156.";
      formStatus.classList.add("is-error");
    } finally {
      submitButton.disabled = false;
      submitText.textContent = originalText;
    }
  });
}
