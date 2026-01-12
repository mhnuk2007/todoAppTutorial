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
# Step 13: Implement Edit/Update Task Functionality

Now that users can add tasks, let's enable them to edit existing tasks. This step will allow users to click an edit button, modify the task details and status, then save the changes.

## Understanding the Edit Flow

The edit functionality works in three stages:
1. **Edit Mode**: User clicks edit button → task data loads into the form
2. **Update Mode**: User modifies the task and/or status, then clicks "Update"
3. **Cancel Mode**: User can cancel editing and return to add mode

## 1: Add the Edit Button Click Handler

In `todo-app.html`, update the edit button to call the `editTask()` function:

```html
<button (click)="editTask(item)" class="btn-icon edit" aria-label="Edit">
  <i class="fa-solid fa-pen"></i>
</button>
```

## 2: Create the `editTask()` Method

Add this method to `todo-app.ts`:

```typescript
editTask(data: TodoItemModel) {
  // Create a deep copy to avoid reference issues
  this.newTask = {
    ...data,
    createdDate: new Date(data.createdDate)
  };

  // Optional: Scroll to top to show the edit form
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
```

**Why create a copy?**
- Using the spread operator `{...data}` creates a new object
- Prevents direct mutation of the original task
- Ensures the form is independent from the list item
- The `createdDate` needs special handling to ensure it's a Date object

**What happens when you click edit?**
1. Task data is copied to `newTask`
2. Form fields auto-populate via `[(ngModel)]` binding
3. Page scrolls to top (optional UX improvement)
4. User can now modify the task

## 3: Modify the Template for Edit Mode

Update the "Add Task" section in `todo-app.html` to show different UI based on whether we're adding or editing:

### Show Status Selector Only in Edit Mode

```html
<div class="row g-3 align-items-center">
  <!-- Task Input - Always visible -->
  <div [ngClass]="newTask.todoItemId == 0 ? 'col-md-9' : 'col-md-5'">
    <label for="taskInput" class="visually-hidden">New Task</label>
    <div class="input-group">
      <span class="input-group-text">
        <i class="fa-solid fa-plus"></i>
      </span>
      <input
        type="text"
        [(ngModel)]="newTask.todoItem"
        class="form-control"
        placeholder="What needs to be done?">
    </div>
  </div>

  <!-- Status Selector - Only visible when editing -->
  @if(newTask.todoItemId > 0) {
    <div class="col-md-4">
      <label for="statusSelect" class="visually-hidden">Status</label>
      <select [(ngModel)]="newTask.status" class="form-select" id="statusSelect">
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  }

  <!-- Action Button - Changes based on mode -->
  <div class="col-md-3">
    @if(newTask.todoItemId == 0) {
      <!-- Add Mode -->
      <button (click)="addTask()" type="submit" class="btn btn-primary-custom w-100">
        Add
      </button>
    } @else {
      <!-- Edit Mode -->
      <button (click)="updateTask()" type="submit" class="btn btn-warning w-100">
        Update
      </button>
    }
  </div>
</div>
```

**Understanding the Dynamic Layout:**

1. **Task Input Width Changes:**
   - Add mode: Takes 9 columns (wider, no status needed)
   - Edit mode: Takes 7 columns (makes room for status dropdown)
   - Uses `[ngClass]` to dynamically adjust based on `newTask.todoItemId`

2. **Status Selector Visibility:**
   - Hidden when adding (`newTask.todoItemId == 0`) - new tasks are always "Pending"
   - Shown when editing (`newTask.todoItemId > 0`) - allows changing status
   - Bound to `newTask.status` via `[(ngModel)]`

3. **Button Changes:**
   - Add mode: Shows "Add" button, calls `addTask()`
   - Edit mode: Shows "Update" button, calls `updateTask()`
   - The `todoItemId` serves as our mode indicator (0 = add, >0 = edit)

## 4: Create the `updateTask()` Method

Add this method to handle the update operation:

```typescript
updateTask() {
  // Validate input
  if (!this.newTask.todoItem.trim()) {
    return;
  }

  // Update the task in the list
  this.todoList.update((list) => {
    return list.map((item) =>
      item.todoItemId === this.newTask.todoItemId
        ? { ...this.newTask }
        : item
    );
  });

  // Save to localStorage
  this.saveToLocalStorage();

  // Reset form to add mode
  this.newTask = new TodoItemModel();
}
```

