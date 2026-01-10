# 🧩 Angular Todo App – Complete Step-by-Step Tutorial

This tutorial will guide you through building a modern, production-ready Todo application using Angular's latest features, including signals for reactive state management.

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

Now we need to add 'create task' functionality. Let's move to template to modify input box and add task button.

---
## **Step 9: Connect Template to Data Model**

Now we need to add 'create task' functionality. Let's modify the template to connect the input box and add task button.

### **Remove the `<form>` tag:**

In `todo-app.html`, remove the `<form>` wrapper:

```html
<!-- Remove <form> and </form> tags -->
<section class="custom-card">
  <div class="row g-3 align-items-center">
    <!-- your inputs here -->
  </div>
</section>
```

**Why avoid `<form>` with `ngModel`?**

When `ngModel` is used inside a `<form>` tag, Angular requires either:
1. A `name` attribute on each input, OR
2. `[ngModelOptions]="{standalone: true}"` on each input

Without these, you'll get an error: `NG01352`

**If you must use `<form>` with `ngModel`, do this:**
```html
<form>
  <input [(ngModel)]="newTask.todoItem" name="todoItem" />
  <select [(ngModel)]="newTask.status" name="status"></select>
</form>
```

### **Establish two-way binding:**

Connect the input field to your data model using `[(ngModel)]`:

```html
<input
  type="text"
  [(ngModel)]="newTask.todoItem"
  class="form-control"
  placeholder="What needs to be done?">
```

### **Create `addTask()` function:**

In `todo-app.ts`, add the following method:

```typescript
addTask() {
  console.log(this.newTask.todoItem);
}
```

### **Bind button click event:**

Update the button in your template:

```html
<button (click)="addTask()" class="btn btn-primary-custom w-100">
  Add
</button>
```

### **Test it:**

Type something in the input box, click the "Add" button, and check the browser console. You should see your input logged!

---
## **Step 10: Create Add Task Logic**

Implement the method to add new tasks:

```typescript
addTask() {
    // Validate input
    if (!this.newTask.todoItem.trim()) {
      return;
    }

    // Generate unique ID and set creation date
    const newDate = new Date();
    this.newTask.todoItemId =
      this.todoList().length + 1 + newDate.getDay() + newDate.getMilliseconds();
    this.newTask.createdDate = newDate;

    // Add task immutably
    this.todoList.update((list)=>{
      return [...list, {...this.newTask}]})

    // Persist to storage
    localStorage.setItem(this.localKeyName, JSON.stringify(this.todoList()));

    // Reset form
    this.newTask = new TodoItemModel();
  }
```

**Key principles:**
- ✅ Always validate before saving
- ✅ Each task has unique ID
- ✅ Never mutate state directly (use spread operator `...`)
- ✅ Create a copy of the task object
- ✅ Save data to local storage
- ✅ Reset form after successful save

---
## **Step 11: Generate Unique Task ID and Save to LocalStorage**

Create a helper method for generating IDs:

```typescript
generateId() {
  const newDate = new Date();
    this.newTask.todoItemId =
      this.todoList().length + 1 + newDate.getDay() + newDate.getMilliseconds();
    this.newTask.createdDate = newDate;
}
```
2. saveToLocalStorage()

Persists the current task list to LocalStorage:

```typescript
saveToLocalStorage() {
  localStorage.setItem(this.localKeyName, JSON.stringify(this.todoList()));
}
```

**Why this approach?**
- generateId() ensures each task has a reasonably unique ID for client-side usage.
- saveToLocalStorage() keeps persistence logic separate from task addition logic.
- Improves code readability and makes addTask() cleaner.
- When adding a backend in the future, you can replace generateId() with server-generated IDs.

---
# Step 12: Replace Static HTML with Dynamic Angular Template

Now that we have our component logic in place, let's replace the static HTML with a dynamic Angular template that displays tasks from our `todoList` signal.

