import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRIORITIES } from '../data';

const AddTask = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [assignee, setAssignee] = useState('');
  const [priority, setPriority] = useState('Trung bình'); // Mặc định Trung bình[cite: 2]
  const [hours, setHours] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Kiểm tra dữ liệu nhập[cite: 2, 4]
    if (!title.trim() || !assignee.trim() || !priority || !hours.trim()) {
      setErrorMsg('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    const hoursNum = Number(hours);
    if (!Number.isInteger(hoursNum) || hoursNum < 1 || hoursNum > 40) {
      setErrorMsg('Số giờ phải từ 1 đến 40');
      return;
    }

    setErrorMsg('');
    addTask({ title, assignee, priority, hours: hoursNum });
    navigate('/tasks', { replace: true }); // Back không quay lại form[cite: 3, 6]
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Tên công việc</label>
        <input id="title" type="text" value={title} onChange={e => setTitle(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="assignee">Người làm</label>
        <input id="assignee" type="text" value={assignee} onChange={e => setAssignee(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="priority">Mức ưu tiên</label>
        <select id="priority" value={priority} onChange={e => setPriority(e.target.value)}>
          {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="hours">Số giờ ước tính</label>
        <input id="hours" type="number" value={hours} onChange={e => setHours(e.target.value)} />
      </div>
      <button type="submit"><b>Thêm</b></button>
      
      {errorMsg && <div className="error"><b>{errorMsg}</b></div>}
    </form>
  );
};

export default AddTask;