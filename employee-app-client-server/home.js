let employeeList = [];

window.addEventListener("DOMContentLoaded", () => {
    // Clear old local list
    localStorage.removeItem("EmployeePayrollList");

    // load initial (empty for now)
    employeeList = [];

    document.getElementById("emp-count").textContent = "(" + employeeList.length + ")";

    createInnerHTML();

    checkForNewOrUpdatedData();
});

function checkForNewOrUpdatedData() {
    let newEmp = JSON.parse(localStorage.getItem("newEmployee"));
    let updatedEmp = JSON.parse(localStorage.getItem("updateEmployee"));

    if (newEmp) {
        employeeList.push(newEmp);
        localStorage.removeItem("newEmployee");
    }

    if (updatedEmp) {
        let index = employeeList.map(e => e.id).indexOf(updatedEmp.id);
        employeeList.splice(index, 1, updatedEmp);
        localStorage.removeItem("updateEmployee");
    }

    createInnerHTML();
}

function createInnerHTML() {
    let innerHTML = "";
    for (let emp of employeeList) {

        let formattedDate = new Date(emp.startDate).toDateString();
        let deptHTML = emp.department.map(d => `<div class='dept-chip'>${d}</div>`).join("");

        innerHTML += `
            <tr>
                <td><img class="table-profile" src="./assets/${emp.profilePic}"></td>
                <td>${emp.name}</td>
                <td>${emp.gender}</td>
                <td>${deptHTML}</td>
                <td>${emp.salary}</td>
                <td>${formattedDate}</td>
                <td>
                    <button class="btn-small" onclick='editEmployee(${JSON.stringify(emp)})'>Edit</button>
                    <button class="btn-small delete" onclick='deleteEmployee(${emp.id})'>Delete</button>
                </td>
            </tr>
        `;
    }

    document.querySelector("#table-display").innerHTML = innerHTML;
}

function editEmployee(emp) {
    localStorage.setItem("editEmployee", JSON.stringify(emp));
    window.location.href = "payroll_form.html";
}

function deleteEmployee(id) {
    employeeList = employeeList.filter(e => e.id !== id);
    createInnerHTML();
}
