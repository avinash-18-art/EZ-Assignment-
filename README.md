# Secure File Sharing System

A secure file-sharing system built with **Node.js**, **MongoDB**, and **JWT-based authentication**. This system allows users to upload, list, and download files with role-based access control.

---

## Features

1. **User Authentication**:

   - **Sign Up**: Users can register with their email and password.
   - **Login**: Secure login using JWT tokens.
   - **Email Verification**: Users must verify their email before accessing the system.

2. **Role-Based Access**:

   - **Ops User**: Can upload files.
   - **Client User**: Can view and download files.

3. **File Management**:

   - **Upload**: Ops Users can upload specific file types.
   - **List Files**: Client Users can view the uploaded files.
   - **Download**: Securely generate download links for files.

4. **Secure Communication**:
   - JWT tokens for authenticated routes.
   - Encrypted download links to protect file access.

---

## Project Structure

/file-sharing-system /config - db.js # Database connection /models - User.js # User schema - File.js # File schema /routes - authRoutes.js # Authentication routes - fileRoutes.js # File management routes /controllers - authController.js # Authentication logic - fileController.js # File management logic /middleware - authMiddleware.js # JWT middleware for route protection

---

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **File Uploads**: Multer
- **Email Notifications**: Nodemailer
- **Encryption**: Crypto module

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/file-sharing-system.git
   cd file-sharing-system

   ```

2. npm install

3. Set up environment variables in a .env file: MONGO_URI=mongodb://localhost:27017/fileSharing JWT_SECRET=your_secret_key EMAIL=your_email@example.com EMAIL_PASSWORD=your_email_password BASE_URL=http://localhost:5000

4. Start the server: npm start

5. API Endpoints Authentication Endpoints Method Endpoint Description Requires Auth POST /auth/signup Register a new user No POST /auth/login Log in and get a token No GET /auth/verify/:token Verify user email No

6. File Management Endpoints Method Endpoint Description Requires Auth POST /files/upload Upload a file Yes (Ops User) GET /files/list-files List all uploaded files Yes (Client User) GET /files/download/:id Download a file securely Yes (Client User)

7. Roles and Permissions Role Permissions Ops User Upload files Client User View and download files

8. File Types Supported File Type .docx (Microsoft Word documents) .pptx (Microsoft PowerPoint presentations) .xlsx (Microsoft Excel spreadsheets)

## Testing

Use Postman or any API testing tool. Test each endpoint with valid and invalid inputs. Verify that: Files are only uploaded by Ops Users. Files are only downloaded by Client Users with a valid token.

## Future Enhancements

Add support for additional file types. Implement file size limits. Introduce an admin role for better management.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contact

For any queries or suggestions, feel free to contact:

Author: Avinash Chauhan Email: chauhanavinash36869@gmail.com GitHub: https://github.com/avinash-18-art
