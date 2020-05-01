import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DataStoreService } from 'src/app/services/data-store.service';


@Component({
  selector: 'app-add-todo-dialog',
  templateUrl: './add-todo-dialog.component.html',
  styleUrls: ['./add-todo-dialog.component.scss'],

})
export class AddTodoDialogComponent implements OnInit {

  public minDate = new Date();
  public todoForm: FormGroup;

  constructor(private fb: FormBuilder, private dataStore: DataStoreService, private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      title: ['', [Validators.minLength(2), Validators.required]],
      date: [this.minDate, [this.dateValidator, Validators.required]],
      time: ['', [Validators.required]],
      priority: ['', Validators.required],
    });
  }

  public checkForError(control: string, errorType: string): boolean {
    if (this.todoForm.controls[control].errors?.[errorType] &&
      this.todoForm.controls[control].touched) {
      return true;
    }
    return false;
  }

  public createNewTodo(): void {
    const todo = {
      title: this.todoForm.get('title').value,
      completed: false,
      date: (this.todoForm.get('date').value as Date).toLocaleDateString(),
      time: this.todoForm.get('time').value,
      priority: this.todoForm.get('priority').value,
    }
    this.dataStore.addTodo(todo);
  }


  private dateValidator(control: FormControl): boolean {
    const date = (control.value as Date);
    if (!date) {
      return false;
    }
    const validate = date.toLocaleDateString()
      .match(/\d{1,2}\.\d{1,2}\.\d{4}/);
    if (!validate) {
      return false;
    }
    return true;
  }
}
