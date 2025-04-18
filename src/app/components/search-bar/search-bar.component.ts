import { Component } from '@angular/core'
import { TaskService } from '../../services/task.service'

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
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
