export interface Task {
  id: number, 
  title: string, 
  complete: boolean
}


export const data: Task[] = [
  {
    id: 1,
    title: 'Task 1',
    complete: true
  },
  {
    id: 2,
    title: 'Task 2',
    complete: false
  },
  {
    id: 3,
    title: 'Task 3',
    complete: true
  },
  {
    id: 4,
    title: 'Task 4',
    complete: false
  },
  {
    id: 5,
    title: 'Task 5',
    complete: false
  }
]