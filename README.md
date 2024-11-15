# Online Library Management System

## Description

### DEMO: [Google Drive Clone]()

<table width="100%"> 
<tr>
<td width="50%">      
&nbsp; 
<br>
<p align="center">
  ADMIN
</p>
<kbd><img src="./images/admin.png" /></kbd>
</td> 
<td width="50%">
<br>
<p align="center">
  CLIENT
</p>
<img src="./images/drive.png">  
</td>
</table>

An online library management system built using **NestJS** for the backend and  **React** for the frontend. It allows users to manage books, authors, user accounts, and book reviews.

This project is divided into two main parts:

- **Backend** (m1-api): Manages data (books, authors, user accounts) and handles server-side logic.
- **Frontend** (m1-site): A web interface to interact with the data, providing a friendly user experience.

## Tech Stack

- **Backend**: NestJS
- **Frontend**: React
- **Database**: MySQL
- **Authentication**: Session-based (instead of JWT)
- **Libraries**: Tailwind CSS for styling, Class-validator for backend validation, and TypeORM for database interaction.

## Installation

### Prerequisites

- **Node.js** (version 14 or above)
- **npm** or **yarn**
- **MySQL**

### Installation Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/dev-sheikh-ali/online_library.git
   cd online_library
   ```

2. **Backend Setup (NestJS)**

   ```bash
   cd m1-api
   npm install
   ```

   **Environment Variables**

   Create a `.env` file in the `m1-api` directory with the following content:

   ```env
   PORT=3001
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME= your_db_user
   DB_PASSWORD= your_db_user_pass
   DB_DATABASE=online_library
   SESSION_SECRET= generate_with_node
   ```

   **Explanation**: 
   - The `SESSION_SECRET` is used to sign and verify session cookies to ensure security. You can generate a strong, random value for this by using Node.js in the terminal:
     ```bash
     node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
     ```
     Copy the output and paste it as the value for `SESSION_SECRET` in the `.env` file.

   **MySQL Database Setup**

   Before running the backend, you need to create the MySQL database and user. Run the following commands in your MySQL shell:

   ```sql
   CREATE DATABASE online_library;
   CREATE USER 'user'@'localhost' IDENTIFIED BY 'pass@123';
   GRANT ALL PRIVILEGES ON online_library.* TO 'user'@'localhost';
   FLUSH PRIVILEGES;
   ```

   **Note**: Replace `'user'@'localhost'` with your actual MySQL database username and password.

   **Running the Backend Server**

   ```bash
   npm run start:dev
   ```

   The backend server will run by default on **[http://localhost:3001](http://localhost:3001)**.

3. **Frontend Setup (React)**

   ```bash
   cd ../m1-site
   npm install
   ```

   **Environment Variables**

   Create a `.env.local` file in the `m1-site` directory with the following content:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

   **Running the Frontend Server**

   ```bash
   npm run dev
   ```

   The frontend server will run by default on **[http://localhost:3000](http://localhost:3000)**.

## Backend Modules Overview

### Author Management Module

Handles CRUD operations for authors.

**Files**:

- **`author.controller.ts`**: Manages API endpoints for authors.
- **`author.service.ts`**: Contains the logic for author-related operations.
- **`dto/`**: Defines the data that can be sent or received.
- **`entities/`**: Defines the author model stored in the database.

### Book Management Module

Manages CRUD operations for books.

**Files**:

- **`book.controller.ts`**: Handles endpoints for book actions.
- **`book.service.ts`**: Business logic for managing books.
- **`dto/`**: Defines book data for APIs.
- **`entities/`**: Defines the book model.

### User Management Module

Manages user registrations, profile updates, etc.

**Files**:

- **`user_management.controller.ts`**: Handles user endpoints.
- **`user_management.service.ts`**: Contains user authentication and management logic.
- **`dto/`**: User registration, login, and update details.
- **`entities/`**: User model definitions.

### Review Management Module

Allows users to add reviews to books.

**Files**:

- **`review.controller.ts`**: Handles review-related endpoints.
- **`review.service.ts`**: Contains business logic for managing book reviews.
- **`dto/`**: Defines the data that can be sent or received for reviews.
- **`entities/`**: Defines the review model for the database.

## Usage

1. **Open the browser** and navigate to **[http://localhost:3000](http://localhost:3000)** to access the frontend.
2. Use the frontend UI to **create an account**, **login**, **add authors**, **add books**, and **write reviews**.

## Features Implemented So Far

- User registration, login, and profile management.

## Upcoming Features

- Improved authentication and user role management.
- Pagination for books and authors listing.
- Author Management: CRUD operations for authors.
- Book Management: CRUD operations for books.
- Review Management: Allow users to add reviews to books.
- Advanced search functionality for books and authors.

## Branching Strategy

To avoid any conflicts and to keep the `main` branch stable, follow the instructions below to create your own branches for development:

### Create a New Branch

1. First, make sure you’re on the `main` branch:

   ```bash
   git checkout main
   ```

2. Create a new branch where you will develop your feature or fix:
   
   ```bash
   git checkout -b feature/your-feature-name
   ```

### Make Your Changes and Commit Them

Add all your changes:

```bash
   git add files.tsx ,README.md , exmaple.js , another exmaple etc etc 
```

Commit your changes with a meaningful message:

```bash
   git commit -m "Add your feature description here"
```

### Push Your Branch to Remote Repository

Push your branch to the remote repository:

```bash
   git push origin feature/your-feature-name
```

### Create a Pull Request (PR)

Once your branch is pushed to GitHub, you need to create a Pull Request (PR) to request that your changes be merged into the `main` branch:

1. Go to the [GitHub page of the repository](https://github.com/dev-sheikh-ali/online_library).
2. Click on **Compare & pull request** for your recently pushed branch.
3. Add a title and description for your Pull Request.
4. Click **Create pull request** to submit your PR.

### What Is a Pull Request?

A **Pull Request** (PR) is a request to merge your changes into the `main` branch. It allows your teammates to review your code, suggest changes, or approve it. This ensures that all code added to the main project is thoroughly reviewed.

Feel free to contribute to the project by creating pull requests or submitting issues on GitHub.

