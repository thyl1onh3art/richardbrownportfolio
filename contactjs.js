document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("contactForm");
    const status = document.getElementById("formStatus");

    if (!form || !status) {
        return;
    }

    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        const submitButton = form.querySelector(".submit_button");

        status.textContent = "Sending message...";
        status.className = "form_status form_status--sending";

        if (submitButton) {
            submitButton.disabled = true;
        }

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {

            const response = await fetch(form.action, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {

                status.textContent = "Thank you! Your message has been sent.";
                status.className = "form_status form_status--success";
                form.reset();

            } else {

                status.textContent = "Sorry, there was a problem sending your message.";
                status.className = "form_status form_status--error";

            }

        } catch (error) {

            status.textContent = "Network error. Please try again later.";
            status.className = "form_status form_status--error";

        } finally {

            if (submitButton) {
                submitButton.disabled = false;
            }

        }

    });

});
