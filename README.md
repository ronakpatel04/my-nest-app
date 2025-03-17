# 📌 Project Name

## 📝 Overview

This project is a **Role-Based Access Control (RBAC) System** built with **NestJS, Prisma, and PostgreSQL**. It includes authentication, authorization, file management, ingestion management, and role-based access to various modules. The system is designed to be scalable, secure, and easy to maintain.

## 📂 Project Structure

```yaml
📦 project-root
├── 📂 src
│   ├── 📂 auth
│   │   ├── 📜 auth.module.ts
│   │   ├── 📜 auth.service.ts
│   │   ├── 📜 auth.controller.ts
│   │   ├── 📜 jwt.strategy.ts
│   │   ├── 📜 roles.decorator.ts
│   │   └── 📜 public.decorator.ts
│   ├── 📂 role
│   │   ├── 📜 role.module.ts
│   │   ├── 📜 role.service.ts
│   │   └── 📜 role.controller.ts
│   ├── 📂 permission
│   │   ├── 📜 permission.module.ts
│   │   ├── 📜 permission.service.ts
│   │   └── 📜 permission.controller.ts
│   ├── 📂 document
│   │   ├── 📜 document.module.ts
│   │   ├── 📜 document.service.ts
│   │   └── 📜 document.controller.ts
│   ├── 📂 ingestion
│   │   ├── 📜 ingestion.module.ts
│   │   ├── 📜 ingestion.service.ts
│   │   └── 📜 ingestion.controller.ts
│   ├── 📂 common
│   ├── 📂 prisma
│   ├── 📂 utils
│   ├── 📜 app.module.ts
│   └── 📜 main.ts
├── 📂 test            # Contains unit & e2e tests
├── 📜 .env            # Environment variables
├── 📜 README.md       # Documentation
├── 📜 package.json    # Project dependencies
└── 📜 tsconfig.json   # TypeScript configuration
```

## ⚡ Installation & Setup

```sh
# Clone the repository
git clone https://github.com/your-repo.git

# Navigate to the project folder
cd project-root

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run database migrations
npx prisma migrate dev

# Start the application
npm run start:dev
```

## 🌱 Seeding the Database

Seeder files populate initial data such as roles and permissions.

### **Why Use Seeder Files?**

- Pre-defines roles like `Admin`, `Editor`, `User`
- Assigns default permissions

### **Running the Seeder File**

```sh
npx prisma db seed
```

## 🚀 API Modules & Endpoints

### **🔑 Authentication Module** (`auth`)

Handles user authentication with JWT.

#### **🔹 User Signup (Register a New User)**

- **Endpoint:** `POST /auth/signup`
- **Description:** Registers a new user with an email, password, and role.
- **Request Body:**

```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "roleName": "Admin"
}
```

- **Response:**
  - `201 Created` – When the user is successfully registered.
  - `400 Bad Request` – If validation fails.

##### **Success Response**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "email": "user@example.com",
  "role": "Admin",
  "message": "User registered successfully"
}
```

##### **Error Response**

```json
{
  "statusCode": 400,
  "message": "Email already exists",
  "error": "Bad Request"
}
```

✅ **Authentication Required?** No

#### **🔹 User Signin (Login & Generate JWT Token)**

- **Endpoint:** `POST /auth/signin`
- **Description:** Logs in a user and returns an access token for authentication.
- **Request Body:**

```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

- **Response:**
  - `200 OK` – When the login is successful.
  - `401 Unauthorized` – If credentials are invalid.

##### **Success Response**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsIn..."
}
```

##### **Error Response**

```json
{
  "statusCode": 401,
  "message": "Invalid email or password",
  "error": "Unauthorized"
}
```

✅ **Authentication Required?** No

## 🔐 Role-Based Access Control (RBAC)

This system supports **RBAC**, ensuring that users can only access resources they are permitted to. The `roles`, `permissions`, `documents`, and `ingestion` modules provide fine-grained access control.

### **Predefined Roles**

- **Admin**: Full access to all modules.
- **Editor**: Limited access to modify documents.
- **User**: Can only view assigned documents.

### **Permissions**

- Users have permissions based on their assigned roles.
- Permissions define what actions can be performed on resources.

### **Document Module**

- Allows CRUD operations for document management (upload, update, delete, retrieve).
- Stores document metadata in the database.

### **Ingestion Module**

- Implements ingestion trigger API to communicate with a Python service.
- Tracks ingestion status in the database.
- Handles ingestion management API to check progress.
- Supports error handling and retries if ingestion fails.

## 📌 API Authorization in Swagger

To enable **JWT Authorization in Swagger**, follow these steps:

1. Open Swagger UI (`http://localhost:3000/api`)
2. Click on `Authorize` 🔑
3. Enter `Bearer <your-jwt-token>`
4. Click `Authorize` ✅

## 🧪 Testing the Application

Run unit tests to ensure the system works correctly:

```sh
npm run test
```

Run end-to-end tests:

```sh
npm run test:e2e
```

### **Test Cases**

- **Authentication Tests**: Register, login, logout, and token verification.
- **Role & Permission Tests**: Assigning roles and permissions correctly.
- **Document Tests**: Upload, update, delete, and retrieve documents.
- **Ingestion Tests**: Validate ingestion workflow, API communication, and access control.

## 🎯 Conclusion

This project provides a **secure** and **scalable** RBAC system, enabling fine-grained access control for users, roles, documents, and ingestion processes. 🚀 It is optimized for real-world applications, ensuring maintainability and ease of use.

