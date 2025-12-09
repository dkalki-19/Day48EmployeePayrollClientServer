window.addEventListener("DOMContentLoaded", () => {
    employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList")) || [];
    document.getElementById("emp-count").textContent = "(" + employeePayrollList.length + ")";
    createInnerHTML();
});


function createInnerHTML() {

    // Reload latest data from local storage
    employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList")) || [];

    document.getElementById("emp-count").textContent = "(" + employeePayrollList.length + ")";

    let innerHTML = "";

    for (let emp of employeePayrollList) {

        const date = new Date(emp._startDate);
        const formattedDate = date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });

        let deptHTML = "";
        emp._department.forEach(dept => {
            deptHTML += `<div class='dept-chip'>${dept}</div>`;
        });

        innerHTML += `
            <tr>
                <td><img class="table-profile" src="./assets/${emp._profilePic}"></td>
                <td>${emp._name}</td>
                <td>${emp._gender}</td>
                <td>${deptHTML}</td>
                <td>${emp._salary}</td>
                <td>${formattedDate}</td>
                <td>
                    <button class="btn-small" data-id="${emp._id}" onclick="editEmployee(this)">Edit</button>
                    <button class="btn-small delete" data-id="${emp._id}" onclick="removeEmployee(this)">Delete</button>
                </td>
            </tr>
        `;
    }

    document.querySelector("#table-display").innerHTML = innerHTML;
}


function removeEmployee(node) {
    console.log("Delete block");
    let empId = parseInt(node.getAttribute("data-id"));

    // Retrieve current list
    let employeeList = JSON.parse(localStorage.getItem("EmployeePayrollList")) || [];

    // Find employee using find()
    let employeeToDelete = employeeList.find(emp => emp._id == empId);

    if (!employeeToDelete) return;

    // Find index using map + indexOf
    let index = employeeList.findIndex(emp => emp._id === empId);

    // Remove employee using splice
    employeeList.splice(index, 1);

    // Update Local Storage
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeeList));

    // Refresh table
    createInnerHTML();
}


function editEmployee(node) {
    let empId = node.getAttribute("data-id");

    let employeeList = JSON.parse(localStorage.getItem("EmployeePayrollList")) || [];

    let employeeToEdit = employeeList.find(emp => emp._id == empId);

    // Store employee data temporarily for editing
    localStorage.setItem("editEmployee", JSON.stringify(employeeToEdit));

    // Redirect to Add Employee Page
    window.location.href = "add_employee.html";
}
