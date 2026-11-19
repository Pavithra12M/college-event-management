const studentEmail = localStorage.getItem("currentStudentEmail");
if (!studentEmail) {
    window.location.href = "login.html";
}

const myRegistration = document.getElementById("myRegistration");

function displayStudentRegistrations() {
    const registrations = JSON.parse(localStorage.getItem("registrations") || "[]");
    const studentDetails = registrations.filter(student =>
        (student.email || "").toLowerCase() === (studentEmail || "").toLowerCase()
    );

    myRegistration.innerHTML = "";

    if (studentDetails.length === 0) {
        myRegistration.textContent = "No registration found.";
        return;
    }

    studentDetails.forEach((student, index) => {
        const card = document.createElement("div");
        const heading = document.createElement("h3");
        heading.textContent = "Registration " + (index + 1);
        card.appendChild(heading);

        const details = [
            ["Name", student.name],
            ["Email", student.email],
            ["Year", student.year || "Not provided"],
            ["Department", student.department],
            ["College", student.college || "Not provided"],
            ["Event", student.event]
        ];
        details.forEach(([label, value]) => {
            const detail = document.createElement("p");
            detail.textContent = label + ": " + value;
            card.appendChild(detail);
        });
        myRegistration.appendChild(card);
    });
}

displayStudentRegistrations();

const dashboardRegister = document.getElementById("dashboardRegister");
const dashboardForm = document.getElementById("dashboardRegistrationForm");
const dashboardEmail = document.getElementById("dashboardEmail");
dashboardEmail.value = studentEmail || "";

document.querySelectorAll(".event-register-button").forEach(button => {
    button.addEventListener("click", function() {
        const eventName = this.dataset.event;
        document.getElementById("dashboardEvent").value = eventName;
        document.getElementById("dashboardSelectedEvent").textContent = eventName;
        document.getElementById("dashboardRegistrationMessage").textContent = "";
        dashboardRegister.hidden = false;
        dashboardRegister.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

dashboardForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("dashboardName").value.trim();
    const year = document.getElementById("dashboardYear").value;
    const department = document.getElementById("dashboardDepartment").value;
    const college = document.getElementById("dashboardCollege").value.trim();
    const selectedEvent = document.getElementById("dashboardEvent").value;
    const message = document.getElementById("dashboardRegistrationMessage");
    const namePattern = /^[\p{L}][\p{L}\s.'-]*$/u;

    if (!namePattern.test(name)) {
        message.textContent = "Please enter a valid name.";
        message.className = "registration-error";
        return;
    }

    if (!year || !department || !college || !selectedEvent) {
        message.textContent = "Please fill all the fields.";
        message.className = "registration-error";
        return;
    }

    const registrations = JSON.parse(localStorage.getItem("registrations") || "[]");
    registrations.push({
        name: name,
        email: studentEmail.toLowerCase(),
        year: year,
        department: department,
        event: selectedEvent,
        college: college
    });
    localStorage.setItem("registrations", JSON.stringify(registrations));

    message.textContent = "Registration successful!";
    message.className = "registration-success";
    const currentEvent = selectedEvent;
    this.reset();
    dashboardEmail.value = studentEmail;
    document.getElementById("dashboardEvent").value = currentEvent;
    displayStudentRegistrations();
});

function studentLogout() {
    localStorage.removeItem("currentStudentEmail");
    window.location.href = "login.html";
}
