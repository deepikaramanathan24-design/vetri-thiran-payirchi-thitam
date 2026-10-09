async function postJSON(url, data) {
    const response = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });

    return await response.json();
}


const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const data = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        };

        try {
            const result = await postJSON("/register", data);

            document.getElementById("message").textContent =
                result.message || "Registration completed";

            if (result.success) {
                setTimeout(() => {
                    window.location.href = "/login";
                }, 800);
            }
        } catch (error) {
            document.getElementById("message").textContent =
                "Registration failed.";
        }
    });
}


const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        try {
            const result = await postJSON("/login", {
                email: document.getElementById("email").value,
                password: document.getElementById("password").value
            });

            document.getElementById("message").textContent =
                result.message || "Login failed.";

            if (result.success) {
                localStorage.setItem("user_id", result.user_id);

                window.location.href =
                    "/dashboard?user_id=" + result.user_id;
            }
        } catch (error) {
            console.error(error);

            document.getElementById("message").textContent =
                "Login failed. Please try again.";
        }
    });
}


const resetForm = document.getElementById("resetForm");

if (resetForm) {
    resetForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        try {
            const result = await postJSON("/reset-password", {
                email: document.getElementById("email").value,
                new_password: document.getElementById("new_password").value
            });

            document.getElementById("message").textContent =
                result.message || "Password reset completed.";

            if (result.success) {
                setTimeout(() => {
                    window.location.href = "/login";
                }, 800);
            }
        } catch (error) {
            document.getElementById("message").textContent =
                "Password reset failed.";
        }
    });
}