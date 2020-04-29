import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Todo } from '../../app/interfaces/todo';
import { DataService } from '../../app/services/data.service';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('searchInput') searchInput: ElementRef;

  public todoList: Todo[] = [];
  public searchNotFound: boolean;
  public editTodoID: string;
  public todoListBackup: Todo[];
  private search$: Subscription;


  constructor(private dataService: DataService, private snackBar: MatSnackBar) {
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
          this.searchNotFound = false;
          this.todoList = this.todoListBackup;
          return;
        }
        this.todoList = this.todoListBackup.filter((todo: Todo) => todo.title.includes(value));
        this.searchNotFound = false;

        if (!this.todoList.length) {
          this.searchNotFound = true;
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
    this.editTodoID === undefined ?
      this.editTodoID = todo._id
      :
      this.editTodoID = undefined;
  }

  public updateTodo(todo: Todo): void {
    this.dataService.updateTodo(todo).subscribe(({ data, message }) => {
      this.todoList = this.todoListBackup
        .map((curentTodo: Todo) => curentTodo._id === data.todo._id ? data.todo : curentTodo);
      this.snackBar.open(message, 'Undo', { duration: 2000 });
      this.editTodoID = undefined;
    });
  }
}
