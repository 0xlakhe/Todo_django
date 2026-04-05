A full-stack Todo application featuring a Django REST Framework backend and a React frontend. This app allows users to create accounts, log in securely, and manage their personal tasks with full CRUD (Create, Read, Update, Delete) functionality.

Features
User Authentication: Secure Login and Signup using DRF Token Authentication.

Private Task Lists: Each user can only see and manage their own tasks.

Task Management:

Add new tasks with titles and detailed descriptions.

Toggle task completion status with a checkbox.

Delete tasks permanently.

Dynamic UI: Built with React hooks (useState, useEffect) for a smooth, single-page experience.

Persistent Login: Uses localStorage and Axios interceptors to keep users logged in across refreshes.

Tech Stack
Frontend:

React.js

Axios (for API communication)


Backend:

Django & Django REST Framework

SQLite (Development Database)

Token Authentication
