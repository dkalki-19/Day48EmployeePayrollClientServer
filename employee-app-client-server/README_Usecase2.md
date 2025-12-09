# USECASE 2 — Why Local Storage is Local & JSON Server is Shared

## 1. Local Storage is Local to Browser
LocalStorage data is stored inside the browser. It belongs to:
- a single user
- on a single device
- inside a single browser

If another user opens the app on another machine or browser, LocalStorage will be empty.

## 2. JSON Server is a Shared Backend
JSON Server exposes REST endpoints like:
http://localhost:3000/employees

Data is saved in db.json and can be accessed by:
- any browser
- any device
- any programming language
- any user

Thus all users see the same data.

## 3. Local Storage (Frontend Only) vs JSON Server (Client–Server)
LocalStorage is only for simple local testing.
JSON Server is a real server and supports GET, POST, PUT, DELETE.

## 4. Real Client–Server Architecture
CLIENT (Browser) sends HTTP requests.
SERVER (JSON Server) returns JSON responses.

Hence JSON Server solves the limitation of Local Storage being private and local.
