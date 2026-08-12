const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".primary-nav");
const yearNode = document.querySelector("[data-year]");
const serviceForm = document.querySelector("[data-service-form]");
const formStatus = document.querySelector("[data-form-status]");
const projectCarousel = document.querySelector("[data-project-carousel]");

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

function closeMenu() {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const willOpen = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(willOpen));
    navigation.classList.toggle("is-open", willOpen);
    document.body.classList.toggle("menu-open", willOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) closeMenu();
  });
}

function setupProjectCarousel(root) {
  if (!root) return;

  const viewport = root.querySelector("[data-carousel-viewport]");
  const slides = [...root.querySelectorAll("[data-carousel-slide]")];
  const previousButton = root.querySelector("[data-carousel-previous]");
  const nextButton = root.querySelector("[data-carousel-next]");

  if (!viewport || slides.length < 2 || !previousButton || !nextButton) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let autoAdvance;
  let userIsInteracting = false;

  function stepSize() {
    return slides[1].offsetLeft - slides[0].offsetLeft;
  }

  function lastStart() {
    return Math.max(0, viewport.scrollWidth - viewport.clientWidth);
  }

  function move(direction) {
    const atBeginning = viewport.scrollLeft <= 3;
    const atEnd = viewport.scrollLeft >= lastStart() - 3;

    if (direction > 0 && atEnd) {
      viewport.scrollTo({ left: 0, behavior: reducedMotion ? "auto" : "smooth" });
      return;
    }

    if (direction < 0 && atBeginning) {
      viewport.scrollTo({ left: lastStart(), behavior: reducedMotion ? "auto" : "smooth" });
      return;
    }

    viewport.scrollBy({
      left: direction * stepSize(),
      behavior: reducedMotion ? "auto" : "smooth"
    });
  }

  function stopAutoAdvance() {
    window.clearInterval(autoAdvance);
  }

  function startAutoAdvance() {
    stopAutoAdvance();
    if (reducedMotion || userIsInteracting) return;
    autoAdvance = window.setInterval(() => move(1), 5600);
  }

  previousButton.addEventListener("click", () => {
    move(-1);
    startAutoAdvance();
  });

  nextButton.addEventListener("click", () => {
    move(1);
    startAutoAdvance();
  });

  viewport.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(-1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      move(1);
    }
  });

  ["pointerdown", "mouseenter", "focusin"].forEach((eventName) => {
    viewport.addEventListener(eventName, () => {
      userIsInteracting = true;
      stopAutoAdvance();
    });
  });

  ["pointerup", "mouseleave", "focusout"].forEach((eventName) => {
    viewport.addEventListener(eventName, () => {
      userIsInteracting = false;
      startAutoAdvance();
    });
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopAutoAdvance();
    else startAutoAdvance();
  });

  startAutoAdvance();
}

setupProjectCarousel(projectCarousel);

if (serviceForm && formStatus) {
  serviceForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = serviceForm.querySelector('button[type="submit"]');
    formStatus.classList.remove("is-error");
    formStatus.textContent = "Sending your request…";
    if (submitButton) submitButton.disabled = true;

    try {
      const response = await fetch(serviceForm.action, {
        method: "POST",
        body: new FormData(serviceForm),
        headers: { Accept: "application/json" }
      });

      if (!response.ok) throw new Error("Request failed");

      if (typeof gtag === "function") {
        gtag("event", "conversion", {
          send_to: "AW-18358813765/WWzoCIShzt8cEMWIlbJE"
        });
      }

      serviceForm.reset();
      formStatus.textContent = "Thank you. Your service request has been sent.";
    } catch {
      formStatus.classList.add("is-error");
      formStatus.textContent = "The request could not be sent. Please check your connection and try again.";
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  });
}
