import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-add-todo-dialog',
  templateUrl: './add-todo-dialog.component.html',
  styleUrls: ['./add-todo-dialog.component.scss']
})
export class AddTodoDialogComponent implements OnInit {
  public minDate = new Date();
  public todoForm: FormGroup;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      title: ['', [Validators.minLength(2), Validators.required]],
      completed: [false],
      date: [this.minDate, [this.dateValidator, Validators.required]],
      time: ['', [Validators.required]],
      priority: ['', Validators.required],
    });
  }

  private dateValidator(control: FormControl): boolean {
    const date = (control.value as Date);
    if (!date) {
      return false;
    }
    const validate = date.toLocaleDateString()
      .match(/\d{1,2}\/\d{1,2}\/\d{4}/);
    if (!validate) {
      return false;
    }
    return true;
  }

  public checkForError(control, errorType: string): boolean {
    if (this.todoForm.controls[control].errors?.[errorType] &&
      this.todoForm.controls[control].touched) {
      return true;
    }
    return false;
  }

}