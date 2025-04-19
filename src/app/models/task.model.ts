export interface Task {
  id: string
  title: string
  description: string
  dueDate?: Date
  priority: 'low' | 'medium' | 'high'
  status: 'Not Started' | 'Ongoing' | 'Completed'
  tags?: string[]
  createdAt: Date
}
