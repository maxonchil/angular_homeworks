import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Todo } from './../interfaces/todo';
import { DataService } from './data.service';
import { Injectable, OnDestroy } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService implements OnDestroy {
  public todos$ = new Subject<Todo[]>();
  public todosBackup: Todo[];
  private notifier = new Subject();


  constructor(private dataService: DataService, private snackBar: MatSnackBar) {
    this.dataService.getTodosRequest()
      .pipe(takeUntil(this.notifier))
      .subscribe(({ data }) => {
        this.todos$.next(data.todos);
        this.todosBackup = data.todos;
      });
  }

  public addTodo(todo: Todo): void {
    this.dataService.addTodoRequest(todo)
      .pipe(takeUntil(this.notifier))
      .subscribe(({ data, message }) => {
        this.todosBackup = [...this.todosBackup, data.todo];
        this.todos$.next(this.todosBackup);
        this.snackBar.open(message, 'Undo', { duration: 2000 });
      });
  }

  public updateTodo(updatedTodo: Todo): void {
    this.dataService.updateTodoRequest(updatedTodo)
      .pipe(takeUntil(this.notifier))
      .subscribe(({ data, message }) => {
        this.todos$.next(this.todosBackup
          .map((todo) => todo._id === data.todo._id ? data.todo : todo));
        this.snackBar.open(message, 'Undo', { duration: 2000 });
      });

  }

  public deleteTodo(deletedTodo: Todo): void {
    this.dataService.deleteTodoRequest(deletedTodo)
      .pipe(takeUntil(this.notifier))
      .subscribe(({ data, message }) => {
        this.todos$.next(data.todos);
        this.todosBackup = data.todos;
        this.snackBar.open(message, 'Undo', { duration: 2000 });
      });
  }

  public searchByWord(element: HTMLInputElement) {
    fromEvent(element, 'input')
      .pipe(debounceTime(500), takeUntil(this.notifier))
      .subscribe((event: InputEvent) => {
        const value = (event.target as HTMLInputElement).value;

        if (!value) {
          this.todos$.next(this.todosBackup);
        }

        const result = this.todosBackup.filter((todo: Todo) => todo.title.includes(value));
        this.todos$.next(result);

        if (!result) {
          this.snackBar.open('Not found', 'Undo', { duration: 2000 });
        }
      });
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
