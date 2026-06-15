document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("contactForm");
    const status = document.getElementById("formStatus");

    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        status.textContent = "Sending message...";

        const formData = new FormData(form);

        try {

            const response = await fetch(form.action, {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.ok) {

                status.textContent =
                    "Thank you! Your message has been sent.";

                form.reset();

            } else {

                status.textContent =
                    "Sorry, there was a problem sending your message.";

            }

        } catch (error) {

            status.textContent =
                "Network error. Please try again later.";

        }

    });


});