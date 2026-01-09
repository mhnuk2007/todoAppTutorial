# 🧩 Angular Todo App – Complete Step-by-Step Tutorial

This tutorial will guide you through building a modern, production-ready Todo application using Angular's latest features including standalone components and signals.

---

## **Step 1: Understand the Goal**

We are building a modern Todo application that allows users to:

- ✅ Add, edit, and delete tasks
- ✅ Mark tasks as completed or in progress
- ✅ Filter, search, and sort tasks
- ✅ Persist data using LocalStorage
- ✅ Use Angular signals for reactive state management
- ✅ Enjoy a beautiful, animated UI

---

## **Step 2: Create the Angular Project**

Create a new Angular application:

```bash
ng new todo-app
cd todo-app
ng serve
```

**During setup, choose:**
- ✅ CSS for styling
- ❌ No routing (for this simple app)

Your app will run at `http://localhost:4200`

- run the app with 'ng serve' in terminal


---
## **Step 3: Create the Todo Component**

Generate todo-app component:

```bash
ng generate component todo-app
```

This creates:
- `todo-app.ts` - Component logic
- `todo-app.html` - Template
- `todo-app.css` - Styles
- `todo-app.spec.ts` - Testing


---
