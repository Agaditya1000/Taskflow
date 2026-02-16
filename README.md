# TaskFlow - Premium Task Management Board

A modern, glassmorphism-styled Task Board application built with React, ensuring a premium user experience and efficient task management.

**[Live Demo](https://taskflow-hintro.netlify.app/)**

## Features

-   **Drag & Drop Interface**: Effortlessly move tasks between Todo, Doing, and Done columns.
-   **Static Authentication**: Secure login flow with persistence.
-   **Task Management**: Create, Edit, Delete, and Tag tasks.
-   **Smart Filtering**: Filter by priority level and search by title.
-   **Persistence**: All data is saved to `localStorage`, ensuring data safety across refreshes.
-   **Activity Log**: Track every action taken on the board.
-   **Responsive Design**: Fully responsive layout with a beautiful mesh gradient background.

## Tech Stack

-   **Frontend**: React 18, Vite
-   **Styling**: Vanilla CSS (CSS Variables, Glassmorphism), `clsx`
-   **State Management**: Context API
-   **Drag & Drop**: `@dnd-kit/core`, `@dnd-kit/sortable`
-   **Icons**: `lucide-react`
-   **Testing**: Vitest, React Testing Library

## Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Start Development Server**
    ```bash
    npm run dev
    ```

3.  **Run Tests**
    ```bash
    npm test
    # or
    npx vitest run
    ```

## Login Credentials

Use the following hardcoded credentials to access the application:

-   **Email**: `intern@demo.com`
-   **Password**: `intern123`

## Deployment

To deploy this application:

1.  Build the project:
    ```bash
    npm run build
    ```
2.  Deploy the `dist` folder to any static hosting provider like Netlify, Vercel, or GitHub Pages.

## Project Structure

```
src/
├── components/     # Reusable UI and Domain components
├── context/        # React Context (Auth, Task)
├── pages/          # Application Pages (Login, Board, Activity)
├── styles/         # CSS Variables and Global Styles
├── test/           # Test setup
└── App.jsx         # Main Entry with Routing
```
