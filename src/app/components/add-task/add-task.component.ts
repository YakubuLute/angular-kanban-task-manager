import { Component } from '@angular/core'
import { Task } from '../../models/task.model'
import { TaskService } from '../../services/task.service'

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {
  showForm = false
  newTask: Task = {
    id: '',
    title: '',
    description: '',
    priority: 'medium',
    status: 'Not Started',
    tags: [],
    createdAt: new Date()
  }
  tagInput = ''

  constructor (private taskService: TaskService) {}

  toggleForm (): void {
    this.showForm = !this.showForm
    if (!this.showForm) {
      this.resetForm()
    }
  }

  resetForm (): void {
    this.newTask = {
      id: '',
      title: '',
      description: '',
      priority: 'medium',
      status: 'Not Started',
      tags: [],
      createdAt: new Date()
    }
    this.tagInput = ''
  }

  addTag (): void {
    if (
      this.tagInput.trim() &&
      !this.newTask.tags?.includes(this.tagInput.trim())
    ) {
      if (!this.newTask.tags) {
        this.newTask.tags = []
      }
      this.newTask.tags.push(this.tagInput.trim())
      this.tagInput = ''
    }
  }

  removeTag (tag: string): void {
    if (this.newTask.tags) {
      this.newTask.tags = this.newTask.tags.filter(t => t !== tag)
    }
  }

  submitTask (): void {
    if (!this.newTask.title.trim()) {
      return
    }

    const task: Task = {
      ...this.newTask,
      id: Date.now().toString(),
      createdAt: new Date()
    }

    this.taskService.addTask(task)
    this.toggleForm()
  }
}
