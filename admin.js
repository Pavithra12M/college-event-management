if (localStorage.getItem("currentUserRole") !== "admin") {
    window.location.href = "login.html";
}

const eventNames = [
    "Technical Symposium",
    "Cultural Fest",
    "Sports Day"
];
let registrations = JSON.parse(localStorage.getItem("registrations") || "[]");

const totalCount = document.getElementById("totalCount");
const eventTotalCount = document.getElementById("eventTotalCount");
const popularEvent = document.getElementById("popularEvent");
const eventCounts = document.getElementById("eventCounts");
const adminList = document.getElementById("adminList");
const searchInput = document.getElementById("registrationSearch");
const eventFilter = document.getElementById("eventFilter");
const registrationResultCount = document.getElementById("registrationResultCount");

function createTableCell(value) {
    const cell = document.createElement("td");
    cell.textContent = value || "Not provided";
    return cell;
}

function displayEventCounts(counts) {
    eventCounts.innerHTML = "";

    const highestCount = Math.max(...Object.values(counts), 0);
    const topEvents = eventNames.filter(
        eventName => counts[eventName] === highestCount && highestCount > 0
    );
    eventTotalCount.textContent = eventNames.length;
    popularEvent.textContent = topEvents.length ? topEvents.join(", ") : "None yet";

    eventNames.forEach(eventName => {
        const card = document.createElement("article");
        card.className = "event-count-card";

        const heading = document.createElement("div");
        heading.className = "event-count-heading";

        const name = document.createElement("h3");
        name.textContent = eventName;

        const count = document.createElement("strong");
        count.textContent = counts[eventName];

        heading.appendChild(name);
        heading.appendChild(count);

        const bar = document.createElement("div");
        bar.className = "event-count-bar";
        bar.setAttribute("aria-hidden", "true");

        const fill = document.createElement("span");
        fill.style.width = highestCount
            ? (counts[eventName] / highestCount) * 100 + "%"
            : "0%";
        bar.appendChild(fill);

        card.appendChild(heading);
        card.appendChild(bar);
        eventCounts.appendChild(card);
    });
}

function displayRegistrations() {
    const counts = Object.fromEntries(eventNames.map(eventName => [eventName, 0]));
    registrations.forEach(student => {
        if (Object.prototype.hasOwnProperty.call(counts, student.event)) {
            counts[student.event]++;
        }
    });

    totalCount.textContent = registrations.length;
    displayEventCounts(counts);
    adminList.innerHTML = "";

    const searchTerm = searchInput.value.trim().toLowerCase();
    const selectedEvent = eventFilter.value;
    const visibleRegistrations = registrations
        .map((student, index) => ({ student, index }))
        .filter(({ student }) => {
            const matchesSearch = [
                student.name,
                student.email,
                student.college
            ].some(value => String(value || "").toLowerCase().includes(searchTerm));
            const matchesEvent = !selectedEvent || student.event === selectedEvent;
            return matchesSearch && matchesEvent;
        });

    registrationResultCount.textContent =
        "Showing " + visibleRegistrations.length + " of " + registrations.length;

    if (visibleRegistrations.length === 0) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");
        cell.colSpan = 5;
        cell.className = "empty-table-state";
        cell.textContent = registrations.length
            ? "No registrations match your search."
            : "No registrations yet.";
        row.appendChild(cell);
        adminList.appendChild(row);
        return;
    }

    visibleRegistrations.forEach(({ student, index }) => {
        const row = document.createElement("tr");

        const studentCell = document.createElement("td");
        const studentName = document.createElement("strong");
        studentName.className = "table-student-name";
        studentName.textContent = student.name || "Not provided";
        const studentEmail = document.createElement("span");
        studentEmail.className = "table-student-email";
        studentEmail.textContent = student.email || "Not provided";
        studentCell.appendChild(studentName);
        studentCell.appendChild(studentEmail);

        const studyDetails = createTableCell(
            [student.year || "Not provided", student.department || "Not provided"].join(" | ")
        );
        const college = createTableCell(student.college);
        const event = document.createElement("td");
        const eventBadge = document.createElement("span");
        eventBadge.className = "registration-event-badge";
        eventBadge.textContent = student.event || "Not provided";
        event.appendChild(eventBadge);

        const actions = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "registration-delete-button";
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute(
            "aria-label",
            "Delete registration for " + (student.name || "student")
        );
        deleteButton.addEventListener("click", function () {
            if (confirm("Delete this registration?")) {
                registrations.splice(index, 1);
                localStorage.setItem("registrations", JSON.stringify(registrations));
                displayRegistrations();
            }
        });
        actions.appendChild(deleteButton);

        row.appendChild(studentCell);
        row.appendChild(studyDetails);
        row.appendChild(college);
        row.appendChild(event);
        row.appendChild(actions);
        adminList.appendChild(row);
    });
}

searchInput.addEventListener("input", displayRegistrations);
eventFilter.addEventListener("change", displayRegistrations);

function adminLogout() {
    localStorage.removeItem("currentUserRole");
    window.location.href = "login.html";
}

displayRegistrations();
