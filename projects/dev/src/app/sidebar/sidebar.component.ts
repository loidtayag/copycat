import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TasksService } from '../util/tasks.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  desc = new FormControl(null, [
    Validators.required,
    this.isTaskDescUnused.bind(this),
  ]);
  status = new FormControl(null, [
    Validators.required,
    this.isTooLong.bind(this),
  ]);
  form = new FormGroup({
    desc: this.desc,
    status: this.status,
  });
  showForm = false;
  validForm = this.form.valid;

  constructor(public tasksService: TasksService) {}

  onAddTask() {
    let values = this.form.value;
    if (values.desc && values.status) {
      this.tasksService.addTask(values.desc, values.status);
    }
    this.showForm = false;
  }

  isTaskDescUnused(control: FormControl): { [key: string]: boolean } | null {
    if (this.tasksService.istaskDescUnused(control.value)) {
      return null;
    }
    return { descNameUsed: true };
  }

  isTooLong(control: FormControl): { [key: string]: boolean } | null {
    if (control.value?.length > 12) {
      return { statusNameIsTooLong: true };
    }
    return null;
  }

  getDescErrorMessage() {
    if (this.desc.hasError('descNameUsed')) {
      return 'Description used already';
    }
    return 'Invalid';
  }

  getStatusErrorMessage() {
    if (this.status.hasError('statusNameIsTooLong')) {
      return 'Must be less than 13 chars';
    }
    return 'Invalid';
  }
}
