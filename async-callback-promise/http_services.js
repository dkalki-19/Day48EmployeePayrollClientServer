function makePromiseCall(method, url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();

        xhr.onload = function () {
            if (xhr.status === 200 || xhr.status === 201) {
                resolve(xhr.responseText);
            } else {
                reject("ERROR: " + xhr.status);
            }
        };

        xhr.onerror = function () {
            reject("Network Error");
        };

        xhr.open(method, url, true);
        xhr.send();
    });
}
