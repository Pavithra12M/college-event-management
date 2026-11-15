const studentEmail = localStorage.getItem("currentStudentEmail");
if (!studentEmail) {
    window.location.href = "login.html";
}
const registrations = JSON.parse(
    localStorage.getItem("registrations") || "[]"
);

const myRegistration = document.getElementById("myRegistration");

const studentDetails = registrations.filter(student =>
    student.email.toLowerCase() === (studentEmail || "").toLowerCase()
);

if (!studentEmail) {
    myRegistration.textContent = "Please login first.";
} else if (studentDetails.length === 0) {
    myRegistration.textContent = "No registration found.";
} else {
    studentDetails.forEach((student, index) => {
        const card = document.createElement("div");

        const heading = document.createElement("h3");
        heading.textContent = "Registration " + (index + 1);

        const name = document.createElement("p");
        name.textContent = "Name: " + student.name;

        const email = document.createElement("p");
        email.textContent = "Email: " + student.email;

        const department = document.createElement("p");
        department.textContent = "Department: " + student.department;

        const event = document.createElement("p");
        event.textContent = "Event: " + student.event;

        card.append(heading, name, email, department, event);
        myRegistration.appendChild(card);
    });
}function studentLogout() {
    localStorage.removeItem("currentStudentEmail");
    window.location.href = "login.html";
}
