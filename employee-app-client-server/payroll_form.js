// const SERVER_URL = "http://localhost:3000/employees";

// let isUpdate = false;
// let employeeToEdit = null;

// /* ------------------------------
//    LOAD EDIT DATA ON PAGE LOAD
// --------------------------------*/
// window.addEventListener("DOMContentLoaded", () => {

//     employeeToEdit = JSON.parse(localStorage.getItem("editEmployee"));

//     if (employeeToEdit) {
//         isUpdate = true;
//         setForm(employeeToEdit);
//     }

//     updateDays(); // initialize day dropdown

//     // Salary slider
//     const salarySlider = document.getElementById("salary");
//     const salaryOutput = document.getElementById("salary-output");
//     salaryOutput.textContent = salarySlider.value;
//     salarySlider.addEventListener("input", () => {
//         salaryOutput.textContent = salarySlider.value;
//     });

// });
// /* ------------------------------
//    FIXED updateDays()
// --------------------------------*/
// function updateDays() {
//     let daySelect = document.getElementById("day");
//     let month = parseInt(document.getElementById("month").value);
//     let year = parseInt(document.getElementById("year").value);

//     if (isNaN(year) || isNaN(month)) return;

//     let selectedDay = parseInt(daySelect.value);
//     let daysInMonth = new Date(year, month + 1, 0).getDate();

//     daySelect.innerHTML = "";

//     for (let d = 1; d <= daysInMonth; d++) {
//         let opt = document.createElement("option");
//         opt.value = d;
//         opt.textContent = d;
//         if (d === selectedDay) opt.selected = true;
//         daySelect.appendChild(opt);
//     }
// }
// document.getElementById("month").addEventListener("change", updateDays);
// document.getElementById("year").addEventListener("change", updateDays);


// /* ------------------------------
//    SET FORM VALUES
// --------------------------------*/
// function setForm(emp) {
//     document.getElementById("name").value = emp.name;
//     document.getElementById("salary").value = emp.salary;
//     document.getElementById("salary-output").textContent = emp.salary;
//     document.getElementById("notes").value = emp.notes;

//     document.querySelector(`input[name="gender"][value="${emp.gender}"]`).checked = true;
//     document.querySelector(`input[name="profile"][value="${emp.profilePic}"]`).checked = true;

//     document.querySelectorAll("input[type='checkbox']").forEach(chk => {
//         chk.checked = emp.department.includes(chk.value);
//     });

//     const d = new Date(emp.startDate);
//     document.getElementById("day").value = d.getDate();
//     document.getElementById("month").value = d.getMonth();
//     document.getElementById("year").value = d.getFullYear();
// }

// /* ------------------------------
//    SUBMIT FORM → POST OR PUT
// --------------------------------*/
// document.getElementById("payrollForm").addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const emp = {
//         name: document.getElementById("name").value,
//         profilePic: document.querySelector("input[name='profile']:checked")?.value,
//         gender: document.querySelector("input[name='gender']:checked")?.value,
//         department: [...document.querySelectorAll("input[type='checkbox']:checked")].map(d => d.value),
//         salary: document.getElementById("salary").value,
//         notes: document.getElementById("notes").value,
//         startDate: new Date(
//             document.getElementById("year").value,
//             document.getElementById("month").value,
//             document.getElementById("day").value
//         )
//     };

//     try {
//         let url = SERVER_URL;
//         let method = "POST";

//         if (isUpdate) {
//             url = `${SERVER_URL}/${employeeToEdit.id}`;
//             method = "PUT";
//         }

//         const res = await fetch(url, {
//             method: method,
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(emp)
//         });

//         if (!res.ok) throw "Server Error";

//         alert(isUpdate ? "Employee Updated!" : "Employee Added!");

//         localStorage.removeItem("editEmployee");
//         window.location.href = "home.html";

//     } catch (err) {
//         alert("Error: " + err);
//     }
// });

// /* ------------------------------
//    CANCEL BUTTON
// --------------------------------*/
// document.getElementById("cancelBtn").addEventListener("click", () => {
//     window.location.href = "home.html";
// });


const SERVER_URL = "http://localhost:3000/employees";

let isUpdate = false;
let employeeToEdit = null;

window.addEventListener("DOMContentLoaded", () => {

    employeeToEdit = JSON.parse(localStorage.getItem("editEmployee"));

    if (employeeToEdit) {
        isUpdate = true;
        setForm(employeeToEdit);
    }

    updateDays();

    const salarySlider = document.getElementById("salary");
    const salaryOutput = document.getElementById("salary-output");

    salaryOutput.textContent = salarySlider.value;
    salarySlider.addEventListener("input", () =>
        salaryOutput.textContent = salarySlider.value
    );
});

/*** FIX: dynamic number of days ***/
function updateDays() {
    let day = document.getElementById("day");
    let month = parseInt(document.getElementById("month").value);
    let year = parseInt(document.getElementById("year").value);

    if (isNaN(month) || isNaN(year)) return;

    let selected = parseInt(day.value);
    let maxDays = new Date(year, month + 1, 0).getDate();

    day.innerHTML = "";
    for (let d = 1; d <= maxDays; d++) {
        let opt = document.createElement("option");
        opt.value = d;
        opt.textContent = d;
        if (d === selected) opt.selected = true;
        day.appendChild(opt);
    }
}

document.getElementById("month").addEventListener("change", updateDays);
document.getElementById("year").addEventListener("change", updateDays);

/*** Fill form during Edit ***/
function setForm(emp) {

    document.getElementById("name").value = emp.name;
    document.getElementById("salary").value = emp.salary;
    document.getElementById("salary-output").textContent = emp.salary;
    document.getElementById("notes").value = emp.notes ?? "";

    document.querySelector(`input[name="gender"][value="${emp.gender}"]`).checked = true;
    document.querySelector(`input[name="profile"][value="${emp.profilePic}"]`).checked = true;

    document.querySelectorAll("input[type='checkbox']").forEach(c => {
        c.checked = emp.department.includes(c.value);
    });

    let dt = new Date(emp.startDate);
    document.getElementById("day").value = dt.getDate();
    document.getElementById("month").value = dt.getMonth();
    document.getElementById("year").value = dt.getFullYear();
}

/*** Submit → POST or PUT ***/
document.getElementById("payrollForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const emp = {
        name: document.getElementById("name").value,
        profilePic: document.querySelector("input[name='profile']:checked")?.value,
        gender: document.querySelector("input[name='gender']:checked")?.value,
        department: [...document.querySelectorAll("input[type='checkbox']:checked")].map(x => x.value),
        salary: document.getElementById("salary").value,
        notes: document.getElementById("notes").value,
        startDate: new Date(
            document.getElementById("year").value,
            document.getElementById("month").value,
            document.getElementById("day").value
        )
    };

    try {
        let url = SERVER_URL;
        let method = "POST";

        if (isUpdate) {
            url = `${SERVER_URL}/${employeeToEdit.id}`;
            method = "PUT";
        }

        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(emp)
        });

        if (!res.ok) throw "Server error";

        alert(isUpdate ? "Updated successfully!" : "Added successfully!");

        localStorage.removeItem("editEmployee");
        window.location.href = "home.html";

    } catch (err) {
        alert("Error: " + err);
    }
});

document.getElementById("cancelBtn").addEventListener("click", () => {
    window.location.href = "home.html";
});
