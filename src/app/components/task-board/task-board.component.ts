import { Component, OnInit } from '@angular/core'
import {
  CdkDragDrop,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop'
import { Task } from '../../models/task.model'
import { TaskService } from '../../services/task.service'
import { NgFor, NgIf } from '@angular/common'
import { TaskCardComponent } from '../task-card/task-card.component'
import { DragDropModule } from '@angular/cdk/drag-drop'

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss'],
  imports: [NgFor, NgIf, TaskCardComponent, DragDropModule]
})
export class TaskBoardComponent implements OnInit {
  notStartedTasks: Task[] = []
  ongoingTasks: Task[] = []
  completedTasks: Task[] = []

  constructor (private taskService: TaskService) {}

  ngOnInit (): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.notStartedTasks = tasks.filter(task => task.status === 'Not Started')
      this.ongoingTasks = tasks.filter(task => task.status === 'Ongoing')
      this.completedTasks = tasks.filter(task => task.status === 'Completed')
    })
  }

  drop (event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )

      // Update task status based on the new container
      const task = event.container.data[event.currentIndex]
      const newStatus = this.getStatusFromContainerId(event.container.id)

      if (task.status !== newStatus) {
        const updatedTask = { ...task, status: newStatus }
        this.taskService.updateTask(updatedTask)
      }
    }
  }

  private getStatusFromContainerId (
    containerId: string
  ): 'Not Started' | 'Ongoing' | 'Completed' {
    switch (containerId) {
      case 'not-started-list':
        return 'Not Started'
      case 'ongoing-list':
        return 'Ongoing'
      case 'completed-list':
        return 'Completed'
      default:
        return 'Not Started'
    }
  }

  deleteTask (taskId: string): void {
    this.taskService.deleteTask(taskId)
  }
}
