const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const URL = "http://localhost:3000/employees";

function makeAjaxCall(method, url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                callback(null, xhr.responseText);
            } else {
                callback("Error: " + xhr.status, null);
            }
        }
    };
    xhr.open(method, url, true);
    xhr.send();
}

console.log("Fetching Employee Data...");

makeAjaxCall("GET", URL, (error, data) => {
    if (error) {
        console.log("FAILED:", error);
    } else {
        console.log("SUCCESS:");
        console.log(data);
    }
});
