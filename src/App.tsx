import { useState } from 'react'
import './App.css'

interface Task {
  id: number;
  taskName: string;
  dueDate: string;
  completed: boolean;
}
  
  const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [filter, setFilter] = useState('all');

  const handleAddTask = (e: any) => {
    e.preventDefault();

    if(!taskName || !dueDate) {
      // alert('Please fill in all fields');
      return;
    }

    const newTask = {
      id: Date.now(),
      taskName,
      dueDate,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTaskName('');
    setDueDate('');
  };

  const toggleCompletion = (id: number) => {
    // setTasks((prev) => prev.map((task) => task.id === id ? { ...task, completed: !task.completed } : task));
    setTasks((prev) => prev.map((task) => task.id === id ? { ...task, completed: !task.completed } : task));
  }

  const filteredTasks = tasks.filter((task) => {
    if(filter === 'completed') {
      return task.completed;
    } else if(filter === 'incomplete') {
      return !task.completed;
    }
    return true;
  })
  return (
    <div>
      <h1>Remainder App</h1>
      <form action="" onSubmit={handleAddTask}>
        <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} placeholder='Task Name' required />
        <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} required />
        <button type='submit'> Add Task </button>
      </form>

<div>
      <button onClick={()=> setFilter("all")}>All</button>
      <button onClick={()=> setFilter("completed")}>Completed</button>
      <button onClick={()=> setFilter("incomplete")}>Incomplete</button>

</div>

<ul>
  {
    filteredTasks.map((task) => (
      <li key={task.id}>
        <div style={{marginBottom: "10px"}}>
          <span>{task.taskName} - {task.dueDate}</span>
          <button onClick={() => toggleCompletion(task.id)}>{task.completed ? "Mark Incomplete" : "Mark Complete"}</button>
        </div>
      </li>
    ))
  }
</ul>
    </div>
  )
}

export default App