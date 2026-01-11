import { DatePipe, NgClass } from '@angular/common';
import { Component, OnInit, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-app',
  imports: [FormsModule, NgClass, DatePipe],
  templateUrl: './todo-app.html',
  styleUrl: './todo-app.css',
})
export class TodoApp implements OnInit {
  newTask: TodoItemModel = new TodoItemModel();

  // Main signal - single source of truth
  todoList = signal<TodoItemModel[]>([]);

  // Filter and search properties
  searchText: string = '';
  filterStatus: string = 'All';
  sortOrder: string = 'newest';

  localKeyName: string = 'todoItems';

  ngOnInit(): void {
    const localData = localStorage.getItem(this.localKeyName);
    if (localData != null) {
      const parseData = JSON.parse(localData);

      // Convert date strings back to date objects
      const TasksWithDates = parseData.map((task: TodoItemModel) => ({
        ...task,
        createdDate: new Date(task.createdDate),
      }));
      this.todoList.set(TasksWithDates);
    }
  }
  // Add Task
  addTask() {
    // Validate input
    if (!this.newTask.todoItem.trim()) {
      return;
    }

    // Generate unique ID and set creation date
    this.generateId();

    // Add task immutably
    this.todoList.update((list) => {
      return [...list, { ...this.newTask }];
    });

    // Persist to storage
    this.saveToLocalStorage();

    // Reset form
    this.newTask = new TodoItemModel();
  }

  //Update Task
  // 1.Edit Task
  editTask(data: TodoItemModel) {
  // Create a deep copy to avoid reference issues
  this.newTask = {
    ...data,
    createdDate: new Date(data.createdDate)
  };

  // Optional: Scroll to top to show the edit form
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

  // 2.Update Task
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

onCancelEdit() {
  this.newTask = new TodoItemModel();
}
// Delete task
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

  // Helper Methods
  generateId() {
    const newDate = new Date();
    this.newTask.todoItemId =
      this.todoList().length + 1 + newDate.getDay() + newDate.getMilliseconds();
    this.newTask.createdDate = newDate;
  }



  saveToLocalStorage() {
    localStorage.setItem(this.localKeyName, JSON.stringify(this.todoList()));
  }
}

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
