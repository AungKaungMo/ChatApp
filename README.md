# ChatApp

A real-time messaging app built with Node.js, Express, MongoDB, React, and TypeScript. This app supports text-based messaging, real-time updates using WebSockets, active user tracking, and contact searching. It leverages Shadcn for UI components, Zod for validation, React Hook Form for form handling, Zustand for state management, and is fully Dockerized for easy deployment.

## Features

- **Message Sending**: Send and receive text-based messages.
- **Real-time Messaging**: Instant updates using WebSockets (Socket.io).
- **Active User Tracking**: View who is currently online.
- **Contact Search**: Search for contacts by username or email.
- **Authentication**: Secure token-based authentication with JWT.
- **Validation**: Zod ensures schema validation for user inputs and forms.
- **State Management**: Zustand for global state management.
- **Form Handling**: Simplified form handling with React Hook Form and integrated Zod validation.
- **Dockerized Deployment**: Simplified deployment using Docker.

## Technologies Used

### Frontend

- React
- TypeScript
- React Query (server state management)
- Zustand (global state management)
- React Hook Form (form handling)
- Zod (schema validation)
- Shadcn (UI components)
- Socket.io-client (real-time communication)
- Axios (API calls)
- Tailwind CSS (styling)

### Backend

- Node.js
- Express.js
- MongoDB (user data, messages, and contacts storage)
- Mongoose (ORM for MongoDB)
- Socket.io (real-time communication)
- JWT (authentication)
- Zod (validation)
- Bcrypt (password hashing)

### DevOps

- Docker (containerization for deployment)
- Docker Compose (managing multi-container apps)

## Installation

### Prerequisites

- Node.js (v20 or higher)
- MongoDB (local or Atlas)
- Docker

### Backend Setup

1. Clone the repository:

```bash
git clone https://github.com/AungKaungMo/ChatApp.git  
```
2. Create a .env file and add the following environment variables:

```bash
MONGO_URI=your_mongodb_connection_string  
JWT_KEY=your_jwt_secret_key  
PORT=9000
ORIGIN=frontend_ip-address
VITE_APP_BASE_URL=backend_url(eg.http://localhost:9000/api/)
VITE_APP_SOCKET_URL=backend_url(eg.http://localhost:9000)
```

3. Navigate to the backend directory:

```bash
cd ChatApp/server  
```

4. Install dependencies:

```bash
npm install  
```

5. Run the server:

```bash
npm run dev 
```

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd chatapp/client  
```

2. Install dependencies:

```bash
npm install 
```

3. Start the React development server:

```bash
npm run dev
```

4. Open your browser and go to http://localhost:3000 to use the app.

## Dockerized Setup

1. Ensure Docker is installed on your system.

2. Build and start the containers:

```bash
docker-compose up --build  
```

## API Endpoints

### Authentication

- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Log in with email and password to get a JWT token.
- **POST /api/auth/logout**: Log out user.
- **GET /api/auth/user-info**: Get user information.
- **PUT /api/auth/update-profile/:id**: Update user profile.

### Profile

- **POST /api/profile/upload-image**: Upload user profile image.
- **DELETE /api/profile/delete-image**: Delete user profile image.

### Contact

- **POST /api/contact/search**: Search contacts.
- **GET /api/contact/friends**: Get friend list.
- **GET /api/contact/friends/:id**: Get friend detail.
- **GET /api/contact/unknown-friends**: Get unknown friend list.

### Message

- **GET /api/message/get-messages**: Get Messages.

## Contributing

Feel free to fork the repository, create issues, or submit pull requests.

## License

This project is licensed under the MIT License.
