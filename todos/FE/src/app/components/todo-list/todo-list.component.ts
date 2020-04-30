import { AddTodoDialogComponent } from './../add-todo-dialog/add-todo-dialog.component';
import { DataService } from './../../services/data.service';
import { Todo } from './../../interfaces/todo';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('searchInput') searchInput: ElementRef;

  public todoList: Todo[] = [];
  public editTodoID: string;
  public updatedTodo: string;
  public todoListBackup: Todo[];
  private search$: Subscription;


  constructor(private dataService: DataService, private snackBar: MatSnackBar, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.dataService.getTodos().subscribe(({ data }) => {
      this.todoList = data.todos;
      this.todoListBackup = data.todos;
    });
  }

  ngAfterViewInit(): void {
    this.search$ = fromEvent(this.searchInput.nativeElement, 'input')
      .pipe(debounceTime(500))
      .subscribe((event: InputEvent) => {
        const value = (event.target as HTMLInputElement).value;

        if (!value) {
          this.todoList = this.todoListBackup;
          return;
        }
        this.todoList = this.todoListBackup.filter((todo: Todo) => todo.title.includes(value));

        if (!this.todoList.length) {
          this.snackBar.open('Not found', 'Undo', { duration: 2000 });
        }
      });
  }

  ngOnDestroy() {
    this.search$.unsubscribe();
  }

  public deleteTodo(todo: Todo): void {
    this.dataService.deleteTodo(todo).subscribe(({ data, message }) => {
      this.todoList = data.todos;
      this.todoListBackup = data.todos;
      this.snackBar.open(message, 'Undo', { duration: 2000 });
    });
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
    this.dataService.updateTodo(todo).subscribe(({ data, message }) => {
      this.todoList = this.todoListBackup
        .map((curentTodo: Todo) => curentTodo._id === data.todo._id ? data.todo : curentTodo);
      this.snackBar.open(message, 'Undo', { duration: 2000 });
      this.updatedTodo = undefined;
      this.editTodoID = undefined;
    });
  }
  public addTodo(): void {
    this.dialog.open(AddTodoDialogComponent);
  }
}
