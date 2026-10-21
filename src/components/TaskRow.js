import React from 'react';
import { Link } from 'react-router-dom';

const TaskRow = ({ task, toggleTaskStatus, deleteTask }) => {
  return (
    <tr>
      <td>
        <Link to={`/tasks/${task.id}`} className={task.done ? 'strikethrough' : ''}>
          {task.title}
        </Link>
      </td>
      <td>{task.assignee}</td>
      <td>{task.priority}</td>
      <td>{task.hours}</td>
      <td><b>{task.done ? 'Đã xong' : 'Đang làm'}</b></td>
      <td>
        <button onClick={() => toggleTaskStatus(task.id)}>
          <b>{task.done ? 'Làm lại' : 'Hoàn thành'}</b>
        </button>
        {' '}
        <button onClick={() => deleteTask(task.id)}>
          <b>Xóa</b>
        </button>
      </td>
    </tr>
  );
};

export default TaskRow;