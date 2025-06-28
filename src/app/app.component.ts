import { Component } from '@angular/core'
import { SearchBarComponent } from './components/search-bar/search-bar.component'
import { AddTaskComponent } from './components/add-task/add-task.component'
import { TaskBoardComponent } from './components/task-board/task-board.component'
import { EditTaskComponent } from './components/edit-task/edit-task.component'

@Component({
  selector: 'app-root',
  imports: [
    SearchBarComponent,
    AddTaskComponent,
    TaskBoardComponent,
    EditTaskComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Task Management'
}
