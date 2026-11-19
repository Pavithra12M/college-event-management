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
        const heading = document.createElement("h3");
        heading.textContent = "Student " + (index + 1);
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

        card.appendChild(document.createElement("hr"));

        registrationList.appendChild(card);
    });
}