**How the update works:**
1. **Validation**: Ensures the task text isn't empty
2. **Immutable Update**: Uses `map()` to create a new array
3. **Conditional Replace**: Replaces only the matching task by ID
4. **Persist**: Saves the updated list to localStorage
5. **Reset**: Clears the form and returns to add mode

**Why use `map()` instead of direct assignment?**
```typescript
// ❌ Don't do this (mutates state directly)
const task = this.todoList().find(t => t.todoItemId === id);
task.todoItem = newValue;

// ✅ Do this (immutable update)
this.todoList.update((list) => 
  list.map((item) => 
    item.todoItemId === id ? { ...this.newTask } : item
  )
);
```

## 5: Add Cancel Edit Functionality (Optional but Recommended)

Add a cancel button below the form when in edit mode:

```html
@if(newTask.todoItemId > 0) {
  <div class="mt-2">
    <button (click)="onCancelEdit()" class="btn btn-sm btn-outline-secondary">
      <i class="fa fa-times me-1"></i> Cancel Edit
    </button>
  </div>
}
```

Add the handler method:

```typescript
onCancelEdit() {
  this.newTask = new TodoItemModel();
}
```

**Why add cancel functionality?**
- Users might click edit by mistake
- Provides a clear way to exit edit mode
- Improves user experience

## 6: Visual Feedback - Highlight the Editing Task (Optional)

To help users see which task they're editing, add a visual indicator on the task item:

In your task list, add a conditional class:

```html
<li class="task-item"
    [class.completed]="item.status === 'Completed'"
    [class.editing]="item.todoItemId === newTask.todoItemId">
```

Then add this CSS to `todo-app.css`:

```css
.task-item.editing {
  border-color: #f59e0b;
  background-color: #fffbeb;
  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
}
```

This will highlight the task being edited with a yellow/amber border and background.

## Complete Code Summary

### In `todo-app.ts`:

```typescript
// Edit: Load task into form
editTask(data: TodoItemModel) {
  this.newTask = {
    ...data,
    createdDate: new Date(data.createdDate)
  };
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Update: Save changes
updateTask() {
  if (!this.newTask.todoItem.trim()) {
    return;
  }

  this.todoList.update((list) => {
    return list.map((item) =>
      item.todoItemId === this.newTask.todoItemId
        ? { ...this.newTask }
        : item
    );
  });

  this.saveToLocalStorage();
  this.newTask = new TodoItemModel();
}

// Cancel: Exit edit mode
onCancelEdit() {
  this.newTask = new TodoItemModel();
}
```

## Test the Functionality

1. ✅ Add a few tasks
2. ✅ Click the edit button on any task
3. ✅ Verify the form populates with task data
4. ✅ Modify the task text and/or status
5. ✅ Click "Update" and verify changes appear
6. ✅ Try canceling an edit
7. ✅ Refresh the page and verify changes persist

## Key Concepts Learned

- **Conditional Rendering**: Using `@if/@else` to show different buttons based on state
- **Deep Copying**: Creating independent copies of objects
- **Immutable Updates**: Using `map()` for state updates
- **Two-way Binding**: How `[(ngModel)]` keeps form and data in sync
- **User Experience**: Smooth scrolling and cancel options improve usability

---

# Step 14: Delete Task

Let's implement the ability to delete individual tasks with a confirmation dialog to prevent accidental deletions.

## Understanding the Delete Flow

When a user clicks the delete button:
1. ⚠️ A confirmation dialog appears
2. ✅ If user confirms → task is removed
3. ❌ If user cancels → nothing happens
4. 💾 Changes are saved to localStorage
5. 🔄 If the deleted task was being edited, the form clears

## Step 1: Add Delete Button Click Handler

In `todo-app.html`, update the delete button in the task actions:

```html
<!-- Actions -->
<div class="task-actions">
  <button (click)="editTask(item)" class="btn-icon edit" aria-label="Edit">
    <i class="fa-solid fa-pen"></i>
  </button>
  <button (click)="deleteTask(item.todoItemId)" class="btn-icon delete" aria-label="Delete">
    <i class="fa-solid fa-trash"></i>
  </button>
</div>
```

