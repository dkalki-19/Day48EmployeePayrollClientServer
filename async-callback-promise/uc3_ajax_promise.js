const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function makePromiseCall(method, url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status === 201) {
                    resolve(xhr.responseText);
                } else {
                    reject("ERROR: " + xhr.status);
                }
            }
        };

        xhr.open(method, url, true);
        xhr.send();
    });
}

const URL = "http://localhost:3000/employees";

console.log("Promise Call Started");

makePromiseCall("GET", URL)
    .then(response => {
        console.log("SUCCESS:");
        console.log(response);
    })
    .catch(error => {
        console.log("FAILED:", error);
    });
