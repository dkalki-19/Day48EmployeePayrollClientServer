console.log("Main Thread Starts");

setTimeout(() => {
    console.log("Activity B (Async Task) Completed");
}, 2000);

console.log("Main Thread Continues...");