**What changed:**
- Added `(click)="deleteTask(item.todoItemId)"` event binding
- Passes only the `todoItemId` (we don't need the entire object)

## Step 2: Create the `deleteTask()` Method

Add this method to `todo-app.ts`:

```typescript
deleteTask(todoItemId: number) {
  // Confirm before deleting
  if (confirm('Are you sure you want to delete this task?')) {
    this.todoList.update((list) => {
      return list.filter((item) => item.todoItemId !== todoItemId);
    });
    
    this.saveToLocalStorage();
    
    // If we were editing this task, clear the form
    if (this.newTask.todoItemId === todoItemId) {
      this.newTask = new TodoItemModel();
    }
  }
}
```

## Understanding Each Part

### 1. Confirmation Dialog

```typescript
if (confirm('Are you sure you want to delete this task?')) {
  // Delete logic
}
```

- `confirm()` is a native browser function
- Shows a dialog with "OK" and "Cancel" buttons
- Returns `true` if user clicks "OK"
- Returns `false` if user clicks "Cancel"
- Code only runs if user confirms

**Why use confirmation?**
- Prevents accidental deletions
- No "undo" feature, so this is the safety net
- Standard UX practice for destructive actions

### 2. Filter Method for Deletion

```typescript
this.todoList.update((list) => {
  return list.filter((item) => item.todoItemId !== todoItemId);
});
```

**How `filter()` works for deletion:**
- Creates a new array
- Includes only items where the condition is `true`
- Excludes items where `item.todoItemId !== todoItemId` is `false`
- The task with matching ID is excluded (deleted)

**Why use `filter()` instead of `splice()`?**

```typescript
// ❌ Don't do this (mutates state directly)
const index = this.todoList().findIndex(t => t.todoItemId === id);
this.todoList().splice(index, 1);

// ✅ Do this (immutable deletion)
this.todoList.update((list) => 
  list.filter((item) => item.todoItemId !== id)
);
```

### 3. Clear Edit Form Safety Check

```typescript
// If we were editing this task, clear the form
if (this.newTask.todoItemId === todoItemId) {
  this.newTask = new TodoItemModel();
}
```

**Why is this needed?**

Imagine this scenario:
1. User clicks "Edit" on Task #5
2. Form loads with Task #5 data
3. User clicks "Delete" on Task #5
4. Task #5 is deleted from the list
5. **Without this check:** Form still shows Task #5 data
6. **Problem:** User might click "Update" but task doesn't exist!

**Solution:**
- Check if deleted task is currently being edited
- If yes, reset the form to add mode
- Prevents trying to update a non-existent task

### 4. Persist to LocalStorage

```typescript
this.saveToLocalStorage();
```

Ensures the deletion is permanent across page refreshes.

## Visual Feedback in the UI

The delete button should have hover effects. Verify this CSS exists in `todo-app.css`:

```css
.btn-icon.delete:hover {
  background-color: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}
```

This gives visual feedback when hovering over the delete button.

## Test the Delete Functionality

Follow these steps to thoroughly test:

1. ✅ **Basic deletion:**
   - Add 3-4 tasks
   - Click delete on one task
   - Verify confirmation dialog appears
   - Click "Cancel" → task should remain
   - Click delete again, then "OK" → task should disappear

2. ✅ **Edit mode safety:**
   - Add a task
   - Click "Edit" on that task
   - Verify form populates
   - Click "Delete" on the same task
   - Click "OK" in confirmation
   - Verify task is deleted AND form resets to add mode

3. ✅ **Persistence:**
   - Delete a task
   - Refresh the page
   - Verify the deleted task is still gone

4. ✅ **Empty state:**
   - Delete all tasks one by one
   - Verify empty state message appears

## Common Issues and Solutions

### Issue: Confirmation dialog doesn't appear
**Solution:** Check browser settings - some browsers block `confirm()` dialogs. Try in a different browser.

### Issue: Task doesn't disappear after deletion
**Solution:** Verify:
- `deleteTask()` method is called (add `console.log()`)
- `saveToLocalStorage()` is being called
- Signal update syntax is correct

### Issue: Can still edit deleted task
**Solution:** Ensure the form clearing logic is in place:
```typescript
if (this.newTask.todoItemId === todoItemId) {
  this.newTask = new TodoItemModel();
}
```

## Complete Code

### In `todo-app.html`:
```html
<div class="task-actions">
  <button (click)="editTask(item)" class="btn-icon edit" aria-label="Edit">
    <i class="fa-solid fa-pen"></i>
  </button>
  <button (click)="deleteTask(item.todoItemId)" class="btn-icon delete" aria-label="Delete">
    <i class="fa-solid fa-trash"></i>
  </button>
</div>
```

### In `todo-app.ts`:
```typescript
deleteTask(todoItemId: number) {
  // Confirm before deleting
  if (confirm('Are you sure you want to delete this task?')) {
    this.todoList.update((list) => {
      return list.filter((item) => item.todoItemId !== todoItemId);
    });
    
    this.saveToLocalStorage();
    
    // If we were editing this task, clear the form
    if (this.newTask.todoItemId === todoItemId) {
      this.newTask = new TodoItemModel();
    }
  }
}
```

## Key Concepts Learned

- **Confirmation Dialogs**: Using `confirm()` for destructive actions
- **Immutable Deletion**: Using `filter()` instead of `splice()`
- **Edge Case Handling**: Clearing edit form when deleting current task
- **User Safety**: Always confirm before permanent deletions
- **Signal Updates**: How `filter()` works with Angular signals

---

# Step 15: Toggle Task Completion

Let's add the ability for users to quickly mark tasks as complete or incomplete by clicking the checkbox. This provides a fast way to update task status without entering edit mode.

## Understanding Toggle Functionality

When a user clicks the checkbox:
- ✅ Completed tasks → become Pending
- ⏸️ Pending/In Progress tasks → become Completed
- The UI updates instantly via signals
- Changes persist to localStorage

## Step 1: Update the Checkbox Template

In `todo-app.html`, add the `(change)` event handler to the checkbox:

```html
<!-- Checkbox -->
<div class="task-checkbox-wrapper">
  <input
    type="checkbox"
    class="task-checkbox"
    [id]="'task-' + item.todoItemId"
    [checked]="item.status === 'Completed'"
    (change)="toggleComplete(item)"
  />

  <label [for]="'task-' + item.todoItemId" class="checkbox-label"></label>
</div>
```

**Key additions:**
- `(change)="toggleComplete(item)"` - Calls the toggle function when checkbox state changes
- `[checked]="item.status === 'Completed'"` - Already present, ensures checkbox reflects current status

## Step 2: Create the `toggleComplete()` Method

Add this method to `todo-app.ts`:

```typescript
toggleComplete(task: TodoItemModel) {
  this.todoList.update((list) => {
    return list.map((item) =>
      item.todoItemId === task.todoItemId
        ? { 
            ...item, 
            status: item.status === 'Completed' ? 'Pending' : 'Completed' 
          }
        : item
    );
  });
  
  this.saveToLocalStorage();
}
```

## Understanding Each Part

### 1. The Update Pattern

```typescript
this.todoList.update((list) => {
  return list.map((item) => /* ... */);
});
```

- Uses `update()` to modify the signal
- Uses `map()` to create a new array (immutable)
- Returns transformed version of each item

### 2. Finding the Target Task

```typescript
item.todoItemId === task.todoItemId
  ? { /* update this item */ }
  : item  // keep other items unchanged
```

- Ternary operator checks if this is the task to toggle
- If match found → create updated version
- If no match → return item unchanged

### 3. The Toggle Logic

```typescript
{
  ...item,  // Copy all properties
  status: item.status === 'Completed' ? 'Pending' : 'Completed'
}
```

**How the toggle works:**
- `...item` spreads all existing properties (id, text, date, etc.)
- `status:` overrides only the status property
- If current status is 'Completed' → set to 'Pending'
- Otherwise (Pending or In Progress) → set to 'Completed'

**Why toggle to "Pending" instead of previous status?**
- Simpler logic and predictable behavior
- Most common workflow: Pending → Completed → Pending
- Users can use edit mode to set "In Progress" if needed

### 4. Persist Changes

```typescript
this.saveToLocalStorage();
```

Ensures the completion status survives page refreshes.

## The Reactive Update Flow

Here's what happens when you click a checkbox:

```
1. User clicks checkbox
   ↓
2. (change) event fires
   ↓
3. toggleComplete(task) is called
   ↓
4. todoList.update() creates new array with map()
   ↓
5. Angular detects signal change
   ↓
6. Template automatically re-renders
   ↓
7. Checkbox state updates via [checked] binding
   ↓
8. CSS classes update via [class.completed] binding
   ↓
9. Strikethrough/opacity changes apply
   ↓
10. Data saved to localStorage
```

**Benefits of this approach:**
- ⚡ Instant UI updates (no manual DOM manipulation)
- 🎯 Single source of truth (the signal)
- 🔄 Automatic re-rendering
- 🧹 Clean, declarative code

## Verify Completed Task Styling

Make sure the completed styling is working. The template should have:

```html
<li class="task-item"
    [class.completed]="item.status === 'Completed'"
    [class.editing]="item.todoItemId === newTask.todoItemId">
```

And the CSS should include (already in your `todo-app.css`):

```css
/* Completed Task Styling */
.task-item.completed {
  opacity: 0.7;
  background-color: rgba(30, 30, 36, 0.5);
}

.task-item.completed .task-title {
  text-decoration: line-through;
  color: var(--text-secondary);
}
```

This ensures completed tasks have:
- ✓ Strikethrough text
- ✓ Reduced opacity (70%)
- ✓ Dimmed background

## Test the Toggle Functionality

Follow these steps to test:

1. ✅ **Basic toggle:**
   - Add a new task (status will be "Pending")
   - Click the checkbox
   - Verify: strikethrough appears, badge shows "Completed"
   - Click checkbox again
   - Verify: strikethrough disappears, badge shows "Pending"

2. ✅ **Different statuses:**
   - Edit a task and set status to "In Progress"
   - Click the checkbox
   - Verify: it becomes "Completed"
   - Click again
   - Verify: it becomes "Pending" (not "In Progress")

3. ✅ **Persistence:**
   - Toggle a task to completed
   - Refresh the page
   - Verify: task still shows as completed

4. ✅ **Multiple tasks:**
   - Add 5 tasks
   - Toggle 2-3 to completed
   - Verify: only the toggled tasks show strikethrough
   - Verify: "Completed" badge only on completed tasks

## Advanced Enhancement (Optional)

If you want to prevent editing a task while toggling it, add this check:

```typescript
toggleComplete(task: TodoItemModel) {
  // Cancel edit mode if toggling the task being edited
  if (this.newTask.todoItemId === task.todoItemId) {
    this.newTask = new TodoItemModel();
  }

  this.todoList.update((list) => {
    return list.map((item) =>
      item.todoItemId === task.todoItemId
        ? { 
            ...item, 
            status: item.status === 'Completed' ? 'Pending' : 'Completed' 
          }
        : item
    );
  });
  
  this.saveToLocalStorage();
}
```

This prevents confusion by clearing the edit form when toggling a task that's currently being edited.

## Complete Code

### In `todo-app.html`:
```html
<div class="task-checkbox-wrapper">
  <input
    type="checkbox"
    class="task-checkbox"
    [id]="'task-' + item.todoItemId"
    [checked]="item.status === 'Completed'"
    (change)="toggleComplete(item)"
  />
  <label [for]="'task-' + item.todoItemId" class="checkbox-label"></label>
</div>
```

### In `todo-app.ts`:
```typescript
toggleComplete(task: TodoItemModel) {
  this.todoList.update((list) => {
    return list.map((item) =>
      item.todoItemId === task.todoItemId
        ? { 
            ...item, 
            status: item.status === 'Completed' ? 'Pending' : 'Completed' 
          }
        : item
    );
  });
  
  this.saveToLocalStorage();
}
```

## Key Concepts Learned

- **Event Binding**: Using `(change)` to respond to checkbox clicks
- **Ternary Operators**: Compact conditional logic `condition ? true : false`
- **Spread Operator**: `{...item}` for copying objects while changing properties
- **Map Method**: Creating new arrays with transformed items
- **Signal Reactivity**: How Angular automatically updates the UI
- **Immutable Updates**: Never mutating state directly

---

**Note:** Modified template and css to make this app responsive for the small screens.

---
 
