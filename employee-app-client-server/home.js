const useServer = true;   // true = JSON Server, false = Local Storage
const SERVER_URL = "http://localhost:3000/employees";

let employeePayrollList = [];

window.addEventListener("DOMContentLoaded", () => {
    if (useServer) {
        getEmployeeFromServer();
    } else {
        loadFromLocalStorage();
    }
});

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
        let date = new Date(emp.startDate);
        let formattedDate = date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });

        let deptHTML = "";
        emp.department.forEach(dept => {
            deptHTML += `<div class='dept-chip'>${dept}</div>`;
        });

        innerHTML += `
            <tr>
                <td><img class="table-profile" src="./assets/${emp.profilePic}"></td>
                <td>${emp.name}</td>
                <td>${emp.gender}</td>
                <td>${deptHTML}</td>
                <td>${emp.salary}</td>
                <td>${formattedDate}</td>
                <td>
                    <button class="btn-small" data-id="${emp.id}" onclick="editEmployee(this)">Edit</button>
                    <button class="btn-small delete" data-id="${emp.id}" onclick="removeEmployee(this)">Delete</button>
                </td>
            </tr>
        `;
    });

    document.querySelector("#table-display").innerHTML = innerHTML;
}

/* ------------------------------------
   DELETE EMPLOYEE
-------------------------------------*/
function removeEmployee(node) {
    let empId = node.getAttribute("data-id");

    if (useServer) {
        // DELETE from server
        fetch(`${SERVER_URL}/${empId}`, {
            method: "DELETE"
        })
        .then(() => getEmployeeFromServer());
    } else {
        // DELETE from Local Storage
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
