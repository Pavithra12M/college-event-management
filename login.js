document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value.trim();
    const role = document.getElementById("loginRole").value;
    const message = document.getElementById("loginMessage");

    if (role === "admin") {
        if (email === "admin@campusconnect.com" &&
            password === "Admin123") {

            message.textContent = "Admin Login Successful!";
            message.style.color = "green";
localStorage.setItem("currentUserRole", "admin");
            window.location.href = "admin.html";

        } else {
            message.textContent = "Invalid Admin Email or Password.";
            message.style.color = "red";
        }

    } else if (role === "student") {

        message.textContent = "Student Login Successful!";
        message.style.color = "green";

        localStorage.setItem("currentStudentEmail", email);
        localStorage.setItem("currentUserRole", "student");

        window.location.href = "student-dashboard.html";

    } else {
        message.textContent = "Please select your role.";
        message.style.color = "red";
    }
});
