const adminEmail = "admin@campusconnect.com";

const emailInput = document.getElementById("loginEmail");
const passwordInput = document.getElementById("loginPassword");
const loginMessage = document.getElementById("loginMessage");

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;

    const selectedRole = document.querySelector(
        'input[name="loginRole"]:checked'
    );

    if (!selectedRole) {
        showMessage("Please select Student or Admin.", "login-error");
        return;
    }

    const role = selectedRole.value;

    if (role === "admin") {
        if (email !== adminEmail || password !== "Admin123") {
            showMessage("Invalid admin email or password.", "login-error");
            return;
        }

        localStorage.setItem("currentUserRole", "admin");
        window.location.href = "admin.html";
        return;
    }

    if (email === adminEmail) {
        showMessage("Please select Admin to continue.", "login-error");
        return;
    }

    showMessage("Student login requires account verification.", "login-error");
});

function showMessage(message, className) {
    loginMessage.textContent = message;
    loginMessage.className = className;
}
