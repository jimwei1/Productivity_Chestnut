import { Button, CircularProgress, TextField } from '@mui/material';
import { useState } from 'react';

function App() {
  const [timeLeft, setTimeLeft] = useState(0);
  const [task, setTask] = useState('');
  const [todoList, setTodoList] = useState([]);

  const handleStartTimer = () => {
    // Start the timer with the specified timeLeft value
  };

  const handleAddTask = () => {
    // Add the current task to the todoList and clear the input
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px' }}>
        <div>
          <Button>Account</Button>
          <Button>Settings</Button>
        </div>
        <div style={{ width: '100px', height: '100px' }}>
          <CircularProgress variant="determinate" value={timeLeft} />
        </div>
      </div>
      <div style={{ flexGrow: 1 }}>
        <ul>
          {todoList.map((task, index) => (
            <li key={index}>{task}</li>
          ))}
        </ul>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <TextField value={task} onChange={(e) => setTask(e.target.value)} />
          <Button onClick={handleAddTask}>Add Task</Button>
        </div>
      </div>
    </div>
  );
}