function selectEvent(eventName) {
    document.getElementById("event").value = eventName;
    document.getElementById("register").scrollIntoView({
        behavior: "smooth"
    });
}

document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const department = document.getElementById("department").value;
    const selectedEvent = document.getElementById("event").value;
    const message = document.getElementById("message");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const namePattern = /^[\p{L}][\p{L}\s.'-]*$/u;

    if (!name || !email || !department || !selectedEvent) {
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
        department: department,
        event: selectedEvent
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
