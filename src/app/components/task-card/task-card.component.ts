import { Component, Input, Output, EventEmitter } from '@angular/core'
import { Task } from '../../models/task.model'

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent {
  @Input() task!: Task
  @Output() deleteTaskEvent = new EventEmitter<string>()

  getPriorityClass (): string {
    switch (this.task.priority) {
      case 'high':
        return 'priority-high'
      case 'medium':
        return 'priority-medium'
      case 'low':
        return 'priority-low'
      default:
        return ''
    }
  }

  deleteTask (): void {
    this.deleteTaskEvent.emit(this.task.id)
  }

  formatDate (date: Date | undefined): string {
    if (!date) return ''
    return new Date(date).toLocaleDateString()
  }
}
