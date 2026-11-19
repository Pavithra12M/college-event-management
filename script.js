const menuToggle = document.getElementById("menuToggle");
const mainMenu = document.getElementById("mainMenu");

menuToggle.addEventListener("click", function() {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Open navigation menu" : "Close navigation menu"
    );
    mainMenu.classList.toggle("is-open", !isOpen);
});

mainMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", function() {
        mainMenu.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
});

function selectEvent(eventName) {
    document.getElementById("event").value = eventName;
    document.getElementById("register").scrollIntoView({
        behavior: "smooth"
    });
}

document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const year = document.getElementById("year").value;
    const department = document.getElementById("department").value;
    const selectedEvent = document.getElementById("event").value;
    const college = document.getElementById("college").value.trim();
    const message = document.getElementById("message");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const namePattern = /^[\p{L}][\p{L}\s.'-]*$/u;

    if (!name || !email || !year || !department || !selectedEvent || !college) {
        message.textContent = "Please fill all the fields.";
        message.style.color = "red";
        return;
    }

    if (!namePattern.test(name)) {
        message.textContent = "Please enter a valid name.";
        message.style.color = "red";
        return;
    }

    if (!emailPattern.test(email)) {
        message.textContent = "Please enter a valid email.";
        message.style.color = "red";
        return;
    }

    const registration = {
        name: name,
        email: email,
        year: year,
        department: department,
        event: selectedEvent,
        college: college
    };

    let registrations = JSON.parse(
        localStorage.getItem("registrations") || "[]"
    );

    registrations.push(registration);

    localStorage.setItem("registrations", JSON.stringify(registrations));

    message.textContent = "Registration Successful!";
    message.style.color = "green";

    this.reset();
});
