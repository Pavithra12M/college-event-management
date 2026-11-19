const adminEmail = "admin@campusconnect.com";

const emailInput = document.getElementById("loginEmail");
const roleInput = document.getElementById("loginRole");
const loginMessage = document.getElementById("loginMessage");

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = emailInput.value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;
    const role = roleInput.value;

    if (role === "admin") {
        if (email !== adminEmail) {
            loginMessage.textContent = "Enter the administrator email address.";
            loginMessage.className = "login-error";
            return;
        }

        if (password !== "Admin123") {
            loginMessage.textContent = "The admin password is incorrect.";
            loginMessage.className = "login-error";
            return;
        }

        localStorage.setItem("currentUserRole", "admin");
        window.location.href = "admin.html";
        return;
    }

    if (email === adminEmail) {
        loginMessage.textContent = "Select Admin to sign in with the administrator account.";
        loginMessage.className = "login-error";
        return;
    }

    localStorage.setItem("currentStudentEmail", email);
    localStorage.setItem("currentUserRole", "student");
    window.location.href = "student-dashboard.html";
});
