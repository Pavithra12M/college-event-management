const registrationList = document.getElementById("registrationList");

const registrations = JSON.parse(
    localStorage.getItem("registrations") || "[]"
);

if (registrations.length === 0) {
    registrationList.innerHTML = "<p>No registrations found.</p>";
} else {
    registrationList.innerHTML = "";

    registrations.forEach((student, index) => {
        const card = document.createElement("div");

        card.innerHTML = `
            <h3>Student ${index + 1}</h3>
            <p>Name: ${student.name}</p>
            <p>Email: ${student.email}</p>
            <p>Department: ${student.department}</p>
            <p>Event: ${student.event}</p>
            <hr>
        `;

        registrationList.appendChild(card);
    });
}
