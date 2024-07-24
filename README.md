# Health Consultancy App

Welcome to the Health Consultancy App! This application is designed to provide a platform for managing consultations and patient records in a healthcare facility.

## Link to deployed project

`https://health-consultancy.vercel.app/`

## Features

- **User Authentication**: Secure authentication system for users including login, registration, and token-based authorization.
- **Consultation Management**: CRUD operations for managing consultations between healthcare professionals and patients.
- **Patient Records**: Track patient information including demographics, medical history, and consultation records.
- **Role-Based Access Control**: Different levels of access for administrators, healthcare professionals, and patients.

## Technologies Used

- **Frontend**:

  - React.js
  - Redux for state management
  - Material-UI for UI components
  - Axios for HTTP requests

- **Backend**:
  - Node.js with Express.js
  - PostgreSQL for database management
  - Sequelize ORM for database interactions
  - JSON Web Tokens (JWT) for authentication

## Installation

To run this application on your local system, follow these steps:

1. Clone this repository to your local machine:
   `git clone https://github.com/nimba005/Health_consultancy.git`

2. Navigate to the project directory:
   `cd Health_consultancy`

3. Install dependencies for both frontend and backend:

```
cd frontend
npm install

cd ../backend
npm install
```

4. Create a `.env` file in the `backend` directory and add the following environment variables:

```
APP_SECRET=your_secret_key_for_jwt
PORT = 3000
APP_SECRET = your_app_secret
NODE_ENV=development
DB_PORT = db_port
DB_NAME = db_name
DB_USERNAME = db_username
DB_PASSWORD = db_password
DB_HOST = db_host
```

5. Start the backend server:
   `npm run build`
   On another terminal `npm run dev`

6. In a separate terminal, start the frontend:

```
cd frontend
npm start
```

## Feel free to explore the various features and functionalities of the Health Consultancy App!
