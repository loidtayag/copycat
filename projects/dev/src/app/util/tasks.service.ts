import { Injectable } from '@angular/core';

export interface Task {
  desc: string;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  storedTasks: string | null;
  tasks: Task[];

  constructor() {
    this.storedTasks = localStorage.getItem('tasks');
    if (this.storedTasks === null) {
      localStorage.setItem('tasks', '[]');
      this.tasks = [];
    } else {
      this.tasks = JSON.parse(this.storedTasks);
    }
  }

  public istaskDescUnused(desc: string) {
    let unused = true;

    this.tasks.forEach((task) => {
      if (task.desc === desc) {
        unused = false;
      }
    });

    return unused;
  }

  private createTask = (desc: string, status: string) => ({
    desc: desc,
    status: status,
  });

  addTask(desc: string, status: string) {
    this.tasks.push(this.createTask(desc, status));
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  removeTask() {
    console.log(1);
  }
}
