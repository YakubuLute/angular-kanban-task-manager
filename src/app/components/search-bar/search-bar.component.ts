import { Component, NgModule } from '@angular/core'
import { TaskService } from '../../services/task.service'
import {  FormsModule } from '@angular/forms'
import { NgIf } from '@angular/common'

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  imports: [FormsModule, NgIf],
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  searchQuery = ''

  constructor (private taskService: TaskService) {}

  onSearch (): void {
    this.taskService.searchTasks(this.searchQuery)
  }

  clearSearch (): void {
    this.searchQuery = ''
    this.taskService.searchTasks('')
  }
}
