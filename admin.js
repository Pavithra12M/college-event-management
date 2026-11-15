if (localStorage.getItem("currentUserRole") !== "admin") {
    window.location.href = "login.html";
}let registrations = JSON.parse(
    localStorage.getItem("registrations") || "[]"
);

function displayRegistrations() {
    const totalCount = document.getElementById("totalCount");
    const adminList = document.getElementById("adminList");

    totalCount.textContent = registrations.length;
    const eventCounts = document.getElementById("eventCounts");

const counts = {
    "Technical Symposium": 0,
    "Cultural Fest": 0,
    "Sports Day": 0
};

registrations.forEach(student => {
    if (counts[student.event] !== undefined) {
        counts[student.event]++;
    }
});

eventCounts.innerHTML = "";

Object.entries(counts).forEach(([eventName, count]) => {
    const p = document.createElement("p");
    p.textContent = eventName + " : " + count + " Students";
    eventCounts.appendChild(p);
});
    adminList.innerHTML = "";

    if (registrations.length === 0) {
        adminList.textContent = "No registrations found.";
        return;
    }

    registrations.forEach((student, index) => {
        const card = document.createElement("div");

        card.innerHTML = `
            <h3>Student ${index + 1}</h3>
            <p>Name: ${student.name}</p>
            <p>Email: ${student.email}</p>
            <p>Department: ${student.department}</p>
            <p>Event: ${student.event}</p>
        `;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function () {
            if (confirm("Delete this registration?")) {
                registrations.splice(index, 1);
                localStorage.setItem(
                    "registrations",
                    JSON.stringify(registrations)
                );
                displayRegistrations();
            }
        });

        card.appendChild(deleteButton);
        adminList.appendChild(card);
    });
}

displayRegistrations();
function adminLogout() {
    localStorage.removeItem("currentUserRole");
    window.location.href = "login.html";
}
