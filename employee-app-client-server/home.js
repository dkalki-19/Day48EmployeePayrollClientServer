const useServer = true;   // true = JSON Server, false = Local Storage
const SERVER_URL = "http://localhost:3000/employees";

let employeePayrollList = [];

// window.addEventListener("DOMContentLoaded", () => {
//     if (useServer) {
//         getEmployeeFromServer();
//     } else {
//         loadFromLocalStorage();
//     }
// });

window.addEventListener("DOMContentLoaded", () => {
    loadData();
});

async function loadData() {
    try {
        const res = await fetch("http://localhost:3000/employees");

        if (!res.ok) throw "Server Error";

        employeePayrollList = await res.json();

    } catch (err) {
        alert("Unable to connect to server. Showing local storage data.");

        employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList")) || [];
    }

    document.getElementById("emp-count").textContent = `(${employeePayrollList.length})`;
    createInnerHTML();
}

/* ------------------------------------
   LOAD FROM LOCAL STORAGE
-------------------------------------*/
function loadFromLocalStorage() {
    employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList")) || [];
    document.getElementById("emp-count").textContent = "(" + employeePayrollList.length + ")";
    createInnerHTML();
}

/* ------------------------------------
   GET FROM JSON SERVER
-------------------------------------*/
function getEmployeeFromServer() {
    fetch(SERVER_URL)
        .then(response => response.json())
        .then(data => {
            employeePayrollList = data;
            document.getElementById("emp-count").textContent = "(" + data.length + ")";
            createInnerHTML();
        })
        .catch(error => {
            console.error("Server Error:", error);
            alert("Unable to connect to server. Showing local storage data.");

            // Fallback
            loadFromLocalStorage();
        });
}

/* ------------------------------------
   DISPLAY TABLE
-------------------------------------*/
function createInnerHTML() {
    let innerHTML = "";

    employeePayrollList.forEach(emp => {
        let deptHTML = (emp.department || [])
            .map(d => `<div class='dept-chip'>${d}</div>`)
            .join("");

        innerHTML += `
        <tr>
            <td><img src="./assets/${emp.profilePic}" class="table-profile"></td>
            <td>${emp.name}</td>
            <td>${emp.gender}</td>
            <td>${deptHTML}</td>
            <td>${emp.salary}</td>
            <td>${new Date(emp.startDate).toLocaleDateString("en-GB")}</td>
            <td>
                <td>
                    <button data-id="${emp.id}" onclick="editEmployee(this)" class="btn-small">Edit</button>
                    <button data-id="${emp.id}" onclick="removeEmployee(this)" class="btn-small delete">Delete</button>
                </td>
            </td>
        </tr>`;
    });

    document.querySelector("#table-display").innerHTML = innerHTML;
}

/* ------------------------------------
   DELETE EMPLOYEE
-------------------------------------*/
function removeEmployee(node) {
    let empId = node.getAttribute("data-id");

    if (useServer) {
        fetch(`${SERVER_URL}/${empId}`, {
            method: "DELETE"
        })
        .then(() => getEmployeeFromServer());
    } else {
        employeePayrollList = employeePayrollList.filter(emp => emp.id != empId);
        localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
        createInnerHTML();
    }
}


/* ------------------------------------
   EDIT EMPLOYEE
-------------------------------------*/
function editEmployee(node) {
    let empId = node.getAttribute("data-id");

    let employeeData = employeePayrollList.find(emp => emp.id == empId);

    localStorage.setItem("editEmployee", JSON.stringify(employeeData));

    window.location.href = "payroll_form.html";
}



