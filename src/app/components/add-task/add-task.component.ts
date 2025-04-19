import { Component } from '@angular/core'
import { Task } from '../../models/task.model'
import { TaskService } from '../../services/task.service'
import { NgFor, NgIf } from '@angular/common'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
  imports: [NgIf, NgFor, FormsModule]
})
export class AddTaskComponent {
  isModalOpen = false
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

  openModal (): void {
    this.isModalOpen = true
    // Prevent background scrolling when modal is open
    document.body.style.overflow = 'hidden'
  }

  closeModal (): void {
    this.isModalOpen = false
    document.body.style.overflow = 'auto'
    this.resetForm()
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
    this.closeModal()
  }

  // Handle clicks on the modal backdrop
  onBackdropClick (event: MouseEvent): void {
    // Check if the click was directly on the backdrop (not on the modal content)
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.closeModal()
    }
  }

  // Prevent event propagation for clicks on the modal content
  onModalContentClick (event: Event): void {
    event.stopPropagation()
  }
}
