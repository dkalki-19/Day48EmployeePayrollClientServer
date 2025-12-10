let isUpdate = false;
let employeeToEdit = null;

// Load employee if editing
window.addEventListener("DOMContentLoaded", () => {
    employeeToEdit = JSON.parse(localStorage.getItem("editEmployee"));

    if (employeeToEdit) {
        isUpdate = true;
        setForm(employeeToEdit);
    } else {
        // Fresh form when adding new employee
        document.getElementById("payrollForm").reset();
        document.getElementById("salary-output").textContent =
            document.getElementById("salary").value;
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

document.getElementById("payrollForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const emp = {
        name: document.getElementById("name").value,
        profilePic: document.querySelector("input[name='profile']:checked")?.value,
        gender: document.querySelector("input[name='gender']:checked")?.value,
        department: [...document.querySelectorAll("input[type='checkbox']:checked")].map(d => d.value),
        salary: document.getElementById("salary").value,
        notes: document.getElementById("notes").value,
        startDate: new Date(
            document.getElementById("year").value,
            document.getElementById("month").value,
            document.getElementById("day").value
        )
    };

    try {

        let url = "http://localhost:3000/employees";
        let method = "POST";

        if (isUpdate) {
            // Use PUT instead of POST
            url = `http://localhost:3000/employees/${employeeToEdit.id}`;
            method = "PUT";
        }

        const res = await fetch(url, {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(emp)
        });

        if (!res.ok) throw "Server Error";

        alert(isUpdate ? "Employee Updated Successfully!" : "Employee Added Successfully!");

        // Clear edit data
        localStorage.removeItem("editEmployee");

        window.location.href = "home.html";

    } catch (err) {
        alert("Failed to save employee: " + err);
    }
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

// Salary Output
    const salarySlider = document.getElementById("salary");
    const salaryOutput = document.getElementById("salary-output");
    salarySlider.addEventListener("input", () => {
        salaryOutput.textContent = salarySlider.value;
    });