import {format} from "date-fns";








export function Task({id, title, status, createdAt, deadline, handleDelete}: {id: number, title: string, createdAt: string, deadline: string, status: string, handleDelete: (id: number) => Promise<void>}) {
  const formattedCreatedAt: string = format(new Date(createdAt), 'd MMMM, yyyy hh:mm aa');
  const formattedDeadline: string = format(new Date(deadline), 'd MMMM, yyyy hh:mm aa');


  return (
    <div className="task-item">
      <span className="delete-task" onClick={() => handleDelete(id)}>X</span>

      <div className="task-title">{title}</div>
      <div className="task-info">
        <span><strong>Created At:</strong> <span>{formattedCreatedAt}</span></span>
        <span><strong>Deadline:</strong> <span className={"task-deadline"}>{formattedDeadline}</span></span>
        <span><strong>Status:</strong> <span className={"task-status " + 
                                          (status === 'in-progress' ?"status-in-progress" : (status === 'shelved' ? 'status-pending' : 'status-completed'))
                                          }>{status}</span></span>
      </div>
    </div>
  )
}