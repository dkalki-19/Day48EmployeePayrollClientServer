let isUpdate = false;
let employeeToEdit = {};

window.addEventListener("DOMContentLoaded", () => {
    employeeToEdit = JSON.parse(localStorage.getItem("editEmployee"));

    if (employeeToEdit) {
        isUpdate = true;
        setForm(employeeToEdit);   // fill form with data
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


class EmployeePayroll {

    constructor() {
        this._name = "";
        this._profilePic = "";
        this._gender = "";
        this._department = [];
        this._salary = "";
        this._notes = "";
        this._startDate = "";
    }

    get name() { return this._name; }
    set name(name) {
        let regex = /^[A-Z][a-zA-Z ]{2,}$/;
        if (!regex.test(name)) throw "Invalid Name!";
        this._name = name;
    }

    get profilePic() { return this._profilePic; }
    set profilePic(pic) { this._profilePic = pic; }

    get gender() { return this._gender; }
    set gender(gender) { this._gender = gender; }

    get department() { return this._department; }
    set department(deptList) { this._department = deptList; }

    get salary() { return this._salary; }
    set salary(sal) { this._salary = sal; }

    get notes() { return this._notes; }
    set notes(notes) { this._notes = notes; }

    get startDate() { return this._startDate; }
    set startDate(date) {

        const today = new Date();
        const diff = (today - date) / (1000 * 60 * 60 * 24);

        if (diff < 0) throw "Future date not allowed!";
        if (diff > 30) throw "Start date must be within 30 days!";

        this._startDate = date;
    }

    
}


window.addEventListener("DOMContentLoaded", () => {

    // Salary Output
    const salarySlider = document.getElementById("salary");
    const salaryOutput = document.getElementById("salary-output");
    salarySlider.addEventListener("input", () => {
        salaryOutput.textContent = salarySlider.value;
    });

    // Name Validation
    const nameField = document.getElementById("name");
    nameField.addEventListener("input", function () {
        let regex = /^[A-Z][a-zA-Z ]{2,}$/;
        if (!regex.test(this.value))
            nameError.innerText = "Name must start with capital and min 3 chars!";
        else
            nameError.innerText = "";
    });

    // Date Validation
    document.getElementById("day").addEventListener("change", validateStartDate);
    document.getElementById("month").addEventListener("change", validateStartDate);
    document.getElementById("year").addEventListener("change", validateStartDate);
});

function createEmployeeObject() {

    let emp = new EmployeePayroll();
    emp.name = document.getElementById("name").value;
    emp.profilePic = document.querySelector("input[name='profile']:checked")?.value || "";
    emp.gender = document.querySelector("input[name='gender']:checked")?.value || "";

    let deptValues = [];
    document.querySelectorAll("input[type='checkbox']:checked")
        .forEach(cb => deptValues.push(cb.value));
    emp.department = deptValues;

    emp.salary = document.getElementById("salary").value;
    emp.notes = document.getElementById("notes").value;

    let day = document.getElementById("day").value;
    let month = document.getElementById("month").value;
    let year = document.getElementById("year").value;
    emp.startDate = new Date(year, month, day);

    return emp;
}

function validateStartDate() {
            console.log("validateStartDate function executing");

            const day = parseInt(document.getElementById("day").value);
            const month = parseInt(document.getElementById("month").value); // must be 0–11
            const year = parseInt(document.getElementById("year").value);

            const selected = new Date(year, month, day);
            const today = new Date();

            // Normalize both to MIDNIGHT
            const selectedMid = new Date(selected.getFullYear(), selected.getMonth(), selected.getDate());
            const todayMid = new Date(today.getFullYear(), today.getMonth(), today.getDate());

            const diffMs = todayMid - selectedMid;
            const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

            console.log("Diff:", diffDays);

            // 1️⃣ future date check FIRST
            if (diffDays < 0) {
                document.getElementById("dateError").innerText =
                    "Start date cannot be in the future!";
                return false;
            }

            // 2️⃣ older than 30 days check
            if (diffDays > 30) {
                document.getElementById("dateError").innerText =
                    "Start date must be within 30 days!";
                return false;
            }

            // 3️⃣ valid
            document.getElementById("dateError").innerText = "";
            return true;
        }

function saveToLocalStorage(empObj) {

    let list = JSON.parse(localStorage.getItem("EmployeePayrollList")) || [];

    list.push(empObj);

    localStorage.setItem("EmployeePayrollList", JSON.stringify(list));
}

function setForm(emp) {
    document.getElementById("name").value = emp._name;
    document.getElementById("salary").value = emp._salary;
    document.getElementById("salary-output").textContent = emp._salary;

    document.getElementById("notes").value = emp._notes;

    // gender
    document.querySelector(`input[name="gender"][value="${emp._gender}"]`).checked = true;

    // profile pic
    document.querySelector(`input[name="profile"][value="${emp._profilePic}"]`).checked = true;

    // departments
    document.querySelectorAll("input[type='checkbox']").forEach(chk => chk.checked = false);

    document.querySelectorAll("input[type='checkbox']").forEach(chk => {
        chk.checked = emp._department.includes(chk.value);
    });

    // date
    let date = new Date(emp._startDate);
    document.getElementById("day").value = date.getDate();
    document.getElementById("month").value = date.getMonth();
    document.getElementById("year").value = date.getFullYear();
}


document.getElementById("resetBtn").addEventListener("click", () => {
    nameError.innerText = "";
    dateError.innerText = "";
});


document.getElementById("payrollForm").addEventListener("submit", function(e) {
    e.preventDefault();

    if (!validateStartDate()) return;

    try {
        let emp = new EmployeePayroll();

        emp.name = document.getElementById("name").value;
        emp.profilePic = document.querySelector("input[name='profile']:checked")?.value || "";
        emp.gender = document.querySelector("input[name='gender']:checked")?.value || "";

        let deptValues = [];
        document.querySelectorAll("input[type='checkbox']:checked").forEach(cb => {
            deptValues.push(cb.value);
        });
        emp.department = deptValues;

        emp.salary = document.getElementById("salary").value;
        emp.notes = document.getElementById("notes").value;

        let day = document.getElementById("day").value;
        let month = document.getElementById("month").value;
        let year = document.getElementById("year").value;

        emp.startDate = new Date(year, month, day);

        let employeeList = JSON.parse(localStorage.getItem("EmployeePayrollList")) || [];

        if (isUpdate) {
            emp._id = employeeToEdit._id;

            let index = employeeList.map(e => e._id).indexOf(emp._id);
            employeeList.splice(index, 1, emp);
        } else {
            emp._id = new Date().getTime();
            employeeList.push(emp);
        }

        localStorage.setItem("EmployeePayrollList", JSON.stringify(employeeList));

        // Clear edit data
        localStorage.removeItem("editEmployee");

        // Redirect to Home Page
        window.location.href = "index.html";

    } catch (err) {
        alert(err);
    }
});

document.getElementById("cancelBtn").addEventListener("click", () => {
    window.location.href = "index.html"; // or home.html based on your file name
});
