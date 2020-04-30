import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-todo-dialog',
  templateUrl: './add-todo-dialog.component.html',
  styleUrls: ['./add-todo-dialog.component.scss']
})
export class AddTodoDialogComponent implements OnInit {
  public minDate = new Date();
  constructor() { }

  ngOnInit(): void {
  }

}
