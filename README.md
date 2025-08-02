CampusHub REST API
A backend API for a Campus Portal system with Role-Based Access Control (RBAC) for Students, Faculty, and Admins. Built using Node.js, Express, and MongoDB.

👥 Roles

Student: View announcements, own results, courses, and materials

Faculty: Post announcements, upload course materials, view results

Admin: Manage users, publish results, create courses, full access

🔐 Features
JWT Authentication for secure login

API Key required for protected routes

Role-based route protection using middleware

CRUD for announcements, results, courses, and materials

Admin user management

Postman collection for testing

📌 Routes
Auth

POST /auth/register → Register user (default role: student)

POST /auth/login → Login and get JWT

POST /auth/api-key → Generate API Key

GET /auth/me → Current user profile

Announcements

POST /announcements → Faculty/Admin only

GET /announcements → All roles

Results

POST /results → Admin only

GET /results/:studentId → Student (own), Faculty/Admin (any)

Courses & Materials

GET /courses → All roles

POST /courses → Admin only

POST /courses/:courseId/materials → Faculty only

GET /courses/:courseId/materials → Student/Faculty

Admin

GET /admin/users → List all users

PUT /admin/users/:id/role → Change user role

🛠 Tech Stack
Node.js | Express.js | MongoDB

📂 Postman Collection
https://rushikeshwagh-2864771.postman.co/workspace/Rushikesh-Wagh's-Workspace~f27b2980-6629-4d1d-8d72-91d36eb3eeb4/collection/45876881-893080ea-d7ba-414f-8dde-8f1716ec7d97?action=share&creator=45876881

