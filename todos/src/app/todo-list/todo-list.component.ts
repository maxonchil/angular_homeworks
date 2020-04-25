import { Todo } from './../interfaces/todo';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todoList: Todo[];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getTodos().subscribe((todoList: Todo[]) => this.todoList = todoList);
  }
  public test(): void {
    console.log(this.todoList);
  }
}