## Understanding the Changes

We're going to transform the hardcoded task items into a dynamic list that:
- ✅ Automatically displays tasks from our signal
- ✅ Shows/hides the empty state based on task count
- ✅ Binds task properties to the UI
- ✅ Applies conditional styling for completed tasks

## Replace the Task List Section

In `todo-app.html`, locate the `<ul class="task-list">` section and replace it with the following dynamic template:
```html
<ul class="task-list">

  @if (todoList().length > 0) {

    @for (item of todoList(); track item.todoItemId) {

      <li class="task-item"
          [class.completed]="item.status === 'Completed'">

        <!-- Checkbox -->
        <div class="task-checkbox-wrapper">
          <input
            type="checkbox"
            class="task-checkbox"
            [id]="'task-' + item.todoItemId"
            [checked]="item.status === 'Completed'">

          <label
            [for]="'task-' + item.todoItemId"
            class="checkbox-label"></label>
        </div>

        <!-- Content -->
        <div class="task-content">
          <span class="task-title">
            {{ item.todoItem }}
          </span>

          <div class="task-meta">

            <span
              class="status-badge"
              [ngClass]="{
                'pending': item.status === 'Pending',
                'progress': item.status === 'In Progress',
                'completed': item.status === 'Completed'
              }">
              {{ item.status }}
            </span>

            <span class="meta-date">
              <i class="fa-regular fa-calendar"></i>
              {{ item.createdDate | date:'MMM d, y' }}
            </span>

          </div>
        </div>

        <!-- Actions -->
        <div class="task-actions">
          <button class="btn-icon edit" aria-label="Edit">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="btn-icon delete" aria-label="Delete">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>

      </li>
    }
  }

</ul>

<!-- Empty State -->
@if (todoList().length === 0) {
  <div class="empty-state mt-4">
    <i class="fa-solid fa-clipboard-check empty-icon"></i>
    <h5>No tasks found</h5>
    <p class="mb-0 small">You're all caught up! Add a new task above.</p>
  </div>
}
```

## Understanding the Angular Syntax

### 1. Control Flow Blocks (`@if`, `@for`)

Angular 17+ introduced new control flow syntax:
```html
@if (todoList().length > 0) {
  <!-- Show when tasks exist -->
}
```

This replaces the older `*ngIf` directive with cleaner, more readable syntax.

### 2. The `@for` Loop
```html
@for (item of todoList(); track item.todoItemId) {
  <!-- Repeat for each task -->
}
```

- Loops through each item in `todoList()`
- `track item.todoItemId` helps Angular efficiently update the DOM
- Similar to `*ngFor` but with better performance

### 3. Property Binding (`[property]`)
```html
[id]="'task-' + item.todoItemId"
[checked]="item.status === 'Completed'"
```

- Binds component data to HTML attributes
- Dynamically sets values based on task properties

### 4. Class Binding
```html
[class.completed]="item.status === 'Completed'"
```

- Conditionally adds the `completed` CSS class
- Applies strikethrough styling to finished tasks

### 5. NgClass Directive
```html
[ngClass]="{
  'pending': item.status === 'Pending',
  'progress': item.status === 'In Progress',
  'completed': item.status === 'Completed'
}"
```

- Applies different CSS classes based on task status
- Changes badge color dynamically

### 6. Interpolation (`{{ }}`)
```html
{{ item.todoItem }}
{{ item.status }}
```

- Displays component data in the template
- Automatically updates when signal changes

### 7. Pipe Operator (`|`)
```html
{{ item.createdDate | date:'MMM d, y' }}
```

- Formats the date for display
- Transforms raw data into user-friendly format

## Test It Out

Now when you add a task, it should:
1. ✅ Appear in the list immediately
2. ✅ Display the correct status badge
3. ✅ Show formatted creation date
4. ✅ Hide the empty state message

Try adding multiple tasks with different statuses to see them render dynamically!

---
