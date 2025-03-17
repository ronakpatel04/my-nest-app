🚀 NestJS API Boilerplate
A scalable NestJS + Prisma + PostgreSQL API with authentication, role-based access control, file uploads, and Swagger documentation.

📌 Features
✅ JWT Authentication (Signup, Signin, Logout)
✅ Role-Based Access Control (RBAC)
✅ Prisma ORM with PostgreSQL
✅ Swagger API Documentation (/api)
✅ File Upload Handling
✅ Token Blacklisting for Logout

🛠 Installation & Setup
🔹 1️⃣ Clone the Repository
git clone <your-repo-url>
cd <your-project-folder>

🔹 2️⃣ Install Dependencies
npm install

🔹 3️⃣ Configure Environment Variables
Create a .env file and set up database, JWT secrets, and other configurations.

🔹 4️⃣ Run Database Migrations
npx prisma migrate dev --name init

🔹 5️⃣ Seed Initial Data (Roles & Admin User)
npx prisma db seed

🔹 6️⃣ Start the Server
npm run start:dev


📚 API Modules
🔹 1. Authentication Module (auth)
Handles user registration, login, and logout.
🔹 POST /auth/signup – Register a new user
🔹 POST /auth/signin – Login & get JWT token
🔹 POST /auth/logout – Blacklist JWT & logout

🔹 2. User Module (users)
Manages user profiles & role assignments.
🔹 GET /users – Fetch all users
🔹 GET /users/:id – Get user by ID
🔹 PATCH /users/:id – Update user details
🔹 DELETE /users/:id – Remove a user

🔹 3. Role Module (roles)
Manages role-based permissions.
🔹 GET /roles – List all roles
🔹 POST /roles – Create a new role
🔹 PATCH /roles/:id – Modify a role
🔹 DELETE /roles/:id – Delete a role

🔹 4. Document Module (document)
Handles file uploads & document management.
🔹 POST /document/upload – Upload a file
🔹 GET /document/:id – Retrieve file by ID
🔹 GET /document – List all files
🔹 PATCH /document/:id – Update file info
🔹 DELETE /document/:id – Delete a file

📖 Swagger API Documentation
💡 How to access Swagger UI?
1️⃣ Open http://localhost:3000/api
2️⃣ Click on Authorize 🔑 and enter your JWT token
3️⃣ Now all API requests will be authenticated ✅

