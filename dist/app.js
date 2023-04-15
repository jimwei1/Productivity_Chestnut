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
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, null, "Account"), /*#__PURE__*/React.createElement(Button, null, "Settings")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100px',
      height: '100px'
    }
  }, /*#__PURE__*/React.createElement(CircularProgress, {
    variant: "determinate",
    value: timeLeft
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flexGrow: 1
    }
  }, /*#__PURE__*/React.createElement("ul", null, todoList.map((task, index) => /*#__PURE__*/React.createElement("li", {
    key: index
  }, task))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(TextField, {
    value: task,
    onChange: e => setTask(e.target.value)
  }), /*#__PURE__*/React.createElement(Button, {
    onClick: handleAddTask
  }, "Add Task"))));
}