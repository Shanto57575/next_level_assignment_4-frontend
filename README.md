Excellent, Shanto! Let’s compile two professional README.md files for your **Minimal Library Management System**—one for the frontend, one for the backend. I’ll also align the frontend README with the API routes from your `libraryApi` snippet.

---

# ✅ Frontend README.md

```markdown
# 📚 Minimal Library Management System — Frontend

This is the **Frontend** of the Minimal Library Management System built with:

- **React** (with TypeScript)
- **Redux Toolkit + RTK Query**
- **Tailwind CSS**

The app lets users:

- View all books
- Add new books
- Edit book details
- Delete books
- Borrow books
- View borrow summary

All actions are integrated with a REST API (no authentication required).

---

## 🚀 Live Demo

[Frontend Live URL](#) <>

---

## 🛠️ Tech Stack

| Layer              | Technology          |
| ------------------- | ------------------- |
| Frontend            | React + TypeScript  |
| State Management    | Redux Toolkit + RTK Query |
| Styling             | Tailwind CSS + ShadCN ui       |
| API Integration     | RESTful API         |

---

## 📂 Folder Structure (Simplified)

```

src/
components/          // Navbar, Footer, UI components
features/            // Books, Borrow feature components
pages/               // Each route/page
services/            // RTK Query API definitions
interfaces/          // TypeScript types/interfaces
App.tsx
main.tsx

````

---

## 🔗 Available Routes

| Frontend Route | Description |
| -------------- | ----------- |
| `/books`       | View all books |
| `/create-book` | Create a new book |
| `/edit-book/:id` | Edit an existing book |
| `/books/:id`   | View book details |
| `/borrow/:bookId` | Borrow a specific book |
| `/borrow-summary` | See summary of borrowed books |

---
## ⚙️ Setup & Run Locally

1. **Clone the repo**

```bash
git clone hhttps://github.com/Shanto57575/next_level_assignment_4-frontend
cd next_level_assignment_4-frontend
````

2. **Install dependencies**

```bash
npm install
```

3. **Run development server**

```bash
npm run dev
# or
yarn dev
```

4. Open:

```
http://localhost:5173
```

---

## 💡 Features Implemented

✅ Responsive UI
✅ CRUD operations for books
✅ Borrow functionality
✅ Borrow summary view
✅ Toast notifications

---

## 🎨 Styling

* Fully responsive layout using Tailwind CSS.

---

## ⚠️ Notes

* No authentication implemented in this version.
* Works seamlessly with the provided backend.

