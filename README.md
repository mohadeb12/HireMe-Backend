# HireMe – Job Posting Platform (Backend)

HireMe is a backend API for a job posting platform where companies can post jobs and job seekers can apply.  
Job seekers must upload their CV and pay 100 Taka to apply for a job.  
The system uses JWT-based authentication and role-based access control (RBAC).

---

1. Setup & Installation

1.1 Requirements

- Node.js (v18+)
- MongoDB running locally or in the cloud

1.2 Install dependencies

bash--

npm install

Postman collection: postman/hireMe.postman_collection.json

1.3 Environment variables

Create a ".env" file in the project root:

```env
PORT=`your port no`
MONGO_URI=mongodb://127.0.0.1:27017/hireme
JWT_SECRET=supersecretkey
JWT_EXPIRES_IN=1d
ADMIN_EMAIL=admin@test.com
ADMIN_PASSWORD=admin123

1.4 Create initial admin user (run once)

Before starting the server for the first time, run: npm run seed

Run the server: npm run dev

Base URL: http://localhost:`your port no`

example : http://localhost:5000/api/v1/auth/register

live server baseUrl : https://hireme-backend-mvux.onrender.com

example : https://hireme-backend-mvux.onrender.com/api/v1/auth/register