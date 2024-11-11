# Online Library Management System

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Description

This project is an online library management system developed using the [NestJS](https://nestjs.com) framework. It provides a backend for managing books, authors, user accounts, and book reviews, offering a structured and modular approach to handling library-related operations.

The backend is implemented in a highly modular fashion, ensuring scalability, reusability, and easy maintenance. The use of TypeORM with SQLite provides simplicity for development while supporting migrations and entities.

## Tech Stack
- **Backend**: NestJS
- **Database**: SQLite
- **ORM**: TypeORM
- **Authentication**: JWT (to be implemented)
- **Libraries**: Class-validator for DTO validation, TypeORM for database management.

## Project Structure

```bash
sheikh@sheikh:~/Project/m1-api$ tree -I 'node_modules/|test'
.
├── nest-cli.json                  # Configuration file for Nest CLI.
├── package.json                   # Node.js dependencies and scripts.
├── package-lock.json              # Lockfile with exact versions of installed packages.
├── README.md                      # Project documentation.
├── src                            # Source directory containing the application's logic.
│   ├── app.controller.spec.ts     # Unit test file for the main application controller.
│   ├── app.controller.ts          # Controller for general application routes.
│   ├── app.module.ts              # Root application module, brings all other modules together.
│   ├── app.service.ts             # Application-level services shared across modules.
│   ├── config                     # Configuration settings for the application.
│   │   └── database.config.ts     # Configuration settings for the database connection (SQLite).
│   ├── main.ts                    # Entry point of the NestJS application.
│   └── modules                    # The core feature modules of the library system.
│       ├── author                 # Module for author-related functionality.
│       │   ├── author.controller.spec.ts
│       │   ├── author.controller.ts
│       │   ├── author.module.ts
│       │   ├── author.service.spec.ts
│       │   ├── author.service.ts
│       │   ├── dto
│       │   │   ├── create-author.dto.ts
│       │   │   └── update-author.dto.ts
│       │   └── entities
│       │       └── author.entity.ts
│       ├── book                   # Module for book-related functionality.
│       │   ├── book.controller.spec.ts
│       │   ├── book.controller.ts
│       │   ├── book.module.ts
│       │   ├── book.service.spec.ts
│       │   ├── book.service.ts
│       │   ├── dto
│       │   │   ├── create-book.dto.ts
│       │   │   └── update-book.dto.ts
│       │   └── entities
│       │       └── book.entity.ts
│       ├── review                 # Module for book review functionality.
│       │   ├── dto
│       │   │   ├── create-review.dto.ts
│       │   │   └── update-review.dto.ts
│       │   ├── entities
│       │   │   └── review.entity.ts
│       │   ├── review.controller.spec.ts
│       │   ├── review.controller.ts
│       │   ├── review.module.ts
│       │   ├── review.service.spec.ts
│       │   └── review.service.ts
│       └── user_management        # Module for managing users and authentication.
│           ├── dto
│           │   ├── create-user.dto.ts
│           │   ├── login-user.dto.ts
│           │   └── update-user.dto.ts
│           ├── entities
│           │   └── user.entity.ts
│           ├── user_management.controller.spec.ts
│           ├── user_management.controller.ts
│           ├── user_management.module.ts
│           ├── user_management.service.spec.ts
│           └── user_management.service.ts
├── tsconfig.build.json            # TypeScript configuration file for the build.
└── tsconfig.json                  # TypeScript configuration for the project.

15 directories, 45 files


```

The project is structured into several modules, each responsible for different features of the library system:

- **Author Module**: Handles operations related to authors, such as creating, updating, and listing authors.
  - **Location**: `src/modules/author`
  - **Files**:
    - `author.module.ts`: Defines the module.
    - `author.controller.ts`: Handles incoming HTTP requests related to authors.
    - `author.service.ts`: Contains the business logic for authors.
    - **DTOs**: (`dto/`) Define the structure of the data to be transferred in author-related requests.
    - **Entity**: (`entities/`) Defines the Author entity for the database.

- **Book Module**: Manages the creation, updating, and retrieval of books.
  - **Location**: `src/modules/book`
  - **Files**:
    - `book.module.ts`: Defines the module.
    - `book.controller.ts`: Handles book-related endpoints.
    - `book.service.ts`: Contains the business logic for managing books.
    - **DTOs**: (`dto/`) Define the structure of the data to be transferred in book-related requests.
    - **Entity**: (`entities/`) Defines the Book entity for the database.

- **User Management Module**: Responsible for managing user registration, login, and profile operations.
  - **Location**: `src/modules/user_management`
  - **Files**:
    - `user_management.module.ts`: Defines the module.
    - `user_management.controller.ts`: Handles user-related HTTP requests.
    - `user_management.service.ts`: Contains the logic for user management, including registration and authentication.
    - **DTOs**: (`dto/`) Define the user registration, login, and update data structure.
    - **Entity**: (`entities/`) Defines the User entity for the database.

- **Review Module**: Allows users to add reviews to books.
  - **Location**: `src/modules/review`
  - **Files**:
    - `review.module.ts`: Defines the module.
    - `review.controller.ts`: Handles review-related endpoints.
    - `review.service.ts`: Business logic for managing book reviews.
    - **DTOs**: (`dto/`) Define the structure of the data to be transferred in review-related requests.
    - **Entity**: (`entities/`) Defines the Review entity for the database.

- **Config Directory**: Contains configuration files for the application.
  - **Location**: `src/config`
  - **Files**:
    - `database.config.ts`: Configuration settings for the database connection.

- **Shared Directory**: Includes shared resources like utility functions, custom pipes, and guards.
  - **Location**: `src/shared`

## Features

1. **Author Management**: 
   - Create, update, delete, and list authors.
   - Each author can have multiple books associated with them.

2. **Book Management**:
   - Create, update, delete, and list books.
   - Each book has attributes like title, publication date, genre, and associated author.

3. **User Management**:
   - User registration, login, and profile management.
   - Secure authentication mechanisms (using JWT) to be implemented.

4. **Book Reviews**:
   - Users can add reviews to books, rate them, and leave optional comments.

## Project Setup

Follow these steps to set up and run the backend application:

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod

```

```bash
# Generate a migration
npm run typeorm migration:generate -- -n MigrationName

# Run migrations
npm run typeorm migration:run

```

## License

This version provides a more detailed and comprehensive explanation of the backend, its modules, features, and overall structure.
