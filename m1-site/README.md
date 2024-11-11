# Online Library Management System - Frontend (m1-site)

<p align="center">
  <a href="https://nextjs.org/" target="blank"><img src="https://nextjs.org/static/favicon/favicon-32x32.png" width="120" alt="Next.js Logo" /></a>
</p>

## Description

This is the frontend for the Online Library Management System, built using **Next.js** along with **React**. The frontend is responsible for providing a user-friendly interface to interact with the backend services for managing books, authors, user accounts, and book reviews. We opted for a component-based architecture with **Next.js** to leverage **Server-Side Rendering (SSR)** for improved performance and SEO.

This README is aimed at guiding team members who may not be familiar with the technologies used. We'll break down the project structure, its major features, and technologies involved.

## Tech Stack
- **Frontend**: Next.js (React)
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Routing**: Next.js pages
- **Backend Integration**: REST API provided by the m1-api (NestJS backend)

### Why Next.js and React?
- **Next.js** is a React framework that provides many benefits out of the box, including **SSR (Server-Side Rendering)**, **SSG (Static Site Generation)**, and seamless **Routing**.
- **React** provides a component-based architecture, making it easy to manage and reuse UI components, which is crucial for a project like this where different entities like Books, Authors, and Reviews share UI patterns.

## Project Structure

```bash
sheikh@sheikh:~/Project/online_library/m1-site$ tree -I 'node_modules/|test|.next'
.
├── next.config.ts
├── next-env.d.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── public
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── README.md
├── src
│   ├── api
│   │   ├── bookApi.ts          # Methods for making API calls related to books
│   │   ├── authorApi.ts        # Methods for making API calls related to authors
│   │   └── userApi.ts          # Methods for making API calls related to user management
│   ├── app
│   │   ├── favicon.ico
│   │   ├── fonts
│   │   │   ├── GeistMonoVF.woff
│   │   │   └── GeistVF.woff
│   │   ├── globals.css         # Global CSS styles for the app
│   │   ├── layout.tsx          # Main layout for the application
│   │   └── page.tsx            # Home page for the application
│   ├── components
│   │   ├── author
│   │   │   ├── AuthorBooksList.tsx  # Lists books by a particular author
│   │   │   ├── AuthorCard.tsx       # Card UI component for displaying author info
│   │   │   └── AuthorForm.tsx       # Form for creating or updating an author
│   │   ├── book
│   │   │   ├── BookCard.tsx         # Card UI component for displaying book info
│   │   │   ├── BookForm.tsx         # Form for creating or updating a book
│   │   │   └── ReviewDrawer.tsx     # Drawer UI for viewing or adding reviews to books
│   │   └── layout
│   │       ├── Breadcrumb.tsx       # Breadcrumb component for navigation
│   │       ├── Footer.tsx           # Footer for the application
│   │       └── Navbar.tsx           # Navbar for the application
│   ├── pages
│   │   ├── authors
│   │   │   ├── [id].tsx             # Author details page
│   │   │   └── index.tsx            # List all authors
│   │   ├── books
│   │   │   ├── [id].tsx             # Book details page
│   │   │   └── index.tsx            # List all books
│   │   ├── index.tsx                # Home page of the application
│   │   └── user
│   │       ├── login.tsx            # Login page
│   │       └── profile.tsx          # User profile page
│   └── types
│       ├── author.d.ts              # Type definitions related to authors
│       ├── book.d.ts                # Type definitions related to books
│       └── user.d.ts                # Type definitions related to users
├── tailwind.config.ts
└── tsconfig.json



## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

