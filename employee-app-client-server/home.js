// const useServer = true;   // true = JSON Server, false = Local Storage
// const SERVER_URL = "http://localhost:3000/employees";

// let employeePayrollList = [];

// window.addEventListener("DOMContentLoaded", () => {
//     loadData();
// });

// async function loadData() {
//     try {
//         const res = await fetch("http://localhost:3000/employees");

//         if (!res.ok) throw "Server Error";

//         employeePayrollList = await res.json();

//     } catch (err) {
//         alert("Unable to connect to server. Showing local storage data.");

//         employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList")) || [];
//     }

//     document.getElementById("emp-count").textContent = `(${employeePayrollList.length})`;
//     createInnerHTML();
// }

// /* ------------------------------------
//    LOAD FROM LOCAL STORAGE
// -------------------------------------*/
// function loadFromLocalStorage() {
//     employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList")) || [];
//     document.getElementById("emp-count").textContent = "(" + employeePayrollList.length + ")";
//     createInnerHTML();
// }

// /* ------------------------------------
//    GET FROM JSON SERVER
// -------------------------------------*/
// function getEmployeeFromServer() {
//     fetch(SERVER_URL)
//         .then(response => response.json())
//         .then(data => {
//             employeePayrollList = data;
//             document.getElementById("emp-count").textContent = "(" + data.length + ")";
//             createInnerHTML();
//         })
//         .catch(error => {
//             console.error("Server Error:", error);
//             alert("Unable to connect to server. Showing local storage data.");

//             // Fallback
//             loadFromLocalStorage();
//         });
// }

// /* ------------------------------------
//    DISPLAY TABLE
// -------------------------------------*/
// function createInnerHTML() {
//     let innerHTML = "";

//     employeePayrollList.forEach(emp => {
//         let deptHTML = (emp.department || [])
//             .map(d => `<div class='dept-chip'>${d}</div>`)
//             .join("");

//         innerHTML += `
//         <tr>
//             <td><img src="./assets/${emp.profilePic}" class="table-profile"></td>
//             <td>${emp.name}</td>
//             <td>${emp.gender}</td>
//             <td>${deptHTML}</td>
//             <td>${emp.salary}</td>
//             <td>${new Date(emp.startDate).toLocaleDateString("en-GB")}</td>
//             <td>
//                 <td>
//                     <button onclick="editEmployee(${emp.id})" class="btn-small">Edit</button>
//                     <button onclick="removeEmployee(${emp.id})" class="btn-small delete">Delete</button>
//                 </td>
//             </td>
//         </tr>`;
//     });

//     document.querySelector("#table-display").innerHTML = innerHTML;
// }

// /* ------------------------------------
//    DELETE EMPLOYEE
// -------------------------------------*/
// function removeEmployee(empId) {

//     if (useServer) {
//         fetch(`${SERVER_URL}/${empId}`, {
//             method: "DELETE"
//         })
//         .then(res => {
//             if (!res.ok) throw "Delete failed";
//             return getEmployeeFromServer();
//         })
//         .catch(err => alert("Server delete failed: " + err));
//     } 
    
//     else {
//         employeePayrollList = employeePayrollList.filter(emp => emp.id != empId);
//         localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
//         createInnerHTML();
//     }
// }



// /* ------------------------------------
//    EDIT EMPLOYEE
// -------------------------------------*/
// function editEmployee(empId) {
//     let employeeData = employeePayrollList.find(emp => emp.id == empId);

//     if (!employeeData) {
//         alert("Employee not found!");
//         return;
//     }

//     localStorage.setItem("editEmployee", JSON.stringify(employeeData));
//     window.location.href = "payroll_form.html";
// }

const useServer = true;  
const SERVER_URL = "http://localhost:3000/employees";

let employeePayrollList = [];

window.addEventListener("DOMContentLoaded", () => {
    loadData();
});

async function loadData() {
    try {
        const res = await fetch(SERVER_URL);
        if (!res.ok) throw "Server Error";

        employeePayrollList = await res.json();
    } 
    catch (err) {
        alert("Unable to connect to server. Showing local storage data.");
        employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList")) || [];
    }

    document.getElementById("emp-count").textContent = `(${employeePayrollList.length})`;
    createInnerHTML();
}

/* Display table */
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
            <td>${emp.gender ?? ""}</td>
            <td>${deptHTML}</td>
            <td>${emp.salary}</td>
            <td>${new Date(emp.startDate).toLocaleDateString("en-GB")}</td>
            <td>
                <button class="btn-small" onclick="editEmployee('${emp.id}')">Edit</button>
                <button class="btn-small delete" onclick="removeEmployee('${emp.id}')">Delete</button>
            </td>
        </tr>`;
    });

    document.querySelector("#table-display").innerHTML = innerHTML;
}

/* DELETE */
function removeEmployee(empId) {

    if (useServer) {
        fetch(`${SERVER_URL}/${empId}`, {
            method: "DELETE"
        })
        .then(res => {
            if (!res.ok) throw "Delete failed from server";
            loadData();  // refresh list
        })
        .catch(err => alert("Delete failed: " + err));
    }

    else {
        employeePayrollList = employeePayrollList.filter(emp => emp.id != empId);
        localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
        createInnerHTML();
    }
}

/* EDIT */
function editEmployee(empId) {
    let employeeData = employeePayrollList.find(emp => emp.id == empId);

    if (!employeeData) {
        alert("Employee not found!");
        return;
    }

    localStorage.setItem("editEmployee", JSON.stringify(employeeData));

    window.location.href = "payroll_form.html";
}
