import { DatePipe, NgClass } from '@angular/common';
import { Component, OnInit, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-app',
  imports: [FormsModule, NgClass, DatePipe],
  templateUrl: './todo-app.html',
  styleUrl: './todo-app.css',
})
export class TodoApp {

}

class TodoItemModel{
  todoItemId: number;
  todoItem: string;
  createdDate: Date;
  status: string;

  constructor(){
    this.todoItemId = 0;
    this.todoItem = '';
    this.createdDate = new Date();
    this.status = 'pending';

  }

}
