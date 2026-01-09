import { DatePipe, NgClass } from '@angular/common';
import { Component, OnInit, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-app',
  imports: [FormsModule, NgClass, DatePipe],
  templateUrl: './todo-app.html',
  styleUrl: './todo-app.css',
})
export class TodoApp implements OnInit{
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
addTask() {

  console.log(this.newTask.todoItem);
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
    this.status = 'pending';
  }
}
