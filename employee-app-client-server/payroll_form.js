let isUpdate = false;
let employeeToEdit = null;

// Load employee if editing
window.addEventListener("DOMContentLoaded", () => {
    employeeToEdit = JSON.parse(localStorage.getItem("editEmployee"));

    if (employeeToEdit) {
        isUpdate = true;
        setForm(employeeToEdit);
    }
});

// Utility: Validate Name
function validateName(name) {
    let regex = /^[A-Z][a-zA-Z ]{2,}$/;
    return regex.test(name);
}

// Utility: Validate Start Date
function validateStartDate(date) {
    const today = new Date();
    const diff = (today - date) / (1000 * 60 * 60 * 24);
    if (diff < 0) return false;
    if (diff > 30) return false;
    return true;
}

function setForm(emp) {
    document.getElementById("name").value = emp.name;
    document.getElementById("salary").value = emp.salary;
    document.getElementById("salary-output").textContent = emp.salary;
    document.getElementById("notes").value = emp.notes;

    document.querySelector(`input[name="gender"][value="${emp.gender}"]`).checked = true;
    document.querySelector(`input[name="profile"][value="${emp.profilePic}"]`).checked = true;

    document.querySelectorAll("input[type='checkbox']").forEach(chk => {
        chk.checked = emp.department.includes(chk.value);
    });

    const d = new Date(emp.startDate);
    document.getElementById("day").value = d.getDate();
    document.getElementById("month").value = d.getMonth();
    document.getElementById("year").value = d.getFullYear();
}

document.getElementById("payrollForm").addEventListener("submit", e => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    if (!validateName(name)) {
        alert("Invalid Name");
        return;
    }

    let day = document.getElementById("day").value;
    let month = document.getElementById("month").value;
    let year = document.getElementById("year").value;
    let startDate = new Date(year, month, day);

    if (!validateStartDate(startDate)) {
        alert("Invalid Start Date");
        return;
    }

    let emp = {
        name: name,
        profilePic: document.querySelector("input[name='profile']:checked")?.value || "",
        gender: document.querySelector("input[name='gender']:checked")?.value || "",
        salary: document.getElementById("salary").value,
        notes: document.getElementById("notes").value,
        department: [...document.querySelectorAll("input[type='checkbox']:checked")].map(e => e.value),
        startDate: startDate
    };

    if (isUpdate) {
        emp.id = employeeToEdit.id;   // IMPORTANT: use id, not _id
        localStorage.setItem("updateEmployee", JSON.stringify(emp));
    } else {
        localStorage.setItem("newEmployee", JSON.stringify(emp));
    }

    // redirect to home
    window.location.href = "home.html";
});

function updateDays() {
    let daySelect = document.getElementById("day");
    let month = parseInt(document.getElementById("month").value);  // 0–11
    let year = parseInt(document.getElementById("year").value);

    if (!year || month === "") return;

    let selectedDay = parseInt(daySelect.value);

    let daysInMonth = new Date(year, month + 1, 0).getDate();

    daySelect.innerHTML = "";

    for (let d = 1; d <= daysInMonth; d++) {
        let option = document.createElement("option");
        option.value = d;
        option.textContent = d;

        if (d === selectedDay) option.selected = true;

        daySelect.appendChild(option);
    }
}
document.getElementById("month").addEventListener("change", updateDays);
document.getElementById("year").addEventListener("change", updateDays);

// Initialize Day dropdown on load
updateDays();
