import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import WorkTimer from '../components/WorkTimer';

const TaskDetail = ({ tasks }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Dùng Number() tìm bằng find()[cite: 5]
  const task = tasks.find(t => t.id === Number(id));

  if (!task) {
    return <div><b>Không tìm thấy công việc.</b></div>;
  }

  return (
    <div>
      <p><b>Tên công việc:</b> {task.title}</p>
      <p><b>Người làm:</b> {task.assignee}</p>
      <p><b>Mức ưu tiên:</b> {task.priority}</p>
      <p><b>Số giờ:</b> {task.hours}</p>
      <p><b>Trạng thái:</b> {task.done ? 'Đã xong' : 'Đang làm'}</p>
      
      <WorkTimer />
      
      <br/>
      <button onClick={() => navigate(-1)}><b>Quay lại</b></button>
    </div>
  );
};

export default TaskDetail;