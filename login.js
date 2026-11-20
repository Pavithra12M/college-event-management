import {
    auth,
    db,
    signInWithEmailAndPassword,
    doc,
    getDoc
} from "./firebase.js";

const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;

    const selectedRole = document.querySelector(
        'input[name="loginRole"]:checked'
    );

    if (!selectedRole) {
        showMessage("Please select your role.", "login-error");
        return;
    }

    const role = selectedRole.value;

    try {
        showMessage("Signing in...", "");

        const result = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        const user = result.user;

        const userDoc = await getDoc(doc(db, "users", user.uid));

        if (!userDoc.exists() || userDoc.data().role !== role) {
            await auth.signOut();
            showMessage("Account role does not match.", "login-error");
            return;
        }

        localStorage.setItem("currentUserRole", role);

        if (role === "admin") {
            window.location.href = "admin.html";
        } else {
            localStorage.setItem("currentStudentEmail", user.email);
            window.location.href = "student-dashboard.html";
        }

    } catch (error) {
        showMessage(
            "Login failed. Check your email and password.",
            "login-error"
        );
    }
});

function showMessage(message, className) {
    loginMessage.textContent = message;
    loginMessage.className = className;
}
