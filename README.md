# Employee Management System

This is a React-based Employee Management System that allows users to authenticate, view, edit, and delete user records. The application demonstrates modern React practices with a responsive UI and proper API integration.

## Features

- **Authentication System**
  - User login with email and password
  - Token-based authentication
  - Token persistence in localStorage

- **User Management**
  - View all users in a paginated list
  - Edit user details (first name, last name, email)
  - Delete users with confirmation
  - Search and filter functionality

- **Responsive Design**
  - Works on mobile, tablet, and desktop
  - Adapts layout based on screen size
  - Clean, modern UI with Tailwind CSS

- **Error Handling**
  - Form validation
  - API error handling
  - User-friendly error messages

## Technologies Used

- **React**: Frontend UI library
- **React Router**: For navigation and protected routes
- **Axios**: For API requests
- **Tailwind CSS**: For styling
- **LocalStorage**: For token persistence

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/your-username/employee-management-system.git
   cd employee-management-system
   ```

2. Install dependencies
   ```
   npm install
   ```
   or
   ```
   yarn
   ```

3. Start the development server
   ```
   npm run dev
   ```
   or
   ```
   yarn dev
   ```

4. Open your browser and navigate to http://localhost:5173

## Usage

### Login

Use the following credentials to log in:
- Email: eve.holt@reqres.in
- Password: cityslicka

### Users List

After login, you'll be redirected to the users list page where you can:
- View all users
- Edit user details
- Delete users
- Search users by name or email
- Filter users alphabetically
- Navigate through pages

## API Integration

This project uses the reqres.in API:

- Login: POST /api/login
- Get Users: GET /api/users?page=1
- Update User: PUT /api/users/{id}
- Delete User: DELETE /api/users/{id}

## Project Structure

```
src/
├── Components/
│   ├── Login.jsx      # Login page component
│   └── Users.jsx      # Users list component with CRUD
├── Utils/
│   └── AxiosApis.jsx  # API configuration
├── App.jsx            # Main app component with routes
└── main.jsx           # Entry point
```

## Assumptions and Considerations

1. The reqres.in API is a demo API, so it doesn't actually update or delete users permanently. The changes appear to work but are not persisted on the server.

2. For a real-world application, additional features would be implemented:
   - User registration
   - Password reset
   - More advanced user management
   - Role-based access control

## License

This project is open source and available under the [MIT License](LICENSE).
