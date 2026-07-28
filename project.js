document.addEventListener("DOMContentLoaded", () => {
    const lightbox = document.getElementById("evidenceLightbox");

    if (!lightbox) {
        return;
    }

    const lightboxImage = lightbox.querySelector(".lightbox-image");
    const lightboxCaption = lightbox.querySelector(".lightbox-caption");
    const closeTriggers = lightbox.querySelectorAll("[data-lightbox-close]");
    const zoomTriggers = document.querySelectorAll("[data-lightbox-src]");

    if (!lightboxImage || !lightboxCaption || zoomTriggers.length === 0) {
        return;
    }

    let lastFocusedElement = null;

    function openLightbox(trigger) {
        const src = trigger.dataset.lightboxSrc;
        const caption =
            trigger.dataset.lightboxCaption ||
            trigger.querySelector("img")?.alt ||
            "Evidence screenshot";

        lastFocusedElement = trigger;
        lightboxImage.src = src;
        lightboxImage.alt = caption;
        lightboxCaption.textContent = caption;
        lightbox.hidden = false;
        document.body.classList.add("lightbox-open");
        lightbox.querySelector(".lightbox-close")?.focus();
    }

    function closeLightbox() {
        lightbox.hidden = true;
        lightboxImage.removeAttribute("src");
        lightboxImage.alt = "";
        lightboxCaption.textContent = "";
        document.body.classList.remove("lightbox-open");

        if (lastFocusedElement instanceof HTMLElement) {
            lastFocusedElement.focus();
        }
    }

    zoomTriggers.forEach((trigger) => {
        trigger.addEventListener("click", () => openLightbox(trigger));
    });

    closeTriggers.forEach((trigger) => {
        trigger.addEventListener("click", closeLightbox);
    });

    lightbox.addEventListener("click", (event) => {
        if (event.target.classList.contains("lightbox-backdrop")) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !lightbox.hidden) {
            closeLightbox();
        }
    });
});
