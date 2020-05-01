import { DataStoreService } from './../../services/data-store.service';
import { AddTodoDialogComponent } from './../add-todo-dialog/add-todo-dialog.component';
import { Todo } from './../../interfaces/todo';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, AfterViewInit {
  @ViewChild('searchInput') searchInput: ElementRef;

  public editTodoID: string;
  public updatedTodo: string;


  constructor(public dataStore: DataStoreService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataStore.searchByWord(this.searchInput.nativeElement);
  }

  public deleteTodo(todo: Todo): void {
    this.dataStore.deleteTodo(todo);
  }

  public editTodo(todo: Todo): void {
    if (!this.editTodoID) {
      this.editTodoID = todo._id;
      this.updatedTodo = todo._id;
      return;
    }
    this.editTodoID = undefined;
  }

  public completeTodo(todo: Todo): void {
    this.updatedTodo = todo._id;
  }

  public updateTodo(todo: Todo): void {
    this.dataStore.updateTodo(todo);
    this.editTodoID = undefined;
  }
  public addTodo(): void {
    this.dialog.open(AddTodoDialogComponent);
  }
}
