import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { Task } from '../models/task.model'

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private openEditTaskModalSubject = new BehaviorSubject<boolean>(false)

  private tasks: Task[] = [
    {
      id: '1',
      title: 'Complete Angular Project',
      description: 'Finish the task management application',
      priority: 'high',
      status: 'Ongoing',
      createdAt: new Date(),
      tags: ['Angular', 'Development']
    },
    {
      id: '2',
      title: 'Learn Drag and Drop',
      description: 'Master Angular CDK drag and drop module',
      priority: 'medium',
      status: 'Completed',
      createdAt: new Date(),
      tags: ['Learning', 'Angular']
    },
    {
      id: '3',
      title: 'UI Design Review',
      description: 'Review and improve the application UI',
      priority: 'low',
      status: 'Not Started',
      dueDate: new Date(new Date().setDate(new Date().getDate() + 5)),
      createdAt: new Date(),
      tags: ['Design', 'UI/UX']
    }
  ]

  private tasksSubject = new BehaviorSubject<Task[]>(this.tasks)

  constructor () {}

  getTasks (): Observable<Task[]> {
    return this.tasksSubject.asObservable()
  }

  getOpenEditTaskModal (): boolean {
    return this.openEditTaskModalSubject.getValue()
  }

  openEditTaskModal (task: Task): void {
    this.updateTask(task)
    this.openEditTaskModalSubject.next(true)
  }

  setEditModal (state: boolean): void {
    this.openEditTaskModalSubject.next(state)
  }

  addTask (task: Task): void {
    this.tasks = [...this.tasks, task]
    this.tasksSubject.next(this.tasks)
  }

  getTaskById (id: string): Task | undefined {
    return this.tasks.find(task => task.id === id)
  }

  updateTask (updatedTask: Task): void {
    this.tasks = this.tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    )
    this.tasksSubject.next(this.tasks)
  }

  deleteTask (id: string): void {
    this.tasks = this.tasks.filter(task => task.id !== id)
    this.tasksSubject.next(this.tasks)
  }

  searchTasks (query: string): void {
    if (!query.trim()) {
      this.tasksSubject.next(this.tasks)
      return
    }

    const filteredTasks = this.tasks.filter(
      task =>
        task.title.toLowerCase().includes(query.toLowerCase()) ||
        task.description.toLowerCase().includes(query.toLowerCase()) ||
        (task.tags &&
          task.tags.some(tag =>
            tag.toLowerCase().includes(query.toLowerCase())
          ))
    )

    this.tasksSubject.next(filteredTasks)
  }
}
