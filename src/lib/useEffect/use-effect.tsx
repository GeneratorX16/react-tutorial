import React, { useEffect, useState } from "react";
import { Task } from "./task";
import { format } from "date-fns";


// useEffect fires whenever the component is rendered (provided the array is empty, else whenever the component is rendered AND the any dependent is changed)
// I initially handled the setting of taskList inside the handleSearch, handleStatusChange using if else conditions to check if q or status had 
// changed or not. This was to limit the api calls to not ffetch api if nothing changed.
// better way was to add the status and search as a dependency inside the useEfect. 
// when the component renders first(on page load), useEffect runs and fetches the data from the APi and shows it.
// Now instead of manually fetching the ddata everytime the query changes, I just add these deps to my useEffect.
// This way when they change, component renderes, useEffect sees these deps have changed, api is called and the tasklist is updated


export default function TodoApp() {
  const [tasklist, setTasklist] = useState<any[]>([]);
  const [search, setSearch] = useState<string>('');
  const [searchStatus, setSearchStatus] = useState<'in-progress' | 'shelved' | 'complete' | 'all'>('all');

  // form
  const [showAddForm, setShowAddform] = useState<boolean>(false);

  async function handleTaskDelete(id: number) {
    const response = await fetch(`http://127.0.0.1:8000/task/${id}`, {method: 'DELETE'});

    if (response.ok) {
      console.log('Task Deleted')
    }

    const data = await getTasks();

    setTasklist(data);
  }

  useEffect(() => {
    async function foo() {
      let data;
      if (searchStatus === 'all') {
        data = await getTasks({ q: search });
      } else {
        data = await getTasks({ q: search, status: searchStatus });
      }
      setTasklist(data);
    }

    foo();

  }, [search, searchStatus]);

  async function handleSearch(e: React.ChangeEvent<HTMLInputElement>): Promise<void> {
    const value = e.currentTarget.value;
    setSearch(value);
  }

  async function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.currentTarget.value as 'in-progress' | 'shelved' | 'complete' | 'all';
    setSearchStatus(value);
  }

  async function handleFormSubmit(title: string, status: string, deadline: string) {

    const payload = {
      title,
      'deadline': deadline,
      status
    }

    const response = await fetch('http://localhost:8000/task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    

    if (response.ok) {
      setShowAddform(false);
    }

    const data = await getTasks();
    setTasklist(data);
  }

  return (
    <div className="main">
      {showAddForm ? <AddTaskForm setShow={setShowAddform} handleFormSubmit={handleFormSubmit}/> : (
        <>
          <div className="search">
            <form action="#" method="GET" className="search-form">

              <input type="text" name="query" placeholder="Search tasks..." className="search-input" onChange={handleSearch} />
              <select name="category" onChange={handleStatusChange} className="search-dropdown">
                <option value={'all'}>All</option>
                <option value={'in-progress'}>In Progress</option>
                <option value={'shelved'}>Shelved</option>
                <option value={'complete'}>Complete</option>
              </select>
            </form>
            <button onClick={() => setShowAddform(true)}>Add Task</button>
          </div>


          <div className="task-container">
            {(tasklist.length === 0) ? <h2>No Tasks Found</h2> :
              tasklist.map((task) => {
                return (<Task id={task.id} key={task.id} title={task['title']} status={task['status']} createdAt={task['created_at']} deadline={task['deadline']} handleDelete={handleTaskDelete}/>)
              })
            }
          </div>
        </>
      )}

    </div>

  )
}

interface TaskSearchQuery {
  q?: string,
  createdBefore?: string,
  createdAfter?: string,
  deadlineBefore?: string,
  deadlineAfter?: string,
  status?: 'shelved' | 'in-progress' | 'complete'
}

async function getTasks(query: TaskSearchQuery = {}) {
  const url = new URL('http://localhost:8000/tasks');
  const searchParams = new URLSearchParams(query as Record<string, string>);
  url.search = searchParams.toString();

  const response = await fetch(url);
  const data = await response.json();
  return data;
}



function AddTaskForm({ setShow, handleFormSubmit }: { setShow: any, handleFormSubmit: (title: string, status: string,deadline: string) => void }) {
  const today = new Date();
  today.setDate(today.getDate() + 1);
  const tomorrow = format(today, 'yyyy-MM-dd');

  const [title, setTitle] = useState<string>('');
  const [status, setStatus] = useState<string>('in-progress');
  const [deadline, setDeadline] = useState<string>(format(tomorrow, 'yyyy-MM-dd'));

  // const [deadline, setDeadline] = useState<string>(parse(new Date(), 'dd-MM-yyyy'))

  function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.currentTarget.value;
    setStatus(value);
  }

  function handleDeadlineChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDeadline(e.currentTarget.value);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await handleFormSubmit(title, status, deadline);
  }

  function handleClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) {
      setShow(false);
    }
  }

  return (
    <div className="add-task-form" onClick={handleClick}>
      <form method="POST" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input id="title" value={title} name="title" placeholder="Your task title..." required minLength={5} maxLength={300} onChange={(e) => setTitle(e.currentTarget.value)} />

        <label htmlFor="status">Status</label>
        <select name="status" id="status" onChange={handleStatusChange} className="search-dropdown">
          <option value="in-progress">In Progress</option>
          <option value="shelved">Shelved</option>
        </select>

        <label htmlFor="deadline">Deadline</label>
        <input type="date" id="deadline" name="deadline" className="deadline-input" min={tomorrow} />

        <button type="submit">Submit</button>
      </form>
    </div>

  )
}