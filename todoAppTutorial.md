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
```

**During setup, choose:**
- ✅ CSS for styling
- ❌ No routing (for this simple app)

You can run your app at any time to see the progress:
```bash
ng serve
```
Your app will run at `http://localhost:4200`.

---
## **Step 3: Create the Todo Component**

Generate the `todo-app` component:

```bash
ng generate component todo-app
```

This creates:
- `todo-app.ts` - Component logic
- `todo-app.html` - Template
- `todo-app.css` - Styles
- `todo-app.spec.ts` - Testing

---
## **Step 4: Update app.html and app.ts**

Replace the entire content of `src/app/app.html` with the following line to display your new component:

```html
<app-todo-app />
```

Next, open `src/app/app.ts` and import the `TodoApp` component. Your `app.ts` should look like this:

```typescript
import { Component, signal } from '@angular/core';
import { TodoApp } from "./todo-app/todo-app";

@Component({
  selector: 'app-root',
  imports: [TodoApp],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('todoAppTutorial');
}
```
---
## **Step 5: Import Required Angular Modules**

At the top of `todo-app.ts`, import necessary modules:

```typescript
import { DatePipe, NgClass } from '@angular/common';
import { Component, OnInit, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
```

**What each import does:**
- `FormsModule` → Enables template-driven forms (ngModel)
- `NgClass` → Conditional CSS classes
- `DatePipe` → Format dates for display
- `signal, computed` → Reactive state management

Add to component decorator:

```typescript
@Component({
  selector: 'app-todo-app',
  imports: [FormsModule, NgClass, DatePipe],
  templateUrl: './todo-app.html',
  styleUrl: './todo-app.css',
})
```

**Why standalone?**
- No NgModule needed
- Lighter bundle size
- Modern Angular best practice

---
## **Step 6: Create the Todo App UI**

I have generated a modern, professional UI for the Todo App with the help of Gemini, using the following prompt:
```
Design a clean, modern, and professional Todo Application UI using Bootstrap 5 and Font Awesome icons.

Requirements:

Provide static HTML and CSS only
❌ Do not include JavaScript

Use a modern dark theme with soft accent colors
Clean spacing, rounded corners, and subtle shadows
Smooth CSS-based animations and hover effects

UI Sections to Include:

Header
- App title and short subtitle
- Minimal icon-based branding

Add / Edit Task Section
- Text input to add a new task
- Button to add or update a task
- Dropdown to change task status (Pending, In Progress, Completed)

Search & Controls
- Search input field
- Status filter dropdown
- Sort dropdown (Newest / Oldest)

Task List
- List of todo items styled as cards
- Each item displays:
  - Task title
  - Status badge
  - Created date
  - Action icons (edit, delete)
- Completed tasks:
  - Strikethrough text
  - Muted styling

Empty State
- Friendly message when no tasks exist
- Icon-based illustration

Design Guidelines:
- Use Bootstrap 5 utility classes where possible
- Use Font Awesome icons consistently
- Dark background with readable contrast
- CSS animations for:
  - Button hover
  - Task hover
  - Status badge transitions

Output:
- One HTML file
- One CSS file
- Fully responsive layout

❗ Do not include JavaScript or Angular code.
```
Add generated html in todo-app.html and css in todo-app.css

---
## **Step 7: Define the Task Model**

Create a model class to define the structure of each task:

```typescript
class TodoItemModel {
  todoItemId: number;
  todoItem: string;
  createdDate: Date;
  status: string;

  constructor() {
    this.todoItemId = 0;
    this.todoItem = '';
    this.createdDate = new Date();
    this.status = 'Pending';
  }
}
```

**Why use a model?**
- Ensures consistent data structure
- Provides default values
- Makes code more maintainable
- Easier to add TypeScript type checking

**Available statuses:**
- `Pending` - Task not started
- `In Progress` - Task being worked on
- `Completed` - Task finished

---
## **Step 8: Create Reactive State Using Signals**

Inside your component class, define the core state:

```typescript
export class TodoApp implements OnInit {
  newTask: TodoItemModel = new TodoItemModel();
  
  // Main signal - single source of truth
  todoList = signal<TodoItemModel[]>([]);

  // Filter and search properties
  searchText: string = '';
  filterStatus: string = 'All';
  sortOrder: string = 'newest';
  
}
```

**Why signals?**
- ⚡ Automatic change detection
- 🎯 Simple, predictable updates
- 🚀 Better performance than RxJS for simple state
- 📦 No manual subscriptions needed

**State properties explained:**
- `newTask` - Holds the form data for add/edit
- `todoList` - The signal containing all tasks
- `searchText` - User's search input
- `filterStatus` - Selected filter (All/Pending/In Progress/Completed)
- `sortOrder` - Sort by newest or oldest first

---


