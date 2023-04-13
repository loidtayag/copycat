import { Component } from '@angular/core';
import { TasksService } from '../util/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent {
  tasks = this.tasksService.tasks;
  statuses: { [key: string]: [string] } = {};

  constructor(public tasksService: TasksService) {
    this.tasks.forEach((task) => {
      if (this.statuses[task.status]) {
        this.statuses[task.status].push(task.desc);
      } else {
        this.statuses[task.status] = [task.desc];
      }
    });
  }
}
