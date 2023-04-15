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

  return React.createElement(
    'div',
    { style: { display: 'flex', flexDirection: 'column', height: '100vh' } },
    React.createElement(
      'div',
      { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px' } },
      React.createElement(
        'div',
        null,
        React.createElement(
          Button,
          null,
          'Account'
        ),
        React.createElement(
          Button,
          null,
          'Settings'
        )
      ),
      React.createElement(
        'div',
        { style: { width: '100px', height: '100px' } },
        React.createElement(CircularProgress, { variant: 'determinate', value: timeLeft })
      )
    ),
    React.createElement(
      'div',
      { style: { flexGrow: 1 } },
      React.createElement(
        'ul',
        null,
        todoList.map((task, index) => React.createElement(
          'li',
          { key: index },
          task
        ))
      ),
      React.createElement(
        'div',
        { style: { display: 'flex', alignItems: 'center' } },
        React.createElement(TextField, { value: task, onChange: e => setTask(e.target.value) }),
        React.createElement(
          Button,
          { onClick: handleAddTask },
          'Add Task'
        )
      )
    )
  );
}

