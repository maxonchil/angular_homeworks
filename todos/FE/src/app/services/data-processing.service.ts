import { TodoPriorities } from 'src/app/enums/todo-priorities.enum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Todo } from '../interfaces/todo';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { DataStoreService } from './data-store.service';
import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataProcessingService implements OnDestroy {
  private notifier = new Subject();

  constructor(private dataStore: DataStoreService, private snackBar: MatSnackBar) {

  }

  public searchByWord(element: HTMLInputElement): void {
    fromEvent(element, 'input')
      .pipe(debounceTime(500), takeUntil(this.notifier))
      .subscribe((event: InputEvent) => {
        const value = (event.target as HTMLInputElement).value;

        if (!value) {
          this.dataStore.todos$.next(this.dataStore.todosBackup);
        }

        const result = this.dataStore.todosBackup.filter((todo: Todo) => todo.title.includes(value));
        this.dataStore.todos$.next(result);

        if (!result.length) {
          this.snackBar.open('Not found', 'Undo', { duration: 2000 });
        }
      });
  }

  public todoFilter(value: string): void {
    switch (value) {
      case 'deadline_comming': {
        this.dataStore.todos$
          .next(this.dataStore.todosBackup
            .sort((a: Todo, b: Todo) => new Date(a.date).getTime() - new Date(b.date).getTime()));
        break;
      }
      case 'deadline_latest': {
        this.dataStore.todos$
          .next(this.dataStore.todosBackup
            .sort((a: Todo, b: Todo) => new Date(b.date).getTime() - new Date(a.date).getTime()));
        break;
      }
      case 'priority_high': {
        this.dataStore.todos$
          .next(this.dataStore.todosBackup
            .sort((a: Todo, b: Todo) => TodoPriorities[b.priority] - TodoPriorities[a.priority]));
        break;
      }
      case 'priority_low': {
        this.dataStore.todos$
          .next(this.dataStore.todosBackup
            .sort((a: Todo, b: Todo) => TodoPriorities[a.priority] - TodoPriorities[b.priority]));
        break;
      }
      case 'done': {
        this.dataStore.todos$
          .next(this.dataStore.todosBackup.filter((todo: Todo) => todo.completed));
        break;
      }
      case 'in_progress': {
        this.dataStore.todos$.next(this.dataStore.todosBackup.filter((todo: Todo) => !todo.completed));
        break;
      }
    }
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
