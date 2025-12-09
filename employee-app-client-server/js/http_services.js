function makePromiseCall(method, url, data=null) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.onload = () => {
            if (xhr.status.toString().match(/^2\d{2}$/)) {
                resolve(xhr.responseText);
            } else {
                reject("Error: " + xhr.status);
            }
        };

        xhr.onerror = () => reject("Network Error");

        xhr.open(method, url);

        if (data) {
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        } else {
            xhr.send();
        }
    });
}
