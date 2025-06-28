import { Component, OnInit } from '@angular/core'
import { Task } from '../../models/task.model'
import { TaskService } from '../../services/task.service'
import { FormsModule } from '@angular/forms'
import { NgFor, NgIf } from '@angular/common'

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss',
  imports: [NgIf, NgFor, FormsModule]
})
export class EditTaskComponent implements OnInit {
  isModalOpen = true

  editedTask: Task = {
    id: '',
    title: '',
    description: '',
    priority: 'medium',
    status: 'Not Started',
    tags: [],
    createdAt: new Date()
  }
  tagInput = ''

  constructor (private taskService: TaskService) {
    this.isModalOpen = this.taskService.getOpenEditTaskModal()
  }

  openModal (): void {
    this.taskService.setEditModal(true)
    document.body.style.overflow = 'hidden'
  }

  closeModal (): void {
    // this.isModalOpen = false
    this.taskService.setEditModal(false)
    document.body.style.overflow = 'auto'
    this.resetForm()
  }

  resetForm (): void {
    this.editedTask = {
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
      !this.editedTask.tags?.includes(this.tagInput.trim())
    ) {
      if (!this.editedTask.tags) {
        this.editedTask.tags = []
      }
      this.editedTask.tags.push(this.tagInput.trim())
      this.tagInput = ''
    }
  }

  removeTag (tag: string): void {
    if (this.editedTask.tags) {
      this.editedTask.tags = this.editedTask.tags.filter(t => t !== tag)
    }
  }

  submitTask (): void {
    if (!this.editedTask.title.trim()) {
      return
    }

    const task: Task = {
      ...this.editedTask,
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

  // Format date for input field (YYYY-MM-DD)
  formatDateForInput (date: Date | undefined): string {
    if (!date) return ''
    const d = new Date(date)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  // Convert input date string back to Date object
  onDateChange (event: any): void {
    if (event.target.value) {
      this.editedTask.dueDate = new Date(event.target.value)
    } else {
      this.editedTask.dueDate = undefined
    }
  }

  ngOnInit (): void {
    this.taskService.getTasks().subscribe(tasks => {
      if (tasks.length > 0) {
        console.log('Task is greater than 0', tasks)
        this.editedTask = { ...tasks[0] }
      }
    })
  }
}
