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
