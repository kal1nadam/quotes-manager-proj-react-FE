# Quote Management App

A **React TypeScript** frontend with **Mantine** component library for a .NET Web API. This project is a simple quote management application that allows users to manage their own quotes, while users with the admin role can manage all quotes. It also includes authorization with **JWT tokens** for secure access control.

## Backend Repository

This frontend connects to the .NET Web API backend for managing quotes. You can find the backend repository here:

[Backend Repository - kal1nadam-quotes-manager-api-dotnet-BE](https://github.com/kal1nadam/quotes-manager-api-dotnet-BE)


## Features

- **CRUD Operations**: Create, read, update, and delete quotes in a card format.
- **Role-based Authorization**:
  - Admin: Full access to manage all quotes.
  - Regular User: Access to manage only their own quotes.
- **Authentication**: JWT tokens are used for secure user authentication and authorization.
- **User Management**: Includes login and registration functionality.
- **React Router**: For navigation between pages.
- **Context API**: For global state management.
- **Interceptor**: For handling JWT token refreshing and request authorization.
- **Local Storage**: Stores JWT tokens and user session information.
- **Mantine UI**: Used for building the user interface with modern, accessible components.

## Tech Stack

- **Frontend**: React, TypeScript, Mantine, React Router, Context API
- **Backend**: .NET Web API
- **Authentication**: JWT tokens
- **State Management**: Context API
- **Storage**: Local Storage for persisting session data

## Setup Instructions

### Prerequisites

Ensure you have the following installed on your local development environment:

- Node.js (v18+)
- .NET 6+ (for backend API)
- A code editor like VS Code

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/kal1nadam/quotes-manager-proj-react-FE.git
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the frontend:

   ```bash
   npm run dev
   ```



## Backend Setup

For the .NET Web API, you will need to:

1. Clone the backend repository or build your own .NET API for quote management.
2. Set up the necessary endpoints for user registration, authentication, and quote management (CRUD operations).
3. Ensure the backend is running at the expected endpoint (e.g., [http://localhost:7173](http://localhost:7173)).

## JWT Authentication

Ensure that your backend API provides JWT tokens upon successful login and registration. The frontend intercepts these tokens and stores them in local storage, ensuring that authorized requests are sent to the API.

## Usage

1. **Login** or **Register** as a user to start managing your quotes.
2. Regular users can only manage their own quotes, while an admin can manage all quotes.
3. Add new quotes, edit existing ones, or delete quotes as needed.

## Pages

1. **Quotes Page**: Displays all quotes (admin) or user-specific quotes.
2. **My Quotes Page**: Accessible to logged-in users to manage their own quotes.


## Contributions

Feel free to fork the repository and submit pull requests. Contributions are welcome to improve the app!

  
