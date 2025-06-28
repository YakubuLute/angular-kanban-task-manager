import { Component, OnDestroy, OnInit } from '@angular/core'
import { Task } from '../../models/task.model'
import { TaskService } from '../../services/task.service'
import { FormsModule } from '@angular/forms'
import { NgFor, NgIf } from '@angular/common'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss',
  imports: [NgIf, NgFor, FormsModule]
})
export class EditTaskComponent implements OnInit, OnDestroy {
  isModalOpen = false
  editedTask: Task | null = null
  tagInput = ''

  private subscriptions: Subscription = new Subscription()

  constructor (private taskService: TaskService) {}

  ngOnInit (): void {
    this.subscriptions.add(
      this.taskService.openEditTaskModal$.subscribe(isOpen => {
        this.isModalOpen = isOpen
        if (!isOpen) {
          this.resetForm()
        }
      })
    )

    this.subscriptions.add(
      this.taskService.selectedTask$.subscribe(task => {
        if (task) {
          this.editedTask = { ...task }
        }
      })
    )
  }

  ngOnDestroy (): void {
    this.subscriptions.unsubscribe()
  }

  closeModal (): void {
    document.body.style.overflow = 'auto'
    this.taskService.closeEditTaskModal()
  }

  resetForm (): void {
    this.editedTask = null
    this.tagInput = ''
  }

  addTag (): void {
    if (
      this.editedTask &&
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
    if (this.editedTask?.tags) {
      this.editedTask.tags = this.editedTask.tags.filter(t => t !== tag)
    }
  }

  submitTask (): void {
    if (!this.editedTask || !this.editedTask.title.trim()) {
      return
    }

    this.taskService.updateTask(this.editedTask)
    this.closeModal()
  }

  onBackdropClick (event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.closeModal()
    }
  }

  onModalContentClick (event: Event): void {
    event.stopPropagation()
  }

  formatDateForInput (date: Date | undefined): string {
    if (!date) return ''
    const d = new Date(date)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  onDateChange (event: any): void {
    if (this.editedTask) {
      if (event.target.value) {
        this.editedTask.dueDate = new Date(event.target.value)
      } else {
        this.editedTask.dueDate = undefined
      }
    }
  }
}
